import { sponsors } from "../../../shared/data/sponsors.mjs";

function renderSpeaker(time, talk) {
    //console.log(talk)
    return /*html*/`
    <div class="show-item">
        <div class="when">${ time }</div>
        <div class="what">
            ${ talk && talk.type === 'keynote' ? /*html*/`<div class="keynote-badge">Keynote</div>` : ""}
            <div class="title">
                ${ talk && talk.slug ? `<a href="/2026/talks/${ talk.slug }">${ talk.title }</a>` :
                    (talk && talk.title ? talk.title : `Coming Soon` )}
            </div>
            <div class="speaker">${ talk ? talk.speaker.name : "" }</div>
        </div>
    </div>`
}

function hallwayTrack({ticket = undefined}) {
    return /*html*/`
    <div class="hallway track">
    <h3>Hallway Track</h3>
    <div class="location">Main Lobby</div>
    <div class="show-item">       
        <div class="what">
            <div class="title">Build your Network</div><br/>
            <p>Back this year is <a href="/2026/connect">Cascadia Connect</a>, a set of low-pressure ways to meet cool humans at CascadiaJS. No pressure, no awkwardness—just friendly ways to vibe, learn, and maybe not eat lunch alone.</p>
            <div class="title">Connect with Experts</div><br/>
            <p>Connect with folks at the top web + AI companies</p>
            <div class="sponsors">
                ${["platinum", "gold"].map(tier => {
                    return sponsors["2026"].filter(s => s.tier === tier).map(sponsor => /*html*/`<div><a target="_new" href="${ sponsor.url }"><img src="/_public/images/sponsors/${ sponsor.logo }" alt="${ sponsor.name } logo"/></a></div>`).join("")
                }).join("")}
            </div>
        </div>
    </div>
    <div class="location">Discord</div>
    <div class="show-item">       
        <div class="what">
            <div class="title">Join us on Discord</div>
            <p>Come hang out with us on the official CascadiaJS Discord server! Introduce yourself, ask speakers questions and hopefully make some friends!</p>
            <div class="cta secondary"><a target="_discord" href="https://discord.gg/kkYR86GM29">Open Discord</a></div>
        </div>
    </div>
</div>
    `
}

function May29() {
    return /*html*/`
    <div id="cascadia-ai-hackathon" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Pre-Conf<br/>May 29
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">TBD</div>
        <div class="day-content">
            <div>   
                <div class="show-item">       
                    <div class="when">5pm</div>
                    <div class="what">
                        <div class="title"><a target="_blank" href="https://luma.com/cascadia-ai-hackathon-2026">Cascadia AI Hackathon</a></div>
                        <p>We're hosting an AI hackathon leading up to CascadiaJS 2026! Stay tuned for more details, but it will kick-off Friday evening and conclude Saturday afternoon, with the winning team being invited to demo what they built at CascadiaJS 2026!</p>
                    </div>
                </div>
                <div class="show-item">       
            </div>
        </div>
    </div>
`
}

