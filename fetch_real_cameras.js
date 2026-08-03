const fs = require('fs');
const https = require('https');

// Keep our core test streams to ensure fallback
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
  }
];

console.log("Fetching real live traffic cameras from Transport for London (TfL) Open API...");

https.get('https://api.tfl.gov.uk/Place/Type/JamCam', (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    try {
        const places = JSON.parse(data);
        const generated_streams = [...core_streams];

        places.forEach(place => {
            // Find video URL
            let videoUrl = null;
            let imageUrl = null;
            
            if (place.additionalProperties) {
                place.additionalProperties.forEach(prop => {
                    if (prop.key === 'videoUrl') videoUrl = prop.value;
                    if (prop.key === 'imageUrl') imageUrl = prop.value;
                });
            }

            if (videoUrl || imageUrl) {
                generated_streams.push({
                    id: place.id,
                    name: place.commonName || "London Traffic Cam",
                    location: "London, UK",
                    lat: place.lat,
                    lng: place.lon,
                    type: videoUrl ? "mp4" : "mjpeg",
                    url: videoUrl || imageUrl
                });
            }
        });

        fs.writeFileSync('streams.json', JSON.stringify(generated_streams, null, 2));
        console.log(`Successfully pulled ${generated_streams.length - core_streams.length} real live cameras from London!`);
        console.log(`Total streams saved to streams.json: ${generated_streams.length}`);

    } catch (err) {
        console.error("Error parsing TfL JSON data:", err);
    }
  });

}).on("error", (err) => {
  console.log("Error fetching from TfL:", err.message);
});
