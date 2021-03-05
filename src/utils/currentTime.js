module.exports = function cT () {
    const d = new Date()

    let hour = d.getHours() - 3
    hour = hour < 0 ? 24 + hour : hour
    hour = hour.toString().padStart(2, "0") 
    const minutes = d.getMinutes().toString().padStart(2, "0")

    return hour+":"+minutes
}
