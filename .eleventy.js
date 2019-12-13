const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("CNAME")
    eleventyConfig.addPassthroughCopy("styles")
    eleventyConfig.addPlugin(syntaxHighlight);
}