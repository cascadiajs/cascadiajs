function talkItem(attrs) {
  const { slug, image, name, title, company, location } = attrs;
  return `
        <div class="speaker">
            <person-photo
                image="${image}" 
                name="${name}" 
                overlay="${slug ? title : "Talk Info Coming Soon"}">
            </person-photo>
            <person-info name="${name}" company="${company || ""}" location="${location || ""}"></person-info>
        </div>
    `;
}

export default function TalkItem({ html, state }) {
  const { attrs, store } = state;
  const { year } = store;
  const { slug } = attrs;
  return html`
    <style>
      .talk-item a {
        text-decoration: none;
      }

      .talk-item:hover person-info .person-name,
      .talk-item:hover person-info .person-misc {
        color: #0033ff;
      }

      .talk-item person-info .icon {
        background-color: #112378;
      }

      .talk-item:hover person-info .icon {
        background-color: #0033ff;
      }

      @media only screen and (min-width: 768px) {
        .person-photo {
          position: relative;
        }

        .person-photo .overlay {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          opacity: 0;
          transition: 0.5s ease;
          background-color: #0033ff;
        }

        .speaker:hover .overlay {
          opacity: 1;
        }

        .person-photo .overlay .text {
          color: white;
          font-family: mono45-headline, sans-serif;
          font-weight: 300;
          font-size: 28px;
          line-height: 1.125em;
          margin: 16px;
          text-align: left;
        }
      }
    </style>
    <div class="talk-item">
      ${slug
        ? ` <a href="/${year}/talks/${slug}">${talkItem(attrs)}`
        : talkItem(attrs)}
    </div>
  `;
}
