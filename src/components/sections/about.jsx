import React from 'react'
import { Button } from '../ui/button'
import { Timeline } from '../ui/timeline'
import { GraduationCap, Briefcase, Download } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const techStack = [
  { name: 'C/C++',             level: 95, category: 'Programming' },
  { name: 'Embedded',          level: 95, category: 'Embedded' },
  { name: 'STM32 / nRF52',     level: 90, category: 'MCU' },
  { name: 'Linux / Yocto',     level: 85, category: 'OS' },
  { name: 'OpenBMC / PlatformBMC', level: 80, category: 'BMC' },
  { name: 'AI / LLM',          level: 70, category: 'AI' },
]

export function About() {
  const { t } = useLanguage()
  const a = t.about

  const experience = a.experience.map((e, i) => ({
    ...e,
    desc: e.desc,
    icon: i === 3 ? <GraduationCap /> : <Briefcase />,
  }))

  return (
    <section className="py-20 bg-deep-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Bio */}
          <div className="lg:col-span-1 space-y-8">
            <div className="text-center lg:text-left">
              <img
                src="https://ui-avatars.com/api/?name=Pawe%C5%82+Iwaneczko&background=0ea5e9&color=fff&size=256"
                alt="Paweł Iwaneczko"
                className="w-48 h-48 rounded-2xl mx-auto lg:mx-0 shadow-2xl shadow-primary/20 mb-6"
              />
              <h2 className="text-3xl font-bold text-white mb-1">Paweł Iwaneczko</h2>
              <p className="text-primary font-medium mb-1">PhD in Technical Sciences</p>
              <p className="text-deep-400 text-sm mb-2">mob. +48 503 124 502</p>
              <p className="text-deep-400 mb-6">{a.bio}</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <a href="https://github.com/piwaneczko" target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 bg-deep-800 text-white rounded-lg text-sm font-medium hover:bg-deep-700 transition-colors">GitHub</a>
                <a href="https://www.linkedin.com/in/pawel-iwaneczko-61590710a/" target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 bg-deep-800 text-white rounded-lg text-sm font-medium hover:bg-deep-700 transition-colors">LinkedIn</a>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <a href="/cv-pawel-iwaneczko.pdf" download="CV Paweł Iwaneczko.pdf">
                <Button variant="secondary" className="w-full lg:w-auto">
                  <Download className="mr-2" size={18} />
                  {a.btnCV}
                </Button>
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">{a.stackTitle}</h3>
              <div className="space-y-4">
                {techStack.map((tech, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">{tech.name}</span>
                      <span className="text-deep-400">{tech.category}</span>
                    </div>
                    <div className="w-full bg-deep-800 rounded-full h-2">
                      <div className="bg-primary rounded-full h-2 transition-all duration-1000"
                        style={{ width: `${tech.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline + Education */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">{a.expTitle}</h3>
              <Timeline items={experience} />
            </div>

            <div className="p-6 bg-deep-800/30 rounded-2xl border border-deep-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">{a.eduTitle}</h3>
              <div className="space-y-4">
                {a.education.map((edu, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <GraduationCap className="text-primary mt-1 shrink-0" size={20} />
                    <div>
                      <div className="text-white text-sm font-medium">{edu.title}</div>
                      <div className="text-deep-400 text-xs">{edu.detail}</div>
                      <div className="text-deep-400 text-xs italic">{edu.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
