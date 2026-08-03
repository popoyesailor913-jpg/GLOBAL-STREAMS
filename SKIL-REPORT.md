# Globe Map Live Streams & Webcams Viewer — Skills Report

**Project**: Globe Map Live Streams & Webcams Viewer

## 🛠️ Relevant Technical Skills

| Category | Technology / Library | Purpose |
|----------|----------------------|---------|
| **Map Rendering** | MapLibre GL JS (`v5.x`+) | GPU-accelerated 3D globe and 2D map engine used to project the interactive globe surface. |
| **Vector Map Tiles** | OpenFreeMap / OpenStreetMap | Renders the map topology, street-level details, and place labels on the 3D globe. |
| **Marker Projection Layer** | MapLibre Layer (Circle Shader / Custom Markers) | Used to project dots/markers onto the 3D globe mesh surface exactly at their GPS locations with zero drift. |
| **Interactivity** | MapLibre GL JS Events | Handles click events on marker dots to open and view the associated live stream/webcam. |

## 🎨 Key Features & Architecture

### 1. 3D Globe Projection
- **Globe Rendering**: Utilizes MapLibre GL JS to render a fully interactive 3D globe projection instead of a standard flat map.
- **Base Map**: Integrates vector tiles (e.g., OpenFreeMap) to provide a visually pleasing geographical context on the globe surface.

### 2. Live Stream Marker Dots
- **GPS Coordinates Mapping**: Maps the collected live streams and webcams from around the world using precise GPS coordinates (Latitude/Longitude).
- **Marker Layer Rendering**: Uses a high-performance WebGL layer (like MapLibre's Circle Layer) to pin dots directly onto the globe's 3D geometry.
- **Click-to-View Interface**: Attaches click event listeners to the markers so that when a dot is clicked, the specific live stream or webcam is opened in the viewer for playback.
