const { Client } = require("discord.js")
const loadPRTYPS = require("../videoSendPrototype")

module.exports = class LeonC2NotifierClient extends Client {
	constructor(token) {
		super()
		super.login(token)
                
		this.acess = ["451920956768649226"]
                loadPRTYPS.load()
	}
        
	get rssUsage () {
		return Math.round(process.memoryUsage().rss / 1024 / 1024)
	}
}
