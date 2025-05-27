//import { sponsors } from '../../shared/data/sponsors.mjs'

const sponsors = [
  { 
    id: 'temporal',
    tier: 'gold',
    logo: 'temporal.svg',
    logoSquare: 'temporal-square.jpg',
    name: 'Temporal',
    url: 'https://temporal.io/',
    video: '3c35df76a866b30cd714e87c82508815',
    description: 'Temporal is an open source durable execution platform that abstracts away the complexity of building scalable, distributed applications and lets developers focus on what matters – delivering reliable applications, faster. It improves meaningful engineering metrics that are directly tied to revenue, like development velocity and system reliability, and allows you to track every step of every application execution, so you gain valuable insight into your business. Temporal Cloud provides a managed service backed by the originators of the project. It has been adopted by thousands for mission-critical applications, including Stripe, Netflix, AlaskaAir, Snap, Datadog, and Hashicorp. Learn more at temporal.io.'
  },
  { 
    id: 'stytch',
    tier: 'gold',
    logo: 'stytch.svg',
    logoSquare: 'stytch-square.jpg',
    name: 'Stytch',
    url: 'https://stytch.com/',
    description: 'All-in-one authentication, authorization, and fraud prevention infrastructure with powerful APIs and SDKs. Stytch is the fastest way to build secure user authentication and authorization into your app. With Stytch, you can build a custom login experience in minutes, not months. Stytch is trusted by thousands of developers and businesses, including Webflow, Notion, and Figma.'
  },
  { 
    id: 'datastax',
    tier: 'gold',
    logo: 'datastax.svg',
    logoSquare: 'datastax-square.jpg',
    name: 'DataStax',
    url: 'https://www.datastax.com',
    description: 'DataStax is a GenAI data company that provides tools for developers to building amazing AI applications, including:\n- Astra DB - a serverless NoSQL and Vector database.\n- RAGStack - a framework for building enterprise-grade RAG applications.\n - Langflow - a visual editor and workflow engine for building AI flows.'
  },
  { 
    id: 'codingscape',
    tier: 'gold',
    logo: 'codingscape.svg',
    logoSquare: 'codingscape-square.jpg',
    name: 'Codingscape',
    url: 'https://codingscape.com',
    description: 'Codingscape is a modern consultancy solving global technology problems while putting people first. The world’s leading companies trust our expertise when they need a reliable partner to develop scalable software and systems. Our senior teams work across US time zones to build digital solutions faster and more efficiently than organizations can through internal hiring.'
  },
  { 
    id: 'infobip',
    tier: 'gold',
    logo: 'infobip.svg',
    logoSquare: 'infobip-square.jpg',
    name: 'Infobip',
    url: 'http://infobip.com/developers',
    video: '501085031dc9b27bcc6936548aa0fefa',
    description: 'Infobip is a global leader in the field of omnichannel communication powering a broad range of messaging channels, tools and solutions for advanced customer engagement, authentication, and security. We help our clients and partners overcome the complexity of consumer communications, grow their business, and enhance the customer experience quickly, securely, and reliably.'
  },
  { 
    id: 'tbd',
    tier: 'bronze',
    logo: 'tbd.svg',
    name: 'TBD',
    url: 'https://tbd.website'
  },
  { 
    id: 'sentry',
    tier: 'bronze',
    logo: 'sentry.svg',
    name: 'Sentry',
    url: 'https://sentry.io'
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
                    ${ ['platinum', 'gold', 'silver'].includes(s.tier) 
    ? `<div><a href="/2024/sponsors/${ s.id }"><img src="/_public/images/sponsors/${ s.logo }" alt="${ s.name } logo"/></a></div>`
    : `<div><a target="_new" href="${ s.url }"><img src="/_public/images/sponsors/${ s.logo }" alt="${ s.name } logo"/></a></div>`  
}
                `).join('') }
                </div>
            `: ''}        
        `).join('')}
        </div>`
}