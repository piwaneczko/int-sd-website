// Minimal parser tailored to the actual format of ../mint/*/CHANGELOG.md.
// Not a generic Keep a Changelog parser: those files use "---" separators
// between releases and an optional "— <one-line title>" suffix on the
// version header, both of which are outside the strict spec and trip up
// off-the-shelf parsers (tested against `keep-a-changelog` — it throws on
// these files as-is).
const RELEASE_HEADER = /^##\s+\[(.+?)\]\s+-\s+(\d{4}-\d{2}-\d{2})(?:\s*—\s*(.+))?$/
const SECTION_HEADER = /^###\s+(\w+)$/
const BULLET = /^-\s+(.*)$/
const CONTINUATION = /^\s{2,}(\S.*)$/

function normalizeVersion(v) {
  return v.replace(/^v/i, '')
}

export function parseChangelog(markdown) {
  const lines = markdown.split('\n')
  const releases = []
  let current = null
  let currentSection = null

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r$/, '')

    const releaseMatch = line.match(RELEASE_HEADER)
    if (releaseMatch) {
      current = {
        version: normalizeVersion(releaseMatch[1]),
        date: releaseMatch[2],
        title: releaseMatch[3] ?? null,
        sections: {},
        prose: [],
      }
      releases.push(current)
      currentSection = null
      continue
    }

    if (!current) continue // preamble / notes before the first release

    const sectionMatch = line.match(SECTION_HEADER)
    if (sectionMatch) {
      currentSection = sectionMatch[1]
      current.sections[currentSection] ??= []
      continue
    }

    const bulletMatch = line.match(BULLET)
    if (bulletMatch && currentSection) {
      current.sections[currentSection].push(bulletMatch[1].trim())
      continue
    }

    const continuationMatch = line.match(CONTINUATION)
    if (continuationMatch && currentSection) {
      const bullets = current.sections[currentSection]
      if (bullets.length > 0) {
        bullets[bullets.length - 1] += ' ' + continuationMatch[1].trim()
      }
      continue
    }

    if (line.startsWith('>')) continue // note blockquotes between releases
    if (line.trim() === '' || line.trim() === '---') continue

    if (!currentSection) {
      current.prose.push(line.trim())
    }
  }

  return releases
}
