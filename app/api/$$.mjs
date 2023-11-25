import { URL } from "node:url";
import { readFileSync } from "node:fs";
import fm from "front-matter";

export async function get(req) {
  const { path } = req;
  const page = path.substr(1);
  const filePath = new URL(`../markdown/${page}.md`, import.meta.url);
  //console.log(filePath);
  let docMarkdown;
  try {
    docMarkdown = readFileSync(filePath, "utf-8");
  } catch (_err) {
    console.log(_err);
    return { statusCode: 404 };
  }

  // pull out any front-matter key/values
  let { attributes, body } = fm(docMarkdown);
  let title = attributes.title;

  return {
    json: {
      path,
      title,
      attributes,
      body,
    },
  };
}