function May31() {
    return /*html*/`
    <div id="day-zero" class="day">
        <div class="day-header">
            <h2 class="day-date">
            May 31
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">Pacific Central Station</div>
        <div class="day-content">
            <div>   
                <div class="show-item">       
                    <div class="when">11:30am</div>
                    <div class="what">
                        <div class="title"><a href="/2026/travel">Vancouver Hacker Train departs</a></div>
                        <p>Meet up with your fellow hackers for a ride down to Seattle!</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="location">Union Station</div>
        <div class="day-content">
            <div>   
                <div class="show-item">       
                    <div class="when">2:10pm</div>
                    <div class="what">
                        <div class="title"><a href="/2026/travel">Portland Hacker Train departs</a></div>
                        <p>Meet up with your fellow hackers for a ride up to Seattle!</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="location">Town Hall Seattle</div>
        <div class="day-content">
            <div>   
                <div class="show-item">       
                    <div class="when">5:30pm - 8:30pm</div>
                    <div class="what">
                        <div class="title">Welcome Reception &amp; Pre-Registration by <img src="/_public/images/sponsors/warp.png"/></div>
                        <p>The Welcome Reception will be an opportunity for folks to pre-register, get their badge, pickup swag and have fun with our friends from Warp and Whiskey Web and Whatnot.</p>
                        <p>What if a party game built real software? Join Warp and Whiskey Web and Whatnot at the CascadiaJS Welcome Reception to find out. Pitch your wildest app idea from your phone, watch Oz bring it to life (complete with box art and a functional demo) and vote on the best ones. Drinks and Claude tokens included.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
}

function June1({ talks, ticket = undefined }) {
    //console.log(talks)
    return /*html*/`
    <div id="day-one" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Conference
            </h2>
        </div>
        <!--div class="location">Maps</div>
        <div class="day-content">
            <p><a target="_new" href="/_public/images/2025/th-forum.png"><img src="/_public/images/2025/th-forum.png" alt="venue map"/></a></p>
            <p><a target="_new" href="/_public/images/2025/th-lobby.png"><img src="/_public/images/2025/th-lobby.png" alt="venue map"/></a></p>
            <p><a target="_new" href="/_public/images/2025/th-great-hall.png"><img src="/_public/images/2025/th-great-hall.png" alt="venue map"/></a></p>
        </div-->
        <div class="day-header">
            <h2 class="day-date">
            Day One<br/>June 1
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">Town Hall Seattle</div>
        <div class="day-content">
            <div class="show-item">       
                <div class="when">8:00am</div>
                <div class="what"><div class="title"><i class="fas fa-door-open"></i> Doors Open and Registration</div></div>
            </div>
        </div>
        <div class="day-content">
            <div class="main track">   
                <h3>Main Track</h3>
                <div class="location">Great Hall</div>
                ${ renderSpeaker("9:00am", talks.find(t => t.speaker.slug === 'matt-biilmann'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'joel-hooks'))}
                <div class="show-item">       
                    <div class="when">10:20am</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("11:00am", talks.find(t => t.speaker.slug === 'james-steinbach'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'courtney-yatteau'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'daniel-mendoza'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'james-ide'))}
                <div class="location">Forum</div>
                <div class="show-item">       
                    <div class="when">12:40pm</div>
                    <div class="what"><div class="title"><i class="fas fa-taco"></i> <a href="/2026/meals">Lunch</a></div></div>
                </div>
                <div class="location">Great Hall</div>
                ${ renderSpeaker("1:40pm", talks.find(t => t.speaker.slug === 'darius-cepulis'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'jonathan-keslin'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'dylan-goings'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'jeff-otano'))}
                <div class="show-item">       
                    <div class="when">3:20pm</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === ''))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'joe-duffy'))}
                <div class="show-item">       
                    <div class="when">5:10pm</div>
                    <div class="what"><div class="title">Closing Day One</div></div>
                </div>
            </div>

            ${ hallwayTrack({ticket})}

            <div class="workshop track">
                <h3>Workshop Track</h3>
                <div class="location">Forum</div>
                <div class="show-item">       
                    <div class="when">10:20am</div>
                    <div class="what">
                        <div class="title">TBD Workshop</div>
                        <div class="speaker">More info coming soon!</div>
                    </div>
                </div>
                <div class="show-item">       
                    <div class="when">1:40pm</div>
                    <div class="what">
                        <div class="title"><a href="/2026/workshops/recipe-better-agents">Tools + Skills: The Recipe for Better Agents</a></div>
                        <div class="speaker">AI agents are becoming more popular, but to make them more useful and capable, they need the right tools and instructions to use those tools. In this workshop, participants will learn both sides of that equation.</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="location">Forum</div>
        <div class="day-content">
            <div>   
                <div class="show-item">       
                    <div class="when">5:30pm</div>
                    <div class="what">
                        <div class="title"><a href="/2026/meals">Dinner</a></div>
                    </div>
                </div>
                <div class="show-item">       
                    <div class="when">6:00pm</div>
                    <div class="what">
                        <div class="title">Networking Mixer</div>

                        <p>Looking for a new opportunity? Have high-quality conversations with companies that are hiring, like Pulumi, Grow Therapy, Onebrief, RentSpree and more. Looking to grow your network? Make new friends during a Pog tournament hosted by Mux! The mixer kicks off right after dinner on Day 1.</p>


                    </div>
                </div>
                <div>   
                    <div class="show-item">       
                        <div class="when">9:30pm</div>
                        <div class="what"><div class="title"><i class="fas fa-door-closed"></i> Day One Close</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
