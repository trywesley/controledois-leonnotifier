require('dotenv').config()

const { getLastVideo, getVideoDetails } = require("./structures/youtube")
const { DiscordClient, sendHandler } = require("./structures/discord")
const Client = new DiscordClient(process.env.TOKEN, {
  disabledEvents: [
    "GUILD_MEMBER_ADD",
    "GUILD_MEMBER_REMOVE",
    "GUILD_MEMBER_UPDATE",
    "GUILD_MEMBERS_CHUNK",
    "GUILD_ROLE_CREATE",
    "GUILD_ROLE_DELETE",
    "GUILD_ROLE_UPDATE",
    "GUILD_BAN_ADD",
    "GUILD_BAN_REMOVE",
    "CHANNEL_CREATE",
    "CHANNEL_DELETE",
    "CHANNEL_UPDATE",
    "CHANNEL_PINS_UPDATE",
    "MESSAGE_CREATE",
    "MESSAGE_DELETE",
    "MESSAGE_UPDATE",
    "MESSAGE_DELETE_BULK",
    "MESSAGE_REACTION_ADD",
    "MESSAGE_REACTION_REMOVE",
    "MESSAGE_REACTION_REMOVE_ALL",
    "USER_UPDATE",
    "USER_NOTE_UPDATE",
    "USER_SETTINGS_UPDATE",
    "PRESENCE_UPDATE",
    "VOICE_STATE_UPDATE",
    "TYPING_START",
    "VOICE_SERVER_UPDATE",
    "RELATIONSHIP_ADD",
    "RELATIONSHIP_REMOVE"
  ]
})

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
    return videoInfo.tags ? videoInfo.tags.includes("felipe neto") : null
}

Client.check_interval = setInterval(check, 60000)
