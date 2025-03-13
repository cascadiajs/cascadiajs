export default function ({ html, state }) {
  let { store } = state
  let { sharing } = store
  if (sharing.social !== undefined) {
    const { image, title, description } = sharing
    return html`<social-sharing image="${image}" title="${title}" description="${description}"></social-sharing>`
  }
  else {
    return html`
      <style>
        #features-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);;
            grid-template-rows: repeat(3, 1fr);;
            gap: 32px;
        }

        .feature img{
          max-width: 250px;
        }

        #hero {
          text-align: left;
        }

        #hero .label-name {
          font-family: mono45-headline;
          font-size: 18px;
          text-decoration: underline;
          color: #112378;
          margin: 0;
        }

        #hero .label-value {
          font-family: freight-macro-pro;
          font-size: 24px;
          color: #112378;
          font-weight: 400;
          line-height: 1.3em;
        }

        #attendee-list {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: center;
        }

        #attendee-list img {
            display: block;
            margin: 8px;
            height: 100px;
        }

        @media only screen and (min-width: 768px) {
          #hero {
            display: flex;
            max-width: 1000px;
            margin: 0 auto;
          }

          #hero article {
            flex: 1;
          }

          #hero article:first-child {
            margin-right: 16px;
          }
        }
      </style>
      <main-layout>
        <div id="landing">
          <section id="hero" class="landing">
            <article>
              <h2>A JavaScript conference for the Pacific Northwest</h2>
              <br/>
              <div class="label-name">Date</div>
              <div class="label-value">Sept 17-20, 2025</div>
              <br/>
              <div class="label-name">Venue</div>
              <div class="label-value">Town Hall<br/>Seattle, WA, USA</div>
              <br/>
              <p>
                CascadiaJS 2025 is coming BACK to Seattle, WA and will run from Sept
                17 - 20. We'll host a Welcome Reception on Sept 17, have 2 days of
                talks on Sept 18 and 19 and get out and about the
                Seattle area for a day of activities on Sept 20!
              </p>
              <div class="cta primary"><a href="/2025/tickets">Tickets On Sale!</a></div>
            </article>
            <article>
              <img src="/_public/images/2025/hero-camper.png" alt="Sasquatch driving a camper van"/>
            </article>
          </section>
          <section id="speakers" class="landing">
            <h1>Speakers</h1>
            <talks-grid></talks-grid>
            <div class="cta"><a href="/2025/cfp">Apply to Speak</a></div>
          </section>
          <section id="features" class="landing">
            <h1>Features</h1>
            <div id="features-container">
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2025/features/venue.gif"
                    alt="illustration of Town Hall"
                  />
                </div>
                <h2>Town Hall</h2>
                <p>
                  Our venue is a beautiful historic building located within walking distance of downtown, Capitol Hill, and several light rail stops.
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2025/features/talks.gif"
                    alt="illustration of a microphone"
                  />
                </div>
                <h2>30+ Awesome Speakers</h2>
                <p>
                  You’ll hear from a diverse lineup of speakers covering everything from the latest in web and JavaScript to the interaction of web technologies and AI.
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2025/features/community.gif"
                    alt="illustration of friends hanging out"
                  />
                </div>
                <h2>Hallway Track</h2>
                <p>
                  Take advantage of breaks, meals, evening events and organized ice breakers to meet people, connect and grow your network!
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2025/features/allinclusive.gif"
                    alt="illustration of a meal"
                  />
                </div>
                <h2>All-inclusive</h2>
                <p>
                Your full conference ticket includes a welcome reception, 2 days of light breakfast & lunch, all day coffee, and a closing party with dinner. 
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2025/features/a11y.gif"
                    alt="illustration of a welcome mat"
                  />
                </div>
                <h2>Accessibility</h2>
                <p>
                  From our Scholarship Program to hosting CascadiaJS in an accessible venue, our goal is to make this event available to as many people as possible and build an inclusive community for web developers.
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2025/features/companies.gif"
                    alt="illustration of a welcome mat"
                  />
                </div>
                <h2>Top Web + AI Companies</h2>
                <p>
                  Our Expo Hall will be filled with many of the top companies building tools in the web and AI space. Stay tuned for more updates on who will be exhibiting this year!
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2025/features/hackertrain.gif"
                    alt="illustration of a laptop with stickers"
                  />
                </div>
                <h2>Hacker Train</h2>
                <p>
                  If you live in Portland, OR or Vancouver, BC there is no better way to get to CascadiaJS than to join your fellow devs on the Hacker Train. Ditch the car, make some friends and fork repos on the train Wi-Fi as you head to Seattle.
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2025/features/karaoke.gif"
                    alt="illustration of inside the train"
                  />
                </div>
                <h2>Karaoke</h2>
                <p>
                We’re continuing our annual tradition of closing out the conference with an epic night of karaoke, and we’ve hired one of the PNW’s best karaoke DJs to help us do it. Don’t miss it!
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2025/features/activities.gif"
                    alt="illustration of a karaoke screen"
                  />
                </div>
                <h2>Outdoor Activities</h2>
                <p>
                  On the Saturday after the conference, we're going to organize
                  some activities so that folks can explore the Seattle area, get
                  some fresh air and have some fun!
                </p>
              </div>
            </div>
          </section>
          <section id="organizers" class="landing">
          <h1>Organizers and Volunteers</h1>
            <organizers-grid></organizers-grid>
          </section>
        </div>
      </main-layout>`;
  }
}
