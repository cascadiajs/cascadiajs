import { sponsors } from '../../shared/data/sponsors.mjs'

export default function Sponsors({ html }) {
  return html`
        <style>
        .sponsors-grid div img {
            display: block;
            margin: 32px auto;
            height: 50px;
        }
        
        @media only screen and (min-width: 768px) {
            .sponsors-grid {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }    
        
            .sponsors-grid div img {
                height: 60px;
                display: inline;
                margin: 0;
            }
        
            .sponsors-grid div {
                margin: 32px;
            }
        }
        </style>
        <div class="sponsors-grid">
        ${ sponsors["2024"].concat(sponsors["2025"]).sort((a, b) => a.name.localeCompare(b.name)).map(s => /*html*/`
            <div><img src="/_public/images/sponsors/${ s.logo }" alt="${ s.name } logo"/></div>
        `).join('') }
        </div>`
}