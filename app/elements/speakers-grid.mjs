const speakers = [
    { 
        id: "aaron-gustafson",
        name: "Aaron Gustafson",
        company: "Microsoft",
        image: "aaron-gustafson.jpg",
        location: "Seattle, WA, USA"
    },
    { 
        id: "aiden-bai",
        name: "Aiden Bai",
        company: "million.dev",
        image: "aiden-bai.jpg",
        location: "San Francisco, CA, USA"
    },
    { 
        id: "dominic-farolino",
        name: "Dominic Farolino",
        company: "Google",
        image: "dominic-farolino.jpg",
        location: "Cambridge, MA, USA"
    },
    { 
        id: "geoff-rich",
        name: "Geoff Rich",
        company: "Ordergroove",
        image: "geoff-rich.jpg",
        location: "Tacoma, WA, USA"
    },
    { 
        id: "henri-helvetica",
        name: "Henri Helvetica",
        company: "command-h",
        image: "henri-helvetica.jpg",
        location: "Toronto, Canada"
    },
    { 
        id: "herve-aniglo",
        name: "Herve Aniglo",
        company: "Black Girls Code",
        image: "herve-aniglo.jpg",
        location: "Atlanta, GA, USA"
    },
    { 
        id: "jacob-lee",
        name: "Jacob Lee",
        company: "LangChain",
        image: "jacob-lee.jpg",
        location: "San Francisco, CA, USA"
    },
    { 
        id: "jerome-woody",
        name: "Jerome Woody",
        company: "Discogs",
        image: "jerome-woody.jpg",
        location: "Seattle, WA, USA"
    },
    { 
        id: "josh-goldberg",
        name: "Josh Goldberg",
        company: "Freelance / Open Source",
        image: "josh-goldberg.jpg",
        location: "Philadelphia, PA, USA"
    },
    { 
        id: "kristen-thayer",
        name: "Kristen M Thayer",
        company: "Seesaw Learning",
        image: "kristen-thayer.jpg",
        location: "Seattle, WA, USA"
    },
    { 
        id: "molly-jean-bennett",
        name: "Molly Jean Bennett",
        company: "Grow Therapy",
        image: "molly-jean-bennett.jpg",
        location: "Portland, OR, USA"
    },
    { 
        id: "penelope-mclachlan",
        name: "Penelope McLachlan",
        company: "Google",
        image: "penelope-mclachlan.jpg",
        location: "Vancouver, BC, Canada"
    },
    { 
        id: "rizel-scarlett",
        name: "Rizel Scarlett",
        company: "TBD",
        image: "rizel-scarlett.jpg",
        location: "Boston, MA, USA"
    },
    { 
        id: "swyx",
        name: "Shawn Swyx Wang",
        company: "smol.ai",
        image: "swyx.jpg",
        location: "San Francisco, CA, USA"
    },
    { 
        id: "shruti-kapoor",
        name: "Shruti Kapoor",
        company: "Slack",
        image: "shruti-kapoor.jpg",
        location: "Washington, DC, USA"
    },
    { 
        id: "tejas-kumar",
        name: "Tejas Kumar",
        company: "Consultant @ DevRel",
        image: "tejas-kumar.jpg",
        location: "Berlin, Germany"
    },
    { 
        id: "tracy-lee",
        name: "Tracy Lee",
        company: "This Dot",
        image: "tracy-lee.jpg",
        location: "Atlanta, GA, USA"
    },
    { 
        id: "tyler-sticka",
        name: "Tyler Sticka",
        company: "Cloud Four",
        image: "tyler-sticka.jpg",
        location: "Portland, OR, USA"
    }
]

export default function Sponsors({ html }) {
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
            <div class="person">
                <div class="person-photo"><img src="/_public/images/2024/speakers/ai-mountain.webp" alt="secret speaker"/></div>
                <div class="person-info">
                    <div class="person-name">Secret</div>
                </div>
            </div>
        </div>`
}