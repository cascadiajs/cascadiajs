export default function ({ html /*state*/ }) {
    return html`
        <admin-layout>
            <ul>
                <li><a href="/admin/events">List Events</a></li>
                <li><a href="/admin/speakers">List Speakers</a></li>
                <li><a href="/admin/talks">List Talks</a></li>
        </admin-layout>
    `
}