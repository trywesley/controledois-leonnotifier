module.exports = async function sH (id, Client, trueorfalse) {
    const channelRCDN = Client.channels.cache.get(process.env.DISCORD_CHANNEL)    
    const channelSAVE = Client.channels.cache.get(process.env.SAVE_CHANNEL)
    let message = "Acabei de publicar um vídeo: " + id

    if(trueorfalse) {
        channelRCDN.send("https://youtu.be/" + id)
        message = message + " (Leon)"
    }

    channelSAVE.send("https://youtu.be/" + id)
    Client.log(message)
}
