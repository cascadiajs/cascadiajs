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
        <h2>We're a community for web + AI developers in the Pacific Northwest.</h2>
        <br/>
        <p>
          We create events that will help you level up, grow your network, find a job and have fun! In 2026 we'll be back in Seattle for 2+ days of talks, workshops and karaoke.
        </p>
        <div class="cta primary"><a href="/2026">CascadiaJS: June 2026</a></div>
      </article>
      <article>
        <img src="/_public/images/2025/hero-camper.png" alt="Sasquatch driving a camper van"/>
      </article>
    </section>
    <section id="trailer" class="landing">
    <h1>Check-out our 2025 Recap!</h1>
    <div id="trailer-container">
    <div style="position: relative; padding-top: 56.25%;">
      <iframe
        src="https://customer-err733fa36e0jnfx.cloudflarestream.com/a439eea2d251499f21c9388ebc2d5370/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-err733fa36e0jnfx.cloudflarestream.com%2Fa439eea2d251499f21c9388ebc2d5370%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
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
