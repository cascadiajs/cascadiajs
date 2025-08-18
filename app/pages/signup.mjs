const MESSAGES = {
  'invalid-ticket': 'Invalid ticket reference',
  'must-signup': 'You must sign up using your ticket reference to login'
}

export default function ({ html, state }) {
  const error = state?.store?.error
  return html`
    <main-layout>
        <simple-page title="Sign Up" width="narrow">
        ${ error ? html`<p><span class="highlight error">${ MESSAGES[error] }</span></p>` : "" }
        <p>Please enter the CascadiaJS ticket reference you received when you registered for the 2025 conference.</p>
        <form action="/signup" method="POST">
            <input type="text" name="ticketRef" placeholder="ABCD-1" required>
            <button>Submit</button>
        </form>
        <h3>Where to find your Ticket Reference</h3>
        <p><img src="/_public/images/2024/tito-ticket.png"/></p>
        </simple-page>
    </main-layout>
    `
}