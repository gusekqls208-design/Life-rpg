LIFE RPG — WINTER ARC PWA (temporary character art)

Files:
- index.html, styles.css, app.js: application
- manifest.webmanifest: install metadata
- sw.js: offline app-shell cache
- assets/: temporary character placeholder and app icon

Run locally:
  python3 -m http.server 8000
Then open http://localhost:8000

Deploy:
Upload the entire folder to any HTTPS static host (GitHub Pages, Netlify, Vercel, etc.).
On iPhone, open the HTTPS URL in Safari > Share > Add to Home Screen.

Data is stored locally in IndexedDB on this device/browser. Export JSON regularly.
This is an initial web migration; it does not automatically import the Swift UserDefaults database.
Replace assets/placeholder.svg with the supplied stage cutouts later and update avatar selection in app.js.
