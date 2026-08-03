const fs = require('fs');

const data = JSON.parse(fs.readFileSync('streams.json', 'utf8'));

// Exact city coordinates for our primary 4
const preciseLocations = {
  "live-redbull": { lat: 47.8095, lng: 13.0550, name: "Salzburg, Austria" },
  "live-trt": { lat: 41.0082, lng: 28.9784, name: "Istanbul, Turkey" },
  "live-dw": { lat: 52.5200, lng: 13.4050, name: "Berlin, Germany" },
  "live-cbs": { lat: 38.9072, lng: -77.0369, name: "Washington D.C., USA" }
};

// General country centers for the rest
const countryCoords = {
  'AT': { lat: 47.5162, lng: 14.5501, name: "Austria" },
  'TR': { lat: 38.9637, lng: 35.2433, name: "Turkey" },
  'DE': { lat: 51.1657, lng: 10.4515, name: "Germany" },
  'US': { lat: 37.0902, lng: -95.7129, name: "United States" },
  'ES': { lat: 40.4637, lng: -3.7492, name: "Spain" },
  'CL': { lat: -35.6751, lng: -71.5430, name: "Chile" },
  'CM': { lat: 7.3697, lng: 12.3547, name: "Cameroon" },
  'IT': { lat: 41.8719, lng: 12.5674, name: "Italy" },
  'HN': { lat: 15.1990, lng: -86.2419, name: "Honduras" },
  'SV': { lat: 13.7942, lng: -88.8965, name: "El Salvador" },
  'CO': { lat: 4.5709, lng: -74.2973, name: "Colombia" },
  'GT': { lat: 15.7835, lng: -90.2308, name: "Guatemala" },
  'KH': { lat: 12.5657, lng: 104.9910, name: "Cambodia" },
  'BR': { lat: -14.2350, lng: -51.9253, name: "Brazil" },
  'MZ': { lat: -18.6657, lng: 35.5296, name: "Mozambique" }
};

data.forEach(stream => {
  if (preciseLocations[stream.id]) {
    stream.lat = preciseLocations[stream.id].lat;
    stream.lng = preciseLocations[stream.id].lng;
    stream.location = preciseLocations[stream.id].name;
  } else if (countryCoords[stream.location]) {
    // Add a microscopic random scatter (± ~2.7km) so streams in the same country don't overlap completely
    const scatterLat = (Math.random() - 0.5) * 0.05;
    const scatterLng = (Math.random() - 0.5) * 0.05;
    
    stream.lat = countryCoords[stream.location].lat + scatterLat;
    stream.lng = countryCoords[stream.location].lng + scatterLng;
    stream.location = countryCoords[stream.location].name;
  }
});

fs.writeFileSync('streams.json', JSON.stringify(data, null, 2));
console.log("Fixed all GPS coordinates in streams.json!");
