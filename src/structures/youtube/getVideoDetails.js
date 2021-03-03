module.exports = async function gVD (id) {
    const video = await fetch("https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + process.env.YOUTUBE_KEY + "&part=snippet")
    .then(res => res.json())
   
    const videoDetails = video.items[0] ? video.items[0].snippet : null
    return videoDetails
}
