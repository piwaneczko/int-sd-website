import React from 'react'
import { Portfolio } from '../components/sections/portfolio'
import { Container, Section } from '../components/layout/container'

export function PortfolioPage() {
  return (
    <div>
      <Section padding="pt-32 pb-20" className="bg-deep-900/50">
        <Container>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Projekty</h1>
            <p className="text-deep-400 text-lg">Wybrane realizacje</p>
          </div>
          <Portfolio />
        </Container>
      </Section>
    </div>
  )
}
