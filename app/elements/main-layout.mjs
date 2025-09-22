export default function MainLayout({ html, state }) {
  const { store = {} } = state;
  const { path = "" } = store;
  return html`
    <style>
      #root {
        background-color: #fffbeb;
        color: #020800;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        font-weight: 200;
        font-family: freight-sans-pro, sans-serif;
        font-size: 18px;
        line-height: 1.125em;
      }

      .landing {
        padding: 32px 32px;
        text-align: center;
      }

      .landing h1 {
        font-size: 48px;
        margin: 0 0 32px 0;
      }

      .landing h2 {
        font-size: 32px;
        color: #112378;
        margin-bottom: 0;
      }

      .landing h3 {
        font-size: 28px;
        color: #fff;
        font-weight: 400;
        margin-top: 4px;
      }

      @media only screen and (min-width: 768px) {
        #root {
          display: grid;
          min-height: 100%;
          grid-template-columns: 100%;
          grid-template-rows: auto 1fr auto;
        }

        #testimonials div {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }

        #testimonials div div {
          width: 300px;
          margin-right: 16px;
        }
      }
    </style>
    <div id="root">
      <main-header></main-header>
      <main id="content">
        <slot></slot>
        <section id="sponsors" class="landing">
        ${ path.startsWith("/2024") ? html`<h1>Our Sponsors</h1><sponsors-grid-2024></sponsors-grid-2024>` 
    : path.startsWith("/2025") ? html`<h1>Our Sponsors</h1><sponsors-grid-2025></sponsors-grid-2025>`
      : html`<h1>Past Sponsors</h1><sponsors-grid></sponsors-grid>`}
          <div class="cta"><a href="/2026/sponsor">Sponsor Our Event</a></div>
        </section>
        <twitter-love></twitter-love>
      </main>
      <main-footer></main-footer>
    </div>
  `;
}
