export default function MainHeader({ html }) {
  return html`
    <style>
      .logo {
        margin-bottom: 12px;
      }

      nav div {
        margin-bottom: 16px;
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
          <a href="/2025"
            ><img
              height="64"
              src="/_public/images/2025/horizontal-dark-blue.svg"
              alt="CascadiaJS 2025 logo"
          /></a>
        </div>
        <!--div class="push"><a href="/2024/schedule">Schedule</a></div>
        <div class="spacer"><a href="/2025/cfp">Call for Papers</a></div>
        
        <div class="spacer"><a href="/2024/livestream">Livestream</a></div>
        <div class="spacer"><a href="/home">Login</a></div-->
        <div class="push"><a href="/2025/schedule">Schedule</a></div>
        <div class="spacer"><a href="/2025/attend">Attending</a></div>
        <!--div class="spacer"><a href="/2025/cfp">CFP</a></div-->
        <div class="spacer"><a href="/2025/trainings">Training</a></div>
        <!--div class="spacer"><a href="/2025/scholarships">Scholarships</a></div-->
        <div class="spacer"><a class="buy" href="/2025/tickets">Tickets</a></div>
      </div>
    </nav>
  `;
}
