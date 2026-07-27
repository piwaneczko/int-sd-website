# I.N.T. Software Development - Website

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-%5E18.2.0-blue.svg)
![Vite](https://img.shields.io/badge/vite-%5E5.0.0-blue.svg)
![TailwindCSS](https://img.shields.io/badge/tailwind-%5E3.4.0-blue.svg)

## 📖 About Project

This is a modern website for **Int Software Development** - Paweł Iwaneczko, showcasing expertise in:
- 💻 Software Development
- 🔧 Embedded Systems
- 🧭 Inertial Navigation (MINT)
- 🌐 IoT
- 🐧 Linux & System Programming
- 🤖 AI & Local LLM

**Domain:** https://www.int-sd.net

## 📝 Note on "Cookbook"

The **Cookbook** section on the website is actually **"Recipes of Generations"** - a virtual collection of family and friend recipes (breakfasts, lunches, dinners, sweets, holidays). It is NOT a "Developer Cookbook" with technical guides.

Access via:
- Footer link: "Resources → Cookbook"
- URL: `https://www.int-sd.net/cookbook`

---

## 🛠️ Technologies

| Category | Technology |
|----------|------------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router 6 |
| Icons | Lucide React |
| Forms | EmailJS (`@emailjs/browser`) |
| i18n | Custom (`src/i18n/translations.js` + `LanguageContext`) |

> Note: `framer-motion` is listed in `package.json` but is not currently used anywhere in `src` — animations are done with plain CSS transitions/keyframes.

---

## 📁 Project Structure

```
src/
├── assets/           # Resources (images, icons)
├── components/         # React components
│   ├── ui/           # UI components (Button, Card, Timeline, etc.)
│   ├── layout/       # Page layout
│   └── sections/     # Page sections
├── contexts/         # React contexts (LanguageContext)
├── i18n/             # Translations (pl/en) — translations.js
├── pages/            # Page components
├── styles/           # CSS styles
└── utils/            # Utility functions
```

---

## 🚀 Installation & Setup

### Requirements
- Node.js (LTS)
- npm (or pnpm/yarn)
- rsync (for deployment)

### Step by Step

```bash
# Clone repository
git clone https://github.com/piwaneczko/int-sd-website.git
cd int-sd-website

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

---

## 📄 npm Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server on http://localhost:3000 |
| `npm run build` | Build files to `/dist` directory |
| `npm run preview` | Preview built website |
| `npm run deploy` | Deploy to Synology via SSH (Linux/Mac/WSL) |
| `npm run deploy:win` | Deploy to Synology from Windows — runs `deploy.sh` inside WSL |
| `npm run deploy:recipes` | Sync only `public/recipes.json` to Synology |

---

## 🌐 Deployment

### Requirements
1. SSH access to Synology server
2. `rsync` installed (in WSL, if deploying from Windows)

### Configuration
Add entry to `~/.ssh/config` **inside WSL** (not Windows' own `~/.ssh/config` — `deploy.ps1` always runs `deploy.sh` inside WSL):
```
Host synology
    HostName your-synology-ip-or-domain
    User your-username
    Port 22
```

### Run
```bash
# Linux/Mac/WSL
npm run deploy

# Windows (delegates to WSL)
npm run deploy:win
```

`deploy.sh` automatically:
- builds the project
- creates the destination directory
- copies files via `rsync --delete` (removes files on the server that no longer exist locally — `public/ota/*` is excluded from deletion since it's gitignored and may not be present on every machine)
- saves a log entry to `deploy.log`

`deploy.ps1` just forwards to `deploy.sh` inside WSL — there is no separate Windows-native deploy path anymore, to avoid two rsync implementations drifting apart.

---

## 🌐 Routing

| URL | Page |
|-----|------|
| `/` | Home |
| `/mint` | MINT - Micro Inertial Navigation Tracker |
| `/about` | About Me |
| `/services` | Services |
| `/portfolio` | Projects |
| `/contact` | Contact |
| `/cookbook` | Recipes of Generations (family recipes) |

---

## 📡 OTA Firmware Hosting (MINT)

The site also serves firmware updates for the **MINT** device's Flutter
companion app, as static files under `public/ota/`:

| File | Purpose |
|------|---------|
| `public/ota/manifest.json` | Version, download URL, size, release notes — polled by the app's OTA manager |
| `public/ota/firmware.bin` | Signed firmware binary served at `https://int-sd.net/ota/firmware.bin` |

⚠️ These files are **gitignored** (`public/ota/*`) — they are not tracked in
the repo and must be uploaded to the server independently of `npm run
deploy` (e.g. via `rsync`), similar to `deploy:recipes`.

---

## 🎨 Color Palette (Tailwind)

```javascript
colors: {
  primary: '#0ea5e9',    // Cyan/Blue
  deep: {
    900: '#0a0a0a',     // Dark background
    800: '#111111',
    700: '#1a1a1a',
  },
  tech: {
    900: '#0f0f1a',     // Tech dark
  }
}
```

---

## 📦 Performance

| File | Size | Gzip |
|------|------|------|
| index.html | 1.06 kB | 0.57 kB |
| styles.css | 27.52 kB | 5.37 kB |
| main.js | 263.02 kB | 81.45 kB |

*(Filenames are hashed by Vite at build time, e.g. `index-[hash].css` / `index-[hash].js` under `dist/assets/` — simplified above for readability. Numbers from the latest `npm run build`.)*

---

## 📖 Cookbook (Recipes)

The **Cookbook** (Recipes of Generations) section contains family recipes:

| Category | Description |
|----------|-------------|
| 🥞 Breakfast | Morning dishes |
| 🍽️ Lunch | Main meal |
| 🍲 Dinner | Evening dishes |
| 🍰 Sweets | Desserts and baked goods |
| 🎂 Holidays | Holiday recipes |

**Availability:**
- Footer link: **Resources → Cookbook**
- Direct URL: `/cookbook`

**Tech Stack:**
- React + Tailwind CSS
- Category filtering
- Expandable recipe cards

---

## 📝 Notes

- Project does not use SSR (static site)
- Ready for hosting on Netlify/Vercel/GitHub Pages
- CSS built by Tailwind JIT
- Components built with modularity and reuse in mind

---

## 📄 License

MIT License - see `LICENSE` or `LICENSE.md` file

---

**Created with Vite + React + TailwindCSS**

---

## 📚 Translations

The website supports **Polish (pl)** and **English (en)** languages.
Translation files are located in `src/i18n/translations.js`.
