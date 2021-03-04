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
    const trueorfalse = checked ? true : false
    sendHandler(lastVideoID, Client, trueorfalse)
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

Client.on("ready", async () => {
    const lastMessage = await Client.channels.cache.get(process.env.SAVE_CHANNEL).messages.fetch().then(msg => msg.first().content)
    const fatied = lastMessage.split("/")

    Client.lastVideoID = fatied[fatied.length-1]
})
