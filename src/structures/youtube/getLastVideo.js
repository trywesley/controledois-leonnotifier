const RSSParser = require("rss-parser")
const Parser = new RSSParser()

module.exports = async function gLV () {
    const parsed = await Parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCxjbUx2CAQruXh4IrXv5ltA")
    return parsed.items[0]
}
