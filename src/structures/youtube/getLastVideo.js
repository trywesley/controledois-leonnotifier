const RSSParser = require("rss-parser")
const Parser = new RSSParser()

module.exports = async function gLV () {
    const parsed = await Parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCbTVTephX30ZhQF5zwFppBg")
    const lastVideo = parsed.items.sort((a, b) => {
        const A = new Date(a.pubDate).getTime()
        const B = new Date(b.pubDate).getTime()
        return B - A
    })

    return lastVideo[0]
}
