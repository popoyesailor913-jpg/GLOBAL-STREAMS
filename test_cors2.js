const https = require('https');

const testStreams = [
  "https://static.france24.com/live/F24_EN_HI_HLS/live_web.m3u8",
  "https://d3hpm0spkyw1z8.cloudfront.net/out/v1/a9d5af22097e416a96bc8e63aa992686/index.m3u8", // Euronews
  "https://live.cgtn.com/1000/prog_index.m3u8", // CGTN
  "https://nhkwlive-ojp.akamaized.net/hls/live/2003459/nhkwlive-ojp-en/index.m3u8", // NHK World
  "https://stream.livenowfox.com/m3u8/1080p_stream.m3u8" // LiveNOW from FOX
];

async function checkCors(urlStr) {
  return new Promise((resolve) => {
    const req = https.get(urlStr, { headers: { 'Origin': 'http://localhost:8081' } }, (res) => {
      const cors = res.headers['access-control-allow-origin'];
      resolve({ url: urlStr, hasCors: !!cors, status: res.statusCode });
      req.abort();
    });
    req.on('error', (err) => resolve({ url: urlStr, hasCors: false, error: err.message }));
  });
}

async function run() {
  for (const url of testStreams) {
    const res = await checkCors(url);
    if (res.hasCors) console.log(`✅ WORKS: ${res.url}`);
    else console.log(`❌ BLOCKED: ${res.url}`);
  }
}
run();
