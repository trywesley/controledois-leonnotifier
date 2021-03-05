module.exports = async function sH (id, Client, trueorfalse) {
    const channelRCDN = Client.channels.cache.get(process.env.DISCORD_CHANNEL)    
    const channelSAVE = Client.channels.cache.get(process.env.SAVE_CHANNEL)
    let message = "Acabei de publicar um vídeo: " + id

    if(trueorfalse) {
        channelRCDN.send("https://youtu.be/" + id)

        const messageFilter = (message) => !message.author.bot
        channelRCDN.awaitMessages(messageFilter, {max: 1, time: 120000}).then(collected => {
            collected.react("817213343248547860")
            Client.log(collected.author.toString() + " foi o primeiro a mandar mensagem no chat")
        })

        message = message + " (Leon)"
    }

    channelSAVE.send("https://youtu.be/" + id)
    Client.log(message)
}
