export default function TalkItem({ html, state }) {
  const { attrs } = state
  const { name, company, role, location, linkedin, x } = attrs
  return html`
        <style>
        .person-name {
            font-family: freight-macro-pro, sans-serif;
            font-weight: 700;
            line-height: 1em;
            font-size: 24px;
            margin: 0;
            color: #112378;
            flex-grow: 1
        }
        :host {
            flex: 1;
            text-align: left;
            padding: 8px;
            display: flex;
            flex-direction: column;
            color: #112378;
        }            
        </style>
        <div class="person-name">${ name }</div>
        ${ linkedin || x ? html`
        <div>
            ${ linkedin ? html`<a href="${ linkedin }" target="_new"><div class="icon" style="mask-image: url('/_public/images/icons/icon-linkedin.svg')"></div></a>` : `` }
            ${ x ? html`<a href="${ x }" target="_new"><div class="icon" style="mask-image: url('/_public/images/icons/icon-twitter.svg')"></div></a>` : `` }
        </div>`: ``}
        <div class="person-misc">
            ${ company ? company + '<br/>' : '' }
            ${ role ? role + '<br/>' : '' }
            ${ location ? location : '' }
        </div>       
    `
}