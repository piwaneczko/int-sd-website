import React from 'react'
import { CookbookSection } from '../components/sections/cookbook'
import { Container, Section } from '../components/layout/container'
import { Terminal } from 'lucide-react'

export function CookbookPage() {
  return (
    <div>
      <Section padding="pt-32 pb-20" className="bg-deep-900/50">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Terminal className="text-primary" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Developer Cookbook</h1>
            <p className="text-deep-400 text-lg">Techniczne notatki i przewodniki</p>
          </div>
          <CookbookSection />
        </Container>
      </Section>
    </div>
  )
}
