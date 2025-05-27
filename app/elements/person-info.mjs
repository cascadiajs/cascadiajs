export default function TalkItem({ html, state }) {
  const { attrs } = state
  const { name, company, role, location } = attrs
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
        <div class="person-misc">
            ${ company ? company + '<br/>' : '' }
            ${ role ? role + '<br/>' : '' }
            ${ location ? location : '' }
        </div>       
    `
}