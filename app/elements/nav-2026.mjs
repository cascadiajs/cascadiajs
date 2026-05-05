export default function Nav2026({ html }) {
  return html`
    <style>
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

      @media only screen and (min-width: 768px) {
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
      }
    </style>
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
        <div><a href="/2026#networking">Networking</a></div>
        <div><a href="/2026#pricing">Pricing</a></div>
        <div><a href="/2026#speakers">Speakers</a></div>
        <div><a href="/2026/schedule">Schedule</a></div>
        <div><a href="/2026/attend">Attend</a></div>
        <!--<div><a href="/2026/scholarships">Scholarships</a></div>-->
        <div><a href="/2026/sponsor">Sponsor</a></div>
        <div><a href="/2026/trainings">Trainings</a></div>
        <div><a class="buy" href="/2026/tickets">Tickets</a></div>
      </div>
    </nav>
  `;
}
