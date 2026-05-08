# PND Construction — Website

Drywall repair specialist website for **PND LLC** — Mesa, AZ.

## Stack

- **React 18** + **Vite** — no Tailwind, pure CSS
- All styles in `src/index.css`
- All components in `src/App.jsx`

## File Structure

```
pnd-construction/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx      ← React entry point
    ├── App.jsx       ← Full site + admin panel
    └── index.css     ← All styles
```

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for Production

```bash
npm run build
```

Upload the `dist/` folder to any host.

## Admin Panel

- Floating **Admin** button (bottom right)
- Default password: `PNDadmin123`
- Edit all content without touching code
- Quote requests saved to admin inbox (localStorage)

## Business Info

- **Owner:** Juan
- **Phone:** (602) 849-6384
- **Address:** 8139 E 2nd Ave, Mesa, AZ 85208
- **License:** ROC #357272 — B-3 General Remodeling & Repair
- **Valid through:** February 2027

## Deploy to GitHub Pages

1. `npm install --save-dev gh-pages`
2. Add `"deploy": "gh-pages -d dist"` to scripts in package.json
3. Add `base: '/repo-name/'` to vite.config.js
4. `npm run build && npm run deploy`
