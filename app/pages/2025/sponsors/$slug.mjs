import { marked } from "marked";

/**
 * Page view: catchall for pages authored in markdown
 */
export default function ({ html, state }) {
  let { sharing } = state?.store
  let { name, logo, description, video, url } = state?.store?.sponsor
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
          ${ video ? 
          /*html*/`<div style="position: relative; padding-top: 56.25%;">
            <iframe
              src="https://customer-err733fa36e0jnfx.cloudflarestream.com/${ video }/iframe?muted=true&autoplay=true&poster=https%3A%2F%2Fcustomer-err733fa36e0jnfx.cloudflarestream.com%2F${ video }%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=true"
              loading="lazy"
              style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowfullscreen="true"
            ></iframe>` : ``}
          </div>
          <p>${ marked(description) }</p>
          <div class="cta"><a target="_blank" href="${ url }">Learn More</a></div>
        </simple-page>  
      </main-layout>
    `
  }
}


