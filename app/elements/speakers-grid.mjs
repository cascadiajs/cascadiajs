export default function Sponsors({ html, state }) {
    const { speakers } = state.store
    return html`
        <style>
        .person-list {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: center;
        }
        .person-list .person {
            width: 250px;
            display:flex;
            flex-direction: column;
            margin-right: 8px;
            margin-bottom: 16px;
        }
        .person-photo {
            background-color:    #ccf1db;
            display:             flex;
            flex:                1 1 100%;
            height:              250px;
            width:               250px;
            overflow:            hidden;
            padding:             0;
            position:            relative;
        }

        .person-photo img {
            filter:              grayscale(100%) contrast(1) blur(0px);
            flex:                1 0 100%;
            height:              250px;
            max-width:           250px;
            mix-blend-mode:      multiply;
            object-fit:          cover;
            opacity:             1;
            position:            relative;
            width:               250px;
        }

        .person-photo::before {
            background-color:    #112378;
            bottom:              0;
            content:             '';
            height:              250px;
            left:                0;
            mix-blend-mode:      lighten;
            position:            absolute;
            right:               0;
            top:                 0;
            width:               250px;
            z-index:             1;
        }
        .person-name {
            font-family: freight-macro-pro, sans-serif;
            font-weight: 600;
            line-height: 1em;
            font-size: 24px;
            margin: 0;
            color: #112378;
            flex-grow: 1
        }
        .person-info {
            flex: 1;
            text-align: left;
            padding: 8px;
            display: flex;
            flex-direction: column;
            color: #112378;
        }
        </style>
        <div class="person-list">
            ${ speakers.sort(() => Math.random() - 0.5).map(s => /*html*/`
            <div class="person">
                <div class="person-photo"><img src="/_public/images/2024/speakers/${s.image}" alt="photo of ${s.name}"/></div>
                <div class="person-info">
                    <div class="person-name">${s.name}</div>
                    <div class="person-misc">
                    ${s.company}<br/>${s.location}
                    </div>
                </div>
            </div>
            `).join('')}
            <div class="person">
                <div class="person-photo"><img src="/_public/images/2024/speakers/ai-sasquatch.webp" alt="secret speaker"/></div>
                <div class="person-info">
                    <div class="person-name">Secret</div>
                </div>
            </div> 
            <div class="person">
                <div class="person-photo"><img src="/_public/images/2024/speakers/ai-salmon.webp" alt="secret speaker"/></div>
                <div class="person-info">
                    <div class="person-name">Secret</div>
                </div>
            </div>
            <div class="person">
                <div class="person-photo"><img src="/_public/images/2024/speakers/ai-seahawk.webp" alt="secret speaker"/></div>
                <div class="person-info">
                    <div class="person-name">Secret</div>
                </div>
            </div> 
            <div class="person">
                <div class="person-photo"><img src="/_public/images/2024/speakers/ai-tree.webp" alt="secret speaker"/></div>
                <div class="person-info">
                    <div class="person-name">Secret</div>
                </div>
            </div>
            <div class="person">
                <div class="person-photo"><img src="/_public/images/2024/speakers/ai-mushroom.webp" alt="secret speaker"/></div>
                <div class="person-info">
                    <div class="person-name">Secret</div>
                </div>
            </div> 
        </div>`
}