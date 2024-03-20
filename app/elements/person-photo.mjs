export default function PersonPhoto({ html, state }) {
    const { attrs } = state
    const { name, image, overlay, large } = attrs
    return html`
        <style>
        .person-photo {
            /*background-color:    #ccf1db;*/
            display:             flex;
            height:              ${ large ? '300px' : '250px'};
            width:               ${ large ? '300px' : '250px'};
            overflow:            hidden;
            padding:             0;
            position:            relative;
        }

        .person-photo img {
            /*filter:              grayscale(100%) contrast(1) blur(0px);*/
            flex:                1 0 100%;
            height:              ${ large ? '300px' : '250px'};
            max-width:           ${ large ? '300px' : '250px'};
            /*mix-blend-mode:      multiply;*/
            object-fit:          cover;
            /*opacity:             1;*/
            position:            relative;
            width:               ${ large ? '300px' : '250px'};
        }

        /*.person-photo::before {
            background-color:    #112378;
            bottom:              0;
            content:             '';
            height:              ${ large ? '300px' : '250px'};
            left:                0;
            mix-blend-mode:      lighten;
            position:            absolute;
            right:               0;
            top:                 0;
            width:               ${ large ? '300px' : '250px'};
            z-index:             1;
        }*/
        </style>
        <div class="person-photo">
            <img src="${ image }" alt="photo of ${ name }"/>
            ${ overlay ? `
            <div class="overlay">
                <div class="text">${ overlay }</div>
            </div>
        </div>
        ` : ''}
    `
}