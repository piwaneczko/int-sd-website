// src/data/mint-changelog.json is generated (see build.mjs) and gitignored.
// Runs before `dev`/`build` so a checkout that never ran `npm run mint-changelog`
// (e.g. no sibling ../mint) still has a valid, importable JSON file instead of
// a hard failure in MintChangelog.jsx's static import.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outPath = join(here, '../../src/data/mint-changelog.json')

if (!existsSync(outPath)) {
  console.warn(
    `⚠ ${outPath} not found — writing an empty changelog placeholder.\n` +
    `  Run "npm run mint-changelog" (requires a sibling ../mint checkout) to populate it.`
  )
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, '[]\n')
}
