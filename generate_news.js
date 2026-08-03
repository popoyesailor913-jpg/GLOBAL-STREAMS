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
    { handle: '@7NEWS', name: '7NEWS Australia', location: 'Sydney, Australia', lat: -33.8688, lng: 151.2093 },

    // INDIA - NATIONAL (Delhi/Noida)
    { handle: '@RepublicWorld', name: 'Republic TV', location: 'Mumbai, India', lat: 19.0700, lng: 72.8700 },
    { handle: '@RepublicBharat', name: 'Republic Bharat', location: 'Mumbai, India', lat: 19.0800, lng: 72.8800 },
    { handle: '@TimesNow', name: 'Times Now', location: 'Mumbai, India', lat: 19.0600, lng: 72.8600 },
    { handle: '@cnnnews18', name: 'CNN-News18', location: 'Noida, India', lat: 28.5800, lng: 77.3200 },
    { handle: '@indiatoday', name: 'India Today', location: 'Noida, India', lat: 28.5900, lng: 77.3300 },
    { handle: '@News18India', name: 'News18 India', location: 'Noida, India', lat: 28.5700, lng: 77.3100 },
    { handle: '@zeenews', name: 'Zee News', location: 'Noida, India', lat: 28.6000, lng: 77.3400 },
    { handle: '@abpnews', name: 'ABP News', location: 'Noida, India', lat: 28.5600, lng: 77.3000 },
    { handle: '@ndtv', name: 'NDTV 24x7', location: 'New Delhi, India', lat: 28.5500, lng: 77.2400 },
    { handle: '@DDNewsOfficial', name: 'DD News', location: 'New Delhi, India', lat: 28.5650, lng: 77.2300 },
    { handle: '@TV9Bharatvarsh', name: 'TV9 Bharatvarsh', location: 'Noida, India', lat: 28.6100, lng: 77.3500 },

    // INDIA - SOUTH
    // Telugu (Hyderabad)
    { handle: '@tv9telugulive', name: 'TV9 Telugu', location: 'Hyderabad, India', lat: 17.3800, lng: 78.4800 },
    { handle: '@NtvTeluguLive', name: 'NTV Telugu', location: 'Hyderabad, India', lat: 17.3900, lng: 78.4900 },
    { handle: '@V6NewsTelugu', name: 'V6 News', location: 'Hyderabad, India', lat: 17.4000, lng: 78.4700 },
    { handle: '@TNewsTelugu', name: 'T News', location: 'Hyderabad, India', lat: 17.3700, lng: 78.4600 },
    { handle: '@abntelugutv', name: 'ABN Andhrajyothy', location: 'Hyderabad, India', lat: 17.4100, lng: 78.5000 },
    
    // Tamil (Chennai)
    { handle: '@PuthiyaThalaimuraiTV', name: 'Puthiya Thalaimurai', location: 'Chennai, India', lat: 13.0800, lng: 80.2700 },
    { handle: '@ThanthiTV', name: 'Thanthi TV', location: 'Chennai, India', lat: 13.0900, lng: 80.2800 },
    { handle: '@News18TamilNadu', name: 'News18 Tamil Nadu', location: 'Chennai, India', lat: 13.0700, lng: 80.2600 },
    { handle: '@polimernews', name: 'Polimer News', location: 'Chennai, India', lat: 13.1000, lng: 80.2900 },
    { handle: '@SunNewsTamil', name: 'Sun News', location: 'Chennai, India', lat: 13.0600, lng: 80.2500 },

    // Malayalam (Kerala)
    { handle: '@asianetnews', name: 'Asianet News', location: 'Trivandrum, India', lat: 8.5200, lng: 76.9300 },
    { handle: '@24News', name: '24 News', location: 'Kochi, India', lat: 9.9300, lng: 76.2600 },
    { handle: '@mathrubhuminewstv', name: 'Mathrubhumi News', location: 'Trivandrum, India', lat: 8.5300, lng: 76.9400 },
    { handle: '@manoramanews', name: 'Manorama News', location: 'Kochi, India', lat: 9.9400, lng: 76.2700 },

    // Kannada (Bangalore)
    { handle: '@tv9kannadanews', name: 'TV9 Kannada', location: 'Bangalore, India', lat: 12.9700, lng: 77.5900 },
    { handle: '@PublicTV', name: 'Public TV', location: 'Bangalore, India', lat: 12.9800, lng: 77.6000 },
    { handle: '@AsianetSuvarnaNews', name: 'Suvarna News', location: 'Bangalore, India', lat: 12.9600, lng: 77.5800 },
    { handle: '@News18Kannada', name: 'News18 Kannada', location: 'Bangalore, India', lat: 12.9900, lng: 77.6100 },

    // INDIA - EAST & WEST
    // Bengali (Kolkata)
    { handle: '@abpanandatv', name: 'ABP Ananda', location: 'Kolkata, India', lat: 22.5700, lng: 88.3600 },
    { handle: '@News18Bengali', name: 'News18 Bengali', location: 'Kolkata, India', lat: 22.5800, lng: 88.3700 },
    { handle: '@Zee24Ghanta', name: 'Zee 24 Ghanta', location: 'Kolkata, India', lat: 22.5600, lng: 88.3500 },

    // Marathi (Mumbai)
    { handle: '@abpmajhatv', name: 'ABP Majha', location: 'Mumbai, India', lat: 19.0500, lng: 72.8500 },
    { handle: '@Zee24Taas', name: 'Zee 24 Taas', location: 'Mumbai, India', lat: 19.0400, lng: 72.8400 },
    { handle: '@tv9marathilive', name: 'TV9 Marathi', location: 'Mumbai, India', lat: 19.0300, lng: 72.8300 },
    { handle: '@News18Lokmat', name: 'News18 Lokmat', location: 'Mumbai, India', lat: 19.0200, lng: 72.8200 },

    // Gujarati (Ahmedabad)
    { handle: '@abpasmitatv', name: 'ABP Asmita', location: 'Ahmedabad, India', lat: 23.0200, lng: 72.5700 },
    { handle: '@tv9gujaratilive', name: 'TV9 Gujarati', location: 'Ahmedabad, India', lat: 23.0300, lng: 72.5800 },
    { handle: '@SandeshNewsTV', name: 'Sandesh News', location: 'Ahmedabad, India', lat: 23.0100, lng: 72.5600 },
    { handle: '@vtvgujarati', name: 'VTV Gujarati', location: 'Ahmedabad, India', lat: 23.0400, lng: 72.5900 },

    // Odia & Punjabi
    { handle: '@otvnews', name: 'OTV', location: 'Bhubaneswar, India', lat: 20.2900, lng: 85.8200 },
    { handle: '@kanaknewsofficial', name: 'Kanak News', location: 'Bhubaneswar, India', lat: 20.3000, lng: 85.8300 },
    { handle: '@ptcnews', name: 'PTC News', location: 'Chandigarh, India', lat: 30.7300, lng: 76.7700 },
    { handle: '@News18Punjab', name: 'News18 Punjab', location: 'Chandigarh, India', lat: 30.7400, lng: 76.7800 }
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
