let Layout = require('./layout')

let Template = function() {
    return /*html*/`
    <h1>CascadiaJS - a conference for web developers in the Pacific Northwest</h1>
    <h2>Coming Up</h2>
    <ul>
    <li><a target="_blank" href="https://2022.cascadiajs.com">CascadiaJS 2022</a> on August 30 - September 2, 2022</li>
    </ul>
    <h2>Past</h2>
    <ul>
        <li><a target="_blank" href="https://2021.cascadiajs.com">2021</a></li>
        <li><a target="_blank" href="https://2020.cascadiajs.com">2020</a></li>
        <li><a target="_blank" href="https://2019.cascadiajs.com">2019</a></li>
        <li><a target="_blank" href="https://2018.cascadiajs.com">2018</a></li>
        <li><a target="_blank" href="https://2016.cascadiajs.com">2016</a></li>
        <li><a target="_blank" href="https://2015.cascadiajs.com">2015</a></li>
        <li><a target="_blank" href="https://2014.cascadiajs.com">2014</a></li>
        <li><a target="_blank" href="https://2013.cascadiajs.com">2013</a></li>
        <li><a target="_blank" href="https://2012.cascadiajs.com">2012</a></li>
    </ul>
    <h2>Mailing List</h2>
    <p>Stay up-to-date on upcoming CFPs, events and other fun announcements by joining our <a href="/mailing-list">community mailing list</a>.</p>
    <h2>Code</h2>
    <p>The code for this website is hosted on <a href="https://github.com/cascadiajs/cascadiajs">Github</a>.</p>
`
}

module.exports = async function Index() {
    let content = Template()
    html = Layout({ content })
    return { html }
}