`
}

function June2({ talks, ticket = undefined }) {
    return /*html*/`
    <div id="day-two" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Day Two<br/>June 2
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">Town Hall Seattle</div>
        <div class="day-content">
            <div class="show-item">       
                <div class="when">8:00am</div>
                <div class="what"><div class="title"><i class="fas fa-door-open"></i> Doors Open and Registration</div></div>
            </div>
        </div>
        <div class="day-content">
            <div class="main track">   
                <h3>Main Track</h3>
                <div class="location">Great Hall</div>
                ${ renderSpeaker("9:00am", talks.find(t => t.speaker.slug === 'francesco-ciulla'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'filip-sodic'))}
                <div class="show-item">       
                    <div class="when">10:20am</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("11:00am", talks.find(t => t.speaker.slug === 'alex-hinson'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'marty-nelson'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'molly-jean-bennett'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'jason-torres'))}
                <div class="location">Forum</div>
                <div class="show-item">       
                    <div class="when">12:40pm</div>
                    <div class="what"><div class="title"><i class="fas fa-taco"></i> <a href="/2026/meals">Lunch</a></div></div>
                </div>
                <div class="location">Great Hall</div>
                ${ renderSpeaker("1:40pm", talks.find(t => t.speaker.slug === 'nyah-macklin'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'brittany-ellich'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'alex-moon'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === ''))}
                <div class="show-item">       
                    <div class="when">3:15pm</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === ''))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'theo'))}
                <div class="show-item">       
                    <div class="when">5:10pm</div>
                    <div class="what"><div class="title">Closing Ceremony</div></div>
                </div>
            </div>


            ${ hallwayTrack({ticket})}

            <div class="workshop track">
                <h3>Workshop Track</h3>
                <div class="location">Forum</div>
                <div class="show-item">       
                    <div class="when">10:20am</div>
                    <div class="what">
                        <div class="title"><a href="/2026/workshops/promise-that-scales">The Promise.all That Actually Scales</a></div>
                        <div class="speaker">​Most AI agent tutorials end at "call the LLM API and return the result." But what happens when your agent needs to do five things at once, each one taking 30 seconds, and you don't want your users staring at a spinner for three minutes?</div>
                    </div>
                </div>
                <div class="show-item">       
                    <div class="when">1:40pm</div>
                    <div class="what">
                        <div class="title"><a href="/2026/workshops/deploying-ai-agents">Deploying AI Agents on AWS with Pulumi and Amazon Bedrock AgentCore</a></div>
                        <div class="speaker">​In this hands-on workshop, you'll go from a minimal agent to a multi-tool, multi-agent system running on Amazon Bedrock AgentCore, with all infrastructure defined as code using Pulumi. You'll build and deploy agents that coordinate tasks, call external tools, execute code, and maintain state over time.</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="location">Capitol Hill</div>
        <div class="show-item">       
            <div class="when">6:00pm</div>
            <div class="what"><div class="title"><i class="fas fa-utensils"></i>Dinner with Friends</div>
            <p>Grab dinner with the new friends you've made at CascadiaJS in Capital Hall. There are dozens of places to choose from!</p>
            </div>
        </div>
        <div class="location">Rockbox</div>
        <div class="show-item">       
            <div class="when">8:00pm</div>
            <div class="what"><div class="title"><i class="fas fa-microphone-stand"></i> Karaoke</div>
            <p>We will wrap-up CascadiaJS with an epic karaoke party at Rockbox Seattle. We are <b>buying out</b> the venue and there are 12 different rooms that we can use. Premium ticket holders will be able to skip the line and will be able to bring a plus-one! 🎤🎉</p>
            </div>
        </div>
        <div class="show-item">       
            <div class="when">11:00pm</div>
            <div class="what"><div class="title"><i class="fas fa-door-closed"></i> Karaoke rooms close</div></div>
        </div>
    </div>

`
}

function Trainings() {
    return /*html*/`
    <div id="day-training" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Post-Conf<br/>Training Workshops<br/>June 3
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">TBD</div>
        <div class="day-content">
            <div>   
                <div class="show-item">       
                    <div class="when">10am</div>
                    <div class="what">
                        <div class="title"><a href="/2026/trainings/coding-with-claude">Coding with Claude</a></div>
                        <p>AI is changing how we write code, and you're about to become fluent in these new tools. We'll explore everything from basic AI integration to building sophisticated AI agents that can help with development tasks. Let’s explore everything from AI-assisted coding in your editor to autonomous development with Claude Code.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="day-training" class="day">
        <div class="day-header">
            <h2 class="day-date">June 4</h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">TBD</div>
        <div class="day-content">
            <div>   
                <div class="show-item">       
                    <div class="when">10am</div>
                    <div class="what">
                        <div class="title"><a href="/2026/trainings/ai-for-typescript-developers">AI for TypeScript Developers</a></div>
                        <p>Ready to build AI-powered applications? Let's dive into the Vercel AI SDK and modern AI patterns to create intelligent features your users will love. We'll start with the fundamentals and work our way up to building production-ready AI applications.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="day-training" class="day">
        <div class="day-header">
            <h2 class="day-date">June 5</h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">TBD</div>
        <div class="day-content">
            <div>   
                <div class="show-item">       
                    <div class="when">10am</div>
                    <div class="what">
                        <div class="title"><a href="/2026/trainings/building-ai-agents">Building AI Agents</a></div>
                        <p>Explore everything from basic tool calling to sophisticated multi-step agents that can reason and act autonomously. We'll build a simple agent that can search the web and answer questions, and then we'll add more complex agents that can reason and act autonomously.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
}

