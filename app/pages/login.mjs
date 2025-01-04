export default function ({ html, state }) {
  const { REDIRECT_URL } = state.store 
  const { STYTCH_PUBLIC_TOKEN } = process.env
  return html`
    <main-layout>
        <simple-page title="Log In" width="narrow">
            <div class="highlight info">Note: you must <a href="/signup">sign-up</a> using your CascadiaJS ticket information before you can log-in.</div>
            <div id="stytch-sdk"></div>
        </simple-page>
        <script type="module" src="https://www.unpkg.com/@stytch/vanilla-js@2.0/dist/index.esm.js"></script>
        <script type="module">
            import { StytchUIClient, Products } from "https://www.unpkg.com/@stytch/vanilla-js@2.0/dist/index.esm.js";

            // Export stytch so that the other scripts in this application can interact with it.
            export const stytch = new StytchUIClient("${ STYTCH_PUBLIC_TOKEN }");
            const styles = {
                hideHeaderText: true,
                container: {
                    width: "100%"
                },
                buttons: {
                    primary: {
                        backgroundColor: "#4A37BE",
                        borderColor: "#4A37BE",
                    },
                },
            };

            const config = {
                products: [Products.oauth],

                oauthOptions: {
                    providers: [{ type: "google" }, { type: "github" }],
                    loginRedirectURL: "${ REDIRECT_URL }",
                    signupRedirectURL: "${ REDIRECT_URL }",
                },
            };

            const callbacks = {
                onEvent: (message) => console.log(message),
                onError: (error) => console.log(error),
            }

            stytch.mountLogin({
                elementId: "#stytch-sdk",
                styles,
                config,
                callbacks,
            });
        </script>
    </main-layout>
    `
}