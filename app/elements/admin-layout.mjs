export default function AdminLayout({ html }) {
    return html`
        <style>
        #root {
            height: 100%;
            padding: 16px;
            font-weight: 200;
            font-family: freight-sans-pro, sans-serif;
            font-size: 18px;
            line-height: 1.125em;
        }
    
        form {
            display: flex;
            flex-direction: column;
        }
          
        input,textarea {
            border-radius: 3px;
            border: 1px solid lightgrey;
            margin: 3px;
            padding: 3px;
            font-size: normal;
        }
        
        textarea { height: 200px}
        
        button {
            margin-top: 6px;
            padding: 3px;
            background: #eaeaea;
            border-right: 1px solid grey;
            border-bottom: 1px solid grey;
            border-radius: 3px;
        }          
        </style>
        <div id="root">
            <slot></slot>
        </div>
    `;
}
