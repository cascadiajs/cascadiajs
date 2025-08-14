function renderSpeaker(time, talk) {
    //console.log(talk)
    return /*html*/`
    <div class="show-item">
        <div class="when">${ time }</div>
        <div class="what">
            ${ talk && talk.type === 'keynote' ? /*html*/`<div class="keynote-badge">Keynote</div>` : ""}
            <div class="title">
                ${ talk ? `<a href="/2025/talks/${ talk.slug }">${ talk.title }</a>` : `TBD` }
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
            <div class="title">Connect with Experts</div><br/>
            <p>Connect with folks at the top web + AI companies</p>
            <!--div class="sponsors">
                <div><a href="/2025/sponsors/datastax"><img src="/_public/images/sponsors/datastax.svg" alt="DataStax logo"/></a></div>
                <div><a href="/2025/sponsors/codingscape"><img src="/_public/images/sponsors/codingscape.svg" alt="Codingscape logo"/></a></div>
                <div><a href="/2025/sponsors/stytch"><img src="/_public/images/sponsors/stytch.svg" alt="Stytch logo"/></a></div>
                <div><a href="/2025/sponsors/temporal"><img src="/_public/images/sponsors/temporal.svg" alt="Temporal logo"/></a></div>
                <div><a href="/2025/sponsors/infobip"><img src="/_public/images/sponsors/infobip.svg" alt="Infobip logo"/></a></div>
            </div-->
        </div>
    </div>
    <!--div class="location">Virtual</div>
    <div class="show-item">
        <div class="what">
            <div class="title">Video Selfie Booth</div>
            <p>Hop into the CascadiaJS Video Selfie Booth! Record yourself saying "hello", download the video clip, and share it in the Discord and on Twitter!</p>
            <div class="cta secondary"><a target="_mux" href="https://guestbook.mux.dev">Video Selfie Booth</a></div>
        </div>
    </div>
    <div class="show-item">       
        <div class="what">
            <div class="title">Join us on Discord</div>
            <p>Come hang out with us on the official CascadiaJS Discord server! Introduce yourself, ask speakers questions and hopefully make some friends!</p>
            <div class="cta secondary"><a target="_discord" href="https://discord.gg/kkYR86GM29">Open Discord</a></div>
        </div>
    </div-->
</div>
    `
}

function Sept15() {
    return /*html*/`
    <div id="day-zero" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Pre-Conf<br/>Sept 15
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">Location TBD</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">9am - 4pm</div>
                    <div class="what">
                        <div class="title"><a href="/2025/trainings/typescript-and-deno-foundations">TypeScript & Deno Foundations</a></div>
                        <p>Ready to level up your JavaScript skills? Let's dive into TypeScript and Deno to build more reliable applications. We'll start with TypeScript basics and work our way up to building full applications with Deno.</p>
                    </div>
                </div>
                <div class="show-item">       
            </div>
        </div>
    </div>
`
}

function Sept16() {
    return /*html*/`
    <div id="day-zero" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Pre-Conf<br/>Sept 16
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">Location TBD</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">9am - 4pm</div>
                    <div class="what">
                        <div class="title"><a href="/2025/trainings/developer-productivity-with-ai">Developer Productivity with AI</a></div>
                        <p>AI is changing how we write code, and you're about to become fluent in these new tools. We'll explore everything from basic AI integration to building sophisticated AI agents that can help with development tasks.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
}

function Sept17() {
    return /*html*/`
    <div id="day-zero" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Sept 17
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">Union Station</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">10:10am</div>
                    <div class="what">
                        <div class="title"><a href="/2024/hacker-train">Portland Hacker Train departs</a></div>
                        <p>Meet up with your fellow hackers for a ride up to Seattle!</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="location">Location TBD</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">9am - 4pm</div>
                    <div class="what">
                        <div class="title"><a href="/2025/trainings/modern-react-and-data-management">Modern React & Data Management</a></div>
                        <p>Let's explore what makes modern React applications truly powerful. We'll combine Server Components with robust data management patterns to build fast, scalable apps that your users will love.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="location">Pacific Central Station</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">4:15pm</div>
                    <div class="what">
                        <div class="title"><a href="/2024/hacker-train">Vancouver Hacker Train departs</a></div>
                        <p>Meet up with your fellow hackers for a ride down to Seattle!</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="location">Town Hall Seattle</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">5:30pm - 8:30pm</div>
                    <div class="what">
                        <div class="title">Welcome Reception &amp; Pre-Registration</div>
                        <p>The Welcome Reception will be an opportunity for folks to pre-register, get their badge, pickup swag and hang out with fellow attendees.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
}

