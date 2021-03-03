require('dotenv').config()

const getLastVideo = require("./structures/youtube/getLastVideo")
const sendHandler = require("./structures/discord/sendHandler")
const DiscordClient = require("./structures/discord/Client")
const Client = new DiscordClient(process.env.TOKEN)

async function check ()  {
    const lastVideo = await getLastVideo()
    const savedLastVideo = Client.lastVideo
    
    if(lastVideo.link === saveLastVideo.link) return
    const checked = await checkLeon(lastVideo.id.split(":")[2])
    if(checked.includesLeon) {
        sendHandler(checked.videoInfo)
    }

    Client.lastVideo = lastVideo
}

async function checkLeon (id) {
    const videoInfo = await getVideoDetails(id)
    const returnObject = {
        includesLeon: videoInfo.tags.includes("leon"),
        videoInfo: videoInfo
    }

    return returnObject
}

// setInterval(check, 30000)

Client.on("message", message => {

if(!message.content.startsWith("lastVideo")) return
console.log(Client.lastVideo)

})
