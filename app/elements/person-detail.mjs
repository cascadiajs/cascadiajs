export default function PersonDetail({ html, state }) {
  const { attrs } = state
  const { name, image, pronouns, location, company, twitter, url, large } = attrs
  return html`
        <style>
        :host {
            display: flex
        }
    
        .more {
            margin-left: 16px;
            flex: 1
        }

        .more h3 {
            margin: 0 0 4px 0;
        }
        </style>
        <person-photo image="/_public/images/speakers/${ image }" name="${ name }" large="${ large }"></person-photo>
        <div class="more">
            ${ pronouns ? `<h3>Pronouns</h3><p>${ pronouns }</p>` : '' }
            <h3>Location</h3>
            <p>${ location }</p>
            <h3>Company</h3>
            <p>${ company }</p>
            <h3>Links</h3>
            <div class="person-links">
            ${ twitter ? `<p><i class="fab fa-twitter"></i> <a target="_blank" href="https://twitter.com/${ twitter }">@${ twitter }</a></p>` : '' }
            ${ url ? `<p><i class="fa fa-globe"></i> <a target="_blank" href="${ url }">${ url.split("://")[1] }</a></p>` : '' }
            </div>
        </div>
      
    `
}