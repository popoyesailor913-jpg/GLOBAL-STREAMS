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
    },
    {
        handle: '@todonoticias',
        name: 'TN',
        location: 'Buenos Aires, Argentina',
        lat: -34.6037,
        lng: -58.3816,
        channelId: 'UCj6PcyLvpnIRT_2W_mwa9Aw'
    },
    {
        handle: '@c5n',
        name: 'C5N',
        location: 'Buenos Aires, Argentina',
        lat: -34.5815,
        lng: -58.4316,
        channelId: 'UCFgk2Q2mVO1BklRQhSv6p0w'
    },
    {
        handle: '@lanacion',
        name: 'La Nacion',
        location: 'Buenos Aires, Argentina',
        lat: -34.6131,
        lng: -58.3772,
        channelId: 'UCba3hpU7EFBSk817y9qZkiA'
    },
    {
        handle: '@jovempannews',
        name: 'Jovem Pan News',
        location: 'São Paulo, Brazil',
        lat: -23.5505,
        lng: -46.6333,
        channelId: 'UCP391YRAjSOdM_bwievgaZA'
    },
    {
        handle: '@recordnews',
        name: 'Record News',
        location: 'São Paulo, Brazil',
        lat: -23.5337,
        lng: -46.6252,
        channelId: 'UCuiLR4p6wQ3xLEm15pEn1Xw'
    },
    {
        handle: '@bandjornalismo',
        name: 'Band Jornalismo',
        location: 'São Paulo, Brazil',
        lat: -23.5677,
        lng: -46.6488,
        channelId: 'UCoa-D_VfMkFrCYodrOC9-mA'
    },
    {
        handle: '@Milenio',
        name: 'Milenio',
        location: 'Mexico City, Mexico',
        lat: 19.4326,
        lng: -99.1332,
        channelId: 'UCFxHplbcoJK9m70c4VyTIxg'
    },
    {
        handle: '@nmas',
        name: 'N+',
        location: 'Mexico City, Mexico',
        lat: 19.426,
        lng: -99.1506,
        channelId: 'UCUsm-fannqOY02PNN67C0KA'
    },
    {
        handle: '@telediariomx',
        name: 'Telediario',
        location: 'Mexico City, Mexico',
        lat: 19.435,
        lng: -99.145,
        channelId: 'UCKuAmo9OGf8kw2jrPWCpHdA'
    },
    {
        handle: '@noticiascaracol',
        name: 'Noticias Caracol',
        location: 'Bogotá, Colombia',
        lat: 4.711,
        lng: -74.0721,
        channelId: 'UC2Xq2PK-got3Rtz9ZJ32hLQ'
    },
    {
        handle: '@meganoticiascl',
        name: 'Mega',
        location: 'Santiago, Chile',
        lat: -33.4489,
        lng: -70.6693
    },
    {
        handle: '@teletrece',
        name: 'T13',
        location: 'Santiago, Chile',
        lat: -33.4569,
        lng: -70.6483,
        channelId: 'UCPClE65B0W8cc82dytDKIrw'
    },
    {
        handle: '@24horascl',
        name: '24 Horas',
        location: 'Santiago, Chile',
        lat: -33.4372,
        lng: -70.6506
    },
    {
        handle: '@atvmasnoticias',
        name: 'ATV Noticias',
        location: 'Lima, Peru',
        lat: -12.0464,
        lng: -77.0428
    },
    {
        handle: '@rainews24',
        name: 'Rai News 24',
        location: 'Rome, Italy',
        lat: 41.9028,
        lng: 12.4964
    },
    {
        handle: '@tgcom24',
        name: 'TGCOM24',
        location: 'Milan, Italy',
        lat: 45.4642,
        lng: 9.19,
        channelId: 'UCmoMxFxfjHJIicCv1eV_tSA'
    },
    {
        handle: '@SkyTG24',
        name: 'Sky TG24',
        location: 'Milan, Italy',
        lat: 45.4385,
        lng: 9.2778,
        channelId: 'UCz6E3lF72mb6uoJ-mOlNo2A'
    },
    {
        handle: '@rtvenoticias',
        name: 'RTVE Noticias',
        location: 'Madrid, Spain',
        lat: 40.4168,
        lng: -3.7038,
        channelId: 'UC7QZIf0dta-XPXsp9Hv4dTw'
    },
    {
        handle: '@welt',
        name: 'WELT',
        location: 'Berlin, Germany',
        lat: 52.52,
        lng: 13.405,
        channelId: 'UCYLksysPyWbObO2GKlqtKpA'
    },
    {
        handle: '@ntvNachrichten',
        name: 'NTV Germany',
        location: 'Cologne, Germany',
        lat: 50.9375,
        lng: 6.9603
    },
    {
        handle: '@bfmtv',
        name: 'BFM TV',
        location: 'Paris, France',
        lat: 48.8566,
        lng: 2.3522,
        channelId: 'UCXwDLMDV86ldKoFVc_g8P0g'
    },
    {
        handle: '@cnews',
        name: 'CNEWS',
        location: 'Paris, France',
        lat: 48.8251,
        lng: 2.2741,
        channelId: 'UCciBAhIME9MQEmGbBPnh44g'
    },
    {
        handle: '@lci',
        name: 'LCI',
        location: 'Paris, France',
        lat: 48.8354,
        lng: 2.2599,
        channelId: 'UCewhc0fvja891XkpIPGRMxQ'
    },
    {
        handle: '@sicnoticias',
        name: 'SIC Notícias',
        location: 'Lisbon, Portugal',
        lat: 38.7223,
        lng: -9.1393
    },
    {
        handle: '@tvn24',
        name: 'TVN24',
        location: 'Warsaw, Poland',
        lat: 52.1908,
        lng: 21.0264,
        channelId: 'UC3R8278fJUWn2ysrOCJrmAQ'
    },
    {
        handle: '@digi24',
        name: 'Digi24',
        location: 'Bucharest, Romania',
        lat: 44.4268,
        lng: 26.1025
    },
    {
        handle: '@antena3romania',
        name: 'Antena 3 CNN',
        location: 'Bucharest, Romania',
        lat: 44.4533,
        lng: 26.0687
    },
    {
        handle: '@GBNewsOnline',
        name: 'GB News',
        location: 'London, UK',
        lat: 51.5072,
        lng: -0.1276,
        channelId: 'UC0vn8ISa4LKMunLbzaXLnOQ'
    },
    {
        handle: '@AlArabiya',
        name: 'Al Arabiya',
        location: 'Dubai, UAE',
        lat: 25.2048,
        lng: 55.2708,
        channelId: 'UCahpxixMCwoANAftn6IxkTg'
    },
    {
        handle: '@SkyNewsArabia',
        name: 'Sky News Arabia',
        location: 'Abu Dhabi, UAE',
        lat: 24.4539,
        lng: 54.3773,
        channelId: 'UCIJXOvggjKtCagMfxvcCzAA'
    },
    {
        handle: '@alhadath',
        name: 'Al Hadath',
        location: 'Dubai, UAE',
        lat: 25.0743,
        lng: 55.1396,
        channelId: 'UCrj5BGAhtWxDfqbza9T9hqA'
    },
    {
        handle: '@alekhbariyaTV',
        name: 'Al Ekhbariya',
        location: 'Riyadh, Saudi Arabia',
        lat: 24.7136,
        lng: 46.6753,
        channelId: 'UCcmHPJzsho2Hr4AhNO6m09w'
    },
    {
        handle: '@i24NEWS_EN',
        name: 'I24 News English',
        location: 'Tel Aviv, Israel',
        lat: 32.0853,
        lng: 34.7818,
        channelId: 'UCvHDpsWKADrDia0c99X37vg'
    },
    {
        handle: '@News24Video',
        name: 'News24',
        location: 'Cape Town, South Africa',
        lat: -33.9249,
        lng: 18.4241,
        channelId: 'UC_vRepQuzI527GtEP1pGYZw'
    },
    {
        handle: '@encanews',
        name: 'eNCA',
        location: 'Johannesburg, South Africa',
        lat: -26.126,
        lng: 28.0267,
        channelId: 'UCI3RT5PGmdi1KVp9FG_CneA'
    },
    {
        handle: '@NewzroomAfrika',
        name: 'Newzroom Afrika',
        location: 'Randburg, South Africa',
        lat: -26.0967,
        lng: 28.0016
    },
    {
        handle: '@citizentvkenya',
        name: 'Citizen TV',
        location: 'Nairobi, Kenya',
        lat: -1.2921,
        lng: 36.8219,
        channelId: 'UClLuu9p9zMmE4TDg8s2E2cQ'
    },
    {
        handle: '@ntvkenya',
        name: 'NTV Kenya',
        location: 'Nairobi, Kenya',
        lat: -1.2833,
        lng: 36.8167
    },
    {
        handle: '@ARISE_News',
        name: 'Arise News',
        location: 'Lagos, Nigeria',
        lat: 6.4281,
        lng: 3.4219
    },
    {
        handle: '@TVCNewsNigeria',
        name: 'TVC News',
        location: 'Lagos, Nigeria',
        lat: 6.6018,
        lng: 3.3515,
        channelId: 'UCgp4A6I8LCWrhUzn-5SbKvA'
    },
    {
        handle: '@JoyNewsOnTV',
        name: 'JoyNews',
        location: 'Accra, Ghana',
        lat: 5.6037,
        lng: -0.187
    },
    {
        handle: '@kompastv',
        name: 'Kompas TV',
        location: 'Jakarta, Indonesia',
        lat: -6.2088,
        lng: 106.8456,
        channelId: 'UC5BMIWZe9isJXLZZWPWvBlg'
    },
    {
        handle: '@metrotvnews',
        name: 'Metro TV',
        location: 'Jakarta, Indonesia',
        lat: -6.195,
        lng: 106.7648,
        channelId: 'UCzl0OrB3-ehunyotIQvK77A'
    },
    {
        handle: '@tvOneNews',
        name: 'tvOneNews',
        location: 'Jakarta, Indonesia',
        lat: -6.2,
        lng: 106.85,
        channelId: 'UCER4rvDnRBPr_ncYW4UCZjg'
    },
    {
        handle: '@ThaiPBS',
        name: 'ThaiPBS',
        location: 'Bangkok, Thailand',
        lat: 13.8732,
        lng: 100.5746,
        channelId: 'UC5TOFhyb_LxL2VG_Zenhpzw'
    },
    {
        handle: '@AMARINTVHD',
        name: 'Amarin TV',
        location: 'Bangkok, Thailand',
        lat: 13.7845,
        lng: 100.4789,
        channelId: 'UCzMoibQRslh_1bTuW0YXc6A'
    },
    {
        handle: '@vtv24',
        name: 'VTV24',
        location: 'Hanoi, Vietnam',
        lat: 21.0285,
        lng: 105.8542,
        channelId: 'UCabsTV34JwALXKGMqHpvUiA'
    },
    {
        handle: '@tvbsnews',
        name: 'TVBS',
        location: 'Taipei, Taiwan',
        lat: 25.0792,
        lng: 121.5714,
        channelId: 'UCIicAlXlv874Rp9LVfGOJfA'
    },
    {
        handle: '@ebcnews',
        name: 'EBC News',
        location: 'Taipei, Taiwan',
        lat: 25.0487,
        lng: 121.5152
    },
    {
        handle: '@ctvnews',
        name: 'CTV News',
        location: 'Taipei, Taiwan',
        lat: 25.0531,
        lng: 121.6033,
        channelId: 'UCi7Zk9baY1tvdlgxIML8MXg'
    },
    {
        handle: '@KBS_news',
        name: 'KBS News',
        location: 'Seoul, South Korea',
        lat: 37.5255,
        lng: 126.9174,
        channelId: 'UCSj5kxjpe_rDl0U21HDHjCQ'
    },
    {
        handle: '@MBCNEWS11',
        name: 'MBC News',
        location: 'Seoul, South Korea',
        lat: 37.5804,
        lng: 126.8906,
        channelId: 'UCF4Wxdo3inmxP-Y59wXDsFw'
    },
    {
        handle: '@sbsnews8',
        name: 'SBS News',
        location: 'Seoul, South Korea',
        lat: 37.5298,
        lng: 126.8736,
        channelId: 'UCkinYTS9IHqOEwR1Sze2JTw'
    },
    {
        handle: '@9News',
        name: '9News',
        location: 'Sydney, Australia',
        lat: -33.8202,
        lng: 151.2014,
        channelId: 'UC72nbKQLSDyiSARhg0Ywj4w'
    },
    {
        handle: '@SkyNewsAustralia',
        name: 'Sky News Australia',
        location: 'Sydney, Australia',
        lat: -33.8052,
        lng: 151.1913
    },
    {
        handle: '@1NewsNZ',
        name: '1News',
        location: 'Auckland, New Zealand',
        lat: -36.8485,
        lng: 174.7633,
        channelId: 'UCxPAYgO8OpFev3PUTKbsxNw'
    },
    {
        handle: '@ScrippsNews',
        name: 'Scripps News',
        location: 'Atlanta, USA',
        lat: 33.749,
        lng: -84.388,
        channelId: 'UCTln5ss6h6L_xNfMeujfPbg'
    },
    {
        handle: '@WUSA9',
        name: 'WUSA9',
        location: 'Washington DC, USA',
        lat: 38.9072,
        lng: -77.0369
    },
    {
        handle: '@KARE11',
        name: 'KARE11',
        location: 'Minneapolis, USA',
        lat: 44.9778,
        lng: -93.265,
        channelId: 'UC1JAwKeDUjN2orv5t7LWODQ'
    },
    {
        handle: '@KHOU11',
        name: 'KHOU11',
        location: 'Houston, USA',
        lat: 29.7604,
        lng: -95.3698
    },
    {
        handle: '@WFAA',
        name: 'WFAA',
        location: 'Dallas, USA',
        lat: 32.7767,
        lng: -96.797
    },
    {
        handle: '@fox5ny',
        name: 'FOX 5 NY',
        location: 'New York, USA',
        lat: 40.758,
        lng: -73.9855,
        channelId: 'UCIjSUWHWp6KohfnR5OQTXnQ'
    },
    {
        handle: '@fox11la',
        name: 'FOX 11 LA',
        location: 'Los Angeles, USA',
        lat: 34.0522,
        lng: -118.2437
    },
    {
        handle: '@FOX32Chicago',
        name: 'FOX 32 Chicago',
        location: 'Chicago, USA',
        lat: 41.8781,
        lng: -87.6298,
        channelId: 'UCFmofUYwZd1Ibf_O3PF71jg'
    },
    {
        handle: '@FOX5DC',
        name: 'FOX 5 DC',
        location: 'Washington DC, USA',
        lat: 38.9,
        lng: -77.03,
        channelId: 'UCHLyP4MuA-JAFBCwxXOEDdA'
    },
    {
        handle: '@abc7NY',
        name: 'ABC7 NY',
        location: 'New York, USA',
        lat: 40.76,
        lng: -73.98,
        channelId: 'UCrlIS7z20CnVaCrMvdkig_g'
    },
    {
        handle: '@abc7LA',
        name: 'ABC7 LA',
        location: 'Los Angeles, USA',
        lat: 34.06,
        lng: -118.25,
        channelId: 'UCcnHTNcSFhZV6qIySLYwnvw'
    },
    {
        handle: '@abc7Chicago',
        name: 'ABC7 Chicago',
        location: 'Chicago, USA',
        lat: 41.88,
        lng: -87.63,
        channelId: 'UC_vFLohxs5PkAxlk7Y6jEtw'
    },
    {
        handle: '@6abc',
        name: '6abc Philadelphia',
        location: 'Philadelphia, USA',
        lat: 39.9526,
        lng: -75.1652,
        channelId: 'UC-rOgnTonRr4MQkrjq3nLnw'
    },
    {
        handle: '@abc13houston',
        name: 'ABC13 Houston',
        location: 'Houston, USA',
        lat: 29.765,
        lng: -95.37,
        channelId: 'UCDmNmxF3ZVMeGyvWE9tOqPQ'
    },
    {
        handle: '@CBSNewYork',
        name: 'CBS New York',
        location: 'New York, USA',
        lat: 40.755,
        lng: -73.99,
        channelId: 'UCNZyLULUQBp5e9Q1cKtvk6Q'
    },
    {
        handle: '@CBSLosAngeles',
        name: 'CBS Los Angeles',
        location: 'Los Angeles, USA',
        lat: 34.05,
        lng: -118.24,
        channelId: 'UCY3-NVKDMeuBe_0A8A_LpFw'
    },
    {
        handle: '@CBSChicago',
        name: 'CBS Chicago',
        location: 'Chicago, USA',
        lat: 41.875,
        lng: -87.635,
        channelId: 'UCkBS_xU1WQ7FVsDoQ_OPeDg'
    },
    {
        handle: '@nbcnewyork',
        name: 'NBC New York',
        location: 'New York, USA',
        lat: 40.75,
        lng: -73.97,
        channelId: 'UCxCfoSInadl-4i3F70zDt1A'
    },
    {
        handle: '@nbcla',
        name: 'NBC LA',
        location: 'Los Angeles, USA',
        lat: 34.04,
        lng: -118.23,
        channelId: 'UCSWoppsVL0TLxFQ2qP_DLqQ'
    },
    {
        handle: '@Channel4News',
        name: 'Channel 4 News',
        location: 'London, UK',
        lat: 51.515,
        lng: -0.13,
        channelId: 'UCTrQ7HXWRRxr7OsOtodr2_w'
    },
    {
        handle: '@LBC',
        name: 'LBC',
        location: 'London, UK',
        lat: 51.51,
        lng: -0.125,
        channelId: 'UCGEIZdGkIYeU6FUwvkjCrIw'
    },
    {
        handle: '@TimesRadio',
        name: 'Times Radio',
        location: 'London, UK',
        lat: 51.505,
        lng: -0.12
    },
    {
        handle: '@a24',
        name: 'A24',
        location: 'Buenos Aires, Argentina',
        lat: -34.61,
        lng: -58.38,
        channelId: 'UCuPivVjnfNo4mb3Oog_frZg'
    },
    {
        handle: '@Canal26',
        name: 'Canal 26',
        location: 'Buenos Aires, Argentina',
        lat: -34.605,
        lng: -58.385,
        channelId: 'UCrpMfcQNog595v5gAS-oUsQ'
    },
    {
        handle: '@cronicatv',
        name: 'Crónica TV',
        location: 'Buenos Aires, Argentina',
        lat: -34.615,
        lng: -58.375,
        channelId: 'UCT7KFGv6s2a-rh2Jq8ZdM1g'
    },
    {
        handle: '@sbtnews',
        name: 'SBT News',
        location: 'São Paulo, Brazil',
        lat: -23.555,
        lng: -46.64,
        channelId: 'UC376n347Ob5Lwzq2WGzF1AA'
    },
    {
        handle: '@cnnbrasil',
        name: 'CNN Brasil',
        location: 'São Paulo, Brazil',
        lat: -23.56,
        lng: -46.65,
        channelId: 'UCvdwhh_fDyWccR42-rReZLw'
    },
    {
        handle: '@forotv',
        name: 'Foro TV',
        location: 'Mexico City, Mexico',
        lat: 19.42,
        lng: -99.14,
        channelId: 'UCj2jmbc1YrbYRudlRAe68uw'
    },
    {
        handle: '@adn40mx',
        name: 'ADN 40',
        location: 'Mexico City, Mexico',
        lat: 19.425,
        lng: -99.145
    },
    {
        handle: '@imagentv',
        name: 'Imagen Noticias',
        location: 'Mexico City, Mexico',
        lat: 19.43,
        lng: -99.135,
        channelId: 'UCl5JKSQsl-_WSU1rz7_BCJA'
    },
    {
        handle: '@RPPNoticias',
        name: 'RPP Noticias',
        location: 'Lima, Peru',
        lat: -12.05,
        lng: -77.04,
        channelId: 'UC5j8-2FT0ZMMBkmK72R4aeA'
    },
    {
        handle: '@canaln',
        name: 'Canal N',
        location: 'Lima, Peru',
        lat: -12.055,
        lng: -77.035
    },
    {
        handle: '@latinanoticias',
        name: 'Latina Noticias',
        location: 'Lima, Peru',
        lat: -12.06,
        lng: -77.03,
        channelId: 'UCpSJ5fGhmAME9Kx2D3ZvN3Q'
    },
    {
        handle: '@ecuavisa',
        name: 'Ecuavisa',
        location: 'Guayaquil, Ecuador',
        lat: -2.1894,
        lng: -79.8891,
        channelId: 'UCRUV3nUNSc-xpBrTwQOCQQg'
    },
    {
        handle: '@teleamazonasec',
        name: 'Teleamazonas',
        location: 'Quito, Ecuador',
        lat: -0.1807,
        lng: -78.4678
    },
    {
        handle: '@franceinfo',
        name: 'France Info',
        location: 'Paris, France',
        lat: 48.84,
        lng: 2.25,
        channelId: 'UCO6K_kkdP-lnSCiO3tPx7WA'
    },
    {
        handle: '@tagesschau',
        name: 'Tagesschau',
        location: 'Hamburg, Germany',
        lat: 53.5511,
        lng: 9.9937,
        channelId: 'UC5NOEUbkLheQcaaRldYW5GA'
    },
    {
        handle: '@canalsur',
        name: 'Canal Sur',
        location: 'Seville, Spain',
        lat: 37.3891,
        lng: -5.9845,
        channelId: 'UChtLgH7ZJLqLGWJpBnzy9Lg'
    },
    {
        handle: '@trthaber',
        name: 'TRT Haber',
        location: 'Ankara, Turkey',
        lat: 39.9208,
        lng: 32.8541,
        channelId: 'UCBgTP2LOFVPmq15W-RH-WXA'
    },
    {
        handle: '@ahaber',
        name: 'A Haber',
        location: 'Istanbul, Turkey',
        lat: 41.0082,
        lng: 28.9784,
        channelId: 'UCKQhfw-lzz0uKnE1fY1PsAA'
    },
    {
        handle: '@NTV',
        name: 'NTV Turkey',
        location: 'Istanbul, Turkey',
        lat: 41.01,
        lng: 28.98,
        channelId: 'UC9TDTjbOjFB9jADmPhSAPsw'
    },
    {
        handle: '@haberturktv',
        name: 'Habertürk TV',
        location: 'Istanbul, Turkey',
        lat: 41.012,
        lng: 28.982,
        channelId: 'UCn6dNfiRE_Xunu7iMyvD7AA'
    },
    {
        handle: '@cnnturk',
        name: 'CNN Türk',
        location: 'Istanbul, Turkey',
        lat: 41.014,
        lng: 28.984,
        channelId: 'UCV6zcRug6Hqp1UX_FdyUeBg'
    },
    {
        handle: '@halktv',
        name: 'Halk TV',
        location: 'Istanbul, Turkey',
        lat: 41.016,
        lng: 28.986
    },
    {
        handle: '@sozcutelevizyonu',
        name: 'Sözcü TV',
        location: 'Istanbul, Turkey',
        lat: 41.018,
        lng: 28.988,
        channelId: 'UCOulx_rep5O4i9y6AyDqVvw'
    },
    {
        handle: '@tsn',
        name: 'TSN',
        location: 'Kyiv, Ukraine',
        lat: 50.4501,
        lng: 30.5234,
        channelId: 'UCXoJ8kY9zpLBEz-8saaT3ew'
    },
    {
        handle: '@espresotv',
        name: 'Espreso.tv',
        location: 'Kyiv, Ukraine',
        lat: 50.452,
        lng: 30.525,
        channelId: 'UCMEiyV8N2J93GdPNltPYM6w'
    },
    {
        handle: '@geonews',
        name: 'Geo News',
        location: 'Karachi, Pakistan',
        lat: 24.8607,
        lng: 67.0011,
        channelId: 'UC_vt34wimdCzdkrzVejwX9g'
    },
    {
        handle: '@ARYNews',
        name: 'ARY News',
        location: 'Karachi, Pakistan',
        lat: 24.862,
        lng: 67.003
    },
    {
        handle: '@SamaaTV',
        name: 'Samaa TV',
        location: 'Karachi, Pakistan',
        lat: 24.864,
        lng: 67.005,
        channelId: 'UCJekW1Vj5fCVEGdye_mBN6Q'
    },
    {
        handle: '@dunyanews',
        name: 'Dunya News',
        location: 'Lahore, Pakistan',
        lat: 31.5204,
        lng: 74.3587,
        channelId: 'UCG7xCQTxgy93j6r49wl48rw'
    },
    {
        handle: '@ExpressNews',
        name: 'Express News',
        location: 'Lahore, Pakistan',
        lat: 31.522,
        lng: 74.36
    },
    {
        handle: '@BOLNetwork',
        name: 'Bol News',
        location: 'Karachi, Pakistan',
        lat: 24.866,
        lng: 67.007
    },
    {
        handle: '@92newshd',
        name: '92 News',
        location: 'Lahore, Pakistan',
        lat: 31.524,
        lng: 74.362
    },
    {
        handle: '@HumNewsPakistan',
        name: 'Hum News',
        location: 'Islamabad, Pakistan',
        lat: 33.6844,
        lng: 73.0479,
        channelId: 'UC0Um3pnZ2WGBEeoA3BX2sKw'
    },
    {
        handle: '@somoytvnetupdate',
        name: 'Somoy TV',
        location: 'Dhaka, Bangladesh',
        lat: 23.8103,
        lng: 90.4125
    },
    {
        handle: '@jamunatv',
        name: 'Jamuna TV',
        location: 'Dhaka, Bangladesh',
        lat: 23.812,
        lng: 90.414
    },
    {
        handle: '@channel24',
        name: 'Channel 24',
        location: 'Dhaka, Bangladesh',
        lat: 23.814,
        lng: 90.416,
        channelId: 'UCTqKPB3dPUAKqmRJhtF-Lig'
    },
    {
        handle: '@IndependentTelevision',
        name: 'Independent TV',
        location: 'Dhaka, Bangladesh',
        lat: 23.816,
        lng: 90.418,
        channelId: 'UCATUkaOHwO9EP_W87zCiPbA'
    },
    {
        handle: '@DBCNews',
        name: 'DBC News',
        location: 'Dhaka, Bangladesh',
        lat: 23.818,
        lng: 90.42,
        channelId: 'UC5pChk_evEhlVaEEV5-C4yg'
    },
    {
        handle: '@Ekattor',
        name: 'Ekattor TV',
        location: 'Dhaka, Bangladesh',
        lat: 23.82,
        lng: 90.422
    },
    {
        handle: '@AdaDerana',
        name: 'Ada Derana',
        location: 'Colombo, Sri Lanka',
        lat: 6.9271,
        lng: 79.8612,
        channelId: 'UCK-ZW31svFPfqrS-KetoNWg'
    },
    {
        handle: '@hirunews',
        name: 'Hiru News',
        location: 'Colombo, Sri Lanka',
        lat: 6.929,
        lng: 79.863
    },
    {
        handle: '@KantipurTVHD',
        name: 'Kantipur TV',
        location: 'Kathmandu, Nepal',
        lat: 27.7172,
        lng: 85.324,
        channelId: 'UC3yDoaqQzOd1bNP74ZrGPTA'
    },
    {
        handle: '@news24nepal',
        name: 'News24 Nepal',
        location: 'Kathmandu, Nepal',
        lat: 27.719,
        lng: 85.326
    },
    {
        handle: '@inquirerdotnet',
        name: 'INQUIRER',
        location: 'Manila, Philippines',
        lat: 14.5995,
        lng: 120.9842,
        channelId: 'UCvRAX-ujvZ0eTMLGG2vki9w'
    },
    {
        handle: '@rappler',
        name: 'Rappler',
        location: 'Manila, Philippines',
        lat: 14.601,
        lng: 120.986,
        channelId: 'UCdnZdQxYXnbN4uWJg96oGxw'
    },
    {
        handle: '@News5Everywhere',
        name: 'News5',
        location: 'Manila, Philippines',
        lat: 14.603,
        lng: 120.988,
        channelId: 'UCGEbMwiX774cseKvJqF9R2g'
    },
    {
        handle: '@SETiNEWS',
        name: 'SET iNEWS',
        location: 'Taipei, Taiwan',
        lat: 25.04,
        lng: 121.51
    },
    {
        handle: '@FTV_News',
        name: 'FTV News',
        location: 'Taipei, Taiwan',
        lat: 25.042,
        lng: 121.512,
        channelId: 'UC2VmWn8dAqkzlQqvy02E1PA'
    },
    {
        handle: '@ctsnewschannel',
        name: 'CTS News',
        location: 'Taipei, Taiwan',
        lat: 25.044,
        lng: 121.514
    },
    {
        handle: '@RTHK_News',
        name: 'RTHK News',
        location: 'Hong Kong',
        lat: 22.3193,
        lng: 114.1694,
        channelId: 'UCwuTCNZqSMfaiP63cGDb8LQ'
    },
    {
        handle: '@NowNewsHD',
        name: 'Now News',
        location: 'Hong Kong',
        lat: 22.321,
        lng: 114.171
    },
    {
        handle: '@K24TV',
        name: 'K24 TV',
        location: 'Nairobi, Kenya',
        lat: -1.285,
        lng: 36.818,
        channelId: 'UCt3SE-Mvs3WwP7UW-PiFdqQ'
    },
    {
        handle: '@InooroTV',
        name: 'Inooro TV',
        location: 'Nairobi, Kenya',
        lat: -1.287,
        lng: 36.82
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
