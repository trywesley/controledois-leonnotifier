const { Client } = require("discord.js")

module.exports = class LeonC2NotifierClient extends Client {
	constructor(token) {
		super()
		super.login(token)
                
		this.acess = ["451920956768649226", "317714973784670208"]
                this._logs = []
	}
        
	get status () {
            const object = {
                ping: this.ws.ping + "ms",
                rssUsage: Math.round(process.memoryUsage().rss / 1024 / 1024) + "MB",
                checkInterval: Client.check_interval
            }
            return object
	}

        get logs () {
            return this._logs.join("\n")
        }

        log (text) {
            if(this._logs.length && this._logs[this._logs.length] === text) return
            if(this._logs.length > 10) {
                this._logs.shift()
            }
            console.log(text)
            this._logs.push(text)
        }
}
