const RELEASES = [
  { id: 1469997, title: 'Conference Attendee', hasWorkshops: true, hasActivities: true },
  { id: 1487843, title: 'Conference Student Attendee', hasWorkshops: true, hasActivities: true },
  { id: 1489836, title: 'Conference Indie Attendee', hasWorkshops: true, hasActivities: true },
  { id: 1492670, title: 'Conference No Frills', hasWorkshops: true, hasActivities: false },
  { id: 1500503, title: 'Conference Livestream', hasWorkshops: true, hasActivities: true },
  { id: 1484904, title: 'Conference Attendee + Full Scholarship', hasWorkshops: false, hasActivities: true },
  { id: 1492669, title: 'Conference Significant Other', hasWorkshops: false, hasActivities: true },
  { id: 1484368, title: 'Conference Volunteers', hasWorkshops: true, hasActivities: true },
  { id: 1484705, title: 'Conference Speaker', hasWorkshops: true, hasActivities: true },
]

export default function ({ html, state }) {
  const { userName, ticketId, releaseId, playbackId } = state?.store || {}
  const release = RELEASES.find(r => r.id === releaseId)
  return html`
    <main-layout>
        <simple-page title="Hello ${ userName.first_name }!">
            <h2>Ticket Info</h2>
            <table class="styled-table">
                <thead>
                    <tr><th>Ticket Type</th><th>In Person Workshops?</th><th>Activity Day?</th></tr>
                </thead>
                <tbody>
                    <tr><td>${ release.title }</td><td>${ release.hasWorkshops ? 'Yes' : 'No' }</td><td>${ release.hasActivities ? 'Yes' : 'No' }</td></tr>
                </tbody>
            </table>
            <h2>Watch the Livestream</h2>
            ${ playbackId ? html`  
            <mux-player
              stream-type="on-demand"
              playback-id="${ playbackId }"
              metadata-video-title="CascadiaJS 2024 Livestream"
              metadata-viewer-user-id="embed"
              muted="true"
              autoplay="any"
              default-hidden-captions>
            </mux-player>
            <script src="https://unpkg.com/@mux/mux-player"></script>`
    : 'The livestream will be available here on 6/20 and 6/21 starting at 9am PT.'}
            <h2>Virtual Ticket</h2>
            <p><img width="500" src="/ticket/${ ticketId }?image=true" /></p>
            <p>
                <a target="_blank" href="https://twitter.com/intent/tweet?text=I%20just%20bought%20a%20ticket%20to%20%23CascadiaJS%202024!%20If%20you%20register%20using%20my%20virtual%20ticket%20link%2C%20you%27ll%20save%2035%25!%0A%0Ahttps%3A%2F%2Fcascadiajs.com%2Fticket%2F${ ticketId }">Share on Twitter</a>
                <a target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcascadiajs.com%2Fticket%2F${ ticketId }">Share on LinkedIn</a>
                <a target="_blank" href="/ticket/${ ticketId }">Direct Link</a>
            </p>
            <h2>Talk Track</h2>
            <p>You can always find the updated schedule of talk <a href="/2024/schedule">here</a> and all of them will be streaming LIVE right here on 6/20 and 6/21.</p>
            ${ release.hasWorkshops 
    ? html`
            <h2>Workshop Track</h2>
            <p>All the workshop below are free and included in your ticket. Space is limited, so RSVP to reserve your seat!</p>
            <table class="styled-table">
                <thead>
                    <tr><th>Date/Time</th><th>Workshop</th><th>RSVP</th></tr>
                </thead>
                <tr><td>6/20 morning</td><td><a href="/2024/workshops/w3c-verifiable-credentials">Can You Buy Booze with a JSON Web Token?</a></td><td><a target="_blank" href="https://ti.to/event-loop/cascadiajs-2024/with/dp1r-xy2jpc">RSVP</a></td></tr>
                <tr><td>6/20 afternoon</td><td><a href="/2024/workshops/debugging-web-apps">From “its broken” to “fix is out”</a></td><td><a target="_blank" href="https://ti.to/event-loop/cascadiajs-2024/with/7rvix2cbzcc">RSVP</a></td></tr>
                <tr><td>6/21 morning</td><td><a href="/2024/workshops/building-ai-apps">Building a GenAI enabled web experience</a></td><td><a target="_blank" href="https://ti.to/event-loop/cascadiajs-2024/with/jtfbxvrrrfe">RSVP</a></td></tr>
                <tr><td>6/21 afternoon</td><td><a href="/2024/workshops/adding-auth-to-apps">Building a better auth experience for your apps</a></td><td><a target="_blank" href="https://ti.to/event-loop/cascadiajs-2024/with/2e1-gg9rpva">RSVP</a></td></tr>
            </table>` 
    : ``}
            <h2>Hallway Track</h2>
            <p>Our hallway track is where you can meet other attendees, chat with speakers, and participate in other fun activities. If you're joining us virtually, make sure to <a target="_blank" href="https://discord.gg/kkYR86GM29">join our Discord</a>!</p>            
            ${ release.hasActivities
    ? html`
            <h2>Post-Conference Activity Day</h2>
            <p>All the workshop below are free and included in your ticket. Space is limited, so RSVP to reserve your seat!</p>
            <table class="styled-table">
                <thead>
                    <tr><th>Activity</th><th>Location</th><th>RSVP</th></tr>
                </thead>
                <tr><td>5K Fun Run</td><td>Greenlake</td><td><a target="_blank" href="https://lu.ma/65nqcezz">RSVP</a></td></tr>
                <tr><td>Pickle Ball</td><td>Miller Park</td><td><a target="_blank" href="https://lu.ma/84v4ndmr">RSVP</a></td></tr>
                <tr><td>Space Needle</td><td>Seattle Center</td><td><a href="https://lu.ma/avh75hdw">Enter to Win</a></td></tr>
                <tr><td>Dog romp</td><td>Magnuson Park off-leash dog park</td><td><a target="_blank" href="https://lu.ma/uy7jhx9r">RSVP</a></td></tr>
            </table>` 
    : ``}
            <div class="cta secondary"><a href="/logout">Logout</a></div>
        </simple-page>
    </main-layout>
    `
}