function renderSpeaker(time, speaker = {title: "Talk", name: ""}) {

    return /*html*/`
    <div class="show-item">
        <div class="when">${ time }</div>
        <div class="what">
            <div class="title"><a href="/speakers/${ speaker.key }">${ speaker.title }</a></div>
            <div class="speaker">${ speaker.name }</div>
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
            <p>Connect with folks at some of the top software companies in our industry.</p>
            <div class="sponsors">
                <div><img src="/_public/images/sponsors/datastax.svg" alt="DataStax logo"/></a></div>
                <div><img src="/_public/images/sponsors/codingscape.svg" alt="Codingscape logo"/></a></div>
                <div><img src="/_public/images/sponsors/stytch.svg" alt="Stytch logo"/></a></div>
                <div><img src="/_public/images/sponsors/temporal.svg" alt="Temporal logo"/></a></div>
            </div>
        </div>
    </div>
    <!--div class="location">Virtual</div>
    <div class="show-item">
        <div class="what">
            <div class="title">Walk Around</div>
            <p>Join us in a virtual space where you can watch the talks, meet new people and chat with our sponsors!</p>
            <p><img src="/images/gather-dancing.png"/></p>
            <div class="title">Video Selfie Booth</div>
            <p>Hop into the CascadiaJS Video Selfie Booth! Record yourself saying "hello", download the video clip, and share it in the Discord and on Twitter!</p>
            <div class="cta secondary"><a target="_booth" href="https://guestbook.mux.dev">Video Selfie Booth</a></div>
        </div>
    </div-->
    <div class="show-item">       
        <div class="what">
            <div class="title">Find Your Friends</div>
            <p>We're setting-up affinity tables for everything from "React.js" to "Vancouver, BC" so that you can easily find folks to hang out with!</p>
        </div>
    </div>
</div>
    `
}

function DayZero({ ticket = undefined }) {
    return /*html*/`
    <div id="day-zero" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Pre-Conf<br/>June 19
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">Location TBD</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">9am - 5pm</div>
                    <div class="what">
                        <div class="title">Training TBD</div>
                        <p>Stay tuned for a full-day training workshop!</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="location">The Collective</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">7pm - 9pm</div>
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

function DayOne({ speakers, ticket = undefined }) {
    return /*html*/`
    <div id="day-one" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Day One<br/>June 20
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
        <!--div class="location">Landmark</div>
        <div class="day-content">
            <div class="show-item">       
                <div class="when">08:30</div>
                <div class="what"><div class="title">Child Care by <img src="/images/sponsors/formidable.svg"/></div></div>
            </div>
        </div-->
        <div class="day-content">
            <div class="main track">   
                <h3>Talk Track</h3>
                <div class="location">Great Hall</div>
                <div class="show-item">       
                    <div class="when">09:00</div>
                    <div class="what"><div class="title">Opening Remarks</div></div>
                </div>
                ${ renderSpeaker("09:30")}
                ${ renderSpeaker("")}
                ${ renderSpeaker("")}
                <div class="show-item">       
                    <div class="when">11:00</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("11:30")}
                ${ renderSpeaker("")}
                ${ renderSpeaker("")}
                <div class="location">The Forum</div>
                <div class="show-item">       
                    <div class="when">12:20</div>
                    <div class="what"><div class="title"><i class="fas fa-taco"></i> Lunch</div></div>
                </div>
                <div class="location">Great Hall</div>
                ${ renderSpeaker("14:00")}
                ${ renderSpeaker("")}
                ${ renderSpeaker("")}
                <div class="show-item">       
                    <div class="when">15:30</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("16:00")}
                ${ renderSpeaker("")}
                ${ renderSpeaker("")}
                <div class="show-item">       
                    <div class="when">17:30</div>
                    <div class="what"><div class="title"><i class="fas fa-masks-theater"></i> Wait, Wait, Don't Transpile Me!</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">18:00</div>
                    <div class="what"><div class="title">Closing Day One</div></div>
                </div>
                <div class="location">The Forum</div>
                <div class="show-item">       
                    <div class="when">18:30</div>
                    <div class="what"><div class="title"><i class="fas fa-burger"></i> Dinner</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">19:30</div>
                    <div class="what"><div class="title"><i class="fas fa-handshake"></i> Job Fair and Social</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">22:00</div>
                    <div class="what"><div class="title"><i class="fas fa-door-closed"></i> Day One Close</div></div>
                </div>
            </div>

            ${ hallwayTrack({ticket})}

            <div class="workshop track">
                <h3>Workshop Track</h3>
                <div class="location">The Forum</div>
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what">
                        <div class="title">Workshop #1</div>
                        <div class="speaker">
                        </div>
                    </div>
                </div>
                <div class="show-item">       
                    <div class="when">13:30</div>
                    <div class="what">
                        <div class="title">Workshop #2</div>
                        <div class="speaker">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
}

