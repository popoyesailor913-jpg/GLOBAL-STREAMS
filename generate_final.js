const fs = require('fs');

let currentStreams = [];
try {
    currentStreams = JSON.parse(fs.readFileSync('streams.json', 'utf8'));
} catch (e) {
    console.log("Could not read streams.json");
}

const youtubeStreams = [
  {
    "id": "yt-earthcam",
    "name": "EarthCam (Times Square)",
    "location": "New York City, USA",
    "lat": 40.7580,
    "lng": -73.9855,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/live_stream?channel=UCJT_Zk3Fj5oVz2F0N7tFk5g&autoplay=1"
  },
  {
    "id": "yt-jacksonhole",
    "name": "Jackson Hole Town Square",
    "location": "Jackson, Wyoming, USA",
    "lat": 43.4799,
    "lng": -110.7624,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/1EiC9bvVGnk?autoplay=1"
  },
  {
    "id": "yt-lofigirl",
    "name": "Lofi Girl Radio",
    "location": "Paris, France",
    "lat": 48.8566,
    "lng": 2.3522,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1"
  },
  {
    "id": "yt-nasa",
    "name": "NASA Live Official",
    "location": "Houston, Texas, USA",
    "lat": 29.5502,
    "lng": -95.097,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/M3HKLzjvKPc?autoplay=1"
  },
  {
    "id": "yt-explore",
    "name": "Explore Oceans",
    "location": "Long Beach, California",
    "lat": 33.7701,
    "lng": -118.1937,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/jxnehowX-9Y?autoplay=1"
  }
];

const m3u8Streams = currentStreams.filter(s => s.type !== 'youtube');
const finalStreams = [...m3u8Streams, ...youtubeStreams];

fs.writeFileSync('streams.json', JSON.stringify(finalStreams, null, 2));
console.log(`Added 5 reliable YouTube streams for yt-dlp backend extraction.`);
