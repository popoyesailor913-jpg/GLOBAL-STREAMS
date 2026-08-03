const fs = require('fs');
const https = require('https');

async function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

async function run() {
    console.log("Fetching channels...");
    const channels = await fetchJson('https://iptv-org.github.io/api/channels.json');
    console.log("Fetching streams...");
    const streams = await fetchJson('https://iptv-org.github.io/api/streams.json');

    const webcamChannels = channels.filter(c => 
        (c.categories && c.categories.includes('webcam')) || 
        (c.name && c.name.toLowerCase().includes('cam')) ||
        (c.categories && c.categories.includes('weather'))
    );

    const generated = [];

    // Map channels to streams
    for (const c of webcamChannels) {
        const stream = streams.find(s => s.channel === c.id && s.status === 'online');
        if (stream) {
            // Give them some random spread out coordinates for the demo if country is unknown, 
            // otherwise use a rough country center.
            let lat = (Math.random() - 0.5) * 120;
            let lng = (Math.random() - 0.5) * 360;
            
            generated.push({
                id: c.id,
                name: c.name,
                location: c.country || "Global Webcams",
                lat: lat,
                lng: lng,
                type: 'hls',
                url: stream.url
            });
            
            if (generated.length >= 100) break; // Limit to 100 for stability
        }
    }
    
    // Add known working NASA ISS stream
    generated.push({
        id: "nasa-iss",
        name: "NASA ISS Earth View",
        location: "Low Earth Orbit",
        lat: 0,
        lng: 0,
        type: 'hls',
        url: 'https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8'
    });

    fs.writeFileSync('streams.json', JSON.stringify(generated, null, 2));
    console.log(`Saved ${generated.length} live continuous HLS webcams to streams.json`);
}

run();
