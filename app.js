document.addEventListener('DOMContentLoaded', () => {
    const map = new maplibregl.Map({
        container: 'map', 
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        center: [-0.1276, 51.5072], // Center on London to see the new real traffic cams
        zoom: 2, // Slightly zoomed in so they can see Europe
        pitch: 0
    });

    // CRITICAL BUGFIX: The dark-matter style forces Mercator when it loads.
    // We must wait for the style to load before forcefully overriding it with the globe projection.
    map.on('style.load', () => {
        if (map.setProjection) {
            map.setProjection({ type: 'globe' });
        }
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');

    const modal = document.getElementById('stream-viewer-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const iframe = document.getElementById('video-frame');
    const hlsVideo = document.getElementById('hls-player');
    const mp4Video = document.getElementById('mp4-player');
    const mjpegImg = document.getElementById('mjpeg-player');
    const streamTitle = document.getElementById('stream-title');
    const streamLocation = document.getElementById('stream-location');
    
    let hlsInstance = null;
    let mjpegRefreshInterval = null;

    map.on('load', () => {
        // Fetch streams and convert to GeoJSON for massive WebGL rendering
        // Appended cache-buster to prevent http-server from returning stale JSON
        fetch('streams.json?t=' + new Date().getTime())
            .then(res => res.json())
            .then(streams => {
                const features = streams.map(stream => ({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [stream.lng, stream.lat]
                    },
                    properties: stream
                }));

                const geojson = {
                    type: 'FeatureCollection',
                    features: features
                };

                // Add GeoJSON Source
                map.addSource('webcams', {
                    type: 'geojson',
                    data: geojson
                });

                // Add WebGL Circle Layer (Outer Glow)
                map.addLayer({
                    id: 'webcam-glow-layer',
                    type: 'circle',
                    source: 'webcams',
                    paint: {
                        'circle-radius': 12,
                        'circle-color': '#00e5ff',
                        'circle-opacity': 0.4,
                        'circle-blur': 1
                    }
                });

                // Add WebGL Circle Layer (Inner Core)
                map.addLayer({
                    id: 'webcam-core-layer',
                    type: 'circle',
                    source: 'webcams',
                    paint: {
                        'circle-radius': 5,
                        'circle-color': '#ffffff',
                        'circle-stroke-width': 2,
                        'circle-stroke-color': '#00e5ff'
                    }
                });
            })
            .catch(err => console.error("Error loading streams data:", err));

        // Interactivity: Hover effects
        map.on('mouseenter', 'webcam-core-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'webcam-core-layer', () => {
            map.getCanvas().style.cursor = '';
        });

        // Interactivity: Click to open stream
        map.on('click', 'webcam-core-layer', (e) => {
            const stream = e.features[0].properties;
            
            // Fly to location
            map.flyTo({
                center: [stream.lng, stream.lat],
                zoom: 5,
                pitch: 60,
                duration: 2000,
                essential: true 
            });

            openStreamViewer(stream);
        });
    });

    function openStreamViewer(stream) {
        streamTitle.textContent = stream.name;
        streamLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${stream.location}`;
        
        // Reset players
        iframe.src = '';
        iframe.style.display = 'none';
        hlsVideo.style.display = 'none';
        mp4Video.style.display = 'none';
        mjpegImg.style.display = 'none';
        
        if (hlsInstance) {
            hlsInstance.destroy();
            hlsInstance = null;
        }
        if (mjpegRefreshInterval) {
            clearInterval(mjpegRefreshInterval);
            mjpegRefreshInterval = null;
        }

        // Handle different stream formats natively
        if (stream.type === 'hls' || (stream.url && stream.url.endsWith('.m3u8'))) {
            hlsVideo.style.display = 'block';
            
            if (Hls.isSupported()) {
                hlsInstance = new Hls();
                hlsInstance.loadSource(stream.url);
                hlsInstance.attachMedia(hlsVideo);
                hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
                    hlsVideo.play();
                });
            }
            else if (hlsVideo.canPlayType('application/vnd.apple.mpegurl')) {
                // Safari native HLS support
                hlsVideo.src = stream.url;
                hlsVideo.play();
            }
        } else if (stream.type === 'mp4' || (stream.url && stream.url.endsWith('.mp4'))) {
            mp4Video.style.display = 'block';
            mp4Video.src = stream.url;
            mp4Video.play();
        } else if (stream.type === 'mjpeg' || (stream.url && stream.url.match(/\.(jpg|jpeg|png)$/i))) {
            mjpegImg.style.display = 'block';
            mjpegImg.src = stream.url;
            
            // MJPEG / Traffic Cam refresh hack (refresh image every 5 seconds)
            mjpegRefreshInterval = setInterval(() => {
                mjpegImg.src = stream.url + (stream.url.includes('?') ? '&' : '?') + 't=' + new Date().getTime();
            }, 5000);
        } else if (stream.type === 'youtube') {
            // Reverted to simple iframe for GitHub Pages static hosting
            iframe.style.display = 'block';
            iframe.src = stream.url;
        } else {
            // Fallback for older iframe embeds just in case
            iframe.style.display = 'block';
            iframe.src = stream.url;
        }
        
        modal.classList.remove('hidden');
    }

    function closeStreamViewer() {
        modal.classList.add('hidden');
        
        // Delay clearing video so modal fade out is smooth
        setTimeout(() => {
            iframe.src = '';
            if (hlsInstance) {
                hlsInstance.destroy();
                hlsInstance = null;
            }
            if (mjpegRefreshInterval) {
                clearInterval(mjpegRefreshInterval);
                mjpegRefreshInterval = null;
            }
            hlsVideo.pause();
            hlsVideo.removeAttribute('src');
            hlsVideo.load();
            
            mp4Video.pause();
            mp4Video.removeAttribute('src');
            mp4Video.load();
            
            mjpegImg.src = '';
        }, 300);
        
        // Zoom back out to global view
        map.flyTo({
            zoom: 1.5,
            pitch: 45,
            duration: 2000,
            essential: true
        });
    }

    closeModalBtn.addEventListener('click', closeStreamViewer);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeStreamViewer();
        }
    });
});
