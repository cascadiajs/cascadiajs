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
        : html`<h1>Past Sponsors</h1><sponsors-grid></sponsors-grid><div class="cta"><a target="_blank" href="/_public/files/cjs25-sponsor-brochure.pdf">Sponsor Our Event</a></div>`}
        
        </section>
        <section id="testimonials" class="landing">
          <h1>Testimonials</h1>
          <div>
            <div>
              <blockquote class="twitter-tweet"><p lang="en" dir="ltr">I LOVE CascadiaJS. Incredible conference in a beautiful city with solid lineups, wonderful staff, and just the right amount of silly. Also <a href="https://twitter.com/crtr0?ref_src=twsrc%5Etfw">@crtr0</a> at karaoke. 💙<br><br>Congrats &amp; thanks again for such a wonderful time! <a href="https://t.co/3jhkI8O6Su">https://t.co/3jhkI8O6Su</a></p>&mdash; Josh Goldberg 🦋 (@JoshuaKGoldberg) <a href="https://twitter.com/JoshuaKGoldberg/status/1804535853739556963?ref_src=twsrc%5Etfw">June 22, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>
            <div>
              <blockquote class="twitter-tweet"><p lang="en" dir="ltr">The reason why <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw">@CascadiaJS</a> is one of my favorite conferences is because you can truly feel the passion and care that everyone puts into it. There&#39;s a real sense of community, it&#39;s amazing 🙌👏💜</p>&mdash; Charlie Gerard (@devdevcharlie) <a href="https://twitter.com/devdevcharlie/status/1565509276021362688?ref_src=twsrc%5Etfw">September 2, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>
            <div>
              <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Once again, <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw">@CascadiaJS</a> did not disappoint—I love that we have a community-focused conference right in the PNW. It&#39;s always inspiring to hear about what people are making, stretch my perspective, and meet new friends.<br><br>Also Sunriver resort was awesome 🤘<a href="https://twitter.com/hashtag/CascadiaJS?src=hash&amp;ref_src=twsrc%5Etfw">#CascadiaJS</a> <a href="https://t.co/SKlPeHibHE">pic.twitter.com/SKlPeHibHE</a></p>&mdash; Mark Palfreeman 🪐 (@markpalfreeman) <a href="https://twitter.com/markpalfreeman/status/1566111262014320640?ref_src=twsrc%5Etfw">September 3, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>
            <div>  
              <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Happy 10th Birthday <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw">@CascadiaJS</a>, and thanks to <a href="https://twitter.com/crtr0?ref_src=twsrc%5Etfw">@crtr0</a> and <a href="https://twitter.com/carrie_k?ref_src=twsrc%5Etfw">@carrie_k</a> for shepherding this amazing conference! Can&#39;t wait for <a href="https://twitter.com/hashtag/CascadiaJS?src=hash&amp;ref_src=twsrc%5Etfw">#CascadiaJS</a> 2024! <a href="https://t.co/Pu8p0oewer">pic.twitter.com/Pu8p0oewer</a></p>&mdash; Jeremy&#39;s got a #NewThing 🇺🇲🇺🇦 (@IAmJerdog) <a href="https://twitter.com/IAmJerdog/status/1565544078590504961?ref_src=twsrc%5Etfw">September 2, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>
            <div>  
              <blockquote class="twitter-tweet"><p lang="en" dir="ltr">On my way out of <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw">@CascadiaJS</a>, feeling grateful for the work that <a href="https://twitter.com/crtr0?ref_src=twsrc%5Etfw">@crtr0</a>, his family, the staff and volunteers, sponsors, speakers, and all put into this family reunion. <br><br>Some wonderful memories were made, and the combination of nature and lovely people made it so special. <a href="https://t.co/F4JC0318pe">pic.twitter.com/F4JC0318pe</a></p>&mdash; Tejas Kumar (@TejasKumar_) <a href="https://twitter.com/TejasKumar_/status/1566127865594355712?ref_src=twsrc%5Etfw">September 3, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>
            <div>  
              <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Wow, what a week at <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw">@CascadiaJS</a>! Our team thoroughly enjoyed connecting with other engineers, learning from various talks, &amp; experiencing beautiful Sunriver, OR. We wanted to thank everyone who helped organize this event; it was spectacular, and we cannot wait to be back in 2024. <a href="https://t.co/vCO33rBTFa">pic.twitter.com/vCO33rBTFa</a></p>&mdash; Formidable, Now Nearform (@FormidableLabs) <a href="https://twitter.com/FormidableLabs/status/1567143084957237251?ref_src=twsrc%5Etfw">September 6, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>
            <div>  
              <blockquote class="twitter-tweet">
                <p lang="en" dir="ltr">
                  I&#39;m absolutely blown away by how much
                  <a href="https://twitter.com/cartwr?ref_src=twsrc%5Etfw"
                    >@cartwr</a
                  >
                  and the entire team
                  <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw"
                    >@CascadiaJS</a
                  >
                  lifts up and highlights the people who contribute to and make
                  this conference so special. This is what a conf that focuses
                  on community looks like! 🌲
                  <a
                    href="https://twitter.com/hashtag/cjs19?src=hash&amp;ref_src=twsrc%5Etfw"
                    >#cjs19</a
                  >
                  <a href="https://t.co/Yh0CdOzVyx"
                    >pic.twitter.com/Yh0CdOzVyx</a
                  >
                </p>
                &mdash; Divya (@shortdiv)
                <a
                  href="https://twitter.com/shortdiv/status/1192967417867034625?ref_src=twsrc%5Etfw"
                  >November 9, 2019</a
                >
              </blockquote>
            </div>
            <div>
              <blockquote class="twitter-tweet">
                <p lang="en" dir="ltr">
                  I absolutely LOVED MCing
                  <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw"
                    >@CascadiaJS</a
                  >! This was such a well organized conference, huge kudos to
                  the speakers, the organizers, the sponsors, and of course the
                  audience + community for making it great. It was a pleasure!!
                  <a
                    href="https://twitter.com/hashtag/cjs20?src=hash&amp;ref_src=twsrc%5Etfw"
                    >#cjs20</a
                  >
                  <a href="https://t.co/EhqjhYJEVY"
                    >pic.twitter.com/EhqjhYJEVY</a
                  >
                </p>
                &mdash; Cassidy (@cassidoo)
                <a
                  href="https://twitter.com/cassidoo/status/1301313550577577984?ref_src=twsrc%5Etfw"
                  >September 3, 2020</a
                >
              </blockquote>
            </div>
            <div>
              <blockquote class="twitter-tweet">
                <p lang="en" dir="ltr">
                  Attended
                  <a
                    href="https://twitter.com/hashtag/CascadiaJS?src=hash&amp;ref_src=twsrc%5Etfw"
                    >#CascadiaJS</a
                  >
                  last week! Awesome speakers/workshops and very well done
                  virtual/hybrid experience! Can&#39;t recommend it enough for
                  developers no matter where they are in their coding journey!
                  🖥️🌲<a
                    href="https://twitter.com/hashtag/webdevelopment?src=hash&amp;ref_src=twsrc%5Etfw"
                    >#webdevelopment</a
                  >
                  <a
                    href="https://twitter.com/hashtag/javascript?src=hash&amp;ref_src=twsrc%5Etfw"
                    >#javascript</a
                  >
                  <a
                    href="https://twitter.com/hashtag/CascadiaJS2021?src=hash&amp;ref_src=twsrc%5Etfw"
                    >#CascadiaJS2021</a
                  >
                  <a
                    href="https://twitter.com/hashtag/PNW?src=hash&amp;ref_src=twsrc%5Etfw"
                    >#PNW</a
                  >
                  <a href="https://t.co/imknQzJmBZ"
                    >pic.twitter.com/imknQzJmBZ</a
                  >
                </p>
                &mdash; Nathan Pickard (@NathanPickard)
                <a
                  href="https://twitter.com/NathanPickard/status/1457848244034170886?ref_src=twsrc%5Etfw"
                  >November 8, 2021</a
                >
              </blockquote>
            </div>
            <div>
              <blockquote class="twitter-tweet">
                <p lang="en" dir="ltr">
                  Had an amazing time at
                  <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw"
                    >@CascadiaJS</a
                  >. See you next year!
                  <a href="https://t.co/eJYIkqHVMf"
                    >pic.twitter.com/eJYIkqHVMf</a
                  >
                </p>
                &mdash; Treasure Porth (@treasureporth)
                <a
                  href="https://twitter.com/treasureporth/status/1194446190068158464?ref_src=twsrc%5Etfw"
                  >November 13, 2019</a
                >
              </blockquote>
            </div>
            <div>
              <blockquote class="twitter-tweet">
                <p lang="en" dir="ltr">
                  I was honored to participate in
                  <a
                    href="https://twitter.com/hashtag/CascadiaJS?src=hash&amp;ref_src=twsrc%5Etfw"
                    >#CascadiaJS</a
                  >
                  again this year. I&#39;ve been so impressed again with all the
                  creativity and effort the organizers, speakers, and community
                  puts into making it a uniquely fun event. ✨
                  <a href="https://t.co/x0byI4utED"
                    >pic.twitter.com/x0byI4utED</a
                  >
                </p>
                &mdash; Nicole Oliver (@nixcodes)
                <a
                  href="https://twitter.com/nixcodes/status/1456441379760992258?ref_src=twsrc%5Etfw"
                  >November 5, 2021</a
                >
              </blockquote>
            </div>
            <div>
              <blockquote class="twitter-tweet">
                <p lang="en" dir="ltr">
                  Huge shoutout to the
                  <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw"
                    >@CascadiaJS</a
                  >
                  organizers for a truly unique experience that went above and
                  beyond anything I could have imagined. You could really feel
                  their passion for the community and the time, attention, and
                  care they put into every single aspect. THANK YOU!! ❤️🌲
                  <a
                    href="https://twitter.com/hashtag/cjs20?src=hash&amp;ref_src=twsrc%5Etfw"
                    >#cjs20</a
                  >
                  <a href="https://t.co/5NH2FVfMA2"
                    >pic.twitter.com/5NH2FVfMA2</a
                  >
                </p>
                &mdash; Rachael Thomas (@rachael_codes)
                <a
                  href="https://twitter.com/rachael_codes/status/1301317932840972289?ref_src=twsrc%5Etfw"
                  >September 3, 2020</a
                >
              </blockquote>
            </div>
            <div>
              <blockquote class="twitter-tweet">
                <p lang="en" dir="ltr">
                  So about
                  <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw"
                    >@CascadiaJS</a
                  >
                  last year…
                  <a href="https://t.co/iFsMyd71FA"
                    >pic.twitter.com/iFsMyd71FA</a
                  >
                </p>
                &mdash; Michelle Bakels (@MichelleBakels)
                <a
                  href="https://twitter.com/MichelleBakels/status/1486119944630775808?ref_src=twsrc%5Etfw"
                  >January 25, 2022</a
                >
              </blockquote>
            </div>
            <div>
              <blockquote class="twitter-tweet">
                <p lang="en" dir="ltr">
                  Yeah, tonight was great.
                  <a
                    href="https://twitter.com/hashtag/CascadiaJS?src=hash&amp;ref_src=twsrc%5Etfw"
                    >#CascadiaJS</a
                  >
                  <a href="https://t.co/4hHgTP46fg"
                    >pic.twitter.com/4hHgTP46fg</a
                  >
                </p>
                &mdash; Jessica West (@jessicaewest)
                <a
                  href="https://twitter.com/jessicaewest/status/1456483897596809216?ref_src=twsrc%5Etfw"
                  >November 5, 2021</a
                >
              </blockquote>
            </div>
            <div>
              <blockquote class="twitter-tweet">
                <p lang="en" dir="ltr">
                  Awesome
                  <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw"
                    >@CascadiaJS</a
                  >
                  afterparty at the
                  <a
                    href="https://twitter.com/LivingComputers?ref_src=twsrc%5Etfw"
                    >@LivingComputers</a
                  ><br /><br />I had so much fun.
                  <a
                    href="https://twitter.com/hashtag/CJS18?src=hash&amp;ref_src=twsrc%5Etfw"
                    >#CJS18</a
                  >
                  <a href="https://t.co/xUiF2iupz6"
                    >pic.twitter.com/xUiF2iupz6</a
                  >
                </p>
                &mdash; Welling Guzmán (@wellingguzman)
                <a
                  href="https://twitter.com/wellingguzman/status/1063708080259518464?ref_src=twsrc%5Etfw"
                  >November 17, 2018</a
                >
              </blockquote>
            </div>
            <div>
              <blockquote class="twitter-tweet">
                <p lang="en" dir="ltr">
                  I can&#39;t thank
                  <a href="https://twitter.com/crtr0?ref_src=twsrc%5Etfw"
                    >@crtr0</a
                  >, the
                  <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw"
                    >@CascadiaJS</a
                  >
                  team, and the conference sponsors enough for the opportunity
                  to attend
                  <a
                    href="https://twitter.com/hashtag/cascadiajs?src=hash&amp;ref_src=twsrc%5Etfw"
                    >#cascadiajs</a
                  >! Everyone was so encouraging and welcoming, I&#39;m thrilled
                  to bring back what I learned to
                  <a
                    href="https://twitter.com/MakeThinkCode?ref_src=twsrc%5Etfw"
                    >@MakeThinkCode</a
                  >
                  &amp;
                  <a href="https://twitter.com/pnca?ref_src=twsrc%5Etfw"
                    >@pnca</a
                  >.
                  <a href="https://t.co/5hVyhcmyUL"
                    >pic.twitter.com/5hVyhcmyUL</a
                  >
                </p>
                &mdash; meganmckissack (@meganmckissack)
                <a
                  href="https://twitter.com/meganmckissack/status/1064595216995246081?ref_src=twsrc%5Etfw"
                  >November 19, 2018</a
                >
              </blockquote>
            </div>
          </div>
        </section>
      </main>
      <main-footer></main-footer>
    </div>
  `;
}
