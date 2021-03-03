require('dotenv').config()

const { getLastVideo, getVideoDetails } = require("./structures/youtube")
const sendHandler = require("./structures/discord/sendHandler")
const DiscordClient = require("./structures/discord/Client")
const Client = new DiscordClient(process.env.TOKEN)

async function check ()  {
    const lastVideo = await getLastVideo()
    const lastVideoID = lastVideo.id.split(":")[2]
    const savedLastVideoID = Client.lastVideoID
    
    if(lastVideoID === savedLastVideoID) return
    const checked = await checkLeon(lastVideoID)
    if(checked) {
        sendHandler(lastVideoID, Client)
    }

    Client.lastVideoID = lastVideoID
}

async function checkLeon (id) {
    const videoInfo = await getVideoDetails(id)
    return videoInfo.tags ? videoInfo.tags.includes("felipe neto") : null
}

setInterval(check, 60000)

Client.on("message", message => {

if(!message.content.startsWith("ping")) return
Client.channels.cache.get(process.env.DISCORD_CHANNEL).send(Client.ws.ping)

})