function DayTwo({ speakers, ticket = undefined }) {
    return /*html*/`
    <div id="day-two" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Day Two<br/>June 21
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">Town Hall</div>
        <div class="day-content">
            <div class="main track">   
                <h3>Talk Track</h3>
                <div class="location">Great Hall</div>
                <div class="show-item">       
                    <div class="when">09:00</div>
                    <div class="what"><div class="title">Opening Remarks</div></div>
                </div>
                ${ renderSpeaker("09:30")}
                ${ renderSpeaker("")}
                ${ renderSpeaker("")}
                <div class="show-item">       
                    <div class="when">11:00</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("11:30")}
                ${ renderSpeaker("")}
                ${ renderSpeaker("")}
                <div class="location">The Forum</div>
                <div class="show-item">       
                    <div class="when">12:20</div>
                    <div class="what"><div class="title"><i class="fas fa-taco"></i> Lunch</div></div>
                </div>
                <div class="location">Great Hall</div>
                ${ renderSpeaker("14:00")}
                ${ renderSpeaker("")}
                ${ renderSpeaker("")}
                <div class="show-item">       
                    <div class="when">15:30</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("16:30")}
                ${ renderSpeaker("")}
                ${ renderSpeaker("")}
                <div class="show-item">       
                    <div class="when">18:00</div>
                    <div class="what"><div class="title">Closing Day Two</div></div>
                </div>
                <div class="location">The Forum</div>
                <div class="show-item">       
                    <div class="when">18:30</div>
                    <div class="what"><div class="title"><i class="fas fa-burger"></i> Dinner</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">19:30</div>
                    <div class="what"><div class="title"><i class="fas fa-handshake"></i> Startup Fair and Social</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">20:00</div>
                    <div class="what"><div class="title"><i class="fas fa-microphone-stand"></i> Karaoke</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">23:00</div>
                    <div class="what"><div class="title"><i class="fas fa-door-closed"></i> Day Two Close</div></div>
                </div>
            </div>


            ${ hallwayTrack({ticket})}

            <div class="workshop track">
                <h3>Workshop Track</h3>
                <div class="location">The Forum</div>
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what">
                        <div class="title">Workshop #3</div>
                        <div class="speaker">
                        </div>
                    </div>
                </div>
                <div class="show-item">       
                    <div class="when">13:30</div>
                    <div class="what">
                        <div class="title">Workshop #4</div>
                        <div class="speaker">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

`
}

function TrainingDays() {
    return /*html*/`
    <div id="day-training" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Pre-Conf<br/>June 19
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="day-content">
            <div class="show track">   
                <div class="location">Heritage 1</div>
                <div class="show-item"> 
                    <div class="when">9am - 4pm</div>
                    <div class="what">
                        <div class="training title"><a href="/trainings/data-structures">Demystifying Data Structures</a></div>
                    </div>
                </div>
                <div class="location">Heritage 2</div>
                <div class="show-item"> 
                    <div class="when">9am - 4pm</div>
                    <div class="what">
                        <div class="training title"><a href="/trainings/nextjs">Full-Stack Next.js Monorepo for Production Ready React+TypeScript Apps</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
}

function ActivityDay() {
    return /*html*/`
    <div id="day-training" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Post-Conf Activity Day<br/>June 22
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="day-content">
            <div class="show track">   
                <div class="location">Downtown</div>
                <div class="show-item"> 
                    <div class="when">10am - noon</div>
                    <div class="what">
                        <div class="title">5K Sculpture Garden Fun Run</div>
                    </div>
                </div>
                <div class="location">Seattle Center</div>
                <div class="show-item"> 
                    <div class="when">10am - noon</div>
                    <div class="what">
                        <div class="title">Group Visit to the Space Needle</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
}

export default function ({ html, state }) {
    let { store } = state
    let { sharing, speakers, ticket } = store
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
                ${ DayZero({ ticket }) }
                ${ DayOne({ speakers, ticket }) }
                ${ DayTwo({ speakers, ticket }) }
                ${ ActivityDay() }
                </div>
            </simple-page>
        </main-layout>
      `
    }
}
