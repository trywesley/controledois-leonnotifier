const RSSParser = require("rss-parser")
const Parser = new RSSParser()

module.exports = async function gLV () {
    const parsed = await Parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCyOW9Dg7DOKazT6384t_yaA")
    console.log(parsed)
    return parsed.items[0]
}
