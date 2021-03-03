require('dotenv').config()

const getLastVideo = require("./structures/youtube/getLastVideo")
const DiscordClient = require("./structures/discord/Client")
const Client = new DiscordClient(process.env.TOKEN)

async function saveLastVideo () {
    const lastVideo = await getLastVideo()
    Client.lastVideo = lastVideo
}

async function check ()  {
    const lastVideo = await getLastVideo()
    const savedLastVideo = Client.lastVideo
    
    if(lastVideo.link === saveLastVideo.link) return
}

async function checkLeon () {
    const videoInfo = getVideoDetails(url)
}

saveLastVideo()

Client.on("message", message => {

if(!message.content.startsWith("lastVideo")) return
message.reply(Client.lastVideoURL)

})