function Sept18({ talks, ticket = undefined }) {
    //console.log(talks)
    return /*html*/`
    <div id="day-one" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Conference
            </h2>
        </div>
        <!--div class="location">Map of Main Floor</div>
        <div class="day-content">
            <img src="/_public/images/2024/venue-layout.png" alt="venue map"/>
        </div-->
        <div class="day-header">
            <h2 class="day-date">
            Day One<br/>Sept 18
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">Town Hall</div>
        <div class="day-content">
            <div class="show-item">       
                <div class="when">08:00</div>
                <div class="what"><div class="title"><i class="fas fa-door-open"></i> Doors Open and Registration</div></div>
            </div>
        </div>
        <div class="day-content">
            <div class="main track">   
                <h3>Talk Track</h3>
                <div class="location">Great Hall</div>
                <div class="show-item">       
                    <div class="when">09:00</div>
                    <div class="what"><div class="title">Opening Remarks</div></div>
                </div>
                ${ renderSpeaker("09:30", talks.find(t => t.speaker.slug === 'jason-mayes'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'kent-c-dodds'))}
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("11:15", talks.find(t => t.speaker.slug === 'logan-gore'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'aiden-bai'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'john-pham'))}
                <div class="location">Main Lobby</div>
                <div class="show-item">       
                    <div class="when">12:15</div>
                    <div class="what"><div class="title"><i class="fas fa-taco"></i> <a href="/2024/meals">Lunch</a></div></div>
                </div>
                <div class="location">Great Hall</div>
                ${ renderSpeaker("14:00", talks.find(t => t.speaker.slug === 'herve-aniglo'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'brian-leroux'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'aaron-gustafson'))}
                <div class="show-item">       
                    <div class="when">15:30</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("16:30", talks.find(t => t.speaker.slug === 'jacob-lee'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'tejas-kumar'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'josh-goldberg'))}
                <div class="show-item">       
                    <div class="when">18:00</div>
                    <div class="what"><div class="title">Closing Day One</div></div>
                </div>
                <div class="location">Main Lobby</div>
                <div class="show-item">       
                    <div class="when">18:30</div>
                    <div class="what"><div class="title"><i class="fas fa-party-horn"></i> <a href="/2024/meals">Dinner</a> and Opening Party by <img src="/_public/images/sponsors/infobip.svg"/></div></div>
                </div>
                <div class="show-item">       
                    <div class="when">22:00</div>
                    <div class="what"><div class="title"><i class="fas fa-door-closed"></i> Day One Close</div></div>
                </div>
            </div>

            ${ hallwayTrack({ticket})}

            <div class="lightning track">
                <h3>Lightning Track</h3>
                <div class="location">Reading Room</div>
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what">
                        <div class="title"><a href="/2024/workshops/w3c-verifiable-credentials">Can You Buy Booze with a JSON Web Token?</a></div>
                        <div class="speaker">The answer is: yes, you can buy booze with a JSON web token! Join this hands-on workshop to learn how mobile driver's license apps leverage a special JSON Web Token and W3C standard called Verifiable Credentials to digitally prove to both the vendor and the delivery company that a buyer is of legal drinking age.</div>
                    </div>
                </div>
                <div class="show-item">       
                    <div class="when">14:00</div>
                    <div class="what">
                        <div class="title"><a href="/2024/workshops/debugging-web-apps">From “its broken” to “fix is out”</a></div>
                        <div class="speaker">"Something is broken": are hopefully words you never have to hear from your users. Even worse is when you don’t know how to fix that “something”. Join this workshop to learn how to make sure users are heard, alerts are alerting, and priorities are prioritized. Spend your dev cycles more on new features and less on digging through logs, trying to figure out how to repro an issue, or guessing what part of your codebase is the culprit.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
}

function Sept19({ talks, ticket = undefined }) {
    return /*html*/`
    <div id="day-two" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Day Two<br/>Sept 19
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">Town Hall</div>
        <div class="day-content">
            <div class="show-item">       
                <div class="when">08:00</div>
                <div class="what"><div class="title"><i class="fas fa-door-open"></i> Doors Open and Registration</div></div>
            </div>
        </div>
        <div class="day-content">
            <div class="main track">   
                <h3>Talk Track</h3>
                <div class="location">Great Hall</div>
                <div class="show-item">       
                    <div class="when">09:00</div>
                    <div class="what"><div class="title">Opening Remarks</div></div>
                </div>
                ${ renderSpeaker("09:30", talks.find(t => t.speaker.slug === 'dominic-farolino'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'geoff-rich'))}
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("11:15", talks.find(t => t.speaker.slug === 'kristen-thayer'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'molly-jean-bennett'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'jerome-woody'))}
                <div class="location">Main Lobby</div>
                <div class="show-item">       
                    <div class="when">12:15</div>
                    <div class="what"><div class="title"><i class="fas fa-taco"></i> Lunch</div></div>
                </div>
                <div class="location">Great Hall</div>
                ${ renderSpeaker("14:00", talks.find(t => t.speaker.slug === 'henri-helvetica'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'shruti-kapoor'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'rizel-scarlett'))}
                <div class="show-item">       
                    <div class="when">15:30</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("16:30", talks.find(t => t.speaker.slug === 'tracy-lee'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'jason-lengstorf'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'swyx'))}
                <div class="show-item">       
                    <div class="when">18:00</div>
                    <div class="what"><div class="title">Closing Day Two</div></div>
                </div>
                <div class="location">Main Lobby</div>
                <div class="show-item">       
                    <div class="when">18:30</div>
                    <div class="what"><div class="title"><i class="fas fa-party-horn"></i> <a href="/2024/meals">Dinner</a> and Closing Party by <img src="/_public/images/sponsors/datastax.svg"/></div></div>
                </div>
                <div class="show-item">       
                    <div class="when">18:30</div>
                    <div class="what"><div class="title"><i class="fas fa-rocket"></i> <a href="/2024/startup-fair">Startup Fair</a></div></div>
                </div>
                <div class="show-item">       
                    <div class="when">19:30</div>
                    <div class="what"><div class="title"><i class="fas fa-microphone-stand"></i> Karaoke</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">23:00</div>
                    <div class="what"><div class="title"><i class="fas fa-door-closed"></i> Day Two Close</div></div>
                </div>
            </div>


            ${ hallwayTrack({ticket})}

            <div class="lightning track">
                <h3>Lightning Track</h3>
                <div class="location">Reading Room</div>
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what">
                        <div class="title"><a href="/2024/workshops/building-ai-apps">Building a GenAI enabled web experience</a></div>
                        <div class="speaker">AI is slowly eating the world. In this hands-on workshop, we will explore vector databases, embeddings, RAG, and more to understand how we can practically use GenAI in the workplace.</div>
                    </div>
                </div>
                <div class="show-item">       
                    <div class="when">14:00</div>
                    <div class="what">
                        <div class="title"><a href="/2024/workshops/adding-auth-to-apps">Building a better auth experience for your apps</a></div>
                        <div class="speaker">Scaling authentication systems is a complex and critical task for any application, especially as customer requirements evolve. This workshop will introduce developers to Stytch, a powerful developer platform designed to scale and future-proof your authentication system.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

