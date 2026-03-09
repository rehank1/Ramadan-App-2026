# 🌙 Ramadan 2026 India — Prayer Times & Timetable App

A modern, production-ready web application for Ramadan 2026 prayer times across major Indian cities. Built with React + Vite + Tailwind CSS, featuring a distinctive midnight-blue and gold Islamic geometric aesthetic.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🏙️ 20+ Indian Cities | New Delhi, Mumbai, Kolkata, Hyderabad, Chennai, and more |
| 🕐 Live Countdown | Real-time countdown to next Sehri/Iftar with animated ring |
| 📅 Full 30-day Timetable | Complete Ramadan calendar with all 5 prayer times |
| 🌙 Sehri & Iftar | Highlighted times with visual emphasis |
| 🌍 Geolocation | Auto-detect nearest city from GPS coordinates |
| 🕌 Nearby Mosques | Powered by OpenStreetMap Overpass API |
| 🌓 Dark / Light Mode | System preference detection + manual toggle |
| 📱 Progressive Web App | Offline caching, installable on mobile |
| ♿ Accessible | Semantic HTML, ARIA labels, keyboard navigation |
| ⚡ Cached API Responses | 24-hour localStorage cache to minimize API calls |

---

## 🛠️ Technology Stack

- **Frontend**: React 18 with hooks
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 with custom CSS variables
- **Icons**: Lucide React
- **Fonts**: Playfair Display + DM Sans + Amiri (Arabic)
- **PWA**: vite-plugin-pwa (Workbox)
- **Prayer Times API**: [Aladhan API](https://aladhan.com/prayer-times-api) (free, no API key required)
- **Mosque Data**: [OpenStreetMap Overpass API](https://overpass-api.de/) (free, no API key required)

No backend server required — fully static frontend.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone or download the project
cd ramadan-2026

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Deploy to GitHub Pages

### One-time Setup

1. Create a GitHub repository (e.g., `ramadan-2026-india`)

2. In `vite.config.js`, update the base path to your repo name:
   ```js
   base: '/ramadan-2026-india/',
   ```

3. Initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/ramadan-2026-india.git
   git push -u origin main
   ```

4. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```
   This runs `vite build` then `gh-pages -d dist`.

5. In your GitHub repository settings → Pages → set source to `gh-pages` branch.

Your app will be live at: `https://YOUR_USERNAME.github.io/ramadan-2026-india/`

---

## 📂 Project Structure

```
ramadan-2026/
├── public/
│   ├── moon.svg              # Favicon (SVG crescent moon)
│   └── manifest.json         # PWA manifest
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Navigation + city selector + dark mode toggle
│   │   ├── CountdownHero.jsx # Live countdown ring + today's timings
│   │   ├── StatsBar.jsx      # Average Sehri, Iftar, fasting duration
│   │   ├── TimetableGrid.jsx # 30-day calendar (table on desktop, cards on mobile)
│   │   ├── MosquesFinder.jsx # Nearby mosques from Overpass API
│   │   ├── ErrorMessage.jsx  # Error display with retry
│   │   └── Footer.jsx        # Attribution footer
│   ├── hooks/
│   │   ├── usePrayerTimes.js # Fetches & caches Aladhan API data
│   │   ├── useCountdown.js   # Live countdown timer hook
│   │   └── useDarkMode.js    # Dark/light mode with system preference
│   ├── utils/
│   │   ├── aladhan.js        # Aladhan API service + time helpers
│   │   └── geo.js            # Geolocation + Overpass API + Haversine distance
│   ├── data/
│   │   └── cities.js         # Indian cities list with coordinates
│   ├── styles/
│   │   └── global.css        # Tailwind directives + CSS custom properties
│   ├── App.jsx               # Root component + global state
│   └── main.jsx              # React DOM entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🔌 API Reference

### Aladhan API

**Endpoint:** `GET https://api.aladhan.com/v1/calendar/{year}/{month}`

**Parameters:**
- `latitude` — City latitude
- `longitude` — City longitude
- `method` — Calculation method (1 = Karachi, recommended for India)

**Example Request:**
```
GET https://api.aladhan.com/v1/calendar/2026/3?latitude=28.6139&longitude=77.2090&method=1
```

**Example Response (single day):**
```json
{
  "timings": {
    "Fajr": "05:12 (+05:30)",
    "Sunrise": "06:33 (+05:30)",
    "Dhuhr": "12:21 (+05:30)",
    "Asr": "15:51 (+05:30)",
    "Maghrib": "18:09 (+05:30)",
    "Isha": "19:27 (+05:30)",
    "Imsak": "05:02 (+05:30)"
  },
  "date": {
    "readable": "17 Mar 2026",
    "hijri": {
      "day": "27",
      "month": { "en": "Sha'ban", "ar": "شعبان" },
      "year": "1447"
    }
  },
  "meta": {
    "latitude": 28.6139,
    "longitude": 77.209,
    "timezone": "Asia/Kolkata",
    "method": { "id": 1, "name": "University of Islamic Sciences, Karachi" }
  }
}
```

**How we use it:** We fetch March + April 2026 in parallel, then slice days 17–31 from March and days 1–15 from April to get the 30-day Ramadan calendar. Responses are cached in `localStorage` for 24 hours.

---

### OpenStreetMap Overpass API

**Endpoint:** `POST https://overpass-api.de/api/interpreter`

**Query (OverQL):**
```
[out:json][timeout:25];
(
  node["amenity"="place_of_worship"]["religion"="muslim"](around:5000,lat,lng);
  way["amenity"="place_of_worship"]["religion"="muslim"](around:5000,lat,lng);
);
out center 20;
```

**Example Response element:**
```json
{
  "type": "node",
  "id": 123456789,
  "lat": 28.6200,
  "lon": 77.2150,
  "tags": {
    "amenity": "place_of_worship",
    "religion": "muslim",
    "name": "Jama Masjid",
    "addr:street": "Chandni Chowk",
    "addr:city": "New Delhi"
  }
}
```

---

## 🗓️ Ramadan 2026 Dates

Ramadan 2026 is expected to begin on **17 March 2026** (subject to moon sighting). The app covers:
- **Start:** 17 March 2026 (1 Ramadan 1447 AH)
- **End:** 15 April 2026 (30 Ramadan 1447 AH)
- **Eid ul-Fitr:** ~16 April 2026 (subject to moon sighting)

> ⚠️ **Note:** Exact dates depend on local moon sighting. Always verify with your local mosque or Islamic organization.

---

## 🎨 Design Philosophy

The UI uses a **midnight-blue and gold** color palette inspired by Islamic geometric art:
- **Dark background:** Deep midnight (`#050810`) with subtle geometric patterns
- **Gold accents:** `#f0a800` for Sehri times, highlights, and interactive elements
- **Emerald green:** `#00c896` for Iftar times (symbolizing iftar/breaking fast)
- **Typography:** Playfair Display (display/headings) + DM Sans (body) + Amiri (Arabic text)
- **Animations:** Smooth CSS transitions, shimmer loading skeletons, ring progress countdown

---

## ♿ Accessibility

- Semantic HTML5 landmarks (`header`, `main`, `section`, `footer`)
- ARIA labels on interactive elements
- Keyboard navigable dropdowns
- Color contrast ratios meet WCAG AA
- `role="listbox"` and `role="option"` on city selector
- `role="alert"` on error messages

---

## 📱 PWA / Offline Support

The app uses Workbox (via vite-plugin-pwa) to:
- Cache Aladhan API responses with a `CacheFirst` strategy (24h TTL)
- Enable installability on mobile home screens
- Work offline once data has been fetched once

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

*رمضان كريم — Ramadan Kareem. May this blessed month bring peace, mercy, and blessings to you and your family.*
