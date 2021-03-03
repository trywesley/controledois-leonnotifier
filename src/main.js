require('dotenv').config()

const RSSParser = require("rss-parser")
const Parser = new RSSParser()
const DiscordClient = require("./structures/discord/Client")
const Client = new DiscordClient(process.env.TOKEN)

const parsed = Parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCSRmIdDu1XFDr2iViBvcEDA")
console.log(parsed)

Client.on("message", message => {

if(!message.content.startsWith("1")) return
message.reply("555")

})
