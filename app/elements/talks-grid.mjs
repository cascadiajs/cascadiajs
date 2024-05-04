export default function Talks({ html, state }) {
    const { talks } = state.store
    return html`
        <style>
        .talks-list {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: center;
        }
        talks-item {
            width: 250px;
            display:flex;
            flex-direction: column;
            margin-right: 8px;
            margin-bottom: 16px;
        }
        </style>
        <div class="talks-list">
        ${ talks.filter((t) => t.slug).sort(() => Math.random() - 0.5).map(t => /*html*/`
            <talks-item
                slug="${ t.slug }" 
                image="/_public/images/speakers/${ t.speaker.image }" 
                name="${ t.speaker.name }" 
                title="${ t.title }" 
                company="${ t.speaker.company }" 
                location="${ t.speaker.location }"
            ></talks-item>`).join('')}
        ${ talks.filter((t) => !t.slug).sort(() => Math.random() - 0.5).map(t => /*html*/`
            <talks-item
                image="/_public/images/speakers/${ t.speaker.image }" 
                name="${ t.speaker.name }" 
                company="${ t.speaker.company }" 
                location="${ t.speaker.location }"
            ></talks-item>`).join('')}
        ${ ["ai-sasquatch", "ai-salmon", "ai-seahawk", "ai-tree"].map(image => `
            <talks-item
                image="/_public/images/speakers/${ image }.webp" 
                name="Secret" 
            ></talks-item>`).join('')}
        </div>`
}