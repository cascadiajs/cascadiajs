import { marked } from "marked";

/**
 * Page view: catchall for pages authored in markdown
 */
export default function ({ html, state }) {
  let { store } = state;
  let { attributes, body } = store;
  let title = attributes?.title;
  return html` <style>
      #page {
        min-height: 400px;
      }

      #page .page-title {
        background-color: #cfd3e4;
      }

      #page .page-title div {
        padding: 16px;
      }

      #page .page-title div h1 {
        color: #112378;
        margin: 8px 0;
      }

      #page .page-body {
        padding: 16px;
      }

      #page li {
        padding: 4px;
      }

      .page-body .toc a,
      .page-body .toc a:visited {
        font-weight: 500;
        text-decoration: none;
      }

      .page-body .toc a:hover {
        text-decoration: underline;
      }

      .page-body .toc ul {
        padding-inline-start: 0;
      }

      .page-body .toc li {
        list-style: none;
        margin: 0;
      }

      #page .page-body,
      #page .page-title div {
        width: 50%;
        margin: 0 auto;
      }

      @media only screen and (min-width: 768px) {
        #page .page-body.wide,
        #page .page-title div.wide {
          width: 70%;
        }

        #page {
          margin-bottom: 64px;
        }
      }
    </style>
    <main-layout>
      <div id="page">
        <div class="page-title">
          <div><h1>${title}</h1></div>
        </div>
        <div class="page-body">${marked(body)}</div>
      </div>
    </main-layout>`;
}
