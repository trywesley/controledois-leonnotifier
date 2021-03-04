require('dotenv').config()

const { getLastVideo, getVideoDetails } = require("./structures/youtube")
const sendHandler = require("./structures/discord/sendHandler")
const DiscordClient = require("./structures/discord/Client")
const Client = new DiscordClient(process.env.TOKEN)

async function check ()  {
    const lastVideo = await getLastVideo()
    const lastVideoID = lastVideo.id.split(":")[2]
    const savedLastVideosID = Client.lastVideosID
    
    if(savedLastVideosID.includes(lastVideoID)) return
    const checked = await checkLeon(lastVideoID)
    const trueorfalse = checked ? true : false
    sendHandler(lastVideoID, Client, trueorfalse)
    
    Client.lastVideosID.pop()
    Client.lastVideosID.splice(0, 0, lastVideoID)
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
    const msgs = await Client.channels.cache.get(process.env.SAVE_CHANNEL).messages.fetch({limit: 5}).then(msgs => msgs.map(msg => msg.content.split("/")[3]))
    Client.lastVideosID = msgs
})
