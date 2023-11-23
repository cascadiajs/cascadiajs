export default function MainHeader({ html, state }) {
  const { store } = state;
  const { path } = store;
  return html`
    <style>
      header #logo svg {
        height: 56px;
        width: auto;
      }

      header nav {
        padding: 0;
        text-align: center;
      }

      header nav.primary {
        background-color: #112378;
      }

      header nav.secondary {
        background-color: #17c37b;
        padding: 4px 0;
      }

      header > section.alert {
        background-color: #ffd007;
        padding: 8px;
        font-family: alkaline-caps, monospace;
        font-weight: 500;
        color: #112378;
        text-align: center;
        font-size: 20px;
      }

      header > section.alert a,
      header > section.alert a:visited {
        color: #112378;
      }

      nav a {
        display: inline-block;
        margin: 4px;
        font-family: alkaline-caps, monospace;
        font-size: 1.125em;
        font-weight: 400;
        text-decoration: none;
        padding-right: 5px;
      }

      nav.primary a,
      nav.primary a:visited {
        color: #fff5cc;
      }

      nav.secondary a,
      nav.secondary a:visited {
        color: #112378;
      }

      nav a:hover {
        color: #ffcf07;
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
      <nav class="primary">
        <div class="wide">
          <div id="logo">
            <a href="/">
              <img src="/_public/favicon.svg" alt="CascadiaJS logo" />
            </a>
          </div>
          <div class="push"><a href="/2024">2024</a></div>
          <div class="spacer"><a href="/mailing-list">Newsletter</a></div>
          <div class="spacer">
            <a href="/code-of-conduct">Code of Conduct</a>
          </div>
        </div>
      </nav>
      ${path && path.startsWith("/2024") ? html`<nav-2024></nav-2024>` : ``}
    </header>
  `;
}
