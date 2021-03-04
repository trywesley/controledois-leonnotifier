module.exports = async function sH (id, Client) {
    const channelRCDN = Client.channels.cache.get(process.env.DISCORD_CHANNEL)    
    const channelSAVE = Client.channels.cache.get(process.env.SAVE_CHANNEL)

    if(trueorfalse) {
        channelRCDN.send("https://youtu.be/" + id)
    }

    channelSAVE.send("https://youtu.be/" + id)
}