export default function ({ html, state }) {
    let { store } = state
    let { sharing, talks, ticket } = store
    if (sharing?.social !== undefined) {
      const { image, title, description } = sharing
      return html`<social-sharing image="${ image }" title="${ title }" description="${ description }"></social-sharing>`
    }
    else {
      return html`
        <style>
        .day {
            text-align: left;
            margin-bottom: 16px;
        }
        
        .what .title, .what .title a:link, .what .title a:visited {
            font-family: freight-macro-pro, sans-serif;
            font-weight: 300;
            font-style: normal;
            text-decoration: none;
            line-height: 1.25em;
            margin: 0;
            color: #112378;
        }
        
        .title img {
            margin-left:4px;
            height: 20px;
            vertical-align: middle; 
        }
        
        .what .speaker {
            line-height: 1.5em;
        }
        
        .what p {
            margin-top: 8px;
        }
        
        .day h2.day-date {
            font-size: 28px;
            font-weight: 700;
            line-height: 1.25em;
            margin: 0 16px 0 0;
        }
        
        .day aside.day-timezone {
            font-size: 18px;
        }
        
        aside.day-timezone {
            flex: 1;
            color: #112378;
            text-transform: uppercase;
        }
        
        .day .track h3 {
            font-family: mono45-headline, sans-serif;
            font-size: 28px;
            font-weight: 500;    
            margin: 0;
            padding: 16px;
        }
        
        .main.track h3 {
            background: #FFCF07;
        } 
        
        .hallway.track h3 {
            background: #112378;
            color: #FFF5CC;
        }
        
        .workshop.track h3 {
            background: #17c37b;
        }
        
        .location {
            background: rgba(255, 207, 7, 0.3);
            font-family: mono45-headline;
            font-size: 24px;
            font-weight: 300;
            color: #112378;
            line-height: 1em;
            padding: 16px;
        }
        
        .main .location {
            background:rgba(255, 207, 7, 0.3);
        }
        
        .hallway .location {
            background:rgba(17, 35, 120, 0.3)
        }
        
        .workshop .location {
            background:rgba(206, 232, 215, 0.3);
        }
        
        .day .track h3 a:link, .day .track h3 a:visited {
            text-decoration: none;
            color: #112378;
        }
        
        .day .track h3 a:hover {
            text-decoration: underline;
            color: #0033FF;
        }
        
        .day .track h4, .day .track h5 {
            font-family: sans-serif;
            font-style: normal;
            color: #112378;
        }
        
        .day .track h4 {
            margin: 0 0 8px 0;
            font-size: 22px;
        }
        
        .day .track h5 {
            margin: 0 0 16px 0;
            font-size: 20px;
        }
        
        .hallway .sponsors>div {
            text-align: center;
            margin-bottom: 32px;
        }

        .hallway .sponsors img {
            width: 100%;
        }
        
        .day-header {
            display: flex;
            align-items: flex-end;
            padding-bottom: 8px;
            border-bottom: 3px solid #112378;
        }
        
        .show-item {
            display: flex;
            margin: 16px;
        }
        
        .track .when {
            width: 70px;
            margin-right: 0;
        }

        .when {
            margin-right: 16px;
        }
        
        .what {
            flex: 1;
        }
        
        .what .training.title {
            margin-bottom: 24px;
        }
        
        .what .title {
            font-size: 22px;
        }
        
        .what .title a:hover {
            text-decoration: underline;
            color: #0033FF;
        }
        
        .title.karaoke, .title.evening {
            display: flex;
            align-items: center;
        }
        
        .title.karaoke>div, .title.evening>div {
            margin-right: 8px;
        }
        
        .title.karaoke .cta a:link, .title.evening .cta a:link {
            color: #fff;
        }
        
        .boaf {
            font-size: 0.75em;
            padding: 2px;
            line-height: 1em;
            background-color: #b1ecb5;
        }
        
        .hallway-option {
            padding: 16px;
            background-color: #eee;
            margin-bottom: 24px;
        }
        
        .hallway-option-header {
            display: flex;
            margin-bottom:16px;
        }
        
        .day .cta {
            font-size: 24px;
        }
        
        .hallway-option-title {
            flex: 1;
        }
        
        #conf-schedule img.sponsor, .hallway-sponsors img {
            height: 30px;
        }

        .keynote-badge {
            display: inline-block;
            background-color: #17c37b;
            color: #112378;
            font-size: 14px;
            padding: 2px 8px;
            border-radius: 4px;
            margin-bottom: 8px;
        }

        
        @media only screen and (min-width: 768px) {
            .day-content {
                display: flex;
            }
        
            .track {
                flex: 33%;
            }     
            
            .hallway.track, .workshop.track {
                border-left: 3px solid #112378;
            }
        }
        </style>
        <main-layout>
            <simple-page title="Schedule" width="wide">
                <div id="conf-schedule">
                ${ May29() }
                ${ May31() }
                ${ June1({ talks, ticket }) }
                ${ June2({ talks, ticket }) }
                ${ Trainings() }
                </div>
            </simple-page>
        </main-layout>
      `
    }
}
