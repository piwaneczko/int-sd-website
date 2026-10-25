// Copies the PUBLIC, already-sanitized MINT changelogs from the sibling repo
// checkouts into scripts/mint-changelog/public/ (gitignored). Read-only
// against ../mint — never writes back there. Run manually
// (`npm run mint-changelog:pull`) whenever you want to refresh the source
// snapshot before re-running the build step.
//
// Deliberately reads CHANGELOG.public.md, NOT the internal CHANGELOG.md:
// CHANGELOG.public.md is generated from CHANGELOG.md by
// ~/scripts/ollama-sanitize-changelog.sh (run as part of each mint repo's
// scripts/release.sh), which strips technical/security detail via a local
// Ollama model before anything is published. This script must never fall
// back to the internal file — if CHANGELOG.public.md is missing, that means
// the sanitizer hasn't run yet, and the fix is to run it, not to substitute
// the raw file.
import { copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const publicDir = join(here, 'public')

const sources = [
  { from: join(here, '../../../mint/firmware/CHANGELOG.public.md'), to: join(publicDir, 'firmware.md') },
  { from: join(here, '../../../mint/software/CHANGELOG.public.md'), to: join(publicDir, 'software.md') },
]

mkdirSync(publicDir, { recursive: true })

for (const { from, to } of sources) {
  if (!existsSync(from)) {
    console.error(
      `Missing sanitized changelog: ${from}\n` +
      `  Run ~/scripts/ollama-sanitize-changelog.sh from inside that repo first ` +
      `(it generates CHANGELOG.public.md from CHANGELOG.md) — this script never ` +
      `falls back to the internal CHANGELOG.md.`
    )
    process.exitCode = 1
    continue
  }
  copyFileSync(from, to)
  console.log(`Copied ${from} -> ${to}`)
}
