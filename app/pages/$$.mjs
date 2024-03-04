import { marked } from "marked"

/**
 * Page view: catchall for pages authored in markdown
 */
export default function ({ html, state }) {
  let { store } = state
  let { attributes, body, sharing } = store
  let title = attributes?.title
  if (sharing.social !== undefined) {
    const { image, title, description } = sharing
    return html`<social-sharing image="${ image }" title="${ title }" description="${ description }"></social-sharing>`
  }
  else {
    return html`
    <main-layout>
      <simple-page title="${ title }">
        ${marked(body)}
      </simple-page>
    </main-layout>`
  }
}