`
}

function Sept20() {
    return /*html*/`
    <div id="day-training" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Post-Conf<br/>Activity Day<br/>June 22
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="day-content">
            <div class="show track">   
                <div class="location">Location TBD</div>
                <div class="show-item"> 
                    <div class="when">10am - noon</div>
                    <div class="what">
                        <div class="title">Pickle Ball <i class="fa-solid fa-pickleball"></i></a> led by Lantz Warrick</div>
                    </div>
                </div>
                <div class="location">Thinkspace Seattle</div>
                <div class="show-item"> 
                    <div class="when">9am - 11pm</div>
                    <div class="what">
                        <div class="title"><a href="https://lu.ma/yu2ccnvr" target="_blank">Cascadia AI Hack Day</a></div>
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
        
        .lightning.track h3 {
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
        
        .lightning .location {
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
            height: 30px;
            margin: 24px;
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
        
        .when {
            min-width: 50px;
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
            
            .hallway.track, .lightning.track {
                border-left: 3px solid #112378;
            }
        }
        </style>
        <main-layout>
            <simple-page title="Schedule" width="wide">
                <div id="conf-schedule">
                ${ Sept15() }
                ${ Sept16() }
                ${ Sept17() }
                ${ Sept18({ talks, ticket }) }
                ${ Sept19({ talks, ticket }) }
                ${ Sept20() }
                </div>
            </simple-page>
        </main-layout>
      `
    }
}
