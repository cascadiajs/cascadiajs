export default function MainHeader({ html, state }) {
  const { store = {} } = state;
  const { path = "" } = store
  //console.log(path)
  return html`
    <style>
      #logo img {
        height: 56px;
        width: auto;
      }

      nav {
        padding: 0;
        text-align: center;
        background-color: #17c37b;
        padding: 12px;
      }

      nav a {
        text-decoration: none;
      }

      nav a:hover {
        text-decoration: underline;
      }

      nav.primary {
        font-size: 16px;
      }

      nav.primary a {
        display: inline-block;
        margin: 4px;
        font-family: "mono45-headline", monospace;
        font-size: 21px;
        font-weight: 500;
        padding-right: 5px;
      }

      nav a,
      nav a:visited {
        color: #112378;
      }

      header > section.alert {
        background-color: #ffd007;
        padding: 8px;
        font-family: "mono45-headline", monospace;
        font-weight: 500;
        color: #112378;
        text-align: center;
        font-size: 20px;
      }

      header > section.alert a,
      header > section.alert a:visited {
        color: #112378;
      }

      @media only screen and (min-width: 768px) {
        header {
          z-index: 100;
          position: sticky;
          top: 0;
        }

        nav > div {
          display: flex;
          align-items: center;
        }

        /* this class makes me want to puke :( */
        nav .spacer {
          margin-left: 16px;
        }

        .push {
          margin-left: auto;
        }
      }
    </style>
    <header>
      <section class="alert">Early Bird tickets are <a href="/2026/tickets">ON SALE</a> for 2026!</section>
      ${path && (path.startsWith("/20"))
    ? html`<nav class="back">
              <div class="wide">
                <div><a href="/">← Back to Homepage</a></div>
              </div>
            </nav>
            ${path.startsWith("/2024") ? html`<nav-2024></nav-2024>` : ""}
            ${path.startsWith("/2025") ? html`<nav-2025></nav-2025>` : ""}
            ${path.startsWith("/2026") ? html`<nav-2026></nav-2026>` : ""}`
    : html` <nav class="primary">
            <div class="wide">
              <div id="logo">
                <a href="/">
                  <img
                    src="/_public/images/logo-wordmark-horizontal.svg"
                    alt="CascadiaJS logo"
                  />
                </a>
              </div>
              <div class="push"><a href="/2026">CascadiaJS 2026</a></div>
              <div class="spacer"><a href="/mailing-list">Newsletter</a></div>
              <div class="spacer"><a href="/code-of-conduct">Code of Conduct</a></div>
            </div>
          </nav>`}
    </header>
  `;
}
