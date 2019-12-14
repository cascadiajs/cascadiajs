let initCap = (str) => {
    return str && str[0].toUpperCase()+str.slice(1)
}

let urlToTitle = (url) => {
    return url ? url.slice(1, url.length - 1) // get rid of the leading and trailing slashes
        .split("/") 
        .map(s => s.split("-")) // de-slugify the words in the string
        .reduce((a, c) => `${a} >> ${c.reduce((a, c) => `${a} ${initCap(c)}`, "")}`, "") // piece it all back together into a human readable path
        : ""
}

module.exports = urlToTitle