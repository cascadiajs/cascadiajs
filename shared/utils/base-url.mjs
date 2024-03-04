function getBaseUrl() {
    let url
    if (process.env.NODE_ENV === 'testing') {
        url = 'http://localhost:3333'
    }
    else  {
        url = `https://${ process.env.NODE_ENV === 'staging' ? 'staging.' : '' }cascadiajs.com`
    }
    return url
}

export {
    getBaseUrl
}