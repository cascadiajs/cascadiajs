let urlToTitle = require('./title_builder')

module.exports = {
    render: ({ pkg, /*page,*/ title, pageTitle, content }) => {
        return `
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CascadiaJS ${ pageTitle || title ? `- ${ pageTitle || title }` : `` }</title>
        <link rel="stylesheet" href="https://use.typekit.net/nln6hzq.css">
        <link rel="stylesheet" href="/styles/main.css?v=${pkg.version}">
        <link id="light-scheme-icon" rel="icon" href="/images/icon.svg">
    </head>
    <body>
    <header>
        <a href="/">Home</a>
        <a href="/events">Events</a>
        <a href="/speakers">Speakers</a>
        <a href="/talks">Talks</a>
        <a href="/tags">Topics</a>
        <a href="/api">API</a>
    </header>
    <div id="main">
    ${ content}
    </div>
    <footer>
    </footer>
    </body>
</html>`
    }
}