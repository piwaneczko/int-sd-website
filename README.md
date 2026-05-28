# I.N.T. Software Development - Website

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-%5E18.2.0-blue.svg)
![Vite](https://img.shields.io/badge/vite-%5E5.0.0-blue.svg)
![TailwindCSS](https://img.shields.io/badge/tailwind-%5E3.4.0-blue.svg)

## 📖 O projekcie

To jest nowoczesna strona internetowa dla **I.N.T. Software Development** - Paweł Iwaneczko, przedstawiająca działalność w dziedzinie:
- 💻 Software Development
- 🔧 Embedded Systems
- 🧭 Inertial Navigation (MINT)
- 🌐 IoT
- 🐧 Linux & System Programming
- 🤖 AI & Local LLM

**Domena:** https://www.int-sd.net

---

## 🛠️ Technologie

| Kategoria | Technologia |
|-----------|-------------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router 6 |
| Icons | Lucide React |
| Animations | Framer Motion |
| Forms | HTML5 + CSS |

---

## 📁 Struktura projektu

```
src/
├── assets/           # Zasoby (obrazy, ikony)
├── components/         # Komponenty React
│   ├── ui/           # UI komponenty (Button, Card, etc.)
│   ├── layout/       # Układ strony
│   └── sections/     # Sekcje stron
├── pages/            # Komponenty stron
├── styles/           # Style CSS
└── utils/            # Utility functions
```

---

## 🚀 Instalacja i uruchomienie

### Wymagania
- Node.js (LTS)
- npm (lub pnpm/yarn)

### Krok po kroku

```bash
# Klonowanie repozytorium
git clone https://github.com/piwaneczko/int-sd-website.git
cd int-sd-website

# Instalacja zależności
npm install

# Uruchomienie dev servera
npm run dev

# Budowanie dla produkcji
npm run build

# Podgląd buildu
npm run preview
```

---

## 📄 Skrypty npm

| Skrypt | Opis |
|--------|------|
| `npm run dev` | Uruchomienie dev servera na http://localhost:3000 |
| `npm run build` | Budowanie plików do katalogu `/dist` |
| `npm run preview` | Podgląd wybuildowanej strony |

---

## 🌐 Routowanie

| URL | Strona |
|-----|--------|
| `/` | Home |
| `/mint` | MINT - Inertial Navigation |
| `/about` | O mnie |
| `/services` | Usługi |
| `/portfolio` | Projekty |
| `/contact` | Kontakt |
| `/cookbook` | Developer Cookbook (ukryta) |

---

## 🎨 Kolorystyka (Tailwind)

```javascript
colors: {
  primary: '#0ea5e9',    // Cyan/Blue
  deep: {
    900: '#0a0a0a',     // Ciemne tło
    800: '#111111',
    700: '#1a1a1a',
  },
  tech: {
    900: '#0f0f1a',     // Tech dark
  }
}
```

---

## 📦 Wydajność

| Plik | Rozmiar | Gzip |
|------|---------|------|
| index.html | 0.97 kB | 0.55 kB |
| styles.css | 23.24 kB | 4.77 kB |
| main.js | 241.50 kB | 74.40 kB |

---

## 🔐 Hidden Cookbook

Sekcja **Developer Cookbook** jest ukryta i dostępna poprzez:
- Ikona terminala w stopce
- LUB: `https://www.int-sd.net/cookbook`

Zawiera przewodniki techniczne:
- STM32 Embedded Guide
- Linux Kernel Modules
- Yocto Build System
- CMake Cookbook
- Qt/QML Tutorials
- Local LLM Deployment

---

## 📝 Notatki

- Projekt nie używa SSR (static site)
- Gotowe do hostowania na Netlify/Vercel/GitHub Pages
- CSS buildowany przez Tailwind JIT
- Komponenty zbudowane z myślą o modularności i ponownym użyciu

---

## 📄 Licencja

MIT License - patrz plik `LICENSE` lub `LICENSE.md`

---

**Created with Vite + React + TailwindCSS**
