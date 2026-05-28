import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, MapPin, Phone, MenuSquare } from 'lucide-react'

const footerLinks = {
  company: [
    { name: 'O mnie', path: '/about' },
    { name: 'Usługi', path: '/services' },
    { name: 'Projekty', path: '/portfolio' },
    { name: 'Kontakt', path: '/contact' },
  ],
  services: [
    { name: 'Embedded Systems', path: '/services#embedded' },
    { name: 'Linux & Yocto', path: '/services#linux' },
    { name: 'AI & Local LLM', path: '/services#ai' },
    { name: 'Inertial Navigation', path: '/services#navigation' },
  ],
  resources: [
    { name: 'MINT Project', path: '/mint' },
    { name: 'Cookbook', path: '/cookbook', isExternal: true },
  ],
}

export function Footer() {
  return (
    <footer className="bg-deep-900 border-t border-deep-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-xl font-bold text-white">INT<span className="text-primary">SD</span></span>
            </Link>
            <p className="text-deep-400 text-sm mb-4">
              Software development for the future. 
              Specializing in embedded systems, inertial navigation, and intelligent solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/piwaneczko" className="text-deep-400 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/pawel-iwaneczko-61590710a/" className="text-deep-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contact@int-sd.net" className="text-deep-400 hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    {link.isExternal ? (
                      <a 
                        href={link.path} 
                        className="text-deep-400 hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        to={link.path} 
                        className="text-deep-400 hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-deep-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-deep-500 text-sm">
            © {new Date().getFullYear()} Int Software Development. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-deep-500 hover:text-primary text-sm">
              Polityka prywatności
            </Link>
            <Link to="/terms" className="text-deep-500 hover:text-primary text-sm">
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
