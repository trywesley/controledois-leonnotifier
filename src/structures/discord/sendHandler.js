module.exports = async function sH (id, Client) {
    const channel = Client.channels.cache.get(process.env.DISCORD_CHANNEL)
    channel.send("https://youtu.be/" + id)
}
