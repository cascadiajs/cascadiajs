export default function ({ html, state }) {
    const fullName = state?.store?.fullName
    const ticketId = state?.store?.ticketId
    return html`
    <main-layout>
        <div style="text-align: center;">
            <h1>Join ${ fullName } at CascadiaJS 2025!</h1>
            <p><img width="600" src="/2025/ticket/${ ticketId }?image=true" /></p>
            <h2>Use promo code FOMO for $100 off!</h2>
            <div class="cta primary"><a href="/2025/tickets">Buy Ticket</a></div>
        </div>
    </main-layout>
    `
}