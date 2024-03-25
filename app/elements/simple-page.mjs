export default function PageLayout({ html, state }) {
    const { attrs } = state
    const { title, width = "narrow" } = attrs
    return html`
        <style>
        #page {
            min-height: 400px;
          }
    
        #page .page-title {
        background-color: #cfd3e4;
        }

        #page .page-title div {
        padding: 16px;
        }

        #page .page-title div h1 {
        color: #112378;
        margin: 8px 0;
        }

        #page .page-body {
        padding: 16px;
        }

        #page li {
        padding: 4px;
        }

        .page-body .toc a,
        .page-body .toc a:visited {
        font-weight: 500;
        text-decoration: none;
        }

        .page-body .toc a:hover {
        text-decoration: underline;
        }

        .page-body .toc ul {
        padding-inline-start: 0;
        }

        .page-body .toc li {
        list-style: none;
        margin: 0;
        }

        @media only screen and (min-width: 768px) {

            #page .page-body,
            #page .page-title div {
                width: ${ width === "narrow" ?  "50%" : "70%" };
                margin: 0 auto;
            }
            
            #page .page-body.wide,
            #page .page-title div.wide {
                width: 70%;
            }

            #page {
                margin-bottom: 64px;
            }
        }
        </style>
        <div id="page">
            <div class="page-title">
                <div><h1>${ title }</h1></div>
            </div>
            <div class="page-body">
                <slot></slot>
            </div>
        </div>
    `;
}
