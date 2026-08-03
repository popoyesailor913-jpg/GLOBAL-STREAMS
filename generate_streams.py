import json
import random

# Core working streams
core_streams = [
  {
    "id": "hls-cam-01",
    "name": "Mux HLS Test (Big Buck Bunny)",
    "location": "Monterey, California",
    "lat": 36.6002,
    "lng": -121.8946,
    "type": "hls",
    "url": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" 
  },
  {
    "id": "hls-cam-02",
    "name": "Apple HLS Test (BipBop)",
    "location": "Boston, MA",
    "lat": 42.3601,
    "lng": -71.0589,
    "type": "hls",
    "url": "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8"
  },
  {
    "id": "test-01",
    "name": "New York (Demo)",
    "location": "New York, USA",
    "lat": 40.7580,
    "lng": -73.9855,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1&mute=1" 
  },
  {
    "id": "test-02",
    "name": "Tokyo Walk (Demo)",
    "location": "Tokyo, Japan",
    "lat": 35.6595,
    "lng": 139.7001,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
  },
  {
    "id": "test-04",
    "name": "Paris View (Demo)",
    "location": "Paris, France",
    "lat": 48.8584,
    "lng": 2.2945,
    "type": "youtube",
    "url": "https://www.youtube.com/embed/9bZkp7q19f0?autoplay=1&mute=1"
  }
]

# Generate 3000 more random streams across the globe to populate the map
regions = [
    {"name": "North America", "lat_range": (30, 50), "lng_range": (-120, -70), "weight": 0.3},
    {"name": "Europe", "lat_range": (35, 60), "lng_range": (-10, 30), "weight": 0.4},
    {"name": "Asia", "lat_range": (10, 45), "lng_range": (70, 140), "weight": 0.2},
    {"name": "South America", "lat_range": (-40, 10), "lng_range": (-80, -40), "weight": 0.05},
    {"name": "Australia", "lat_range": (-35, -15), "lng_range": (115, 150), "weight": 0.05}
]

generated_streams = list(core_streams)

for i in range(3000):
    region = random.choices(regions, weights=[r["weight"] for r in regions])[0]
    lat = random.uniform(region["lat_range"][0], region["lat_range"][1])
    lng = random.uniform(region["lng_range"][0], region["lng_range"][1])
    
    # Pick a random video type
    is_hls = random.choice([True, False])
    if is_hls:
        vid_type = "hls"
        url = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    else:
        vid_type = "youtube"
        url = "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1&mute=1"

    generated_streams.append({
        "id": f"mock-{i}",
        "name": f"Public Cam #{i+1000}",
        "location": f"Region: {region['name']}",
        "lat": lat,
        "lng": lng,
        "type": vid_type,
        "url": url
    })

with open('streams.json', 'w') as f:
    json.dump(generated_streams, f, indent=2)

print(f"Generated {len(generated_streams)} streams.")
