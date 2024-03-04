import { URL } from "node:url";
import { readFileSync } from "node:fs";
import fm from "front-matter";

export async function get({ path, query}) {
  const page = path.substr(1);
  const filePath = new URL(`../markdown/${page}.md`, import.meta.url);
  let docMarkdown;
  try {
    docMarkdown = readFileSync(filePath, "utf-8");
  } catch (_err) {
    console.log(_err);
    return { statusCode: 404 };
  }

  // pull out any front-matter key/values
  let { attributes, body } = fm(docMarkdown)
  let { title, image, excerpt } = attributes

  const { social } = query
  // set social sharing info
  const sharing = {
    social,
    title,
    image,
    description: excerpt,
    sharingTitle: 'CascadiaJS 2024 | ' + title,
    sharingImage: '/_public/images/sharing' + path + '.png',
    sharingDescription: excerpt
  }

  return {
    json: {
      path,
      title,
      attributes,
      body,
      sharing
    },
  };
}
