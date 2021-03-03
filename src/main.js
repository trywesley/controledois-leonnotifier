require('dotenv').config()

const getLastVideo = require("./structures/youtube/getLastVideo")
const DiscordClient = require("./structures/discord/Client")
const Client = new DiscordClient(process.env.TOKEN)

async function saveLastVideo () {
    const lastVideo = await getLastVideo()
    Client.lastVideoURL = lastVideo.link
}

saveLastVideo()

Client.on("message", message => {

if(!message.content.startsWith("1")) return
message.reply("555")

})
