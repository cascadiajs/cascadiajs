const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("styles")
    eleventyConfig.addPlugin(syntaxHighlight)
    // add custom collections for speakers, talks, events and tags
    eleventyConfig.addCollection("talks", function(collections) {
        return collections.items.filter(page => page.filePathStem.startsWith('/talks/') && !page.inputPath.endsWith('index.11ty.js'))
    })
    eleventyConfig.addCollection("speakers", function(collections) {
        return collections.items.filter(page => page.filePathStem.startsWith('/speakers/') && !page.inputPath.endsWith('index.11ty.js'))
    })
    eleventyConfig.addCollection("events", function(collections) {
        return collections.items.filter(page => page.filePathStem.startsWith('/events/') && !page.inputPath.endsWith('index.11ty.js'))
    })
    eleventyConfig.addCollection("tagList", collection => {
        const tagsSet = new Set();
        collection.getAll().forEach(item => {
          if (!item.data.tags) return;
          item.data.tags
            .filter(tag => !['post', 'all'].includes(tag))
            .forEach(tag => tagsSet.add(tag));
        });
        return Array.from(tagsSet).sort();
    })
}