const fs = require('fs');

const core_streams = [
  {
    "id": "hls-cam-01",
    "name": "Mux HLS Test (Big Buck Bunny)",
    "location": "Monterey, California",
    "lat": 36.6002,
    "lng": -121.8946,
    "type": "hls",
    "url": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" 
  },
  {
    "id": "hls-cam-02",
    "name": "Apple HLS Test (BipBop)",
    "location": "Boston, MA",
    "lat": 42.3601,
    "lng": -71.0589,
    "type": "hls",
    "url": "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8"
  },
  {
    "id": "test-01",
    "name": "New York (Demo)",
    "location": "New York, USA",
    "lat": 40.7580,
    "lng": -73.9855,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1&mute=1" 
  },
  {
    "id": "test-02",
    "name": "Tokyo Walk (Demo)",
    "location": "Tokyo, Japan",
    "lat": 35.6595,
    "lng": 139.7001,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
  },
  {
    "id": "test-04",
    "name": "Paris View (Demo)",
    "location": "Paris, France",
    "lat": 48.8584,
    "lng": 2.2945,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/9bZkp7q19f0?autoplay=1&mute=1"
  }
];

const regions = [
    {name: "North America", lat_range: [30, 50], lng_range: [-120, -70], weight: 0.3},
    {name: "Europe", lat_range: [35, 60], lng_range: [-10, 30], weight: 0.4},
    {name: "Asia", lat_range: [10, 45], lng_range: [70, 140], weight: 0.2},
    {name: "South America", lat_range: [-40, 10], lng_range: [-80, -40], weight: 0.05},
    {name: "Australia", lat_range: [-35, -15], lng_range: [115, 150], weight: 0.05}
];

function randomChoice(arr) {
    let sum = arr.reduce((acc, el) => acc + el.weight, 0);
    let rand = Math.random() * sum;
    for (let el of arr) {
        if (rand < el.weight) return el;
        rand -= el.weight;
    }
    return arr[0];
}

const generated_streams = [...core_streams];

for (let i = 0; i < 3000; i++) {
    const region = randomChoice(regions);
    const lat = Math.random() * (region.lat_range[1] - region.lat_range[0]) + region.lat_range[0];
    const lng = Math.random() * (region.lng_range[1] - region.lng_range[0]) + region.lng_range[0];
    
    const is_hls = Math.random() > 0.5;
    const vid_type = is_hls ? "hls" : "youtube";
    const url = is_hls 
        ? "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" 
        : "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1&mute=1";

    generated_streams.push({
        id: `mock-${i}`,
        name: `Public Cam #${i+1000}`,
        location: `Region: ${region.name}`,
        lat: lat,
        lng: lng,
        type: vid_type,
        url: url
    });
}

fs.writeFileSync('streams.json', JSON.stringify(generated_streams, null, 2));
console.log(`Generated ${generated_streams.length} streams.`);
