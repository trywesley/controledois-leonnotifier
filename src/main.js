require('dotenv').config()

const DiscordClient = require("./structures/discord/Client")
const Client = new DiscordClient(process.env.TOKEN)

Client.on("message", message => {

if(!message.content.startsWith("1")) return
message.reply("555")
})
