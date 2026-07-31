// Entry point for vite-prerender-plugin. Runs at build time (Node, not the
// browser) for every route reachable from "/" via <a href> links, so it must
// stay side-effect-free w.r.t. anything browser-only (no window/document
// access outside of React's own rendering).
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { LanguageProvider } from './contexts/LanguageContext'
import { AppShell } from './App'

const SITE_URL = 'https://www.int-sd.net'

// head.elements only ever gets *appended* to <head> by the plugin (it can't
// replace existing tags), so the per-route canonical is injected here rather
// than left as a single static tag in index.html — otherwise every
// prerendered page would share one canonical pointing at the homepage.
const TITLES = {
  '/': 'I.N.T. Software Development | Embedded, nawigacja inercjalna, IoT',
  '/mint': 'MINT — Micro Inertial Navigation Tracker | I.N.T. Software Development',
  '/mint/changelog': 'Historia zmian MINT | I.N.T. Software Development',
  '/about': 'Wybrane realizacje | I.N.T. Software Development',
  '/services': 'Usługi | I.N.T. Software Development',
  '/portfolio': 'Projekty | I.N.T. Software Development',
  '/contact': 'Kontakt | I.N.T. Software Development',
  '/privacy': 'Polityka prywatności | I.N.T. Software Development',
  '/privacy/mint': 'Polityka prywatności — MINT | I.N.T. Software Development',
  '/terms': 'Regulamin | I.N.T. Software Development',
  '/cookbook': 'Cookbook | I.N.T. Software Development',
}

export async function prerender({ url }) {
  const html = renderToString(
    <LanguageProvider>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </LanguageProvider>
  )

  const { parseLinks } = await import('vite-prerender-plugin/parse')
  const links = parseLinks(html)

  return {
    html,
    links: new Set(links),
    head: {
      lang: 'pl',
      title: TITLES[url] ?? TITLES['/'],
      elements: new Set([
        { type: 'link', props: { rel: 'canonical', href: url === '/' ? SITE_URL : `${SITE_URL}${url}` } },
      ]),
    },
  }
}
