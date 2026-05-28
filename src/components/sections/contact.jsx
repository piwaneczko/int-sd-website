import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Mail, MapPin, Phone, Send, Github, Linkedin } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

export function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  return (
    <section className="py-20 bg-deep-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{c.title}</h2>
          <p className="text-deep-400 max-w-2xl mx-auto">{c.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-deep-400 mb-2">{c.labelName}</label>
                      <input type="text"
                        className="w-full bg-deep-800/50 border border-deep-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder={c.placeholderName} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-deep-400 mb-2">{c.labelEmail}</label>
                      <input type="email"
                        className="w-full bg-deep-800/50 border border-deep-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="email@example.com" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-deep-400 mb-2">{c.labelSubject}</label>
                    <input type="text"
                      className="w-full bg-deep-800/50 border border-deep-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder={c.placeholderSubject} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-deep-400 mb-2">{c.labelMessage}</label>
                    <textarea
                      className="w-full bg-deep-800/50 border border-deep-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all h-32 resize-none"
                      placeholder={c.placeholderMessage} />
                  </div>
                  
                  <Button variant="primary" className="w-full">
                    <Send className="mr-2" size={18} />
                    {c.btnSend}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="flex items-center gap-4 p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm text-deep-400">Email</div>
                  <div className="text-white font-medium">p.iwaneczko@gmail.com</div>
                </div>
              </Card>

              <Card className="flex items-center gap-4 p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-sm text-deep-400">{c.labelPhone}</div>
                  <div className="text-white font-medium">+48 503 124 502</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">{c.infoTitle}</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-deep-400 mb-2">Email</label>
                  <a href="mailto:p.iwaneczko@gmail.com" className="text-white text-lg hover:text-primary transition-colors">
                    p.iwaneczko@gmail.com
                  </a>
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-400 mb-2">{c.labelPhone}</label>
                  <a href="tel:+48503124502" className="text-white text-lg hover:text-primary transition-colors">+48 503 124 502</a>
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-400 mb-2">{c.labelAddress}</label>
                  <div className="text-white text-lg">{c.address}</div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">{c.profilesTitle}</h3>
              <div className="space-y-4">
                <a href="https://github.com/piwaneczko" className="flex items-center gap-3 p-3 bg-deep-800/50 rounded-lg hover:bg-deep-800 transition-colors">
                  <div className="w-10 h-10 bg-github/10 rounded-full flex items-center justify-center text-white">
                    <Github size={20} />
                  </div>
                  <span className="text-white">github.com/piwaneczko</span>
                </a>
                <a href="https://www.linkedin.com/in/pawel-iwaneczko-61590710a/" className="flex items-center gap-3 p-3 bg-deep-800/50 rounded-lg hover:bg-deep-800 transition-colors">
                  <div className="w-10 h-10 bg-linkedin/10 rounded-full flex items-center justify-center text-white">
                    <Linkedin size={20} />
                  </div>
                  <span className="text-white">linkedin.com/in/pawel-iwaneczko</span>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
