function getBaseUrl(req) {
    const { headers } = req
    return `${ headers['x-forwarded-proto']}://${ headers.host }`
}

export {
    getBaseUrl
}