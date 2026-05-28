import React from 'react'
import { Services } from '../components/sections/services'
import { Container, Section } from '../components/layout/container'

export function ServicesPage() {
  return (
    <div>
      <Section padding="pt-32 pb-20" className="bg-deep-900/50">
        <Container>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Usługi</h1>
            <p className="text-deep-400 text-lg">Co oferuję</p>
          </div>
          <Services />
        </Container>
      </Section>
    </div>
  )
}
