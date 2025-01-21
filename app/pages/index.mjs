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

      #trailer-video {
        border: 4px solid #112378;
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

        #trailer-container {
          width: 70%;
          margin: 0 auto;
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
          We create events that will help you level up, grow your network, find a job and have fun! In 2024 we're bringing our conference back to Seattle for 4 days of talks, workshops and karaoke.
        </p>
        <div class="cta primary"><a href="/2025">2025 Conference details</a></div>
      </article>
      <article>
        <img src="/_public/images/2024/main-page-illo-2024.png" alt="hero image of 2024 event"/>
      </article>
    </section>
    <section id="trailer" class="landing">
    <h1>Check-out our 2024 Trailer!</h1>
    <div id="trailer-container">
    <div id="trailer-video" style="position: relative; padding-top: 56.25%;">
      <iframe
        src="https://customer-err733fa36e0jnfx.cloudflarestream.com/d060af2223f2862dcdc98539679752f2/iframe?muted=true&preload=true&autoplay=true&poster=https%3A%2F%2Fcustomer-err733fa36e0jnfx.cloudflarestream.com%2Fd060af2223f2862dcdc98539679752f2%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
        loading="lazy"
        style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowfullscreen="true"
      ></iframe>
      </div>
      </div>
    </section>
    </main-layout>
  `;
}
