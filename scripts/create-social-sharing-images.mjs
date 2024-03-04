import "dotenv/config"
import { join } from "path"
import * as url from "url"
import { readFileSync, readdirSync } from "node:fs";
import fm from "front-matter";
import * as sandbox from "@architect/sandbox"
import * as puppeteer from "puppeteer"
import { findTalks } from '../shared/data/talks.mjs'
import { findEvent } from '../shared/data/events.mjs'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));







async function createImages(command) {

  // define the local URL base for the static Markdown files
  const baseUrl = "http://localhost:3333"

  // start the sandbox webserver
  await sandbox.start()

  // define which pages (URLs) we are going to generate social sharing images for
  const source = join(__dirname, "..", "app", "markdown")

  // define destination for social sharing images
  const dest = join(__dirname, "..", "public", "images", "sharing")

  // set-up headless browser
  let browser
  let height = 627
  let width = 1200
  let deviceScaleFactor = 1

  console.log("Loading globally installed localdev puppeteer")

  browser = await puppeteer.launch({
    defaultViewport: {
      height,
      width,
      deviceScaleFactor,
    },
  })

  let page = await browser.newPage()

  if (command === 'pages') {
    // generate social sharing images for pages defined by the markdown directory 
    const files = readdirSync(source, { recursive: true })

    for (const file of files) {
      // only process Markdown files
      if (file.endsWith('.md')) {
        let docMarkdown;
        let filePath = `${source}/${file}`
        try {
          docMarkdown = readFileSync(filePath, "utf-8");
        } catch (_err) {
          console.log(_err);
        }
        // pull out any front-matter key/values
        let { attributes } = fm(docMarkdown)
        let { title, image, excerpt } = attributes
        if (title && image && excerpt) {
          console.log(`Generating a screen shot for ${file}`)
          const stub = file.split('.md')[0]
          await page.goto(`${baseUrl}/${stub}?social`)
          await page.screenshot({ path: `${dest}/${stub}.png` })
        }
      }
    }
    // manually process pages
    for (const path of ['2024']) {
      console.log(`Generating a screen shot for ${path}`)
      const fullUrl = `${baseUrl}/${path}?social`
      await page.goto(fullUrl)
      await page.screenshot({ path: `${dest}/${path}.png` })
    }
  }

  if (command === 'speakers') {
    const event = await findEvent({ query: { slug: 'cascadiajs-2024'}})
    const talks = await findTalks({ query: { event_id: event._id }})
    
    for (const talk of talks) {
      if (talk.slug) {
        const path = '2024/talks/' + talk.slug
        console.log(`Generating a screen shot for ${path}`)
        const fullUrl = `${baseUrl}/${path}?social`
        //console.log(fullUrl)
        await page.goto(fullUrl)
        await page.screenshot({ path: `${dest}/${path}.png` })
      }
    }
  }
  console.log("Shutting down")
  // shut down te browser
  await browser.close()
  // shut down the sandbox
  await sandbox.end()
  //})
}

function main() {
  let command = process.argv[2]
  createImages(command)
}

main()