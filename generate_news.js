const fs = require('fs');

const newsChannels = [
    { handle: '@NBCNews', name: 'NBC News', location: 'New York, USA', lat: 40.7590, lng: -73.9790 },
    { handle: '@ABCNews', name: 'ABC News', location: 'New York, USA', lat: 40.7735, lng: -73.9818 },
    { handle: '@CBSNews', name: 'CBS News', location: 'New York, USA', lat: 40.7700, lng: -73.9880 },
    { handle: '@livenowfox', name: 'LiveNOW from FOX', location: 'Orlando, USA', lat: 28.5383, lng: -81.3792 },
    { handle: '@bloomberg', name: 'Bloomberg Television', location: 'New York, USA', lat: 40.7615, lng: -73.9678 },
    { handle: '@globalnews', name: 'Global News', location: 'Toronto, Canada', lat: 43.6706, lng: -79.3871 },
    { handle: '@cbcnews', name: 'CBC News', location: 'Toronto, Canada', lat: 43.6444, lng: -79.3875 },
    { handle: '@SkyNews', name: 'Sky News', location: 'London, UK', lat: 51.4880, lng: -0.3240 },
    { handle: '@BBCNews', name: 'BBC News', location: 'London, UK', lat: 51.5186, lng: -0.1438 },
    { handle: '@dwnews', name: 'DW News', location: 'Bonn, Germany', lat: 50.7169, lng: 7.1265 },
    { handle: '@France24_en', name: 'France 24', location: 'Paris, France', lat: 48.8285, lng: 2.2709 },
    { handle: '@euronews', name: 'EuroNews', location: 'Lyon, France', lat: 45.7428, lng: 4.8194 },
    { handle: '@trtworld', name: 'TRT World', location: 'Istanbul, Turkey', lat: 41.0360, lng: 28.9835 },
    { handle: '@TVPWorld', name: 'TVP World', location: 'Warsaw, Poland', lat: 52.2370, lng: 21.0122 },
    { handle: '@WION', name: 'WION', location: 'New Delhi, India', lat: 28.5447, lng: 77.3230 },
    { handle: '@AlJazeeraEnglish', name: 'Al Jazeera English', location: 'Doha, Qatar', lat: 25.3155, lng: 51.5218 },
    { handle: '@channelnewsasia', name: 'CNA', location: 'Singapore', lat: 1.2996, lng: 103.8456 },
    { handle: '@ndtvindia', name: 'NDTV India', location: 'New Delhi, India', lat: 28.5562, lng: 77.2255 },
    { handle: '@aajtak', name: 'Aaj Tak', location: 'Noida, India', lat: 28.5833, lng: 77.3167 },
    { handle: '@indiatv', name: 'India TV', location: 'Noida, India', lat: 28.6258, lng: 77.3785 },
    { handle: '@arirangnews', name: 'Arirang News', location: 'Seoul, South Korea', lat: 37.4820, lng: 127.0135 },
    { handle: '@ytnnews24', name: 'YTN', location: 'Seoul, South Korea', lat: 37.5791, lng: 126.8893 },
    { handle: '@setnews', name: 'SET News', location: 'Taipei, Taiwan', lat: 25.0747, lng: 121.5794 },
    { handle: '@TTV_NEWS', name: 'TTV News', location: 'Taipei, Taiwan', lat: 25.0487, lng: 121.5471 },
    { handle: '@FNNnewsCH', name: 'FNN', location: 'Tokyo, Japan', lat: 35.6268, lng: 139.7766 },
    { handle: '@ANNnewsCH', name: 'ANN', location: 'Tokyo, Japan', lat: 35.6605, lng: 139.7292 },
    { handle: '@ntv_news24', name: 'NTV', location: 'Tokyo, Japan', lat: 35.6629, lng: 139.7603 },
    { handle: '@ThairathOnline', name: 'Thairath Online', location: 'Bangkok, Thailand', lat: 13.8055, lng: 100.5567 },
    { handle: '@gmanews', name: 'GMA News', location: 'Quezon City, Philippines', lat: 14.6341, lng: 121.0436 },
    { handle: '@abscbnnews', name: 'ABS-CBN News', location: 'Quezon City, Philippines', lat: 14.6402, lng: 121.0371 },
    { handle: '@sabcnews', name: 'SABC News', location: 'Johannesburg, South Africa', lat: -26.1833, lng: 28.0000 },
    { handle: '@ChannelsTelevision', name: 'Channels Television', location: 'Lagos, Nigeria', lat: 6.5684, lng: 3.3644 },
    { handle: '@ktnnews', name: 'KTN News', location: 'Nairobi, Kenya', lat: -1.3093, lng: 36.8225 },
    { handle: '@NewsOnABC', name: 'ABC News Australia', location: 'Sydney, Australia', lat: -33.8808, lng: 151.1994 },
    { handle: '@7NEWS', name: '7NEWS Australia', location: 'Sydney, Australia', lat: -33.8688, lng: 151.2093 }
];

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function fetchVideoId(handle) {
    try {
        const { stdout } = await execPromise(`.\\yt-dlp.exe --print id "https://www.youtube.com/${handle}/live"`);
        const vid = stdout.trim();
        // Ignore warnings that might get printed to stdout if any
        const lines = vid.split('\n');
        const exactId = lines[lines.length - 1].trim();
        if (exactId && exactId.length === 11) {
            return exactId;
        }
        return null;
    } catch (err) {
        console.warn(`[OFFLINE] ${handle} is not currently live or failed to extract.`);
        return null;
    }
}

async function generate() {
    console.log(`Verifying liveness and extracting exact Video IDs for ${newsChannels.length} news networks...`);
    const streams = [];

    for (const channel of newsChannels) {
        const vid = await fetchVideoId(channel.handle);
        if (vid) {
            streams.push({
                id: `yt-${channel.handle.replace('@', '')}`,
                name: channel.name,
                location: channel.location,
                lat: channel.lat,
                lng: channel.lng,
                type: 'youtube',
                url: `https://www.youtube.com/embed/${vid}?autoplay=1`
            });
            console.log(`[LIVE] ${channel.name} -> ${vid}`);
        } else {
            console.log(`[SKIPPED] ${channel.name}`);
        }
    }

    fs.writeFileSync('streams.json', JSON.stringify(streams, null, 2));
    console.log(`\nWrote ${streams.length} live verified news streams to streams.json!`);
}

generate();
