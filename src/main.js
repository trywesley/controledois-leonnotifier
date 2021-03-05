require('dotenv').config()

const fetch = require("node-fetch")
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
    return videoInfo.tags ? videoInfo.tags.includes("Rezende") : null
}

Client.check_interval = setInterval(check, 60000)

setInterval(async () => {
    const videoid = await fetch("https://www.googleapis.com/youtube/v3/search?key=" + process.env.YOUTUBE_KEY + "&channelId=UCbTVTephX30ZhQF5zwFppBg&part=id&order=date&maxResults=1")
    .then(res => res.json())
    .then(res => res.items[0].id.videoId)
    .catch(error => console.log(error))
  
    if(Client.lastVideosID.includes(videoid)) return
    Client.log("Achei vídeo novo pelo segundo método")
}, 60000)
