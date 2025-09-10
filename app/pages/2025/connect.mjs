export default function ({ html, state }) {
  let { store } = state
  let { sharing } = store
  
  if (sharing?.social !== undefined) {
    const { image, title, description } = sharing
    return html`<social-sharing image="${image}" title="${title}" description="${description}"></social-sharing>`
  }
  else {
    return html`
      <style>
        .connect-intro {
          text-align: center;
          padding: 32px 0;
          margin-bottom: 32px;
        }

        .connect-intro .tagline {
          font-size: 24px;
          color: #112378;
          margin: 0 0 24px 0;
          font-family: freight-macro-pro;
          font-weight: 300;
        }

        .connect-intro p {
          font-size: 18px;
          color: #112378;
          line-height: 1.5em;
          max-width: 600px;
          margin: 0 auto;
          font-family: freight-sans-pro;
        }

        .activities-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin: 48px 0;
        }

        .activity {
          background: #fff;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          padding: 32px;
          text-align: left;
        }

        .activity-header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .activity-emoji {
          font-size: 32px;
          margin-right: 16px;
        }

        .activity-title {
          font-size: 24px;
          color: #112378;
          margin: 0;
          font-family: freight-macro-pro;
          font-weight: 400;
        }

        .activity-description {
          font-size: 16px;
          color: #112378;
          line-height: 1.5em;
          font-family: freight-sans-pro;
        }

        .cta-section {
          background: #f8f9fa;
          padding: 48px 32px;
          text-align: center;
          margin: 48px 0;
          border-radius: 8px;
        }

        .cta-section h2 {
          font-size: 32px;
          color: #112378;
          margin: 0 0 16px 0;
          font-family: freight-macro-pro;
          font-weight: 400;
        }

        .cta-section p {
          font-size: 18px;
          color: #112378;
          margin: 0 0 24px 0;
          font-family: freight-sans-pro;
        }

        .cta-button {
          display: inline-block;
          background: #17c37b;
          color: white;
          padding: 16px 32px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 18px;
          font-weight: 500;
          font-family: freight-sans-pro;
          transition: background-color 0.2s;
        }

        .cta-button:hover {
          background: #15a86a;
          text-decoration: none;
        }

        .footer-notes {
          background: #f0f0f0;
          padding: 32px;
          margin: 48px 0;
          border-radius: 8px;
          text-align: center;
        }

        .footer-notes p {
          font-size: 16px;
          color: #666;
          margin: 0;
          font-family: freight-sans-pro;
        }

        .footer-notes a {
          color: #112378;
          text-decoration: none;
        }

        .footer-notes a:hover {
          text-decoration: underline;
        }

        @media only screen and (min-width: 768px) {
          .activities-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .cta-section {
            padding: 64px;
          }
        }
      </style>
      <main-layout>
        <simple-page title="CascadiaJS Connect" width="wide">
          <div class="connect-intro">
            <p class="tagline">Low-pressure ways to meet cool humans at CascadiaJS</p>
            <p>
              Whether you're a networking pro or prefer to keep things casual, CascadiaJS Connect offers 
              opt-in ways to meet fellow attendees. No pressure, no awkwardness—just friendly ways to 
              vibe, learn, and maybe not eat lunch alone.
            </p>
          </div>

          <div class="activities-grid">
            <div class="activity">
              <div class="activity-header">
                <span class="activity-emoji">🤝</span>
                <h2 class="activity-title">Cascadia Connect: Pair Programming IRL!</h2>
              </div>
              <p class="activity-description">
                Whether you're coming to your first tech conference, flying solo, or just want to meet someone new, this light-touch pairing system helps you connect with another attendee based on shared vibes. No awkward icebreakers required.
                <br><br>
                You may have signed up for this during registration or received an email about it. If you're matched, we'll share your name and email with your match so you can connect before the conference — maybe at the Welcome Reception (Sept 17), over coffee, or just to swap notes between talks.
              </p>
            </div>

            <div class="activity">
              <div class="activity-header">
                <span class="activity-emoji">🦜</span>
                <h2 class="activity-title">Birds of a Feather (BOAF) Tables</h2>
              </div>
              <p class="activity-description">
                Join topic-based tables where you can connect with devs who share your interests. 
                Whether you're into React, AI, accessibility, or something completely different, 
                there's a table for you.
                <br><br>
                These informal discussion groups pop up throughout the conference, giving you a 
                chance to dive deep into your favorite technologies, share experiences, and 
                learn from others who are passionate about the same things you are.
              </p>
            </div>

            <div class="activity">
              <div class="activity-header">
                <span class="activity-emoji">🏷️</span>
                <h2 class="activity-title">"Talk to Me About..." Stickers</h2>
              </div>
              <p class="activity-description">
                Add a conversation starter to your badge! Pick up stickers with prompts like 
                "Talk to me about TypeScript" or "Ask me about my side project" to make 
                starting conversations easier and more fun.
              </p>
            </div>

            <div class="activity">
              <div class="activity-header">
                <span class="activity-emoji">🎲</span>
                <h2 class="activity-title">Low-Key Games</h2>
              </div>
              <p class="activity-description">
                Quick, playful activities scattered throughout the conference and at the party. 
                Think icebreaker games, trivia, or simple challenges that help people mingle 
                without any pressure to be social.
              </p>
            </div>
          </div>


          <div class="footer-notes">
            <p>
              CascadiaJS Connect is organized by our amazing volunteers who believe in the power 
              of community and connection.
            </p>
          </div>
        </simple-page>
      </main-layout>
    `;
  }
}
