export default function MainFooter({ html }) {
  return html`
    <style>
      footer {
        background-color: #112378;
        font-size: 14px;
        text-align: center;
        padding: 32px;
      }
      h2 {
        font-size: 16px;
        font-family: mono45-headline, sans-serif;
        font-weight: 500;
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin-bottom: 8px;
      }

      footer,
      footer h2,
      footer a,
      footer a:visited {
        color: #fff5cc;
      }

      footer a:hover {
        text-decoration: underline;
      }

      footer a,
      footer a:visited {
        text-decoration: none;
      }
      @media only screen and (min-width: 768px) {
        footer div {
          display: flex;
        }
        #stay-connected, #legal {
          margin-right: 40px;
        }
        #when-where,
        #stay-connected,
        #past-events,
        #legal,
        #media-kit {
          text-align: left;
        }
        #when-where {
          flex: 1;
        }
      }
    </style>
    <footer>
      <div class="wide">
        <section id="when-where">
          <h2>CascadiaJS - a Web + AI conf for the PNW</h2>
        </section>
        <section id="media-kit" class="push">
          <h2><a href="/media-kit">Media Kit</a></h2>
        </section>
        
        <section id="legal">
          <h2>Legal</h2>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/tos">Terms of Service</a></li>
            <li><a href="/cookies">Cookie Policy</a></li>
          </ul>
        </section>
        <section id="stay-connected" class="push">
          <h2>Stay Connected</h2>
          <ul>
            <li>
              <a target="_blank" href="https://discord.gg/kkYR86GM29"
                >Join our Discord</a
              >
            </li>
            <li>
              <a target="_blank" href="https://cascadiajs.com/mailing-list"
                >Sign-up for our Mailing List</a
              >
            </li>
            <li>
              <a target="_blank" href="https://bsky.app/profile/cascadiajs.com"
                >Follow us on Bluesky</a
              >
            </li>
            <li>
              <a
                target="_blank"
                href="https://github.com/cascadiajs/cascadiajs/"
                >Send us a PR on Github</a
              >
            </li>
            <li>
              <a target="_blank" href="https://www.youtube.com/user/cascadiajs"
                >Listen to our Past Talks</a
              >
            </li>
          </ul>
        </section>
        <section id="past-events">
          <h2>Past Events</h2>
          <ul>
            <li>
              <a target="_blank" href="/2024">2024</a>
            </li>
            <li>
              <a target="_blank" href="https://2022.cascadiajs.com">2022</a>
            </li>
            <li>
              <a target="_blank" href="https://2021.cascadiajs.com">2021</a>
            </li>
            <li>
              <a target="_blank" href="https://2020.cascadiajs.com">2020</a>
            </li>
            <li>
              <a target="_blank" href="https://2019.cascadiajs.com">2019</a>
            </li>
            <li>
              <a target="_blank" href="https://2018.cascadiajs.com">2018</a>
            </li>
            <li>
              <a target="_blank" href="https://2016.cascadiajs.com">2016</a>
            </li>
            <li>
              <a target="_blank" href="https://2015.cascadiajs.com">2015</a>
            </li>
            <li>
              <a target="_blank" href="https://2014.cascadiajs.com">2014</a>
            </li>
            <li>
              <a target="_blank" href="https://2013.cascadiajs.com">2013</a>
            </li>
            <li>
              <a target="_blank" href="https://2012.cascadiajs.com">2012</a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
    <section id="scripts">
      <script src="https://platform.twitter.com/widgets.js"></script>
      <script
        src="https://kit.fontawesome.com/95fd764ad0.js"
        crossorigin="anonymous"
        async
      ></script>
    </section>
  `;
}
