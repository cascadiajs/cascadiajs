export default function ({ html }) {
  return html`
    <style>


      article {
        padding: 8px;
      }

      b {
        font-weight: 700;
      }

      .divider {
        border-top: 4px solid #17c37b;
      }

      .packages {
        border-collapse: collapse;
        width: 100%;
      }

      .packages td, .packages th {
        text-align: center;
        color: #112378;
        padding: 8px
      }

      .packages thead {
        background-color: #ccf1db;
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

      @media only screen and (min-width: 768px) {
        article {
          padding: 24px 128px;
          margin: 0 auto;
        }
      }

    </style>
    <minimal-layout>
      <article>
        <h1>A Web + AI conference for the Pacific Northwest</h1>
        <p>Since 2012, we've been bringing together hundreds of developers to help them level up their skills, grow their network and have fun. We're excited to present our 13th annual conference, which will be held at Town Hall, a vibrant gathering place in the heart of Seattle, WA.</p>
        <p>Please email us at info@cascadiajs.com or <a target="_blank" href="https://calendly.com/carrie-cascadiajs/30min">book a time</a> to chat with us about sponsoring.</p>
        <h3>June 1-2, 2026<br/>Town Hall<br/>Seattle, WA</h3>
      </article>
      <div class="divider">
        <img src="/_public/images/2026/mushrooms.png"/>
      </div>
      <article>
        <h2>Event at a Glance</h2>
        <p><i class="fa-solid fa-stars"></i> Two-day developer conference <b>focused on web and AI technologies</b>.</p>
        <p><i class="fa-solid fa-stars"></i> <b>~600 attendees</b>, across a range of experience levels.</p>
        <p><i class="fa-solid fa-stars"></i> 40 talks from <b>industry experts</b> across 2 tracks.</p>
        <p><i class="fa-solid fa-stars"></i> 2025 sponsors included: <b>Google</b>, <b>IBM</b>, <b>Elastic</b>, <b>Cloudflare</b> and others.</p>
      </article>
      <div class="divider">
        <img src="/_public/images/past/cjs25-family.jpg"/>
      </div>
      <article>
        <h2>Sponsorship Packages</h2>
        <p><span class="highlight warning">Sponsorships are <b>20% off</b> until Dec 31, 2025!</span></p>
        <table class="packages">
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
              <td>Choose one:<br/><b>Booth</b>(8)<br/><b>Lightning Talk</b>(5)</td>
              <td>Choose one:<br/><b>Opening Mixer</b><br/><b>Workshop</b><br/><b>Lanyards</b><br/><b>Videos</b></td>
              <td>Choose one:<br/><b>Welcome Reception</b><br/><b>Karaoke</b><br/><b>Coffee</b><br/><b>Tote Bags</b><br/><b>Child Care</b><br/><b>Photo Booth</b><br/><b>ASL</b></td>
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
              <td><span style="text-decoration: line-through;">$40k</span> <b>$32k</b></td>
              <td><span style="text-decoration: line-through;">$30k</span> <b>$24k</b></td>
              <td><span style="text-decoration: line-through;">$20k</span> <b>$16k</b></td>
              <td><span style="text-decoration: line-through;">$8k</span> <b>$6400</b></td>
              <td>$5k</td>
              <td>$2500</td>
            <tr>
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
              <td><b>Stage takeover</b> to address the entire conference for 5 minutes</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colSpan="5">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Dedicated banner on stage</b> with your logo</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colSpan="5">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Custom newsletter message</b> to be sent out to our entire email list</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colSpan="4">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Superbooth</b>, an extra-large booth in our Expo Hall in a premium location</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colSpan="4">&nbsp;</td>
            </tr>
            <tr>
              <td><b>6-foot booth</b> with monitor</td>
              <td colspan="2">&nbsp;</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colSpan="3">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Main Stage speaker slot</b></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colSpan="4">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Lightning Stage speaker slot</b></td>
              <td colSpan="2">&nbsp;</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colSpan="3">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Custom email message</b> to be included in email to attendees</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colSpan="3">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Lead capture</b> provided for 2 members of your team</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colSpan="3">&nbsp;</td>
            </tr>
            <tr>
              <td><b>2-min video clip</b> to play during event</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colSpan="3">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Swag item included</b> in tote bag for all attendees</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colSpan="2">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Dedicated social media</b> posts leading up to and during the event</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colSpan="3">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Grouped social media</b> posts leading up to and during the event</td>
              <td colspan="3">&nbsp;</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
            </tr>
            <tr>
              <td><b>Dedicated webpage</b> on our website<br/>(<a href="/2024/sponsors/temporal" target="_blank">example</a>)</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colSpan="3">&nbsp;</td>
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
      </article>
      <twitter-love></twitter-love>
      <sponsors-grid></sponsors-grid>
    </minimal-layout>`;
}
