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

      .hero, .details, .packages {
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

      #packages-table {
        max-width: 1200px;
        margin: 0 auto;   
      }

      .packages table {
        table-layout: fixed;
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

      h2 {
          margin-top: 8px;
      }

 
      .container {
        display: flex;
      }

      .container .left {
        width: 50%;
        margin-right: 16px;
      }

     .container .right {
        width: 50%;
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
          <img
              height="100"
              src="/_public/images/icon-dark-blue.png"
              alt="CascadiaJS logo"
          />
        </div>
        <h1>CascadiaJS 2026 Sponsorship Brochure</h1>
        <h2>The Pacific Northwest’s Web + AI Developer Conference</h2>
        <article class="narrow">
              Since 2012, we've been bringing together hundreds of developers to
              help them level up their skills, grow their network and have fun.
              We're excited to present our 13th annual conference, which will be
              held at Town Hall, a vibrant gathering place in the heart of Seattle,
              WA.
        </article>
        <article class="center">
          <div class="cta" style="margin-right: 16px;"><a href="https://calendly.com/elise-worthy">Book a time to talk</a></div>
          <div class="cta secondary"><a href="#event-at-a-glance">Learn more 👇</a></div>
        </article>

        <article class="center">
          <img src="/_public/images/2026/sponsor-brochure/hero.jpg">
        </article>


         <!-- <article id="event-at-a-glance" class="narrow center">
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
        -->

          <article class="narrow" id="event-at-a-glance">
          <h2>What It Is</h2>
          <p><strong>CascadiaJS 2026</strong> is a two-day, <em>highly technical conference</em> for web developers and engineers working with JavaScript, modern frontend frameworks, and AI-powered workflows. Held June 1–2 in Seattle, WA at Town Hall, CascadiaJS brings together <strong>600+ developers</strong>, many of whom influence tooling, platform, and product decisions at their companies.</p> 

          <p>You’ll see <strong>20 expert talks</strong> across two deep-dive tracks covering web, JavaScript, and AI topics, plus structured, low-pressure networking opportunities that help companies build relationships with engineers in a technically focused, community-centric setting.</p> 

          <p><strong>Past sponsors</strong> include top web and developer brands such as Google, IBM, Elastic, Cloudflare, and many more — a testament to the value of connecting with this audience.</p> 
          </article>

          <article class="narrow center">
              <h2>Who Attends</h2>
              <p>
                <i class="fa-solid fa-stars"></i> 600+ attendees.
              </p>
              <p>
                <i class="fa-solid fa-stars"></i> Frontend, full-stack, and platform engineers
              </p>
              <p>
                <i class="fa-solid fa-stars"></i> Strong senior & decision-influencer representation
              </p>
              <p>
                <i class="fa-solid fa-stars"></i> Pacific Northwest–heavy audience
              </p>

              <p>
                <i class="fa-solid fa-stars"></i> Mix of active and passive job seekers
              </p>

              <p>
                <i class="fa-solid fa-stars"></i> High interest in modern web & AI tooling
              </p>  
            </article>

          <h2>Why Sponsor</h2>
          <article class="narrow">
          <p>CascadiaJS isn’t just a gathering of developers — it’s where technical minds and decision-makers come together  each year. Sponsorship gives your organization visibility with developers who shape technology direction. Whether you’re driving tool adoption, building product awareness, hiring talent, or supporting the JavaScript ecosystem in the Pacific Northwest, CascadiaJS provides tailored opportunities to meet your goals.</p>

          <h3>For Developer Tools & Platforms</h3>

          <p>Reach developers who influence technical decisions and adopt new tools early. CascadiaJS puts your product in front of a highly technical, curious audience in a trusted, community-driven setting where learning and experimentation are already happening. Build mindshare, grow adoption, and earn credibility with developers who care deeply about how software is built.</p>

          <h3>For Recruiting & Employer Brand</h3>

          <p>Connect with JavaScript engineers at multiple stages of their career journey — from developers actively exploring new roles to those quietly forming opinions about where they want to work next. CascadiaJS helps you build employer brand awareness with engineers in a space grounded in trust and technical excellence, keeping you visible both for current hiring needs and future opportunities.</p>

          <h3>For AI, Cloud & Infrastructure</h3>

          <p>Engage developers building at the intersection of JavaScript, AI, and modern infrastructure. CascadiaJS attracts frontend and full-stack engineers who increasingly influence platform and tooling decisions. Sponsorship positions your company as a forward-thinking partner in the future of the web.</p>

          <h3>To Give Back</h3>

          <p>The Pacific Northwest JavaScript community is strong, collaborative, and values companies that show up with intention. Sponsoring CascadiaJS is a tangible way to support developer education, access, and long-term ecosystem growth across the JavaScript community.</p>

          <p>At CascadiaJS, sponsorship goes beyond logo placement — it’s about building real relationships with developers in a technically focused, community-driven environment.</p>
              
          </article>

          <h2>Sponsorship Options</h2>
          <article class="narrow">
          <p>Our sponsorship tiers offer a range of visibility and engagement options to support different goals and budgets, with increasing benefits at each level. Many sponsors start with a tier and customize from there to better align with their objectives.</p>
              
          <p><em>Not sure where to begin?</em> Most sponsors start at the Gold level and tailor their package as needed.</p>
              
          </article>
          <article class="center">
          <span class="highlight warning">Sponsorships are <b>20% off</b> until Feb 14, 2026!</span>
          </article>
          </div>
        </section>
        <section class="packages">
        <table id="packages-table">
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
            <!--<tr>
              <td><b>Options</b></td>
              <td><b>Venue</b></td>
              <td><b>Superbooth</b></td>
              <td>
                Choose one:<br /><b>Booth</b> (12)<br /><b>Lightning Talk</b> (3)
              </td>
              <td>
                Choose one:<br /><b>Opening Mixer</b><br /><b>Workshop</b
                > (3)<br /><b>Lanyards</b><br /><b>Videos</b>
              </td>
              <td>
                Choose one:<br /><b>Welcome Reception</b><br /><b>Karaoke</b
                ><br /><b>Coffee</b><br /><b>Tote Bags</b><br /><b>Child Care</b
                ><br /><b>Photo Booth</b><br /><b>ASL</b>
              </td>
              <td><b>Scholarships</b></td>
            </tr>-->
            <tr>
              <td><b>Quantity</b></td>
              <td>1</td>
              <td>1</td>
              <td><span class="strike">12</span> 9 left</td>
              <td>Multiple</td>
              <td>Multiple</td>
              <td>Unlimited</td>
            </tr>
            
            <tr>
              <td>
              <b>Main Stage Branding</b>
              </td>
              <td>Dedicated Main Stage Banner</td>
              <td colspan="5">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Main Stage Speaker Slot</b></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="4">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <b>Audience Address</b>
              </td>
              <td>Live mainstage takeover for 5 minutes</td>
              <td>2 minute video clip</td>
              <td>2 minute video clip</td>
              <td colspan="3">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <b>Custom Newsletter Message</b>
              </td>
              <td>To our entire email list (5,200+ people)</td>
              <td>To our entire email list (5,200+ people)</td>
              <td>To 2026 attendee email list (600 people)</td>
              <td colspan="3">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Booth</b></td>
              <td>Extra-large, prime location, monitor</td>
              <td>Extra-large, prime location, monitor</td>
              <td>6-foot with monitor</td>
              <td colspan="3">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Website Blurb</b></td>
              <td>Dedicated Sponsor Webpage</td>
              <td>Dedicated Sponsor Webpage</td>
              <td>Dedicated Sponsor Webpage</td>
              <td colspan="3">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Lead Capture</b> for 2 members of your team</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="3">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <b>Swag Item</b> to be placed in attendee bag
              </td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><i class="fa-solid fa-check"></i></td>
              <td colspan="2">&nbsp;</td>
            </tr>
            <tr>
              <td><b>Social Media Post</b> leading up to conference</td>
              <td>Dedicated</td>
              <td>Dedicated</td>
              <td>Dedicated</td>
              <td>Grouped</td>
              <td>Grouped</td>
              <td>Grouped</td>
            </tr>
            <tr>
              <td><b>Branding</b></td>
              <td>Logo on banners and website</td>
              <td>Logo on banners and website</td>
              <td>Logo on banners and website</td>
              <td>Logo on banners and website</td>
              <td>Logo on banners and website</td>
              <td>Logo on banners and website</td>
            </tr>
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
          </tbody>
        </table>
      </section>
      <section class="details">

          
        <div class="narrow">
          
          <h2 class="center">Sponsorship Add-Ons</h2>
          <p>In addition to our standard sponsorship tiers, CascadiaJS offers a set of optional add-ons that allow sponsors to increase visibility, create deeper engagement, or support specific community initiatives. Add-ons can be paired with any sponsorship level and are available on a first-come basis.</p>

          <h3>Workshop (3 Available)</h3>
          <p>A dedicated, hands-on workshop session where sponsors can teach a topic relevant to the CascadiaJS audience. Workshops offer deep engagement and are well suited for developer tools, platforms, and technical training.</p>

          <h3>Welcome Reception on May 31 (1 Available)</h3>
          <p>Branding and recognition at the social event that kicks off the conference. This option associates your brand with one of the highest-energy, most well-attended moments of the event.</p>

          <h3>Networking Mixer on June 1 (<span class="strikethrough">6</span> 5 left!)</h3>
          <p>Connect and have high quality conversations with some of the best talent in the Pacific Northwest. The mixer will take place right after the Day One talks conclude.</p>

          <h3>Karaoke on June 2 (1 Available)</h3>
          <p>Brand recognition at a fun, informal evening karaoke event popular with attendees. This add-on creates a memorable association between your brand and one of the conference’s most talked-about social experiences.</p>

          <h3>Coffee</h3>
          <p>Branding at conference coffee stations throughout the day. Coffee sponsorships provide high-frequency visibility and consistent foot traffic, making them one of the most effective brand placements at the event.</p>

          <h3>Lanyards</h3>
          <p>Logo placement on official attendee lanyards worn throughout the conference. This offers constant visibility during sessions, networking, and social events.</p>

          <h3>Tote Bags</h3>
          <p>Logo placement on the official CascadiaJS tote bags given to attendees. Tote bags extend brand visibility beyond the event as attendees continue using them after the conference.</p>

          <h3>Videos</h3>
          <p>Brand recognition in conference video recordings or video content distributed after the event. This option extends your reach beyond in-person attendees to the broader online audience.</p>

          <h3>Photo Booth (1 Available)</h3>
          <p>A branded photo booth experience for attendees, with photos available for sharing or download. This add-on encourages engagement and creates shareable moments associated with your brand.</p>

          <h3>Child Care</h3>
          <p>Recognition as the sponsor supporting on-site child care for attendees. This option demonstrates a commitment to accessibility and helps make the conference more inclusive for parents and caregivers.</p>

          <h3>ASL Interpretation</h3>
          <p>Recognition as the sponsor enabling ASL interpretation during conference sessions. This add-on directly supports accessibility and ensures more attendees can fully participate in the event.</p>
          
          <h3>Scholarships</h3>
          <p>Support for conference scholarships that help expand access to CascadiaJS. Scholarship sponsors are recognized for their contribution to community growth and attendee inclusion.</p>
          
          <div class="container">

            <!--  
            <div class="left">
                <h2>Stage Takeover</h2>
                <p>Get up on stage for 5 minutes to amplify your message to all in-person and livestream attendees.</p>
                <h2>Superbooth</h2>
                <p>You’ll have an extra-large booth in our Expo Hall in the most premium and visible location, the option to participate in a raffle to encourage attendees to visit your booth, and access to a lead capture app for everyone on your team.</p>
                <h2>Price</h2>
                <p><b>👉 20% off for a limited time. Save $1600!</b></p>
                <div class="cta secondary"><a href="#book-call">Interested? Let's Talk!</a></div>
            </div>
          -->

            <!--
            <div class="right">
                <p><img src="/_public/images/2026/sponsor-brochure/diamond.jpg"/></p>
            </div>
            -->
            

          </div>



          <h2 id="book-call" class="center">Let's Talk!</h2>
          <p>Book a time to talk to us about your sponsorship goals, or reach out to us directly on email at elise@cascadiajs.com.</p>
          <div class="cta secondary"><a href="https://calendly.com/elise-worthy">Book a time to talk</a></div>
        </section>
      <twitter-love></twitter-love>
      <sponsors-grid></sponsors-grid>
    </minimal-layout>`;
}
