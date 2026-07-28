import React from 'react'
import { Card } from '../ui/card'
import { Bluetooth, Compass, Map, Activity, Box, UploadCloud } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const icons = [
  <Bluetooth size={28} />,
  <Compass size={28} />,
  <Map size={28} />,
  <Activity size={28} />,
  <Box size={28} />,
  <UploadCloud size={28} />,
]
const colors = [
  'text-blue-400', 'text-cyan-400', 'text-green-400',
  'text-purple-400', 'text-yellow-400', 'text-orange-400',
]

const screenshots = [
  '/images/mint-app-scan.png',
  '/images/mint-app-map.png',
  '/images/mint-app-visualization.png',
]

export function MintAppSection() {
  const { t } = useLanguage()
  const m = t.mint

  return (
    <section className="py-20 bg-deep-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <img
            src="/images/mint-icon.png"
            alt="MINT app icon"
            className="w-16 h-16 mx-auto mb-4 rounded-xl"
          />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{m.appTitle}</h2>
          <p className="text-deep-400 max-w-2xl mx-auto">{m.appSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {m.appFeatures.map((item, index) => (
            <Card key={index} hoverEffect={true}>
              <div className={`${colors[index]} mb-4`}>{icons[index]}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-deep-400 text-sm">{item.desc}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {m.appScreens.map((screen, index) => (
            <div key={index}>
              <div className="aspect-[9/16] rounded-2xl overflow-hidden border border-deep-700/50 bg-deep-800/50">
                <img
                  src={screenshots[index]}
                  alt={screen.caption}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(screen.caption)}&background=1a1a2e&color=fff&size=128`
                  }}
                />
              </div>
              <p className="text-center text-deep-400 text-xs mt-2">{screen.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
