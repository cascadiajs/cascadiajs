export default function ({ html, state }) {
  let { store } = state;
  let { sharing } = store;
  if (sharing.social !== undefined) {
    const { image, title, description } = sharing;
    return html`<social-sharing
      image="${image}"
      title="${title}"
      description="${description}"
    ></social-sharing>`;
  } else {
    return html`<style>
        #landing h2 {
            margin-top: 40px;
            margin-bottom: 40px;
        }

        #hero {
          text-align: left;
        }

        nav {
          background-color: #17c37b;
          padding: 10px;
          font-family: "mono45-headline", monospace;
          font-size: 21px;
          font-weight: 500;
        }

        nav > div > div {
          margin-bottom: 8px;
        }

        nav a,
        nav a:visited {
          color: #112378;
          text-decoration: none;
        }

        nav a:hover {
          text-decoration: underline;
        }

        #features {
          background-color: #ccf1db;
        }

        .feature-container div {
          padding: 16px 16px 0 16px;
        }

        #ticket-container {
          text-align: left;
          color: #112378;
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

        #pitch {
          background: #ccf1db;
          text-align: center;
          padding: 64px 64px;
        }

        #pitch p,
        .prompt {
          color: #112378;
          font-size: 24px;
          line-height: 1.5em;
          font-family: freight-macro-pro;
          font-weight: 400;
        }

        .attendee {
          position: relative;
          display: inline-block;
          cursor: pointer;
        }

        .attendee .attendee-name {
          visibility: hidden;
          background-color: rgb(23, 195, 123);
          color: white;
          text-align: center;
          padding: 5px 8px;
          border-radius: 4px;

          /* Position the tooltip */
          position: absolute;
          bottom: 50%;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;

          /* Smooth fade */
          opacity: 0;
          transition: opacity 0.3s;
        }

        .attendee:hover .attendee-name {
          visibility: visible;
          opacity: 1;
        }

        #hero-container {
          position: relative;
        }

        .video-container::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
        }

        .video-overlay {
          position: absolute;
          top: 3vw;
          left: 3vw;
          color: white;
        }

        .video-overlay div img {
          width: 20%;
        }

        .video-overlay h2 {
          color: #fff;
          font-family: freight-macro-pro;
          width: 50%;
          font-size: clamp(16px, 5vw, 60px);
          margin: 0;
        }

        .video-overlay p {
          color: #fff;
          width: 50%;
          font-size: clamp(8px, 2vw, 24px);
        }

        .video-overlay .date-location {
          font-family: freight-macro-pro;
          width: 50%;
          font-size: clamp(10px, 3vw, 32px);
          line-height: 1.125;
        }

        .video-overlay .reserve-your-spot {
          display: none;
        }

        #pricing {
          color: #112378;
        }

        #pricing .ticket {
          border: 2px solid #112378;
          width: 300px;
          min-width: 300px;
          padding: 22px 12px;
          margin: 8px;
        }

        #pricing .ticket .name {
          font-family: freight-macro-pro;
          font-weight: 600;
          font-size: 30px;
        }

        #pricing .ticket .sub {
          margin: 8px 0;
          display: flex;
        }

        #pricing .ticket .sub .label {
          font-family: freight-macro-pro;
          font-weight: 100;
          font-style: italic;
          font-size: 24px;
          margin-right: 8px;
        }

        #pricing .ticket .sub .divider {
          flex: 1;
          border-bottom: 2px solid #112378;
        }

        #pricing .ticket .price {
          font-size: 64px;
          font-weight: 500;
          font-family: freight-sans-pro, sans-serif;
          margin: 32px 0;
        }

        #pricing .ticket .until {
          font-size: 18px;
          font-weight: 600;
        }

        #pricing .ticket .description {
          margin-top: 16px;
          font-size: 18px;
        }

        #pricing .ticket .description ul {
          padding-left: 16px;
          margin-top: 0;
        }

        @media only screen and (min-width: 768px) {
          #nav {
            position: sticky;
            top: 0;
            z-index: 1000;
          }

          nav > div {
            display: flex;
            align-items: center;
            margin: 0 auto;
            justify-content: center;
          }

          #nav-logo {
            padding-top: 2px;
          }

          nav > div > div {
            margin-right: 40px;
          }

          a.logo {
            margin-bottom: 0;
          }

          .video-overlay .reserve-your-spot {
            display: block;
            width: 100%;
            text-align: center;
          }

          .video-overlay .reserve-your-spot a,
          .video-overlay .reserve-your-spot a:visited {
            text-decoration: none;
          }

          .feature-container {
            width: 100%;
            display: flex;
          }

          .feature-container div:first-child {
            padding: 16px 0 0 16px;
          }

          .feature-container div:nth-child(2) {
            padding: 16px 16px 0 16px;
          }

          #ticket-container {
            display: flex;
            margin: 16px auto;
            justify-content: center;
          }

          #pitch {
            padding: 64px 160px;
          }
        }
      </style>
      <layout-2026>
        <div id="landing">
          <section id="hero">
            <div id="hero-container">
              <div class="video-container">
                <iframe
                  src="https://customer-err733fa36e0jnfx.cloudflarestream.com/a439eea2d251499f21c9388ebc2d5370/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-err733fa36e0jnfx.cloudflarestream.com%2Fa439eea2d251499f21c9388ebc2d5370%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
                  loading="lazy"
                  style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowfullscreen="true"
                ></iframe>
              </div>
              <div class="video-overlay">
                <div>
                  <img
                    src="/_public/images/2026/lockup-horizontal-webai-white.png"
                    alt="CascadiaJS 2026 Web + AI conference"
                  />
                </div>
                <h2>A Web + AI conference for the Pacific Northwest</h2>
                <p>
                  CascadiaJS is a community-driven conference for developers in
                  the PNW and beyond. You will hear from amazing speakers,
                  connect with 500+ fellow devs, and explore the latest in web
                  and AI technologies with some of the top companies in the
                  industry.
                </p>
                <p class="date-location">
                  June 1-2, 2026<br />Seattle, WA, USA
                </p>
                <div class="reserve-your-spot">
                  <a class="buy" href="/2026/tickets"
                    >Reserve Your Spot <i class="fa-solid fa-tree"></i
                  ></a>
                </div>
              </div>
            </div>
          </section>
          <section id="nav">
            <nav>
              <div>
                <div id="nav-logo">
                  <a href="/2026"
                    ><img
                      height="64"
                      src="/_public/images/icon-dark-blue.png"
                      alt="CascadiaJS logo"
                  /></a>
                </div>
                <div><a href="#pricing">Pricing</a></div>
                <div><a href="#speakers">Speakers</a></div>
                <div><a href="/2026/trainings">Training</a></div>
                <div><a class="buy" href="/2026/tickets">Tickets</a></div>
              </div>
            </nav>
          </section>
          <section id="features">
            <div class="feature-container">
              <div>
                <img
                  src="/_public/images/2026/feature-01.png"
                  alt="Feature: Amazing Speakers"
                />
              </div>
              <div>
                <img
                  src="/_public/images/2026/feature-02.png"
                  alt="Feature: Cutting-Edge Content"
                />
              </div>
            </div>
            <div class="feature-container">
              <div>
                <img
                  src="/_public/images/2026/feature-03.png"
                  alt="Feature: Incredible Community"
                />
              </div>
              <div>
                <img
                  src="/_public/images/2026/feature-04.png"
                  alt="Feature: Beautiful Venue"
                />
              </div>
            </div>
          </section>
          <section id="pitch">
            <p>
              <strong>CascadiaJS</strong> is an annual reunion of
              <strong>web developers</strong> in the
              <strong>Pacific Northwest</strong> and beyond, where
              <strong>friends</strong> new and old meet to celebrate our unique
              community, share knowledge and explore ideas on the cutting edge
              of the <strong>web, JavaScript and AI</strong>.
            </p>
            <p>
              We are a conference <strong>for devs by devs</strong>. You'll hear
              technical talks from <strong>top engineers</strong>, get connected
              to <strong>industry-leading companies</strong> and discuss what
              you've learned during our hallway track with
              <strong>500+ other</strong> attendees.
            </p>
            <p>
              This is an event designed to help you
              <strong>level up</strong> your skills,
              <strong>build your network</strong> and
              <strong>have fun</strong> for a few days in the
              <strong>beautiful PNW</strong>.
            </p>
          </section>
          <section id="pricing" class="landing">
            <h1>Pricing</h1>
            <div id="ticket-container">
              <div class="ticket">
                <div class="name">Conference Premium</div>
                <div class="sub">
                  &nbsp;
                  <div class="divider"></div>
                </div>
                <div class="price">$699</div>
                <div class="until">Until May 10, 2026</div>
                <div class="description">
                  <strong>Includes:</strong>
                  <ul>
                    <li>Access to all talks</li>
                    <li>Access to all workshops</li>
                    <li>Conference hoodie *</li>
                    <li>Meals Pass</li>
                    <li>
                      Priority access to all networking events &amp;parties
                    </li>
                    <li>+1 for the Closing Party</li>
                  </ul>
                  <p>* If registered by April 20, 2026</p>
                </div>
              </div>
              <div class="ticket">
                <div class="name">Conference Premium</div>
                <div class="sub">
                  <div class="label">Indie Discount</div>
                  <div class="divider"></div>
                </div>
                <div class="price">$499</div>
                <div class="until">Until May 10, 2026</div>
                <div class="description">
                  <strong>Includes:</strong>
                  <ul>
                    <li>Access to all talks</li>
                    <li>Access to all workshops</li>
                    <li>Conference hoodie *</li>
                    <li>Meals Pass</li>
                    <li>
                      Priority access to all networking events &amp; parties
                    </li>
                    <li>+1 for the Closing Party</li>
                  </ul>
                  <p>
                    Must be between jobs, self-employed, work for a educational
                    institution , work for a non-profit organization or company
                    with fewer than 10 employees
                  </p>
                </div>
              </div>
              <div class="ticket">
                <div class="name">General Admission</div>
                <div class="sub">
                  &nbsp;
                  <div class="divider"></div>
                </div>
                <div class="price">$299</div>
                <div class="until">&nbsp;</div>
                <div class="description">
                  <strong>Includes:</strong>
                  <ul>
                    <li>Access to all talks</li>
                    <li>Access to all workshops</li>
                    <li>Access to all networking events &amp; parties</li>
                  </ul>
                </div>
              </div>
              <div class="ticket">
                <div class="name">Student</div>
                <div class="sub">
                  &nbsp;
                  <div class="divider"></div>
                </div>
                <div class="price">$99</div>
                <div class="until">&nbsp;</div>
                <div class="description">
                  <strong>Includes:</strong>
                  <ul>
                    <li>Access to all talks</li>
                    <li>Access to all workshops</li>
                    <li>Access to all networking events &amp; parties</li>
                  </ul>
                  <p>Must be a student who is not working in tech full-time.</p>
                  <p>Must be 21 to attend Closing Party.</p>
                </div>
              </div>
            </div>
          </section>
          <section id="speakers" class="landing">
            <h1>Keynotes</h1>
            <talks-grid type="keynote"></talks-grid>
            <h1>Speakers</h1>
            <talks-grid type="main,lightning"></talks-grid>
          </section>
        </div>
      </layout-2026>`;
  }
}
