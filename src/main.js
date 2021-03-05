require('dotenv').config()

const { getLastVideo, getVideoDetails } = require("./structures/youtube")
const { DiscordClient, sendHandler } = require("./structures/discord")
const Client = new DiscordClient(process.env.TOKEN)

async function check ()  {
    const lastVideo = await getLastVideo()
    const lastVideoID = lastVideo.id.split(":")[2]
    const savedLastVideosID = Client.lastVideosID

    Client.log("Estou aguardando novos vídeos")
    
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

Client.check_interval = setInterval(check, 60000)

Client.on("message", message => {
    if(!Client.acess.includes(message.author.id)) return
    if(message.content.startsWith("evaluate")) {
        require("./structures/discord/commands/evaluate")(Client, message.content, message.channel)
    }
})

Client.on("ready", async () => {
    const msgs = await Client.channels.cache.get(process.env.SAVE_CHANNEL).messages.fetch({limit: 5}).then(msgs => msgs.map(msg => msg.content.split("/")[3]))
    Client.lastVideosID = msgs
    Client.log(Date.now() + " - Estou online novamente")
})
