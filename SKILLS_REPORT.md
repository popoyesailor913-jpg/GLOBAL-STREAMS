# Radio Earth 3D — Skills & Capabilities Report

**Project**: Radio Earth 3D (Global Radio Explorer)  
**Location**: `G:\PERSONAL FOLDERS\DEEPU\AI APP DEVELOPMENT\GLOBAL RADIO`  
**Date**: July 2026  
**Status**: Active & Verified  

---

## Executive Summary

Radio Earth 3D is a single-file WebGL radio exploration platform mapping 12,858 verified genuine GPS radio broadcasts across the planet. This document details the technical skills, architectural components, design patterns, and engineering solutions integrated into the codebase.

---

## 🛠️ Technical Stack & Dependencies

| Category | Technology / Library | Version / CDN | Purpose |
|----------|----------------------|---------------|---------|
| **Core UI / Logic** | HTML5, CSS3, ES6+ JavaScript | Native Browser Engine | Zero-dependency single-file web application (`GLOBAL-RADIO.html`) |
| **Map Rendering** | MapLibre GL JS | `v5.6.0` (CDN) | GPU-accelerated 3D globe and 2D Mercator vector map engine |
| **Vector Map Tiles** | OpenFreeMap Dark | OpenStreetMap Vector Tiles | Unlimited street-level map details, city/country place labels without API keys |
| **Native WebGL Station Layer** | MapLibre Circle Shader Layer | Built-in WebGL Shader | Renders **12,858 verified GPS station dots** pinned directly onto 3D globe mesh surface geometry with 0ms drift |
| **Hierarchical Administrative Grouping** | Non-GPS Place Aggregator | Administrative Hierarchy | Groups non-GPS stations into administrative place buckets (**Towns/Cities → States → Countries → Continents**) with capped dot size (max 18px) |
| **Animated Place Sidebar Panel** | CSS Vertical Slide | `#place-panel.active` | Allocates space at top of left sidebar for clicked place stations with a smooth **vertical sliding animation** |
| **Instant Local Station Cache** | Local Cache & Server Handler | `stations_cache.json` + `GET /api/stations` | Serves 12,858 genuine GPS stations from local disk in **< 75ms** on page load |
| **Audio Engine & Proxy** | Native HTML5 `<audio>`, HLS.js, Node.js Proxy | `server.js` + `hls.js` | Plays MP3, AAC, and `.m3u8` playlists directly in browser, bypassing CORS restrictions via Node.js proxy |
| **AI Translation** | Groq Whisper-large-v3 | `POST /transcribe` | Real-time speech-to-text transcription and translation to English |
| **Typography** | Google Fonts | Inter, JetBrains Mono, Outfit | Premium futuristic cyber-dark aesthetic |
| **Icons** | FontAwesome | `v6.4.0` (CDN) | Complete iconography set |

---

## 🎨 Key Features & Architecture

### 1. 100% Genuine Verified GPS Locations & Animated Station Markers
- **Real GPS Stations (12,858)**: Placed as individual 100% exact dots at their exact GPS locations on the WebGL 3D globe and 2D map.
- **Animated Station Marker**: Active station renders a floating HTML radio icon pinned perfectly above the globe with a tether line dropping exactly to the station dot. Features pulsing and emitting sonar rings tied directly to audio playback state.
- **Asynchronous UI Syncing**: Play/Pause button states and marker animations are optimistically deferred inside the audio engine's `.then()` Promise chain. This ensures UI elements never desync if a stream takes time to buffer or fails to reconnect.
- **Non-GPS Place Aggregation**: Non-GPS stations are grouped into exclusive administrative place dots (**Towns/Cities → States → Countries → Continents**). Stations grouped at a finer level (City/Town) are **NOT** re-bunched at larger levels.

### 2. Animated Vertical Sliding Sidebar Station Panel
- **Clicking Place Marker Dot**:
  - Opens `#place-panel` at the top of the left sidebar.
  - Smoothly **slides down vertically**, allocating space at the top of the sidebar and pushing the global station list downward.
  - Displays the selected place's station list with full station info and play buttons.
- **Clicking Away / `[x]` Close Button**:
  - Retracts `#place-panel` upward with a **smooth reverse vertical slide-up animation**.
  - Restores the default global station list back to the top of the sidebar.

---

## 📄 Repository Checkpoints Log

- **Commit `6cc4f3d`**: Dark Theme
- **Commit `40a7fbb`**: Animated Icon replicates well on 2D Map
- **Commit `502cac9`**: Implement hierarchical administrative place grouping for non-GPS stations and vertical sliding sidebar panel.
- **Commit `668556d`**: **Only GPS Station On Globe**
- **Commit `66a689c`**: Filter strictly for 100% genuine verified GPS stations.

---

## 🚀 How to Run

```powershell
# 1. Start the server
node server.js

# 2. Open application in browser
http://localhost:8080
```

---

## Agent Checkpoint Workflow

**CRITICAL RULE FOR ALL AGENTS:**
Whenever the user requests to "save the checkpoint" or "save a checkpoint", you MUST adhere strictly to this sequence:
1. **Update Skills First**: Identify the new checkpoint name/hash and append it to the "Repository Checkpoints Log" section in both `SKILLS_REPORT.md` and the Antigravity `SKILL.md` file.
2. **Git Commit / Amend**: Add the modified code files AND the updated skill files to git. Commit them together so the skills documentation is permanently snapshotted *inside* the checkpoint. If a commit was already created prematurely, use `git commit --amend` to squish the updated skills into the existing checkpoint.
