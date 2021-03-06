require('dotenv').config()

const { getLastVideo, getVideoDetails } = require("./structures/youtube")
const { DiscordClient, sendHandler } = require("./structures/discord")
const Client = new DiscordClient(process.env.TOKEN)

async function check ()  {
    const lastVideo = await getLastVideo()
    const lastVideoID = lastVideo.id.split(":")[2]

    Client.log("Estou aguardando novos vídeos")
    
    if(Client.lastVideosID.includes(lastVideoID)) return
    const checked = await checkLeon(lastVideoID)
    sendHandler(lastVideoID, Client, checked)
    
    Client.lastVideosID.pop()
    Client.lastVideosID.splice(0, 0, lastVideoID)
}

async function checkLeon (id) {
    const videoInfo = await getVideoDetails(id)
    return videoInfo.tags ? videoInfo.tags.includes("leon") : null
}

Client.check_interval = setInterval(check, 60000)
