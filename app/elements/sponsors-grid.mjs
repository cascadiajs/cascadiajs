const sponsors = [
    { 
        id: 'temporal',
        tier: 'gold',
        logo: 'temporal.svg',
        name: 'Temporal',
        url: 'https://temporal.io/'
    },
    { 
        id: 'stytch',
        tier: 'gold',
        logo: 'stytch.svg',
        name: 'Stytch',
        url: 'https://stytch.com/'
    },
    { 
        id: 'datastax',
        tier: 'gold',
        logo: 'datastax.svg',
        name: 'DataStax',
        url: 'https://www.datastax.com'
    },
    { 
        id: 'codingscape',
        tier: 'gold',
        logo: 'codingscape.svg',
        name: 'Codingscape',
        url: 'https://codingscape.com'
    },
    { 
        id: 'infobip',
        tier: 'gold',
        logo: 'infobip.svg',
        name: 'Infobip',
        url: 'http://infobip.com/developers'
    },
    { 
        id: 'hookdeck',
        tier: 'community',
        logo: 'hookdeck.svg',
        name: 'HookDeck',
        url: 'https://hookdeck.com?ref=cascadiajs-2024'
    },
    { 
        id: 'langchain',
        tier: 'community',
        logo: 'langchain.svg',
        name: 'LangChain',
        url: 'https://langchain.com'
    },
    { 
        id: 'google',
        tier: 'community',
        logo: 'google.png',
        name: 'Google',
        url: 'https://google.com'
    },
    { 
        id: 'begin',
        tier: 'community',
        logo: 'begin.svg',
        name: 'Begin',
        url: 'https://begin.com'
    },
    { 
        id: 'mux',
        tier: 'community',
        logo: 'mux.png',
        name: 'Mux',
        url: 'https://mux.com'
    },
    { 
        id: 'cloudinary',
        tier: 'community',
        logo: 'cloudinary.png',
        name: 'Cloudinary',
        url: 'https://cloudinary.com'
    },
    { 
        id: 'codecrafters',
        tier: 'community',
        logo: 'codecrafters.png',
        name: 'CodeCrafters',
        url: 'https://app.codecrafters.io/join?via=cascadiajs'
    },
    { 
        id: 'seattlejs',
        tier: 'community',
        logo: 'seattlejs.png',
        name: 'SeattleJS',
        url: 'https://seattlejs.com'
    },
    { 
        id: 'seattle-node',
        tier: 'community',
        logo: 'seattle-node.png',
        name: 'Seattle Node',
        url: 'https://www.meetup.com/seattle-node-js/'
    },
    { 
        id: 'seattle-reactjs',
        tier: 'community',
        logo: 'seattle-reactjs.jpg',
        name: 'Seattle React.js',
        url: 'https://www.meetup.com/seattle-react-js/'
    },
    { 
        id: 'pdx-angular',
        tier: 'community',
        logo: 'portland-angular.jpg',
        name: 'Portland Angular.js',
        url: 'https://www.meetup.com/ngpdxers/'
    }
]

export default function Sponsors({ html }) {
    return html`
        <style>

        .tier-wrap {
            text-align: center;
            margin: 20px;
            position: relative;
        }
        
        .tier-inner {
            padding: 0 10px;
            display: flex;
            justify-content: center;
            position: relative;
        }
        
        .tier-wrap:before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            border-top: 1px solid #112378;
            width: 100%;
            transform: translateY(-50%);
            opacity: 0.2;
        }
        
        .tier-label {
            height: 20px;
            padding: 8px;
            background: #d1f3e5;
            color: #112378;
            display:inline-block;
        }
        
        .tier div img {
            display: block;
            margin: 32px auto;
            height: 50px;
        }
        
        @media only screen and (min-width: 768px) {
            .tier {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }    
        
            .tier div img {
                height: 100%;
                display: inline;
                margin: 0;
            }
        
            .tier div {
                margin: 32px;
            }
        
            .platinum div {
                height: 160px;
            }
            
            .gold div {
                height: 120px;
            }
            
            .silver div {
                height: 90px;
            }
            
            .bronze div {
                height: 70px;
            }
        
            .community div {
                height: 50px;
            }
        
            .sponsored div {
                height: 30px;
            }
        }
        </style>
        <div class="sponsors-grid">
        ${ ['platinum', 'gold', 'silver', 'bronze', 'community'].map(tier => /*html*/`
            ${ sponsors.filter(s => s.tier === tier).length > 0 ? /*html*/`
                <div class="tier-wrap"><div class="tier-inner"><div class="tier-label">${ tier }</div></div></div>
                <div class="${ tier } tier">
                ${ sponsors.filter(s => s.tier === tier).map(s => /*html*/`
                    <div><a target="_new" href="${ s.url }"><img src="/_public/images/sponsors/${ s.logo }" alt="${ s.name } logo"/></a></div>
                `).join('') }
                </div>
            `: ''}        
        `).join('')}
        </div>`
}