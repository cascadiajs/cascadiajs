export default function PersonDetail({ html, state }) {
  const { attrs } = state
  const { name, image, pronouns, location, company, twitter, url, large, x, linkedin } = attrs
  // HACK!!!!
  const links = (attrs.links ? JSON.parse(attrs.links) : [])
  // END HACK
  return html`
        <style>
        .more h3 {
            margin: 0 0 4px 0;
        }

        @media only screen and (min-width: 768px) {
            :host {
                display: flex
            }      
            
            .more {
                margin-left: 16px;
                flex: 1
            }
        }
        </style>
        <person-photo image="${ image.startsWith("/") ? image : `/_public/images/speakers/${ image }`}" name="${ name }" large="${ large }"></person-photo>
        <div class="more">
            ${ pronouns ? `<h3>Pronouns</h3><p>${ pronouns }</p>` : '' }
            <h3>Location</h3>
            <p>${ location }</p>
            <h3>Company</h3>
            <p>${ company }</p>
            <h3>Links</h3>
            <div class="person-links">
            ${ x || twitter ? `<p><i class="fab fa-twitter"></i> <a target="_blank" href="https://twitter.com/${ x || twitter }">@${ x || twitter }</a></p>` : '' }
            ${ linkedin ? `<p><i class="fab fa-linkedin"></i> <a target="_blank" href="https://linkedin.com/in/${ linkedin }">${ name }</a></p>` : '' }
            ${ url ? `<p><i class="fa fa-globe"></i> <a target="_blank" href="${ url }">${ url.split("://")[1] }</a></p>` : '' }
            ${ links ? links.map(l => `<p><i class="fa-brands fa-${ l.type }"></i> <a target="_blank" href="${ l.url }">${ l.url }</a></p>`).join('') : '' }
            </div>
        </div>
      
    `
}