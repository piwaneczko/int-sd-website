# Int Software Development - Website

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
| Animations | Framer Motion |
| Forms | HTML5 + CSS |

---

## 📁 Project Structure

```
src/
├── assets/           # Resources (images, icons)
├── components/         # React components
│   ├── ui/           # UI components (Button, Card, etc.)
│   ├── layout/       # Page layout
│   └── sections/     # Page sections
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
| `npm run deploy` | Deploy to Synology via SSH (Linux/Mac) |
| `npm run deploy:win` | Deploy to Synology via SSH (Windows) |

---

## 🌐 Deployment

### Requirements
1. SSH access to Synology server
2. `rsync` installed

### Configuration
Add entry to `~/.ssh/config`:
```
Host synology
    HostName your-synology-ip-or-domain
    User your-username
    Port 22
```

### Run
```bash
# Linux/Mac
npm run deploy

# Windows
npm run deploy:win
```

Script automatically:
- builds the project (if not built)
- creates destination directory
- copies files via rsync
- saves log to `deploy.log`

---

## 🌐 Routing

| URL | Page |
|-----|------|
| `/` | Home |
| `/mint` | MINT - Inertial Navigation |
| `/about` | About Me |
| `/services` | Services |
| `/portfolio` | Projects |
| `/contact` | Contact |
| `/cookbook` | Recipes of Generations (family recipes) |

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
| index.html | 0.97 kB | 0.55 kB |
| styles.css | 23.24 kB | 4.77 kB |
| main.js | 241.50 kB | 74.40 kB |

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
