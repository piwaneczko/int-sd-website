import React from 'react'
import { Section, Container } from '../components/layout/container'
import { useLanguage } from '../contexts/LanguageContext'

export function PrivacyPage() {
  const { t } = useLanguage()
  const l = t.legal

  return (
    <Section>
      <Container maxWidth="md">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{l.privacy.title}</h1>
        <p className="text-deep-500 text-sm mb-8">{l.updated}</p>

        <div className="space-y-8">
          {l.privacy.sections.map((section, i) => (
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
