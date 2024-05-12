export default function ({ html, state }) {
    const userName = state?.store?.userName
    return html`
    <main-layout>
        <simple-page title="Livestream">
            <h2>Hello ${ userName.first_name }!</h2>
            <p>Stay Tuned 📺 </p>
            <div class="cta secondary"><a href="/logout">Logout</a></div>
        </simple-page>
    </main-layout>
    `
}