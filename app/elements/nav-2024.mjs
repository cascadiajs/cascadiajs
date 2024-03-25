export default function MainHeader({ html }) {
  return html`
    <style>
      .logo {
        margin-bottom: 12px;
      }

      nav.secondary {
        padding: 10px;
        background-color: #ccf1db;
        font-family: "mono45-headline", monospace;
        font-size: 21px;
        font-weight: 500;
      }

      nav.secondary a,
      nav.secondary a:visited {
        color: #112378;
      }

      nav a:hover {
        text-decoration: underline;
      }

      @media only screen and (min-width: 768px) {
        .logo {
          margin-bottom: 0;
        }
      }
    </style>
    <nav class="secondary">
      <div class="wide">
        <div class="logo">
          <a href="/2024"
            ><img
              height="64"
              src="/_public/images/horizontal-2024-dark-blue.svg"
              alt="CascadiaJS 2024 logo"
          /></a>
        </div>
        <div class="push"><a href="/2024/schedule">Schedule</a></div>
        <div class="spacer"><a href="/2024/travel">Travel Info</a></div>
        <div class="spacer"><a href="/2024/boss-letter">Boss Letter</a></div>
        <div class="spacer"><a href="/2024/scholarships">Scholarships</a></div>
        <div class="spacer"><a href="/2024/startup-fair">Startup Fair</a></div>
        <div class="spacer"><a href="/2024/tickets">Tickets</a></div>
      </div>
    </nav>
  `;
}
