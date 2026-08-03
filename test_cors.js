const https = require('https');
const http = require('http');

const testStreams = [
  "https://cbsn-us.cbsnstream.cbsnews.com/out/v1/55a8648e8f134e82a470f83d562deeca/master.m3u8",
  "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8",
  "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
  "https://tv-trtworld.medya.trt.com.tr/master.m3u8",
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8",
  "https://cdn3.wowza.com/1/S0toVjBLVkFkTkZ1/eUxZanRz/hls/live/playlist.m3u8",
  "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8"
];

async function checkCors(urlStr) {
  return new Promise((resolve) => {
    const client = urlStr.startsWith('https') ? https : http;
    const req = client.get(urlStr, { headers: { 'Origin': 'http://localhost:8081' } }, (res) => {
      const cors = res.headers['access-control-allow-origin'];
      resolve({ url: urlStr, hasCors: !!cors, corsHeader: cors, status: res.statusCode });
      req.abort();
    });
    req.on('error', (err) => resolve({ url: urlStr, hasCors: false, error: err.message }));
  });
}

async function run() {
  console.log("Testing CORS for streams...");
  for (const url of testStreams) {
    const res = await checkCors(url);
    if (res.hasCors) {
      console.log(`✅ WORKS (Open CORS): ${res.url}`);
    } else {
      console.log(`❌ BLOCKED (No CORS): ${res.url}`);
    }
  }
}
run();
