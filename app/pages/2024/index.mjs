export default function ({ html, state }) {
  let { store } = state
  let { sharing } = store
  if (sharing.social !== undefined) {
    const { image, title, description } = sharing
    return html`<social-sharing image="${ image }" title="${ title }" description="${ description }"></social-sharing>`
  }
  else {
    return html`
      <style>
        #features-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        .feature {
          text-align: center;
          margin: 24px;
          flex: 1;
          min-width: 300px;
          max-width: 400px;
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
              <div class="label-value">June 19-22, 2024</div>
              <br/>
              <div class="label-name">Venue</div>
              <div class="label-value">Town Hall<br/>Seattle, WA, USA</div>
              <br/>
              <p>
                CascadiaJS 2024 is coming BACK to Seattle, WA and will run from June
                19 - 22. We'll host a Welcome Reception on June 19, have 2 days of
                talks and workshops on June 20 and 21 and get out and about the
                Seattle area for a day of activities on June 22!
                <!--br /><br />
                Our CFP is OPEN, please
                consider <a href="/2024/cfp">submitting a talk</a>.
                Every developer has a story to tell, and we want to hear yours!-->
              </p>
              <div class="cta primary"><a href="/2024/tickets">Regular Bird tickets on sale now</a></div>
            </article>
            <article>
              <img src="/_public/images/sasquatch.gif" alt="Sasquatch having ChatGPT write his code for him while chilling on a beach"/>
            </article>
          </section>
          <section id="speakers" class="landing">
            <h1>Our Speakers</h1>
            <talks-grid></talks-grid>
          </section>
          <section id="features" class="landing">
            <h1>Features</h1>
            <div id="features-container">
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2024/features/venue.gif"
                    alt="illustration of Sunriver Resort"
                  />
                </div>
                <h2>Town Hall</h2>
                <p>
                  Town Hall Seattle is a landmark historic building located within
                  walking distance of Downtown and Capitol Hill. It's where we
                  held CascadiaJS in 2019 and we can't wait to be back!
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2024/features/talks.gif"
                    alt="illustration of a microphone"
                  />
                </div>
                <h2>20+ Awesome Speakers</h2>
                <p>
                  We are being joined by a wonderful line-up of speakers covering
                  everything from the latest in the web/JS to building with AI.
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2024/features/workshops.gif"
                    alt="illustration of merit badge"
                  />
                </div>
                <h2>Hands-on Workshops</h2>
                <p>
                  Running parallel to the talks, there will be hands-on workshops
                  to choose from if you care to roll-up your sleeves and do some
                  coding.
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2024/features/allinclusive.gif"
                    alt="illustration of a meal"
                  />
                </div>
                <h2>All Inclusive</h2>
                <p>
                  Your ticket includes a Welcome Reception, 3 meals a day for 2
                  days and 2 awesome parties!
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2024/features/a11y.gif"
                    alt="illustration of a welcome mat"
                  />
                </div>
                <h2>Accessibility</h2>
                <p>
                In order to build an inclusive community for web developers we work hard to make our event as accessible as possible. Stay tuned for more info on this!
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2024/features/activities.gif"
                    alt="illustration of a pickleball racquet"
                  />
                </div>
                <h2>Outdoor Activities</h2>
                <p>
                  On the Saturday after the conference, we're going to organize
                  some activities so that folks can explore the Seattle area, get
                  some fresh air and have some fun!
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2024/features/jobfair.gif"
                    alt="illustration of a Help Wanted sign"
                  />
                </div>
                <h2>Job Fair</h2>
                <p>
                  After the talks and workshops on Day One, we are hosting a Job
                  Fair to connect folks to great companies that are hiring!
                </p>
              </div>
              <div class="feature">
                <div>
                  <img
                    src="/_public/images/2024/features/startup.gif"
                    alt="illustration of a unicorn"
                  />
                </div>
                <h2>Startup Fair</h2>
                <p>
                  After the talks and workshops on Day Two, we are hosting a
                  Startup Fair to showcase exciting, new developer and AI tools!
                </p>
              </div>
            </div>
          </section>
          <section id="organizers" class="landing">
            <h1>Organizers and Volunteers</h1>
            <organizers-grid></organizers-grid>
          </section>
        </div></main-layout
      >`;
  }
}