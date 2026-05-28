import React from 'react'
import { About } from '../components/sections/about'
import { Container, Section } from '../components/layout/container'

export function AboutPage() {
  return (
    <div>
      <Section padding="pt-32 pb-20" className="bg-deep-900">
        <Container>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">O Mnie</h1>
            <p className="text-deep-400 text-lg">Inżynieria, badania i rozwój</p>
          </div>
          <About />
        </Container>
      </Section>
    </div>
  )
}
