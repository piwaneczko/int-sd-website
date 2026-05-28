import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Github, Linkedin } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { lang, setLang, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { key: 'home',     path: '/' },
    { key: 'mint',     path: '/mint' },
    { key: 'about',    path: '/about' },
    { key: 'services', path: '/services' },
    { key: 'contact',  path: '/contact' },
  ]

  const activeClass   = "text-primary font-semibold"
  const inactiveClass = "text-deep-400 hover:text-white"

  return (
    <nav className={clsx(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-deep-900/95 backdrop-blur-md shadow-xl border-b border-deep-800 py-2" : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="text-xl font-bold text-white">INT<span className="text-primary">SD</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ key, path }) => (
              <Link key={path} to={path}
                className={clsx("px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === path ? activeClass : inactiveClass)}>
                {t.nav[key]}
              </Link>
            ))}

            {/* Social + Language */}
            <div className="flex items-center gap-3 ml-6 pl-6 border-l border-deep-700">
              <a href="https://github.com/piwaneczko" target="_blank" rel="noopener noreferrer"
                className="text-deep-400 hover:text-primary transition-colors"><Github size={18} /></a>
              <a href="https://www.linkedin.com/in/pawel-iwaneczko-61590710a/" target="_blank" rel="noopener noreferrer"
                className="text-deep-400 hover:text-primary transition-colors"><Linkedin size={18} /></a>

              {/* Language switcher */}
              <div className="flex items-center gap-1 pl-3 border-l border-deep-700">
                {['pl', 'en'].map(l => (
                  <button key={l} onClick={() => setLang(l)}
                    className={clsx(
                      "text-xs font-mono font-semibold px-2 py-1 rounded transition-all duration-200 uppercase",
                      lang === l
                        ? "text-primary border border-primary/50 bg-primary/10"
                        : "text-deep-400 hover:text-white"
                    )}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: language + burger */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center gap-1">
              {['pl', 'en'].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={clsx(
                    "text-xs font-mono font-semibold px-2 py-1 rounded uppercase",
                    lang === l ? "text-primary border border-primary/50 bg-primary/10" : "text-deep-400"
                  )}>
                  {l}
                </button>
              ))}
            </div>
            <button className="p-2 rounded-lg hover:bg-deep-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-deep-900 border-b border-deep-800">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map(({ key, path }) => (
              <Link key={path} to={path}
                className={clsx("block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                  location.pathname === path ? activeClass : inactiveClass)}
                onClick={() => setIsMobileMenuOpen(false)}>
                {t.nav[key]}
              </Link>
            ))}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-deep-400">Social</span>
              <div className="flex space-x-4">
                <a href="https://github.com/piwaneczko" className="text-deep-400 hover:text-primary"><Github size={20} /></a>
                <a href="https://www.linkedin.com/in/pawel-iwaneczko-61590710a/" className="text-deep-400 hover:text-primary"><Linkedin size={20} /></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function clsx(...classes) {
  return classes.filter(Boolean).join(' ')
}
