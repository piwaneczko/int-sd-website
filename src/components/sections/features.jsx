import React from 'react'
import { Card, CardHeader, CardContent } from '../ui/card'
import { Cpu, Activity, Navigation, Wifi, Terminal, FileText, GitBranch, Zap } from 'lucide-react'

const features = [
  {
    icon: <Cpu size={32} />,
    title: "Embedded Systems",
    description: "Development dla STM32, nRF52 i innych mikrokontrolerów z koncentracją na efektywność i niezawodność.",
    color: "text-blue-400"
  },
  {
    icon: <Activity size={32} />,
    title: "Inertial Navigation",
    description: "MINT - zaawansowane algorytmy sensor fusion i kalman filter dla systemów IMU.",
    color: "text-cyan-400"
  },
  {
    icon: <Linux size={32} />,
    title: "Linux & Yocto",
    description: "Custom Linux distributions, kernel modules i systemy embedded na bazie Linuxa.",
    color: "text-green-400"
  },
  {
    icon: <GitBranch size={32} />,
    title: "Firmware Development",
    description: "Low-level firmware dla urządzeń IoT i specjalistycznych urządzeń elektronicznych.",
    color: "text-purple-400"
  },
  {
    icon: <Zap size={32} />,
    title: "AI & Local LLM",
    description: "Integracja AI i modeli LLM na urządzeniach embedded oraz w aplikacjach webowych.",
    color: "text-yellow-400"
  },
  {
    icon: <Wifi size={32} />,
    title: "IoT Solutions",
    description: "Kompleksowe rozwiązania IoT od sensorów po chmurę - monitoring i zarządzanie urządzeniami.",
    color: "text-orange-400"
  }
]

export function Features() {
  return (
    <section className="py-20 bg-deep-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technologie i kompetencje</h2>
          <p className="text-deep-400 max-w-2xl mx-auto">
            Ekspertyza w zakresie nowoczesnych technologii programistycznych i systemów wbudowanych
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} hoverEffect={true}>
              <div className={`${feature.color} mb-4`}>{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-deep-400 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
