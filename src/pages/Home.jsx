import React from 'react'
import { Hero } from '../components/sections/hero'
import { Features } from '../components/sections/features'
import { MINTSection } from '../components/sections/mint-section'
import { Services } from '../components/sections/services'
import { Portfolio } from '../components/sections/portfolio'

export function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <MINTSection />
      <Services />
      <Portfolio />
    </div>
  )
}
