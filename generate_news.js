const fs = require('fs');

const newsChannels = [
    {
        handle: '@NBCNews',
        name: 'NBC News',
        location: 'New York, USA',
        lat: 40.759,
        lng: -73.979,
        channelId: 'UCeY0bbntWzzVIaj2z3QigXg'
    },
    {
        handle: '@ABCNews',
        name: 'ABC News',
        location: 'New York, USA',
        lat: 40.7735,
        lng: -73.9818,
        channelId: 'UCBi2mrWuNuyYy4gbM6fU18Q'
    },
    {
        handle: '@CBSNews',
        name: 'CBS News',
        location: 'New York, USA',
        lat: 40.77,
        lng: -73.988,
        channelId: 'UC8p1vwvWtl6T73JiExfWs1g'
    },
    {
        handle: '@livenowfox',
        name: 'LiveNOW from FOX',
        location: 'Orlando, USA',
        lat: 28.5383,
        lng: -81.3792,
        channelId: 'UCJg9wBPyKMNA5sRDnvzmkdg'
    },
    {
        handle: '@bloomberg',
        name: 'Bloomberg Television',
        location: 'New York, USA',
        lat: 40.7615,
        lng: -73.9678
    },
    {
        handle: '@globalnews',
        name: 'Global News',
        location: 'Toronto, Canada',
        lat: 43.6706,
        lng: -79.3871,
        channelId: 'UChLtXXpo4Ge1ReTEboVvTDg'
    },
    {
        handle: '@cbcnews',
        name: 'CBC News',
        location: 'Toronto, Canada',
        lat: 43.6444,
        lng: -79.3875,
        channelId: 'UCuFFtHWoLl5fauMMD5Ww2jA'
    },
    {
        handle: '@SkyNews',
        name: 'Sky News',
        location: 'London, UK',
        lat: 51.488,
        lng: -0.324,
        channelId: 'UCoMdktPbSTixAyNGwb-UYkQ'
    },
    {
        handle: '@BBCNews',
        name: 'BBC News',
        location: 'London, UK',
        lat: 51.5186,
        lng: -0.1438,
        channelId: 'UC16niRr50-MSBwiO3YDb3RA'
    },
    {
        handle: '@dwnews',
        name: 'DW News',
        location: 'Bonn, Germany',
        lat: 50.7169,
        lng: 7.1265,
        channelId: 'UCknLrEdhRCp1aegoMqRaCZg'
    },
    {
        handle: '@France24_en',
        name: 'France 24',
        location: 'Paris, France',
        lat: 48.8285,
        lng: 2.2709,
        channelId: 'UCQfwfsi5VrQ8yKZ-UWmAEFg'
    },
    {
        handle: '@euronews',
        name: 'EuroNews',
        location: 'Lyon, France',
        lat: 45.7428,
        lng: 4.8194,
        channelId: 'UCSrZ3UV4jOidv8ppoVuvW9Q'
    },
    {
        handle: '@trtworld',
        name: 'TRT World',
        location: 'Istanbul, Turkey',
        lat: 41.036,
        lng: 28.9835,
        channelId: 'UC7fWeaHhqgM4Ry-RMpM2YYw'
    },
    {
        handle: '@TVPWorld',
        name: 'TVP World',
        location: 'Warsaw, Poland',
        lat: 52.237,
        lng: 21.0122,
        channelId: 'UCBjUPsHj7bXt24SUWNoZ0zA'
    },
    {
        handle: '@WION',
        name: 'WION',
        location: 'New Delhi, India',
        lat: 28.5447,
        lng: 77.323,
        channelId: 'UC_gUM8rL-Lrg6O3adPW9K1g'
    },
    {
        handle: '@AlJazeeraEnglish',
        name: 'Al Jazeera English',
        location: 'Doha, Qatar',
        lat: 25.3155,
        lng: 51.5218,
        channelId: 'UCNye-wNBqNL5ZzHSJj3l8Bg'
    },
    {
        handle: '@channelnewsasia',
        name: 'CNA',
        location: 'Singapore',
        lat: 1.2996,
        lng: 103.8456,
        channelId: 'UC83jt4dlz1Gjl58fzQrrKZg'
    },
    {
        handle: '@ndtvindia',
        name: 'NDTV India',
        location: 'New Delhi, India',
        lat: 28.5562,
        lng: 77.2255,
        channelId: 'UC9CYT9gSNLevX5ey2_6CK0Q'
    },
    {
        handle: '@aajtak',
        name: 'Aaj Tak',
        location: 'Noida, India',
        lat: 28.5833,
        lng: 77.3167,
        channelId: 'UCt4t-jeY85JegMlZ-E5UWtA'
    },
    {
        handle: '@indiatv',
        name: 'India TV',
        location: 'Noida, India',
        lat: 28.6258,
        lng: 77.3785,
        channelId: 'UCttspZesZIDEwwpVIgoZtWQ'
    },
    {
        handle: '@arirangnews',
        name: 'Arirang News',
        location: 'Seoul, South Korea',
        lat: 37.482,
        lng: 127.0135
    },
    {
        handle: '@ytnnews24',
        name: 'YTN',
        location: 'Seoul, South Korea',
        lat: 37.5791,
        lng: 126.8893,
        channelId: 'UChlgI3UHCOnwUGzWzbJ3H5w'
    },
    {
        handle: '@setnews',
        name: 'SET News',
        location: 'Taipei, Taiwan',
        lat: 25.0747,
        lng: 121.5794
    },
    {
        handle: '@TTV_NEWS',
        name: 'TTV News',
        location: 'Taipei, Taiwan',
        lat: 25.0487,
        lng: 121.5471,
        channelId: 'UC8ROUUjHzEQm-ndb69CX8Ww'
    },
    {
        handle: '@FNNnewsCH',
        name: 'FNN',
        location: 'Tokyo, Japan',
        lat: 35.6268,
        lng: 139.7766,
        channelId: 'UCoQBJMzcwmXrRSHBFAlTsIw'
    },
    {
        handle: '@ANNnewsCH',
        name: 'ANN',
        location: 'Tokyo, Japan',
        lat: 35.6605,
        lng: 139.7292,
        channelId: 'UCGCZAYq5Xxojl_tSXcVJhiQ'
    },
    {
        handle: '@ntv_news24',
        name: 'NTV',
        location: 'Tokyo, Japan',
        lat: 35.6629,
        lng: 139.7603
    },
    {
        handle: '@ThairathOnline',
        name: 'Thairath Online',
        location: 'Bangkok, Thailand',
        lat: 13.8055,
        lng: 100.5567
    },
    {
        handle: '@gmanews',
        name: 'GMA News',
        location: 'Quezon City, Philippines',
        lat: 14.6341,
        lng: 121.0436,
        channelId: 'UCqYw-CTd1dU2yGI71sEyqNw'
    },
    {
        handle: '@abscbnnews',
        name: 'ABS-CBN News',
        location: 'Quezon City, Philippines',
        lat: 14.6402,
        lng: 121.0371,
        channelId: 'UCE2606prvXQc_noEqKxVJXA'
    },
    {
        handle: '@sabcnews',
        name: 'SABC News',
        location: 'Johannesburg, South Africa',
        lat: -26.1833,
        lng: 28
    },
    {
        handle: '@ChannelsTelevision',
        name: 'Channels Television',
        location: 'Lagos, Nigeria',
        lat: 6.5684,
        lng: 3.3644,
        channelId: 'UCEXGDNclvmg6RW0vipJYsTQ'
    },
    {
        handle: '@ktnnews',
        name: 'KTN News',
        location: 'Nairobi, Kenya',
        lat: -1.3093,
        lng: 36.8225,
        channelId: 'UCYViuO63Wp4IlwKWv6uNKig'
    },
    {
        handle: '@NewsOnABC',
        name: 'ABC News Australia',
        location: 'Sydney, Australia',
        lat: -33.8808,
        lng: 151.1994
    },
    {
        handle: '@7NEWS',
        name: '7NEWS Australia',
        location: 'Sydney, Australia',
        lat: -33.8688,
        lng: 151.2093,
        channelId: 'UC5T7D-Dh1eDGtsAFCuwv_Sw'
    },
    {
        handle: '@RepublicWorld',
        name: 'Republic TV',
        location: 'Mumbai, India',
        lat: 19.07,
        lng: 72.87,
        channelId: 'UCwqusr8YDwM-3mEYTDeJHzw'
    },
    {
        handle: '@RepublicBharat',
        name: 'Republic Bharat',
        location: 'Mumbai, India',
        lat: 19.08,
        lng: 72.88,
        channelId: 'UC7wXt18f2iA3EDXeqAVuKng'
    },
    {
        handle: '@TimesNow',
        name: 'Times Now',
        location: 'Mumbai, India',
        lat: 19.06,
        lng: 72.86,
        channelId: 'UC6RJ7-PaXg6TIH2BzZfTV7w'
    },
    {
        handle: '@cnnnews18',
        name: 'CNN-News18',
        location: 'Noida, India',
        lat: 28.58,
        lng: 77.32,
        channelId: 'UCef1-8eOpJgud7szVPlZQAQ'
    },
    {
        handle: '@indiatoday',
        name: 'India Today',
        location: 'Noida, India',
        lat: 28.59,
        lng: 77.33,
        channelId: 'UCYPvAwZP8pZhSMW8qs7cVCw'
    },
    {
        handle: '@News18India',
        name: 'News18 India',
        location: 'Noida, India',
        lat: 28.57,
        lng: 77.31,
        channelId: 'UCPP3etACgdUWvizcES1dJ8Q'
    },
    {
        handle: '@zeenews',
        name: 'Zee News',
        location: 'Noida, India',
        lat: 28.6,
        lng: 77.34,
        channelId: 'UCIvaYmXn910QMdemBG3v1pQ'
    },
    {
        handle: '@abpnews',
        name: 'ABP News',
        location: 'Noida, India',
        lat: 28.56,
        lng: 77.3,
        channelId: 'UCRWFSbif-RFENbBrSiez1DA'
    },
    {
        handle: '@ndtv',
        name: 'NDTV 24x7',
        location: 'New Delhi, India',
        lat: 28.55,
        lng: 77.24,
        channelId: 'UCZFMm1mMw0F81Z37aaEzTUA'
    },
    {
        handle: '@DDNewsOfficial',
        name: 'DD News',
        location: 'New Delhi, India',
        lat: 28.565,
        lng: 77.23
    },
    {
        handle: '@TV9Bharatvarsh',
        name: 'TV9 Bharatvarsh',
        location: 'Noida, India',
        lat: 28.61,
        lng: 77.35,
        channelId: 'UCOutOIcn_oho8pyVN3Ng-Pg'
    },
    {
        handle: '@tv9telugulive',
        name: 'TV9 Telugu',
        location: 'Hyderabad, India',
        lat: 17.38,
        lng: 78.48,
        channelId: 'UCPXTXMecYqnRKNdqdVOGSFg'
    },
    {
        handle: '@NtvTeluguLive',
        name: 'NTV Telugu',
        location: 'Hyderabad, India',
        lat: 17.39,
        lng: 78.49,
        channelId: 'UCtzYV2L-m8ew93mZb3qhf5w'
    },
    {
        handle: '@V6NewsTelugu',
        name: 'V6 News',
        location: 'Hyderabad, India',
        lat: 17.4,
        lng: 78.47,
        channelId: 'UCDCMjD1XIAsCZsYHNMGVcog'
    },
    {
        handle: '@TNewsTelugu',
        name: 'T News',
        location: 'Hyderabad, India',
        lat: 17.37,
        lng: 78.46,
        channelId: 'UCu6edg8_eu3-A8ylgaWereA'
    },
    {
        handle: '@abntelugutv',
        name: 'ABN Andhrajyothy',
        location: 'Hyderabad, India',
        lat: 17.41,
        lng: 78.5,
        channelId: 'UC_2irx_BQR7RsBKmUV9fePQ'
    },
    {
        handle: '@PuthiyaThalaimuraiTV',
        name: 'Puthiya Thalaimurai',
        location: 'Chennai, India',
        lat: 13.08,
        lng: 80.27,
        channelId: 'UCmyKnNRH0wH-r8I-ceP-dsg'
    },
    {
        handle: '@ThanthiTV',
        name: 'Thanthi TV',
        location: 'Chennai, India',
        lat: 13.09,
        lng: 80.28,
        channelId: 'UC-JFyL0zDFOsPMpuWu39rPA'
    },
    {
        handle: '@News18TamilNadu',
        name: 'News18 Tamil Nadu',
        location: 'Chennai, India',
        lat: 13.07,
        lng: 80.26,
        channelId: 'UCat88i6_rELqI_prwvjspRA'
    },
    {
        handle: '@polimernews',
        name: 'Polimer News',
        location: 'Chennai, India',
        lat: 13.1,
        lng: 80.29,
        channelId: 'UC8Z-VjXBtDJTvq6aqkIskPg'
    },
    {
        handle: '@SunNewsTamil',
        name: 'Sun News',
        location: 'Chennai, India',
        lat: 13.06,
        lng: 80.25,
        channelId: 'UCYlh4lH762HvHt6mmiecyWQ'
    },
    {
        handle: '@asianetnews',
        name: 'Asianet News',
        location: 'Trivandrum, India',
        lat: 8.52,
        lng: 76.93,
        channelId: 'UCf8w5m0YsRa8MHQ5bwSGmbw'
    },
    {
        handle: '@24News',
        name: '24 News',
        location: 'Kochi, India',
        lat: 9.93,
        lng: 76.26
    },
    {
        handle: '@mathrubhuminewstv',
        name: 'Mathrubhumi News',
        location: 'Trivandrum, India',
        lat: 8.53,
        lng: 76.94
    },
    {
        handle: '@manoramanews',
        name: 'Manorama News',
        location: 'Kochi, India',
        lat: 9.94,
        lng: 76.27,
        channelId: 'UCP0uG-mcMImgKnJz-VjJZmQ'
    },
    {
        handle: '@tv9kannadanews',
        name: 'TV9 Kannada',
        location: 'Bangalore, India',
        lat: 12.97,
        lng: 77.59
    },
    {
        handle: '@PublicTV',
        name: 'Public TV',
        location: 'Bangalore, India',
        lat: 12.98,
        lng: 77.6,
        channelId: 'UCl-OodciBGZ0k8K8rBZGe4w'
    },
    {
        handle: '@AsianetSuvarnaNews',
        name: 'Suvarna News',
        location: 'Bangalore, India',
        lat: 12.96,
        lng: 77.58,
        channelId: 'UCjElJyiXmQXnWmceQ1JyKrA'
    },
    {
        handle: '@News18Kannada',
        name: 'News18 Kannada',
        location: 'Bangalore, India',
        lat: 12.99,
        lng: 77.61,
        channelId: 'UCa-vioGhe2btBcZneaPonKA'
    },
    {
        handle: '@abpanandatv',
        name: 'ABP Ananda',
        location: 'Kolkata, India',
        lat: 22.57,
        lng: 88.36,
        channelId: 'UCv3rFzn-GHGtqzXiaq3sWNg'
    },
    {
        handle: '@News18Bengali',
        name: 'News18 Bengali',
        location: 'Kolkata, India',
        lat: 22.58,
        lng: 88.37,
        channelId: 'UC3oZtF7nNPMwezkwAn6abUA'
    },
    {
        handle: '@Zee24Ghanta',
        name: 'Zee 24 Ghanta',
        location: 'Kolkata, India',
        lat: 22.56,
        lng: 88.35,
        channelId: 'UCdF5Q5QVbYstYrTfpgUl0ZA'
    },
    {
        handle: '@abpmajhatv',
        name: 'ABP Majha',
        location: 'Mumbai, India',
        lat: 19.05,
        lng: 72.85,
        channelId: 'UCH7nv1A9xIrAifZJNvt7cgA'
    },
    {
        handle: '@Zee24Taas',
        name: 'Zee 24 Taas',
        location: 'Mumbai, India',
        lat: 19.04,
        lng: 72.84,
        channelId: 'UCVbsFo8aCgvIRIO9RYwsQMA'
    },
    {
        handle: '@tv9marathilive',
        name: 'TV9 Marathi',
        location: 'Mumbai, India',
        lat: 19.03,
        lng: 72.83,
        channelId: 'UCdOSeEq9Cs2Pco7OCn2_i5w'
    },
    {
        handle: '@News18Lokmat',
        name: 'News18 Lokmat',
        location: 'Mumbai, India',
        lat: 19.02,
        lng: 72.82,
        channelId: 'UCmxLp6dpQER_HEKFgNHIIwQ'
    },
    {
        handle: '@abpasmitatv',
        name: 'ABP Asmita',
        location: 'Ahmedabad, India',
        lat: 23.02,
        lng: 72.57,
        channelId: 'UC3C6_1ETXfE807LltDbKYxg'
    },
    {
        handle: '@tv9gujaratilive',
        name: 'TV9 Gujarati',
        location: 'Ahmedabad, India',
        lat: 23.03,
        lng: 72.58
    },
    {
        handle: '@SandeshNewsTV',
        name: 'Sandesh News',
        location: 'Ahmedabad, India',
        lat: 23.01,
        lng: 72.56,
        channelId: 'UCiAH2s_M6nPfGZk-PpfyPkg'
    },
    {
        handle: '@vtvgujarati',
        name: 'VTV Gujarati',
        location: 'Ahmedabad, India',
        lat: 23.04,
        lng: 72.59,
        channelId: 'UCMX41X1am8oYxT336dqk4sA'
    },
    {
        handle: '@otvnews',
        name: 'OTV',
        location: 'Bhubaneswar, India',
        lat: 20.29,
        lng: 85.82
    },
    {
        handle: '@kanaknewsofficial',
        name: 'Kanak News',
        location: 'Bhubaneswar, India',
        lat: 20.3,
        lng: 85.83
    },
    {
        handle: '@ptcnews',
        name: 'PTC News',
        location: 'Chandigarh, India',
        lat: 30.73,
        lng: 76.77,
        channelId: 'UCQLEbraENUGWh6p1Rv664rQ'
    },
    {
        handle: '@News18Punjab',
        name: 'News18 Punjab',
        location: 'Chandigarh, India',
        lat: 30.74,
        lng: 76.78,
        channelId: 'UCkd9UmlHSq9Em8ErY9Tu3eQ'
    }
];

