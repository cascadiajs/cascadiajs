import { marked } from "marked";

/**
 * Page view: catchall for pages authored in markdown
 */
export default function ({ html, state }) {
  let { store } = state
  let { talk } = store
  let { speaker, title, abstract, tags, yt } = talk

  return html`
    <style>
    .talk {

    }

    #topic-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: left;
      margin: 8px 0;
    }
    
    .topic {
        display: inline-block;
        background-color: #CFD3E4;
        text-decoration: none;
        margin:3px;
        padding:8px;
    }
    
    </style>
    <main-layout>
      <simple-page title="${ title }">
        <div id="topic-list">${ (tags || []).map(t => `<div class=topic>${ t }</div>`).join('') }</div>
        <div class="abstract">${ marked.parse(abstract) }</div>
        ${ yt ? html`<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/${ yt }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>` : '' }
        <h2>About ${ speaker.name }</h2>
        <person-detail 
          large="true"
          name="${ speaker.name }" 
          image="${ speaker.image }" 
          pronouns="${ speaker.pronouns}" 
          location="${ speaker.location }" 
          company="${ speaker.company }" 
          ${ speaker.links ? `links=${JSON.stringify(speaker.links)}` : '' }
          x="${ speaker.x }" 
          linkedin="${ speaker.linkedin }"
          url="${ speaker.url }">
        </person-detail> 
        <buy-tickets></buy-tickets>
      </simple-page>  
    </main-layout>
  `
}



