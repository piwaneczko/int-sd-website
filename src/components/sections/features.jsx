import React from 'react'
import { Card } from '../ui/card'
import { Cpu, Activity, Terminal, Binary, Zap, Wifi } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const icons = [
  <Cpu size={32} />,
  <Activity size={32} />,
  <Terminal size={32} />,
  <Binary size={32} />,
  <Zap size={32} />,
  <Wifi size={32} />,
]
const colors = [
  'text-blue-400', 'text-cyan-400', 'text-green-400',
  'text-purple-400', 'text-yellow-400', 'text-orange-400',
]

export function Features() {
  const { t } = useLanguage()
  const f = t.features
  return (
    <section className="py-20 bg-deep-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{f.title}</h2>
          <p className="text-deep-400 max-w-2xl mx-auto">{f.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {f.items.map((item, index) => (
            <Card key={index} hoverEffect={true}>
              <div className={`${colors[index]} mb-4`}>{icons[index]}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-deep-400 text-sm">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
