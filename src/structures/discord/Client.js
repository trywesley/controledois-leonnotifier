const { Client } = require("discord.js")

module.exports = class LeonC2NotifierClient extends Client {
	constructor(token) {
		super()
		super.login(token)
                
		this.acess = ["451920956768649226", "317714973784670208"]
                this.lastVideoID = null
	}
        
	get status () {
            const object = {
                ping: this.ws.ping,
                rssUsage: Math.round(process.memoryUsage().rss / 1024 / 1024) + "MB",
                checkInterval: Client.check_interval,
            }
		return object
	}
}
