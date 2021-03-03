const RSSParser = require("rss-parser")
const Parser = new RSSParser()

module.exports = async function gLV () {
    const parsed = await Parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCV306eHqgo0LvBf3Mh36AHg")
    console.log(parsed)
    return parsed.items[0]
}
