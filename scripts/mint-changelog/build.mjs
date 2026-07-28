// Renders src/data/mint-changelog.json straight from the raw internal
// changelogs in raw/ (populated by `npm run mint-changelog:pull`).
//
// This is a verbatim passthrough — no rewriting, no filtering, no curated
// allowlist. Every release in both source files is included as-is; the only
// transformation is parsing markdown into structured JSON for the page to
// render. Content decisions belong in the source CHANGELOG.md files
// themselves (../mint), not in this script.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseChangelog } from './parse.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const rawDir = join(here, 'raw')
const outPath = join(here, '../../src/data/mint-changelog.json')

const sourceFiles = {
  firmware: join(rawDir, 'firmware.md'),
  app: join(rawDir, 'software.md'),
}

function loadEntries(component) {
  const path = sourceFiles[component]
  if (!existsSync(path)) {
    throw new Error(
      `Missing raw changelog for "${component}": ${path}\n` +
      `Run "npm run mint-changelog:pull" first (requires a sibling ../mint checkout).`
    )
  }
  const releases = parseChangelog(readFileSync(path, 'utf8'))
  return releases.map(r => ({
    date: r.date,
    version: r.version,
    component,
    title: r.title,
    sections: r.sections,
    prose: r.prose,
  }))
}

function main() {
  const entries = [...loadEntries('firmware'), ...loadEntries('app')]
  entries.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

  writeFileSync(outPath, JSON.stringify(entries, null, 2) + '\n')
  console.log(`Wrote ${entries.length} changelog entries to ${outPath}`)
}

main()
