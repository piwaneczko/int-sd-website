import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/ui/navbar'
import { Footer } from './components/ui/footer'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { MINTPage } from './pages/MINT'
import { AboutPage } from './pages/About'
import { ServicesPage } from './pages/Services'
import { PortfolioPage } from './pages/Portfolio'
import { ContactPage } from './pages/Contact'
import { CookbookPage } from './pages/Cookbook'
import './styles/tailwind.css'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-deep-900 text-white font-sans">
        <Navbar />
        
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<MINTPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cookbook" element={<CookbookPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
