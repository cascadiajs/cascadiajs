let Layout = require('./layout')

let Template = function({ session }) {
    return /*html*/`
        <p>${ JSON.stringify(session) }</p>
        ${ session && session.logged_in ? '<p><form method=post action=/logout><button>Log Out</button></form></p>' : '' }

`
}

module.exports = async function Home({ session }) {
    let content = Template({ session })
    html = Layout({ content })
    return { html }
}
