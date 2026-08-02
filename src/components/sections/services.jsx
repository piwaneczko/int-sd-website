import React from 'react'
import { Card } from '../ui/card'
import { Cpu, Wifi, Layers, Code, Zap, BarChart3, Shield, Terminal } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const icons = [
  <Cpu size={32} />, <Terminal size={32} />, <Wifi size={32} />, <Layers size={32} />,
  <Code size={32} />, <Zap size={32} />, <BarChart3 size={32} />, <Shield size={32} />,
]

export function Services() {
  const { t } = useLanguage()
  const s = t.services
  return (
    <section className="py-20 bg-deep-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{s.title}</h2>
          <p className="text-deep-400 max-w-2xl mx-auto mb-2">{s.subtitle}</p>
          <p className="text-deep-500 text-sm max-w-2xl mx-auto italic">{s.missionNote}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {s.items.map((service, index) => (
            <Card key={index} hoverEffect={true} className="flex flex-col">
              <div className="text-primary mb-4">{icons[index]}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-deep-400 text-sm mb-4 flex-1">{service.desc}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {service.features.map((feat, i) => (
                  <span key={i} className="text-xs text-deep-500 bg-deep-800/50 px-2 py-1 rounded">
                    {feat}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Technologies */}
        <div className="border-t border-deep-800/50 mt-20 pt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{s.techTitle}</h3>
            <p className="text-deep-400 max-w-2xl mx-auto text-sm">{s.techSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {s.techGroups.map((group, i) => (
              <div key={i} className="p-5 bg-deep-800/30 rounded-xl border border-deep-700/30">
                <div className="text-xs uppercase tracking-wider text-primary mb-3">{group.label}</div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, j) => (
                    <span key={j} className="text-xs text-deep-300 bg-deep-800/60 border border-deep-700/50 px-2.5 py-1 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
