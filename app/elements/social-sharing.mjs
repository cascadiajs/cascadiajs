export default function SocialSharing ({ html, state }) {
  const { store } = state
  const { sharing } = store
  const { image, title, description } = sharing
  return html`
        <style>
        #social-image {
            position:absolute;
            object-fit: cover;
            top:140px;
            left:125px;
            height: 350px;
            width: 350px;
        }
        
        #social-info {
            position:absolute;
            top:24px;
            left:600px;
            width:576px
        }
        
        #social-header {
            font-family:freight-macro-pro,sans-serif;
            color:#112378;
            font-size:80px;
            line-height:75px;
            font-weight:700;
            margin-bottom:24px;
        }
        
        #social-excerpt {
            color:#112378;
            font-size:50px;
            line-height:1.3em
        }        
        </style>
        <div style="background-image: url('/_public/images/social-sharing-card.png'); height: 628px; width: 1200px;">
        <img id="social-image" src="${ image }" />
        <div id="social-info">
        <div id="social-header">
            ${ title }
        </div>
        <div id="social-excerpt">
            ${ description }
        </div>
        </div>
        </div>`
}