const https = require('https');
const API_KEY = process.env.YOUTUBE_API_KEY || 'AIzaSyBwJY0rrmF_ehkrw5wfO_rOBC1KkFX6ncg';

async function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
            });
        }).on('error', reject);
    });
}

async function generate() {
    console.log(`Starting YouTube API optimized extraction for ${newsChannels.length} networks...`);
    const streams = [];

    // Step 1: Fetch 3 most recent videos from Uploads playlist of each channel
    const videoIdToChannel = new Map();
    const allVideoIds = [];

    const playlistPromises = newsChannels.map(async (channel) => {
        if (!channel.channelId) {
            console.log(`[SKIPPED] ${channel.name} (No Channel ID)`);
            return;
        }
        
        // Uploads playlist ID is the Channel ID with 'UU' prefix instead of 'UC'
        const playlistId = 'UU' + channel.channelId.substring(2);
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`;
        
        const data = await fetchJson(url);
        if (data && data.items) {
            data.items.forEach(item => {
                const vid = item.contentDetails.videoId;
                if (vid) {
                    videoIdToChannel.set(vid, channel);
                    allVideoIds.push(vid);
                }
            });
        }
    });

    console.log("Fetching recent uploads playlists...");
    await Promise.all(playlistPromises);
    
    // Step 2: Batch check all collected video IDs to see which are currently LIVE
    console.log(`Checking ${allVideoIds.length} recent videos for active live streams...`);
    
    const liveVideoIds = new Set();
    for (let i = 0; i < allVideoIds.length; i += 50) {
        const chunk = allVideoIds.slice(i, i + 50);
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${chunk.join(',')}&key=${API_KEY}`;
        
        const data = await fetchJson(url);
        if (data && data.items) {
            data.items.forEach(item => {
                // Check if it's an active live stream
                if (item.snippet && item.snippet.liveBroadcastContent === 'live') {
                    liveVideoIds.add(item.id);
                }
            });
        }
    }

    // Step 3: Match live videos back to channels and generate streams.json
    const processedChannels = new Set();
    
    // In case a channel has multiple live streams, we just take the first one we encounter
    for (const vid of liveVideoIds) {
        const channel = videoIdToChannel.get(vid);
        if (channel && !processedChannels.has(channel.handle)) {
            streams.push({
                id: `yt-${channel.handle.replace('@', '')}`,
                name: channel.name,
                location: channel.location,
                lat: channel.lat,
                lng: channel.lng,
                type: 'youtube',
                url: `https://www.youtube.com/embed/${vid}?autoplay=1`
            });
            processedChannels.add(channel.handle);
            console.log(`[LIVE] ${channel.name} -> ${vid}`);
        }
    }

    // Report offline channels
    for (const channel of newsChannels) {
        if (channel.channelId && !processedChannels.has(channel.handle)) {
            console.log(`[OFFLINE] ${channel.name}`);
        }
    }

    fs.writeFileSync('streams.json', JSON.stringify(streams, null, 2));
    console.log(`\nWrote ${streams.length} live verified news streams to streams.json!`);
}

generate();
