export default function ({ html, state }) {
    const userName = state?.store?.userName
    const ticketId = state?.store?.ticketId
    return html`
    <main-layout>
        <simple-page title="Dashboard">
            <h2>Hello ${ userName.first_name }!</h2>
            <p><img src="/ticket?image=true&ticketId=${ ticketId }" /></p>
            <p>
                <a target="_blank" href="https://twitter.com/intent/tweet?text=I%20just%20bought%20a%20ticket%20to%20%23CascadiaJS%202024!%20If%20you%20register%20using%20my%20virtual%20ticket%20link%2C%20you%27ll%20save%2035%25!%0A%0Ahttps%3A%2F%2Fcascadiajs.com%2Ftickets%3Fticket_id%3D${ ticketId }">Share on Twitter</a>
                <a target="_blank" href="/ticket?ticketId=${ ticketId }">Direct Link</a>
            </p>
            <p>Stay Tuned 📺 </p>
            <div class="cta secondary"><a href="/logout">Logout</a></div>
        </simple-page>
    </main-layout>
    `
}