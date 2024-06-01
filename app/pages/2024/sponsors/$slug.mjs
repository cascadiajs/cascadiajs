import { marked } from "marked";

/**
 * Page view: catchall for pages authored in markdown
 */
export default function ({ html, state }) {
  let { sharing } = state?.store
  let { name, logo, description, short, url } = state?.store?.sponsor
  if (sharing.social !== undefined) {
    return html`<social-sharing image="${ sharing.image }" title="${ sharing.title }" description="${ sharing.description }"></social-sharing>`
  }
  else {
    return html`
      <style>
        #logo {
          height: 120px;
        }
      </style>
      <main-layout>
        <simple-page title="Sponsor - ${ name }">
          <p><img id="logo" src="/_public/images/sponsors/${ logo }" alt="${ name }"/></p>
          <p>${ marked(description) }</p>
          <div class="cta"><a target="_blank" href="${ url }">Learn More</a></div>
        </simple-page>  
      </main-layout>
    `
  }
}


