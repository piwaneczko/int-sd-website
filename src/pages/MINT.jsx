import React from 'react'
import { MINTSection } from '../components/sections/mint-section'
import { Features } from '../components/sections/features'
import { Container, Section } from '../components/layout/container'

export function MINTPage() {
  return (
    <div>
      <Section padding="pt-32 pb-20" className="bg-gradient-to-b from-deep-900 via-tech-900 to-deep-900">
        <Container>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">MINT</h1>
            <p className="text-primary text-lg">Micro Inertial Navigation Technology</p>
          </div>
          <MINTSection />
        </Container>
      </Section>
      <Section className="bg-deep-900/50">
        <Container>
          <Features />
        </Container>
      </Section>
    </div>
  )
}
