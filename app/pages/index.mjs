export default function ({ html /*state*/ }) {
  return html`
    <style>
      #hero {
        text-align: left;
      }

      #hero .pre-header {
        font-family: mono45-headline;
        font-size: 18px;
        color: #112378;
        margin: 0;
      }

      #hero h2 {
        margin-top:16px;
      }

      @media only screen and (min-width: 768px) {
        #hero {
          display: flex;
          max-width: 1000px;
          margin: 0 auto;
        }

        #hero article {
          flex: 1;
        }

        #hero article:first-child {
          margin-right: 16px;
        }
      }
    </style>
    </style>
    <main-layout>
    <section id="hero" class="landing">
    <article>
      <div class="pre-header">Connecting devs since 2012</div>
      <h2>We're a community for JavaScript developers in the Pacific Northwest.</h2>
      <br/>
      <p>
        We create events that will help you level up, grow your network, find a job and have fun! In 2024 we're bringing our conference back to Seattle for 4 days of talk, workshops and karaoke.
      </p>
      <div class="cta primary"><a href="/2024">2024 Conference details</a></div>
    </article>
    <article>
      <img src="/_public/images/2024/main-page-illo-2024.png" alt="hero image of 2024 event"/>
    </article>
  </section>
    </main-layout>
  `;
}
