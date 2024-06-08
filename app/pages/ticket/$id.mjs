export default function ({ html, state }) {
    const fullName = state?.store?.fullName
    const ticketId = state?.store?.ticketId
    return html`
    <main-layout>
        <div style="text-align: center;">
            <h1>Join ${ fullName } at CascadiaJS 2024!</h1>
            <p><img width="600" src="/ticket/${ ticketId }?image=true" /></p>
            <h2>Use promo code FRIEND_OF_CASCADIA for 35% off!</h2>
            <div class="cta primary"><a href="/2024/tickets">Buy Ticket</a></div>
        </div>
    </main-layout>
    `
}