export default function Talks({ html, state }) {
  const { talks } = state.store;
  const { type } = state.attrs;
  const types = type.split(",");
  return html` <style>
      .talks-list {
        display: flex;
        overflow-x: auto;
      }
      talks-item {
        width: 250px;
        display: flex;
        flex-direction: column;
        margin-right: 8px;
        margin-bottom: 16px;
      }
      @media (min-width: 1200px) {
        .talks-list {
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: center;
        }
      }
    </style>
    <div class="talks-list">
      ${talks
        .filter((t) => t.slug)
        .filter((t) => {
          return types ? types.includes(t.type) : true;
        })
        .sort(() => Math.random() - 0.5)
        .map(
          (t) => /*html*/ `
            <talks-item
                slug="${t.slug}" 
                title="${t.title}" 
                image="${t.speaker.image.startsWith("/") ? t.speaker.image : `/_public/images/speakers/${t.speaker.image}`}" 
                name="${t.speaker.name || ""}"
                company="${t.speaker.company || ""}" 
                location="${t.speaker.location || ""}"
            ></talks-item>`,
        )
        .join("")}
      ${talks
        .filter((t) => !t.slug)
        .filter((t) => {
          return types ? types.includes(t.type) : true;
        })
        .sort(() => Math.random() - 0.5)
        .map(
          (t) => /*html*/ `
            <talks-item
                image="${t.speaker.image.startsWith("/") ? t.speaker.image : `/_public/images/speakers/${t.speaker.image}`}" 
                name="${t.speaker.name || ""}" 
                company="${t.speaker.company || ""}" 
                location="${t.speaker.location || ""}"
            ></talks-item>`,
        )
        .join("")}
    </div>`;
}
