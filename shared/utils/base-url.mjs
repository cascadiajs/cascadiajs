function getBaseUrl(req) {
    // the code below no longer works in raw AWS (it worked in the Begin hosting env)
    //const { headers } = req
    //return `${ headers['x-forwarded-proto']}://${ headers.host }`
    let baseUrl
    switch (process.env.ARC_ENV) {
        case 'staging':
            baseUrl = 'https://staging.cascadiajs.com';
            break;
        case 'production':
            baseUrl = 'https://cascadiajs.com';
            break;
        default:
            baseUrl = 'http://localhost:3333';
    }
    return baseUrl
}

export {
    getBaseUrl
}