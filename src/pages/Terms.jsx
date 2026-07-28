import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { Section, Container } from '../components/layout/container'
import { Card } from '../components/ui/card'
import { useLanguage } from '../contexts/LanguageContext'

export function TermsPage() {
  const { t } = useLanguage()
  const l = t.legal

  return (
    <Section>
      <Container maxWidth="md">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{l.terms.title}</h1>
        <p className="text-deep-500 text-sm mb-8">{l.updated}</p>

        <Card className="flex items-start gap-3 mb-10 border-yellow-500/30 bg-yellow-500/5" hoverEffect={false}>
          <AlertTriangle className="text-yellow-400 shrink-0 mt-0.5" size={20} />
          <p className="text-yellow-200/90 text-sm">{l.draftBanner}</p>
        </Card>

        <div className="space-y-8">
          {l.terms.sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-semibold text-white mb-2">{section.heading}</h2>
              <p className="text-deep-400 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
