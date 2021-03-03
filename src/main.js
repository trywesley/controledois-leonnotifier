require('dotenv').config()

const { getLastVideo, getVideoDetails } = require("./structures/youtube")
const sendHandler = require("./structures/discord/sendHandler")
const DiscordClient = require("./structures/discord/Client")
const Client = new DiscordClient(process.env.TOKEN)

async function check ()  {
    const lastVideo = await getLastVideo()
    const savedLastVideo = Client.lastVideo
    
    if(lastVideo.link === savedLastVideo.link) return
    const checked = await checkLeon(lastVideo.id.split(":")[2])
    if(checked.includesLeon) {
        sendHandler(checked.videoID, Client)
    }

    Client.lastVideo = lastVideo
}

async function checkLeon (id) {
    const videoInfo = await getVideoDetails(id)
    const returnObject = {
        includesLeon: videoInfo.tags.includes("leon"),
        videoID: id
    }

    return returnObject
}

setInterval(check, 30000)

Client.on("message", message => {

if(!message.content.startsWith("lastVideo")) return
console.log(Client.lastVideo)

})
