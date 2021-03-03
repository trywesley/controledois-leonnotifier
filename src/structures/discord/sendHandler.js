const Discord = require("discord.js")

module.exports = async function sH (video, Client) {
    const channel = Client.channels.cache.get(process.env.DISCORD_CHANNEL)
    const embed = new Discord.MessageEmbed()
    .setTitle("teste")

    channel.send(embed)
}
