const util = require('util')

module.exports = async function evaluate(Client, content, channel) {
    const regex = /<@!?(\d{16,18})>/g
    content = content.replace(reg, 'Client.users.cache.get("$1")')
    content = content.split(" ").slice(1).join(" ")
 
    let result
    try {
        const evaled = await eval(content)
        result = util.inspect(evaled, { compact: true, depth: 0 });
    } catch (error) {
        result = error.toString()
    }
        
    channel.send(result, {code: 'js'})
}
