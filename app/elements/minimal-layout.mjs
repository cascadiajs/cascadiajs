export default function MainLayout({ html }) {
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

      @media only screen and (min-width: 768px) {
        #root {
          display: grid;
          min-height: 100%;
          grid-template-columns: 100%;
          grid-template-rows: auto 1fr auto;
        }
      }
    </style>
    <div id="root">
      <main id="content">
        <slot></slot>
      </main>
      <main-footer></main-footer>
    </div>
  `;
}
