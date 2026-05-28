import React from 'react'
import { Card, CardHeader, CardContent } from '../ui/card'
import { Cpu, Activity, Wifi, Terminal, Code, FileText, Layers, Zap, BarChart3, Shield } from 'lucide-react'

const services = [
  {
    icon: <Cpu size={32} />,
    title: "Embedded Development",
    description: "Programowanie firmware dla mikrokontrolerów STM32, nRF52 i innych. Optymalizacja pod kątem zużycia energii i wydajności.",
    features: ["STM32", "nRF52", "Low-power design", "RTOS"]
  },
  {
    icon: <Linux size={32} />,
    title: "Linux & Yocto",
    description: "Tworzenie customowych dystrybucji Terminal, moduły jądra, systemy embedded na bazie Linuxa z Yocto.",
    features: ["Custom Linux", "Yocto/Buildroot", "Kernel modules", "Systemd"]
  },
  {
    icon: <Wifi size={32} />,
    title: "IoT Solutions",
    description: "Kompleksowe rozwiązania IoT - od sensorów przez bramki po chmurę. Monitorowanie i zarządzanie urządzeniami.",
    features: ["MQTT", "LoRa/NB-IoT", "Gateway", "Cloud integration"]
  },
  {
    icon: <Layers size={32} />,
    title: "Inertial Navigation",
    description: "Systemy MINT - sensor fusion, Kalman filter, kalibracja IMU, wyznaczanie orientacji i pozycji.",
    features: ["IMU", "Sensor fusion", "Kalman filter", "Quaternion"]
  },
  {
    icon: <Code size={32} />,
    title: "Firmware",
    description: "Niskopoziomowy firmware dla urządzeń specjalistycznych. C/C++, assembly,调试, testy jednostkowe.",
    features: ["C/C++", "Assembly", "Debugging", "Unit tests"]
  },
  {
    icon: <Zap size={32} />,
    title: "AI & Local LLM",
    description: "Integracja sztucznej inteligencji w systemy wbudowane. Local LLM na urządzeniach embedded.",
    features: ["ML models", "TinyML", "Local LLM", "Edge AI"]
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Consulting",
    description: "Konsultacje technologiczne, code review, optymalizacja kodu, architektura systemów.",
    features: ["Architecture", "Code review", "Performance", "Best practices"]
  },
  {
    icon: <Shield size={32} />,
    title: "R&D",
    description: "Badania i rozwój nowych rozwiązań. Prototypowanie, prototypy funkcyjne, MVP.",
    features: ["Prototyping", "MVP", "R&D", "Innovation"]
  }
]

export function Services() {
  return (
    <section className="py-20 bg-deep-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Usługi</h2>
          <p className="text-deep-400 max-w-2xl mx-auto">
            Kompleksowe rozwiązania software development dla wymagających klientów
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} hoverEffect={true} className="flex flex-col">
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-deep-400 text-sm mb-4 flex-1">{service.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {service.features.map((feature, i) => (
                  <span key={i} className="text-xs text-deep-500 bg-deep-800/50 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
