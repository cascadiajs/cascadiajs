//import { sponsors } from '../../shared/data/sponsors.mjs'

const sponsors = [
  { 
    id: 'gensx',
    tier: 'platinum',
    logo: 'gensx.png',
    logoSquare: 'gensx.png',
    name: 'GenSX',
    url: 'https://www.gensx.com/',
    description: 'GenSX is a simple typescript framework for building agents and workflows with reusable React-like components.\n\nGenSX takes a lot of inspiration from React, but the programming model is very different - it’s a Node.js framework designed for data flow.\n\nBut if you know how to write a react component, then building an agent will feel easy and familiar.'
  },
  {
    id: 'cloudflare',
    tier: 'gold',
    logo: 'cloudflare.png',
    logoSquare: 'cloudflare.png',
    name: 'Cloudflare',
    url: 'https://www.cloudflare.com/',
    description: 'Cloudflare is a global network that helps to make everything you connect to the Internet secure, private, fast, and reliable. Cloudflare provides a wide range of services including DDoS protection, web application firewall, content delivery network, and more.'
  },
  {
    id: 'elastic',
    tier: 'gold',
    logo: 'elastic.svg',
    logoSquare: 'elastic.svg',
    name: 'Elastic',
    url: 'https://www.elastic.co/',
    description: 'Elastic is a search company that builds open source search engines and tools. Elastic is the company behind Elasticsearch, Kibana, Beats, and Logstash.'
  },
  {
    id: 'arcjet',
    tier: 'gold',
    logo: 'arcjet.svg',
    logoSquare: 'arcjet.svg',
    name: 'ArcJet',
    url: 'https://arcjet.com/',
    description: 'Security doesn\'t have to be a pain. Bot detection. Rate limiting. Email validation. Attack protection. Data redaction. A developer-first approach to security.'
  },
  {
    id: 'ilf',
    tier: 'silver',
    logo: 'ilf.png',
    logoSquare: 'ilf.png',
    name: 'Inter Ledger Foundation',
    url: 'https://interledger.org/',
    description: 'The Interledger Foundation is a non-profit organization that supports the development of the Interledger Protocol and its ecosystem. The Interledger Protocol is a protocol for sending payments across different payment networks.'
  },
  {
    id: 'signalfire',
    tier: 'silver',
    logo: 'signalfire.png',
    logoSquare: 'signalfire.png',
    name: 'SignalFire',
    url: 'https://signalfire.com/',
    description: 'SignalFire is a venture capital firm that invests in early stage technology companies. SignalFire is a remote-first company that uses AI to help its portfolio companies grow.'
  },
  {
    id: 'atono',
    tier: 'silver',
    logo: 'atono.svg',
    logoSquare: 'atono.png',
    name: 'Atono',
    url: 'https://atono.io/',
    description: 'Atono is an all-in-one platform designed to help autonomous, cross-functional teams build better software together.\n\nPlan, build, run, and improve your product with timelines, user stories, feature flags, usage tracking, and in-browser bug reporting – bringing your team together in one place.'
  },
  {
    id: 'mastra',
    tier: 'bronze',
    logo: 'mastra.svg',
    name: 'Mastra',
    url: 'https://www.mastra.ai/',
    description: 'The TypeScript Agent Framework. From the team that brought you Gatsby: prototype and productionize AI features with a modern Javascript stack.'
  },
  {
    id: 'seattlejs',
    tier: 'community',
    logo: 'seattlejs.png',
    logoSquare: 'seattlejs.png',
    name: 'SeattleJS',
    url: 'https://seattlejs.com',
    description: 'SeattleJS is a community of JavaScript developers in Seattle. We meet monthly to share knowledge and learn from each other.'
  },
  {
    id: 'vanjs',
    tier: 'community',
    logo: 'vanjs.png',
    logoSquare: 'vanjs.png',
    name: 'VanJS',
    url: 'https://vanjs.org',
    description: 'VanJS is a community of JavaScript developers in Vancouver. We meet monthly to share knowledge and learn from each other.'
  },
  {
    id: 'ai-portland',
    tier: 'community',
    logo: 'ai-portland.png',
    logoSquare: 'ai-portland.png',
    name: 'AI Portland',
    url: 'https://www.meetup.com/ai-portland/',
    description: 'AI Portland is a community of AI enthusiasts in Portland. We meet monthly to share knowledge and learn from each other.'
  },
  {
    id: 'bellingham-codes',
    tier: 'community',
    logo: 'bellingham-codes.png',
    logoSquare: 'bellingham-codes.png',
    name: 'Bellingham Codes',
    url: 'https://www.meetup.com/bellingham-codes/',
    description: 'Bellingham Codes is a community of developers in Bellingham. We meet monthly to share knowledge and learn from each other.'
  },
  {
    id: 'codeandcoffee',
    tier: 'community',
    logo: 'codeandcoffee.png',
    logoSquare: 'codeandcoffee.png',
    name: 'Code & Coffee',
    url: 'https://www.codeandcoffee.com/',
    description: 'Code & Coffee is a community of developers who meet weekly to share knowledge and learn from each other.'
  },
  {
    id: 'oss4ai',
    tier: 'community',
    logo: 'oss4ai.png',
    logoSquare: 'oss4ai.png',
    name: 'OSS4AI',
    url: 'https://lu.ma/oss4ai',
    description: 'OSS4AI is a community of developers who are interested in open source AI. We meet monthly to share knowledge and learn from each other.'
  },
  {
    id: 'viata',
    tier: 'community',
    logo: 'viata.svg',
    logoSquare: 'viata.png',
    name: 'Viata',
    url: 'https://viata.ai',
    description: 'Viata lets event organizers build beautiful, customized travel maps for their attendees.'
  },
  {
    id: 'codeday',
    tier: 'community',
    logo: 'codeday.svg',
    logoSquare: 'codeday.png',
    name: 'CodeDay',
    url: 'https://codeday.org',
    description: 'CodeDay is a global movement of students who are passionate about technology and coding. We host events and workshops to help students learn and grow their skills.'
  },
  {
    id: 'newtechnw',
    tier: 'community',
    logo: 'ntnw.png',
    logoSquare: 'ntnw.png',
    name: 'NewTech Northwest',
    url: 'https://newtechnw.com',
    description: 'NewTech Northwest is a community of tech enthusiasts in the Pacific Northwest. We meet monthly to share knowledge and learn from each other.'    }
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
    ? `<div><a target="_new" href="${ s.url }"><img src="/_public/images/sponsors/${ s.logo }" alt="${ s.name } logo"/></a></div>`
    : `<div><a target="_new" href="${ s.url }"><img src="/_public/images/sponsors/${ s.logo }" alt="${ s.name } logo"/></a></div>`  
}
                `).join('') }
                </div>
            `: ''}        
        `).join('')}
        </div>`
}