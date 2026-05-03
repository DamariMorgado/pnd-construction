# PND Construction — Website

Business website for **PND Construction (PND LLC)**, a licensed drywall contractor based in Mesa, AZ.

## File Structure

```
pnd-construction/
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── vite.config.js        # Vite bundler config
├── tailwind.config.js    # Tailwind CSS config
├── postcss.config.js     # PostCSS config
└── src/
    ├── main.jsx          # React entry point
    ├── App.jsx           # Main site component (all sections + admin panel)
    └── index.css         # Tailwind base styles
```

## Tech Stack

- **React 18** — UI components
- **Tailwind CSS** — Styling
- **Vite** — Dev server and build tool

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production

```bash
npm run build
```

Output goes to the `dist/` folder — upload that to any host.

## Admin Panel

A floating **Admin** button in the bottom-right corner opens the dashboard.

- **Default password:** `PNDadmin123`
- Edit all content (headlines, services, phone, etc.) without touching code
- View quote requests submitted from the contact form
- All changes save automatically to the browser via localStorage

## Deploying to GitHub Pages

1. Install the GitHub Pages plugin:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add to `package.json` scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```
3. Add `base` to `vite.config.js`:
   ```js
   base: "/your-repo-name/";
   ```
4. Build and deploy:
   ```bash
   npm run build && npm run deploy
   ```

## Business Info

- **Owner:** Juan
- **Phone:** (602) 849-6384
- **Address:** 8139 E 2nd Ave, Mesa, AZ 85208
- **License:** ROC #357272 — B-3 General Remodeling & Repair Contractor
- **License valid through:** February 2027
