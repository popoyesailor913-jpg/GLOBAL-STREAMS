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
  },
  {
    "id": "yt-aljazeera",
    "name": "Al Jazeera English",
    "location": "Doha, Qatar",
    "lat": 25.3155,
    "lng": 51.5218,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/live_stream?channel=UCNye-wNBqNL5ZzHSJj3l8Bg&autoplay=1"
  },
  {
    "id": "yt-skynews",
    "name": "Sky News",
    "location": "London, UK",
    "lat": 51.4880,
    "lng": -0.3240,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/live_stream?channel=UCoMdktPbSTixAyNGwb-UYkQ&autoplay=1"
  },
  {
    "id": "yt-dwnews",
    "name": "DW News",
    "location": "Bonn, Germany",
    "lat": 50.7169,
    "lng": 7.1265,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/live_stream?channel=UCknLrEdhRCp1aegoMqRaCEg&autoplay=1"
  },
  {
    "id": "yt-france24",
    "name": "France 24",
    "location": "Paris, France",
    "lat": 48.8285,
    "lng": 2.2709,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/live_stream?channel=UCQfwfsi5VrQ8yKZ-UWmAEFg&autoplay=1"
  },
  {
    "id": "yt-abcaustralia",
    "name": "ABC News Australia",
    "location": "Sydney, Australia",
    "lat": -33.8808,
    "lng": 151.1994,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/live_stream?channel=UCmaCB1sT2j4tK4H36xSg8-w&autoplay=1"
  },
  {
    "id": "yt-ndtv",
    "name": "NDTV India",
    "location": "New Delhi, India",
    "lat": 28.5562,
    "lng": 77.2255,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/live_stream?channel=UCqKifOVh_0_xT20tX-U7zcw&autoplay=1"
  },
  {
    "id": "yt-nbcnews",
    "name": "NBC News",
    "location": "New York, USA",
    "lat": 40.7590,
    "lng": -73.9790,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/live_stream?channel=UCeY0bbntWzzVIaj2z3QigXg&autoplay=1"
  },
  {
    "id": "yt-euronews",
    "name": "EuroNews",
    "location": "Lyon, France",
    "lat": 45.7428,
    "lng": 4.8194,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/live_stream?channel=UCSrZ3GWuQqvnPw0-W39zVkQ&autoplay=1"
  },
  {
    "id": "yt-cna",
    "name": "CNA (Channel News Asia)",
    "location": "Singapore",
    "lat": 1.2996,
    "lng": 103.8456,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/live_stream?channel=UC83jt4dlz1Gjl58fzQrrKZg&autoplay=1"
  }
];

const m3u8Streams = currentStreams.filter(s => s.type !== 'youtube');
const finalStreams = [...m3u8Streams, ...youtubeStreams];

fs.writeFileSync('streams.json', JSON.stringify(finalStreams, null, 2));
console.log(`Added 5 reliable YouTube streams for yt-dlp backend extraction.`);
