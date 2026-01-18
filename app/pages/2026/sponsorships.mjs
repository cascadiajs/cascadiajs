export default function ({ html }) {
  return html` <style>
      nav {
        padding: 0;
        text-align: center;
        background-color: #17c37b;
        padding: 12px;
        font-family: mono45-headline;
        font-weight: 200;
        font-size: 18px;
        color: #112378;
        display: flex;
      }

      nav div {
        width: 33%;
      }

      .hero, .details {
        background-color: #ccf1db;
        padding:16px 0 16px 0;

      }

      .hero h1, .hero h2, .center {
        text-align: center;
      }

      .narrow {
        width: 50%;
        margin: 0 auto;
      }

      article {
        padding: 8px;
        line-height: 1.4em;
      }

      b {
        font-weight: 700;
      }

      .logo {
        text-align: center;
      }

      .packages {
        
      }

      .packages table {
        border-collapse: collapse;
        width: 100%;
      }

      .packages td,
      .packages th {
        text-align: center;
        color: #112378;
        padding: 8px;
      }

      .packages thead {
        background-color: #f0f0f0;
      }

      .packages th {
        font-family: mono45-headline;
        font-weight: 200;
        font-size: 24px;
      }

      .packages thead tr {
        border-bottom: 2px solid #112378;
      }

      .packages tbody tr {
        border-bottom: 1px dotted #333;
      }

      .packages tbody td:first-child {
        background-color: #f0f0f0;
        width: 150px;
      }

      .packages tbody {
        background-color: #fff;
      }

      .details h2 {
        margin:0;
      }

      .container {
        display: flex;
      }

      .container .left {
        width: 50%;
        margin-right: 16px;
      }

      @media only screen and (min-width: 768px) {
        article {
          padding: 24px 128px;
          margin: 0 auto;
        }
      }
    </style>
    <minimal-layout>
      <nav>
        <div>June 1-2, 2026</div>
        <div>cascadiajs.com/2026</div>
        <div>Seattle, WA, USA</div>
      </nav>
      <section class="hero">
        <div class="logo">
          <a href="/2026"
            ><img
              height="64"
              src="/_public/images/logo-wordmark-horizontal.svg"
              alt="CascadiaJS logo"
          /></a>
        </div>
        <h1>CascadiaJS 2026 Sponsorship Brochure</h1>
        <h2>A Web + AI conference for the Pacific Northwest</h2>
        <article class="narrow">
              Since 2012, we've been bringing together hundreds of developers to
              help them level up their skills, grow their network and have fun.
              We're excited to present our 13th annual conference, which will be
              held at Town Hall, a vibrant gathering place in the heart of Seattle,
              WA.
        </article>
        <article class="center">
          <div class="cta"><a href="">Learn more 👇</a></div>
        </article>

        <article class="center">
          <img src="/_public/images/2026/sponsor-brochure/hero.jpg">
        </article>
          <article class="narrow">
            <h2>Event at a Glance</h2>
            <p>
              <i class="fa-solid fa-stars"></i> Two-day developer conference
              <b>focused on web and AI technologies</b>.
            </p>
            <p>
              <i class="fa-solid fa-stars"></i> <b>~600 attendees</b>, across a
              range of experience levels.
            </p>
            <p>
              <i class="fa-solid fa-stars"></i> 30 talks from
              <b>industry experts</b> across 2 tracks.
            </p>
            <p>
              <i class="fa-solid fa-stars"></i> 2025 sponsors included:
              <b>Google</b>, <b>IBM</b>, <b>Elastic</b>, <b>Cloudflare</b> and
              others.
            </p>
          </article>
          <h2>Sponsorship Packages</h2>
          <article class="narrow">
          Sponsorships are broken down into tiers. No matter what your budget is, we have a sponsorship option for you! If you see some options that you’d like to mix and match, don’t hesitate to let us know. Below is a list of some of the benefits for each of the 6 tiers of sponsorship.
          </article>
          <article class="center">
          <span class="highlight warning">Sponsorships are <b>20% off</b> until Feb 14, 2026!</span>
          </article>
          </div>
        </section>
        <section class="packages">
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Diamond</th>
              <th>Platinum</th>
              <th>Gold</th>
              <th>Silver</th>
              <th>Bronze</th>
              <th>Community</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Options</b></td>
              <td><b>Venue</b></td>
              <td><b>Superbooth</b></td>
              <td>
                Choose one:<br /><b>Booth</b> (8)<br /><b>Lightning Talk</b> (5)
              </td>
              <td>
                Choose one:<br /><b>Opening Mixer</b><br /><b>Workshop</b
                ><br /><b>Lanyards</b><br /><b>Videos</b>
              </td>
              <td>
                Choose one:<br /><b>Welcome Reception</b><br /><b>Karaoke</b
                ><br /><b>Coffee</b><br /><b>Tote Bags</b><br /><b>Child Care</b
                ><br /><b>Photo Booth</b><br /><b>ASL</b>
              </td>
              <td><b>Scholarships</b></td>
            </tr>
            <tr>
              <td><b>Quantity</b></td>
              <td>1</td>
              <td>1</td>
              <td>13</td>
              <td>3</td>
              <td>7</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td><b>Price</b></td>
              <td>
                <span style="text-decoration: line-through;">$40k</span>
                <b>$32k</b>
              </td>
              <td>
                <span style="text-decoration: line-through;">$30k</span>
                <b>$24k</b>
              </td>
              <td>
                <span style="text-decoration: line-through;">$20k</span>
                <b>$16k</b>
              </td>
              <td>
                <span style="text-decoration: line-through;">$8k</span>
                <b>$6400</b>
              </td>
              <td>$5k</td>
              <td>$2500</td>
            </tr>

            <tr></tr>
            <tr>
              <td><b>Included Passes</b></td>
              <td>12</td>
              <td>10</td>
              <td>8</td>
              <td>4</td>
              <td>2</td>
              <td>1</td>
            </tr>
            <tr>
              <td><b>Discount on Additional Passes</b></td>
              <td>50%</td>
              <td>50%</td>
              <td>50%</td>
              <td>25%</td>
              <td>25%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>
                <b>Stage takeover</b> to address the entire conference for 5
                minutes
              </td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="5">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Dedicated banner on stage</b> with your logo</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="5">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <b>Custom newsletter message</b> to be sent out to our entire
                email list
              </td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="4">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <b>Superbooth</b>, an extra-large booth in our Expo Hall in a
                premium location
              </td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="4">&nbsp;</td>
            </tr>
            <tr>
              <td><b>6-foot booth</b> with monitor</td>
              <td colspan="2">&nbsp;</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="3">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Main Stage speaker slot</b></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="4">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Lightning Stage speaker slot</b></td>
              <td colspan="2">&nbsp;</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="3">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <b>Custom email message</b> to be included in email to attendees
              </td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="3">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Lead capture</b> provided for 2 members of your team</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="3">&nbsp;</td>
            </tr>
            <tr>
              <td><b>2-min video clip</b> to play during event</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="3">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Swag item included</b> in tote bag for all attendees</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="2">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <b>Dedicated social media</b> posts leading up to and during the
                event
              </td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="3">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <b>Grouped social media</b> posts leading up to and during the
                event
              </td>
              <td colspan="3">&nbsp;</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
            </tr>
            <tr>
              <td>
                <b>Dedicated webpage</b> on our website<br />(<a
                  href="/2024/sponsors/temporal"
                  target="_blank"
                  >example</a
                >)
              </td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="3">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Logo on website</b> and on-site banners</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
            </tr>
          </tbody>
        </table>
      </section>
      <section class="details">
        <div class="narrow">
          <h1>Diamond - Venue</h1>
          <p>Being the venue sponsor gives you maximum visability with a stage takeover, your logo prominently displayed on stage, an extra large booth in the most optimal location to encourage lots of visitors, and a speaker slot.</p>
          <div class="container">
            <div class="left">
                <h2>Stage Takeover</h2>
                <p>Get up on stage for 5 minutes to amplify your message to all in-person and livestream attendees.</p>
                <h2>Superbooth</h2>
                <p>You’ll have an extra-large booth in our Expo Hall in the most premium and visible location, the option to participate in a raffle to encourage attendees to visit your booth, and access to a lead capture app for everyone on your team.</p>
                <h2>Price</h2>
                <p><b>👉 20% off for a limited time. Save $1600!</b></p>
            </div>
            <div class="right">
                <p>image</p>
            </div>
          </div>
          <div class="cta secondary"><a href="#book-call">Interested? Let's Talk!</a></div>
          <h1 id="book-call">Let's Talk!</h1>
          <p>Book a time to talk to us about your sponsorship goals, or reach out to us directly on email at info@cascadiajs.com.</p>
          <div class="cta secondary"><a href="https://calendly.com/carrie-cascadiajs/30min">Book a time to talk</a></div>
        </section>
      <twitter-love></twitter-love>
      <sponsors-grid></sponsors-grid>
    </minimal-layout>`;
}
