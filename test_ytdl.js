const ytdl = require('@distube/ytdl-core');

async function test() {
    try {
        const url = 'https://www.youtube.com/watch?v=1EiC9bvVGnk';
        console.log("Fetching info for:", url);
        const info = await ytdl.getInfo(url);
        
        console.log("Is Live?", info.videoDetails.isLiveContent);
        console.log("Title:", info.videoDetails.title);
        
        const hlsFormat = info.formats.find(f => f.isHLS);
        if (hlsFormat) {
            console.log("SUCCESS! Found HLS URL:", hlsFormat.url);
        } else {
            console.log("No HLS format found.");
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}
test();
