const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("CNAME")
    eleventyConfig.addPassthroughCopy("styles")
    eleventyConfig.addPlugin(syntaxHighlight)
    // add custom collections for speakers, talks and events
    eleventyConfig.addCollection("talks", function(collections) {
        return collections.items.filter(page => page.filePathStem.startsWith('/talks/'))
    })
    eleventyConfig.addCollection("speakers", function(collections) {
        return collections.items.filter(page => page.filePathStem.startsWith('/speakers/'))
    })
    eleventyConfig.addCollection("events", function(collections) {
        return collections.items.filter(page => page.filePathStem.startsWith('/events/'))
    })
    eleventyConfig.addCollection("meetups", function(collections) {
        return collections.items.filter(page => page.filePathStem.startsWith('/meetups/'))
    })      
}