export default function MainHeader({ html }) {
  return html`
    <style>
      nav {
        padding: 10px;
        background-color: #ccf1db;
        font-family: "mono45-headline", monospace;
        font-weight: 500;
      }

      nav a,
      nav a:visited {
        color: #112378;
      }

      nav a:hover {
        text-decoration: underline;
      }
    </style>
    <nav>
      <div class="wide">
        <div class="logo">
          <a href="/2024"
            ><img
              height="64"
              src="/_public/images/horizontal-2024-dark-blue.svg"
              alt="CascadiaJS 2024 logo"
          /></a>
        </div>
        <div class="push"><a href="/2024/cfp">Call for Presenters</a></div>
      </div>
    </nav>
  `;
}
