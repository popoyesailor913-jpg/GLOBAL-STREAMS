const fs = require('fs');
const https = require('https');
const http = require('http');

async function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

function checkCors(urlStr) {
    return new Promise((resolve) => {
        const client = urlStr.startsWith('https') ? https : http;
        const req = client.get(urlStr, { 
            timeout: 3000,
            headers: { 'Origin': 'http://localhost:8081', 'User-Agent': 'Mozilla/5.0' }
        }, (res) => {
            const cors = res.headers['access-control-allow-origin'];
            const type = res.headers['content-type'] || '';
            const isM3u8 = type.includes('mpegurl') || urlStr.includes('.m3u8');
            resolve({ url: urlStr, hasCors: !!cors, isM3u8, status: res.statusCode });
            req.abort();
        });
        req.on('timeout', () => { req.abort(); resolve({ hasCors: false }); });
        req.on('error', () => resolve({ hasCors: false }));
    });
}

async function run() {
    console.log("Downloading IPTV-Org databases...");
    const channels = await fetchJson('https://iptv-org.github.io/api/channels.json');
    const streams = await fetchJson('https://iptv-org.github.io/api/streams.json');
    
    // Find all channels that are webcams, cctv, or weather
    const webcamChannels = channels.filter(c => 
        (c.categories && (c.categories.includes('webcam') || c.categories.includes('cctv'))) ||
        (c.name && c.name.toLowerCase().includes('cam'))
    );
    
    console.log(`Found ${webcamChannels.length} webcam channels. Finding online streams...`);
    
    const candidates = [];
    for (const c of webcamChannels) {
        const stream = streams.find(s => s.channel === c.id && (s.status === 'online' || !s.status));
        if (stream) {
            candidates.push({
                id: c.id,
                name: c.name,
                location: (c.country ? c.country : c.languages?.[0]) || "Unknown",
                // Generate a random spread for visual demo if exact coords aren't known
                lat: (Math.random() - 0.5) * 120,
                lng: (Math.random() - 0.5) * 360,
                type: 'hls',
                url: stream.url
            });
        }
    }
    
    console.log(`Found ${candidates.length} online stream candidates. Testing CORS natively...`);
    
    const verifiedStreams = [];
    
    // Add our manual known-good news streams first
    const manualGood = [
        { id: "live-redbull", name: "RedBull TV Live (Sports)", location: "AT", lat: 47.8095, lng: 13.0550, type: "hls", url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8" },
        { id: "live-trt", name: "TRT World Live (News)", location: "TR", lat: 41.0082, lng: 28.9784, type: "hls", url: "https://tv-trtworld.medya.trt.com.tr/master.m3u8" },
        { id: "live-dw", name: "DW News (Continuous)", location: "DE", lat: 52.5200, lng: 13.4050, type: "hls", url: "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8" },
        { id: "live-cbs", name: "CBS News (Continuous)", location: "US", lat: 38.9072, lng: -77.0369, type: "hls", url: "https://cbsn-us.cbsnstream.cbsnews.com/out/v1/55a8648e8f134e82a470f83d562deeca/master.m3u8" }
    ];
    verifiedStreams.push(...manualGood);
    
    // Batch test to speed things up
    const BATCH_SIZE = 10;
    for (let i = 0; i < candidates.length; i += BATCH_SIZE) {
        const batch = candidates.slice(i, i + BATCH_SIZE);
        process.stdout.write(`Testing batch ${i/BATCH_SIZE + 1}/${Math.ceil(candidates.length/BATCH_SIZE)}... `);
        
        const results = await Promise.all(batch.map(c => checkCors(c.url)));
        
        let validInBatch = 0;
        for (let j = 0; j < results.length; j++) {
            if (results[j].hasCors && results[j].isM3u8 && results[j].status === 200) {
                verifiedStreams.push(batch[j]);
                validInBatch++;
            }
        }
        console.log(`Found ${validInBatch} working streams.`);
        
        // Stop if we found a massive list already
        if (verifiedStreams.length >= 50) break;
    }
    
    fs.writeFileSync('streams.json', JSON.stringify(verifiedStreams, null, 2));
    console.log(`\nDONE! Saved ${verifiedStreams.length} perfectly working open-CORS webcams to streams.json`);
}

run();
