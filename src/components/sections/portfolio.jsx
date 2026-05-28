import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const projects = [
  {
    id: 1,
    title: "MINT - Inertial Navigation",
    description: "Zaawansowany system navigacji inertialnej z sensor fusion i Kalman filter.",
    tech: ["C/C++", "STM32", "IMU", "Sensor Fusion", "Kalman Filter"],
    image: "/images/project-mint.png"
  },
  {
    id: 2,
    title: "Embedded Linux System",
    description: "Custom Linux distribution dla urządzeń przemysłowych z Yocto.",
    tech: ["Linux", "Yocto", "Shell", "Python", "CMake"],
    image: "/images/project-linux.png"
  },
  {
    id: 3,
    title: "IoT Sensor Node",
    description: "Niskomocny sensor Node do monitorowania parametrów środowiska.",
    tech: ["nRF52", "Zigbee", "LoRa", "RTOS", "Sensors"],
    image: "/images/project-iot.png"
  },
  {
    id: 4,
    title: "Industrial Gateway",
    description: "Bramka przemysłowa z obsługą protokołów CAN, Modbus, Ethernet.",
    tech: ["STM32", "Linux", "Qt/QML", "CAN", "Modbus"],
    image: "/images/project-gateway.png"
  },
  {
    id: 5,
    title: "AI Edge Device",
    description: "Urządzenie z AI do przetwarzania obrazów na brzegu.",
    tech: ["Python", "TFLite", "Raspberry Pi", "Camera", "Edge AI"],
    image: "/images/project-ai.png"
  },
  {
    id: 6,
    title: "Medical Monitor",
    description: "Monitor parametrów życiowych z przetwornikiem analogowo-cyfrowym.",
    tech: ["C", "RTOS", "ADC", "Bluetooth", "Medical"],
    image: "/images/project-medical.png"
  }
]

export function Portfolio() {
  return (
    <section className="py-20 bg-deep-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Projekty</h2>
          <p className="text-deep-400 max-w-2xl mx-auto">
            Wybrane projekty z różnych dziedzin programowania embedded i systemowego
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={project.id} hoverEffect={true} className="flex flex-col">
              <div className="relative aspect-video bg-deep-800/50 rounded-xl mb-4 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.title)}&background=1a1a2e&color=fff&size=128`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                </div>
              </div>
              
              <CardContent>
                <p className="text-deep-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs text-deep-500 bg-deep-800/50 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between items-center">
                <a 
                  href="#" 
                  className="text-primary text-sm font-medium hover:text-cyan-400 transition-colors"
                >
                  Zobacz szczegóły →
                </a>
                <Button variant="outline" size="sm">GitHub</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
