import React from 'react'
import { Link } from 'react-router-dom'
import { Cpu, Smartphone } from 'lucide-react'
import { Section, Container } from '../components/layout/container'
import { Card } from '../components/ui/card'
import { useLanguage } from '../contexts/LanguageContext'
import changelog from '../data/mint-changelog.json'

const SECTION_ORDER = ['Added', 'Changed', 'Fixed', 'Removed', 'Deprecated', 'Security']

// Renders the small subset of inline markdown (`code`, **bold**) used in the
// source changelogs, so raw markdown syntax doesn't show up literally.
function renderInline(text) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="text-primary bg-deep-900/60 rounded px-1 py-0.5 text-[0.85em]">{part.slice(1, -1)}</code>
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function ComponentBadge({ component, labels }) {
  const isFirmware = component === 'firmware'
  const Icon = isFirmware ? Cpu : Smartphone
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary">
      <Icon size={12} />
      {isFirmware ? labels.badgeFirmware : labels.badgeApp}
    </span>
  )
}

function ChangelogEntry({ entry, labels }) {
  return (
    <Card hoverEffect={false} className="mb-6">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <ComponentBadge component={entry.component} labels={labels} />
        <span className="text-xs font-mono text-deep-500">v{entry.version}</span>
        <span className="text-xs text-deep-500">{entry.date}</span>
      </div>

      {entry.title && (
        <h3 className="text-lg font-semibold text-white mb-3">{entry.title}</h3>
      )}

      {entry.prose && entry.prose.length > 0 && (
        <p className="text-deep-400 text-sm italic mb-3">{entry.prose.join(' ')}</p>
      )}

      <div className="space-y-3">
        {SECTION_ORDER.filter(key => entry.sections[key]?.length).map(key => (
          <div key={key}>
            <div className="text-xs uppercase tracking-wider text-deep-500 mb-1">{key}</div>
            <ul className="space-y-1">
              {entry.sections[key].map((item, i) => (
                <li key={i} className="text-deep-300 text-sm leading-relaxed pl-4 relative before:content-['-'] before:absolute before:left-0 before:text-deep-600">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  )
}

export function MintChangelogPage() {
  const { t } = useLanguage()
  const l = t.mintChangelog

  return (
    <Section>
      <Container maxWidth="md">
        <Link to="/mint" className="text-primary text-sm hover:text-cyan-400 transition-colors mb-6 inline-block">
          {l.back}
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{l.title}</h1>
        <p className="text-deep-400 mb-10">{l.subtitle}</p>

        {changelog.map((entry, i) => (
          <ChangelogEntry key={`${entry.component}-${entry.version}-${i}`} entry={entry} labels={l} />
        ))}
      </Container>
    </Section>
  )
}
