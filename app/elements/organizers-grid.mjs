export default function Organizers({ html, state }) {
  const { store } = state
  const { organizers } = store
  return html`
        <style>
        .organizers-list {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: center;
        }
        .organizer {
            width: 250px;
            display:flex;
            flex-direction: column;
            margin-right: 8px;
            margin-bottom: 16px;
        }
        </style>
        <div class="organizers-list">
        ${ organizers.map(o => /*html*/`
            <div class="organizer">
                <person-photo
                    image="/_public/images/organizers/${ o.image }"
                    name="${ o.name }">
                </person-photo>
                <person-info name="${ o.name }" role="${ o.role }" location="${ o.location }"></person-info>
            </div>
        `).join('')}
    `
}
