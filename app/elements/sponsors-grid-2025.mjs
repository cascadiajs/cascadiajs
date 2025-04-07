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
        id: 'elastic',
        tier: 'gold',
        logo: 'elastic.svg',
        logoSquare: 'elastic.svg',
        name: 'Elastic',
        url: 'https://www.elastic.co/',
        description: 'Elastic is a search company that builds open source search engines and tools. Elastic is the company behind Elasticsearch, Kibana, Beats, and Logstash.'
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
    ? `<div><a target="_new" href="${ s.url }"><img src="/_public/images/sponsors/${ s.logo }" alt="${ s.name } logo"/></a></div>`
    : `<div><a target="_new" href="${ s.url }"><img src="/_public/images/sponsors/${ s.logo }" alt="${ s.name } logo"/></a></div>`  
}
                `).join('') }
                </div>
            `: ''}        
        `).join('')}
        </div>`
}