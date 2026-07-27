import React from 'react'
import { MINTSection } from '../components/sections/mint-section'
import { MintTimelineSection } from '../components/sections/mint-timeline-section'
import { MintAppSection } from '../components/sections/mint-app-section'
import { Features } from '../components/sections/features'
import { Container, Section } from '../components/layout/container'
import { useLanguage } from '../contexts/LanguageContext'

export function MINTPage() {
  const { t } = useLanguage()
  const m = t.mint

  return (
    <div>
      <Section padding="pt-32 pb-20" className="bg-gradient-to-b from-deep-900 via-tech-900 to-deep-900">
        <Container>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">MINT</h1>
            <p className="text-primary text-lg mb-4">Micro Inertial Navigation Tracker</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 mb-3">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary font-medium">{m.statusLabel}</span>
            </div>
            <p className="text-deep-400 max-w-xl mx-auto text-sm">{m.statusText}</p>
          </div>
          <MINTSection />
        </Container>
      </Section>
      <Section>
        <Container>
          <MintTimelineSection />
        </Container>
      </Section>
      <MintAppSection />
      <Section>
        <Container>
          <Features />
        </Container>
      </Section>
    </div>
  )
}
