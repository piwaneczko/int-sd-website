import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Github, Linkedin } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'MINT', path: '/mint' },
  { name: 'O mnie', path: '/about' },
  { name: 'Usługi', path: '/services' },
  { name: 'Projekty', path: '/portfolio' },
  { name: 'Kontakt', path: '/contact' },
]

/**
 * Navbar component with mobile menu
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const activeClass = "text-primary font-semibold"
  const inactiveClass = "text-deep-400 hover:text-white"

  return (
    <nav 
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-deep-900/95 backdrop-blur-md shadow-xl border-b border-deep-800 py-2" 
          : "bg-transparent py-4"
      )}
    >
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
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === link.path ? activeClass : inactiveClass
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Social Links */}
            <div className="flex items-center space-x-4 ml-6 border-l border-deep-700 pl-6">
              <a 
                href="https://github.com/piwaneczko" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-deep-400 hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/pawel-iwaneczko-61590710a/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-deep-400 hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-deep-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-deep-900 border-b border-deep-800">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  "block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                  location.pathname === link.path ? activeClass : inactiveClass
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-deep-400">Social</span>
              <div className="flex space-x-4">
                <a href="https://github.com/piwaneczko" className="text-deep-400 hover:text-primary">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/pawel-iwaneczko-61590710a/" className="text-deep-400 hover:text-primary">
                  <Linkedin size={20} />
                </a>
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
