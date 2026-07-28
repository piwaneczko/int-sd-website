# I.N.T. Software Development - Website

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-%5E18.2.0-blue.svg)
![Vite](https://img.shields.io/badge/vite-%5E5.0.0-blue.svg)
![TailwindCSS](https://img.shields.io/badge/tailwind-%5E3.4.0-blue.svg)

## 📖 About Project

This is the corporate website of **I.N.T. Software Development**, a B2B
embedded/Linux/IoT engineering business that also develops **MINT** (Micro
Inertial Navigation Tracker), an independent inertial-navigation product
(nRF52 firmware + a Flutter companion app). The site presents the company's
service offering and the MINT product, including a public changelog for
MINT's firmware and app releases.

- 💻 Software Development (B2B contracts)
- 🔧 Embedded Systems / Firmware
- 🧭 Inertial Navigation (MINT)
- 🌐 IoT
- 🐧 Linux & System Programming
- 🤖 AI & Local LLM

**Domain:** https://www.int-sd.net

> The **Cookbook** section is an unrelated family recipe collection ("Recipes of Generations"), kept on the site for historical reasons — not developer documentation.

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

> Animations are done with plain CSS transitions/keyframes, no animation library.

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
| `npm run mint-changelog` | Refresh `src/data/mint-changelog.json` from `../mint/*/CHANGELOG.md` (see below) |

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
| `/mint/changelog` | MINT firmware & app release history |
| `/about` | About / selected work |
| `/services` | Services |
| `/portfolio` | Projects |
| `/contact` | Contact |
| `/privacy` | Privacy policy (draft, pending legal review) |
| `/terms` | Terms of service (draft, pending legal review) |
| `/cookbook` | Recipes of Generations (unrelated family recipes) |

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

## 🧾 MINT Changelog Pipeline

`/mint/changelog` is built from the internal `CHANGELOG.md` files of the
sibling `../mint/firmware` and `../mint/software` checkouts, not hand-written:

```bash
npm run mint-changelog:pull   # copy ../mint/*/CHANGELOG.md into scripts/mint-changelog/raw/ (gitignored)
npm run mint-changelog:build  # parse them and write src/data/mint-changelog.json
npm run mint-changelog        # both steps together
```

`deploy.sh` runs this automatically before building, and skips it (with a
warning) if `../mint` isn't present on the machine. The parser
(`scripts/mint-changelog/parse.mjs`) is a small, dependency-free parser
tailored to these files' actual format, not a generic Keep a Changelog
parser — the source files use `---` separators and a title suffix on the
version header that trip up stricter parsers.

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
