const https = require('https');

const testChannels = [
  "UCJT_Zk3Fj5oVz2F0N7tFk5g", // EarthCam
  "UCyKxGzHk3L1i3bXq5GgB3nA", // Jackson Hole
  "UCP8w38O2084c6uI2BwSgR1Q", // Virtual Railfan
  "UCMYQv-tJ919x5E9E6RjKx1w", // Railcam UK
  "UCG6gY2uTqU4X5E-3Tj-w5zA", // Surfline
  "UCa9nAL3FvI0lMhB725807Yg"  // Monterey Bay Aquarium
];

async function checkYoutubeEmbed(channelId) {
  const urlStr = `https://www.youtube.com/embed/live_stream?channel=${channelId}`;
  return new Promise((resolve) => {
    https.get(urlStr, (res) => {
      // YouTube blocks embeds using X-Frame-Options: SAMEORIGIN
      const xFrame = res.headers['x-frame-options'];
      // Also it might redirect if there is no live stream
      const isEmbeddable = !xFrame || xFrame.toLowerCase() !== 'sameorigin';
      resolve({ channelId, isEmbeddable, status: res.statusCode, xFrame });
      res.destroy();
    }).on('error', () => resolve({ channelId, isEmbeddable: false }));
  });
}

async function run() {
  for (const ch of testChannels) {
    const res = await checkYoutubeEmbed(ch);
    console.log(`Channel ${ch}: Embeddable? ${res.isEmbeddable} (Status: ${res.status}, X-Frame: ${res.xFrame})`);
  }
}
run();
