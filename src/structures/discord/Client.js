const { Client } = require("discord.js")
const currentTime = require("../../utils/currentTime")

module.exports = class LeonC2NotifierClient extends Client {
	constructor(token) {
		super()
		super.login(token)
                
		this.acess = ["451920956768649226", "317714973784670208"]
                this._logs = []

                this.on("message", message => {
                    if(!this.acess.includes(message.author.id)) return
                    if(message.content.startsWith("evaluate")) {
                        require("./commands/evaluate")(this, message.content, message.channel)
                    }
                })

                this.on("ready", async () => {
                    const msgs = await this.channels.cache.get(process.env.SAVE_CHANNEL).messages.fetch({limit: 5}).then(msgs => msgs.map(msg => msg.content.split("/")[3]))
                    this.lastVideosID = msgs
                    this.log("Estou online novamente")
                })

	}
        
	get status () {
            const object = {
                ping: this.ws.ping + "ms",
                rssUsage: Math.round(process.memoryUsage().rss / 1024 / 1024) + "MB",
                checkInterval: this.check_interval
            }
            return object
	}

        get logs () {
            let message = ""
            this._logs.forEach(log => {
                message = message + "\n " + log.time + " - " + log.message
            })

            return message
        }

        log (text) {
            if(this._logs.length && this._logs[this._logs.length - 1].message === text) return
            if(this._logs.length > 20) {
                this._logs.shift()
            }

            const time = currentTime()
            console.log(text)
            this._logs.push({
                time: time,
                message: text
            })
        }
}
