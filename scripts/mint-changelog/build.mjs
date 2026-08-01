// Renders src/data/mint-changelog.json straight from the sanitized public
// changelogs in public/ (populated by `npm run mint-changelog:pull` from
// each mint repo's CHANGELOG.public.md — see pull.mjs).
//
// This step itself is a verbatim passthrough — no rewriting, no filtering,
// no curated allowlist. Every release in both source files is included
// as-is; the only transformation is parsing markdown into structured JSON
// for the page to render. The actual content filtering already happened
// upstream, in ~/scripts/ollama-sanitize-changelog.sh, when CHANGELOG.md
// was rewritten into CHANGELOG.public.md — that is where content decisions
// belong, not here.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseChangelog } from './parse.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const publicDir = join(here, 'public')
const outPath = join(here, '../../src/data/mint-changelog.json')

const sourceFiles = {
  firmware: join(publicDir, 'firmware.md'),
  app: join(publicDir, 'software.md'),
}

function loadEntries(component) {
  const path = sourceFiles[component]
  if (!existsSync(path)) {
    throw new Error(
      `Missing sanitized changelog for "${component}": ${path}\n` +
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
