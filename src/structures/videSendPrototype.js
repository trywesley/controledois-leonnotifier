const Discord = require("discord.js")

class Prototypes {
    static load() {
        Discord.Message.prototype.desply = function reply(ind, ref = undefined, ...args) {
            const msg = phrases(ind, ref)
            return this.channel.send(msg)
        }
    }
}

module.exports = Prototypes
