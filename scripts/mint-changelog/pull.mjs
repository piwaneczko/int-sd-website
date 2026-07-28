// Copies the internal MINT changelogs from the sibling repo checkouts into
// scripts/mint-changelog/raw/ (gitignored). Read-only against ../mint — never
// writes back there. Run manually (`npm run mint-changelog:pull`) whenever
// you want to refresh the source snapshot before re-running the build step.
import { copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const rawDir = join(here, 'raw')

const sources = [
  { from: join(here, '../../../mint/firmware/CHANGELOG.md'), to: join(rawDir, 'firmware.md') },
  { from: join(here, '../../../mint/software/CHANGELOG.md'), to: join(rawDir, 'software.md') },
]

mkdirSync(rawDir, { recursive: true })

for (const { from, to } of sources) {
  if (!existsSync(from)) {
    console.error(`Missing source changelog: ${from}`)
    process.exitCode = 1
    continue
  }
  copyFileSync(from, to)
  console.log(`Copied ${from} -> ${to}`)
}
