export default function ({ html /*state*/ }) {
  return html`
    <style>
      #splash {
        text-align: center;
        padding: 16px 0 0 0;
      }
    </style>
    <main-layout>
      <div id="splash">
        <a href="/2024"
          ><img
            src="/_public/images/splash.png"
            alt="CascadiaJS 2024 splash image"
            width="75%"
        /></a>
      </div>
    </main-layout>
  `;
}
