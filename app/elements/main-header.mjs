export default function MainHeader({ html, state }) {
  const { store } = state;
  const { path } = store;
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
      <section class="alert"><i class="fa-solid fa-ticket"></i> We've launched <a href="/2024/tickets">No Frills</a> tickets!</section>
      ${path && path.startsWith("/2024")
        ? html`<nav class="back">
              <div class="wide">
                <div><a href="/">← Back to Home</a></div>
              </div>
            </nav>
            <nav-2024></nav-2024>`
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
              <div class="push"><a href="/2024">CascadiaJS 2024</a></div>
              <div class="spacer"><a href="/mailing-list">Newsletter</a></div>
              <div class="spacer">
                <a href="/code-of-conduct">Code of Conduct</a>
              </div>
            </div>
          </nav>`}
    </header>
  `;
}
