module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("CNAME")
    eleventyConfig.addPassthroughCopy("styles")
}