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
            <div class="sponsors">
                <div><a href="/2025/sponsors/langflow"><img src="/_public/images/sponsors/langflow.png" alt="Langflow logo"/></a></div>
                <div><a href="/2025/sponsors/elastic"><img src="/_public/images/sponsors/elastic.png" alt="Elastic logo"/></a></div>
                <div><a href="/2025/sponsors/cloudflare"><img src="/_public/images/sponsors/cloudflare.png" alt="Cloudflare logo"/></a></div>
                <div><a href="/2025/sponsors/arcjet"><img src="/_public/images/sponsors/arcjet.png" alt="ArcJet logo"/></a></div>
                <div><a href="/2025/sponsors/atono"><img src="/_public/images/sponsors/atono.png" alt="Atono logo"/></a></div>
                <div><a href="/2025/sponsors/ilf"><img src="/_public/images/sponsors/ilf.png" alt="ILF logo"/></a></div>
                <div><a href="/2025/sponsors/moment"><img src="/_public/images/sponsors/moment.svg" alt="Moment logo"/></a></div>
                <div><a href="/2025/sponsors/reboot"><img src="/_public/images/sponsors/reboot.png" alt="Reboot logo"/></a></div>
            </div>
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
        <div class="location">Thinkspace</div>
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
        <div class="location">Thinkspace</div>
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
        <div class="location">Thinkspace</div>
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
                    <div class="when">11:30am</div>
                    <div class="what">
                        <div class="title"><a href="/2025/travel">Vancouver Hacker Train departs</a></div>
                        <p>Meet up with your fellow hackers for a ride down to Seattle!</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="location">Union Station</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">2:10pm</div>
                    <div class="what">
                        <div class="title"><a href="/2025/travel">Portland Hacker Train departs</a></div>
                        <p>Meet up with your fellow hackers for a ride up to Seattle!</p>
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
                        <div class="title"><a target="_blank" href="https://lu.ma/l3fp4o3x">Welcome Reception &amp; Pre-Registration</a></div>
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
        <div class="location">Town Hall Seattle</div>
        <div class="day-content">
            <div class="show-item">       
                <div class="when">08:00</div>
                <div class="what"><div class="title"><i class="fas fa-door-open"></i> Doors Open and Registration</div></div>
            </div>
        </div>
        <div class="day-content">
            <div class="main track">   
                <h3>Main Track</h3>
                <div class="location">Great Hall</div>
                <div class="show-item">       
                    <div class="when">09:00</div>
                    <div class="what"><div class="title">Opening Remarks</div></div>
                </div>
                ${ renderSpeaker("09:20", talks.find(t => t.speaker.slug === 'jason-mayes'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'kent-c-dodds'))}
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("11:00", talks.find(t => t.speaker.slug === 'annie-sexton'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'bree-hall'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'ioana-chiorean'))}
                <div class="location">Main Lobby</div>
                <div class="show-item">       
                    <div class="when">12:30</div>
                    <div class="what"><div class="title"><i class="fas fa-taco"></i> <a href="/2025/meals">Lunch</a></div></div>
                </div>
                <div class="location">Great Hall</div>
                ${ renderSpeaker("13:40", talks.find(t => t.speaker.slug === 'gant-laborde'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'ishan-anand'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'kevin-whinnery'))}
                <div class="show-item">       
                    <div class="when">15:15</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">16:00</div>
                    <div class="what">
                        <div><a href="/2025/dev-squares"><img src="/_public/images/2025/developer-squares-codetv.jpg" alt="DevSquares" /></a></div>
                        <div class="speaker">Hosted by Jason Lengstorf and Will Johnson</div>
                    </div>
                </div>
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'shruti-kapoor'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'jack-herrington'))}
                <div class="show-item">       
                    <div class="when">17:30</div>
                    <div class="what"><div class="title">Closing Day One</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">18:00</div>
                    <div class="what"><div class="title"><i class="fas fa-door-closed"></i> Doors Close</div></div>
                </div>
            </div>

            ${ hallwayTrack({ticket})}

            <div class="lightning track">
                <h3>Lightning Track</h3>
                <div class="location">Forum</div>
                ${ renderSpeaker("11:00", talks.find(t => t.speaker.slug === 'quinn-blenkinsop'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'erin-mikail-staples'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'cat-johnson'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'jarod-reyes'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'courtney-yatteau'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'kevin-leneway'))}
                ${ renderSpeaker("13:40", talks.find(t => t.speaker.slug === 'anton-zalaldinov'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'dave-kiss'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'dominik-kundel'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'jeremy-elbourn'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'justin-castilla'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'allan-deutsch'))}
            </div>
        </div>
        <div class="location">Just the Tap</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">18:30</div>
                    <div class="what">
                        <div class="title"><a href="https://luma.com/cascadiajs-day-one-afterparty" target="_blank">SeattleJS Day One After Party</a></div>
                        <p>Have fun with SeattleJS after Day One!</p>
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
        <div class="location">Town Hall Seattle</div>
        <div class="day-content">
            <div class="show-item">       
                <div class="when">08:00</div>
                <div class="what"><div class="title"><i class="fas fa-door-open"></i> Doors Open and Registration</div></div>
            </div>
        </div>
        <div class="day-content">
            <div class="main track">   
                <h3>Main Track</h3>
                <div class="location">Great Hall</div>
                <div class="show-item">       
                    <div class="when">09:00</div>
                    <div class="what"><div class="title">Opening Remarks</div></div>
                </div>
                ${ renderSpeaker("09:20", talks.find(t => t.speaker.slug === 'craig-dennis'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'phil-nash'))}
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("11:00", talks.find(t => t.speaker.slug === 'charlie-gerard'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'kenny-daniel'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'atai-barkai'))}
                <div class="location">Main Lobby</div>
                <div class="show-item">       
                    <div class="when">12:15</div>
                    <div class="what"><div class="title"><i class="fas fa-taco"></i> <a href="/2025/meals">Lunch</a></div></div>
                </div>
                <div class="location">Great Hall</div>
                ${ renderSpeaker("14:00", talks.find(t => t.speaker.slug === 'alex-clemmer'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'kristen-hewell-garrett'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'sean-c-davis'))}
                <div class="show-item">       
                    <div class="when">15:30</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">16:00</div>
                    <div class="what">
                        <div class="title">Show: Standup Comedy</div>
                        <div class="speaker">Hosted by Erin Mikail Staples</div>
                    </div>
                </div>
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'adam-argyle'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'rachel-lee-nabors'))}
                <div class="show-item">       
                    <div class="when">18:00</div>
                    <div class="what"><div class="title">Closing Day Two</div></div>
                </div>
                <div class="location">Main Lobby</div>
                <div class="show-item">       
                    <div class="when">18:30</div>
                    <div class="what"><div class="title"><i class="fas fa-utensils"></i> <a href="/2025/meals">Dinner</a></div></div>
                </div>
                <div class="show-item">       
                    <div class="when">19:30</div>
                    <div class="what"><div class="title"><i class="fas fa-party-horn"></i> Closing Party by <img src="/_public/images/sponsors/cloudflare.png"/></div></div>
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
                <div class="location">Forum</div>
                ${ renderSpeaker("11:00", talks.find(t => t.speaker.slug === 'erik-hanchett'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'will-klein'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'chris-griffing'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'ryan-roemer'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'justin-rastelli'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'melkeydev'))}
                ${ renderSpeaker("13:40", talks.find(t => t.speaker.slug === 'brittany-ellich'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'anthony-dellavecchia'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'amber-hoak'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'kevin-dela-rosa'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'isabela-mclenachen'))}
                ${ renderSpeaker("", talks.find(t => t.speaker.slug === 'andy-luly'))}
        </div>
    </div>

`
}

function Sept20() {
    return /*html*/`
    <div id="day-training" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Post-Conf<br/>Activity Day<br/>Sept 20
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="day-content">
            <div class="show track">   
                <div class="location">Miller Park Tennis & Pickleball Courts</div>
                <div class="show-item"> 
                    <div class="when">10am - noon</div>
                    <div class="what">
                        <div class="title"><a href="https://luma.com/bxkvqs60" target="_blank">Pickle Ball</a> <i class="fa-solid fa-pickleball"></i></a> led by Lantz Warrick</div>
                    </div>
                </div>
                <div class="location">Thinkspace Seattle</div>
                <div class="show-item"> 
                    <div class="when">9am - 11pm</div>
                    <div class="what">
                        <div class="title"><a href="https://lu.ma/yu2ccnvr" target="_blank">Cascadia AI Hackathon</a></div>
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
            margin-bottom: 64px;
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
