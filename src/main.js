require('dotenv').config()

const DiscordClient = require("./structures/discord/Client")
const Client = new DiscordClient(process.env.TOKEN)
