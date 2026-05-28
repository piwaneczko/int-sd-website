import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  const f = t.footer
  const n = t.nav

  const sections = [
    {
      title: f.company,
      links: [
        { name: n.about,    path: '/about' },
        { name: n.services, path: '/services' },
        { name: n.contact,  path: '/contact' },
      ],
    },
    {
      title: f.services,
      links: [
        { name: 'Embedded Systems',  path: '/services' },
        { name: 'Linux & Yocto',     path: '/services' },
        { name: 'AI & Local LLM',    path: '/services' },
        { name: 'Inertial Navigation', path: '/services' },
      ],
    },
    {
      title: f.resources,
      links: [
        { name: 'MINT', path: '/mint' },
        { name: 'Cookbook', path: '/cookbook' },
      ],
    },
  ]

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
            <p className="text-deep-400 text-sm mb-4">{f.desc}</p>
            <div className="flex space-x-4">
              <a href="https://github.com/piwaneczko" className="text-deep-400 hover:text-primary transition-colors"><Github size={20} /></a>
              <a href="https://www.linkedin.com/in/pawel-iwaneczko-61590710a/" className="text-deep-400 hover:text-primary transition-colors"><Linkedin size={20} /></a>
              <a href="mailto:p.iwaneczko@gmail.com" className="text-deep-400 hover:text-primary transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          {/* Link sections */}
          {sections.map(section => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.path + link.name}>
                    <Link to={link.path} className="text-deep-400 hover:text-primary transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-deep-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-deep-500 text-sm">
            © {new Date().getFullYear()} I.N.T. Software Development. {f.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-deep-500 hover:text-primary text-sm">{f.privacy}</Link>
            <Link to="/terms"   className="text-deep-500 hover:text-primary text-sm">{f.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
