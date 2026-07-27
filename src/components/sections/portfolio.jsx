import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const projects = [
  {
    id: 1,
    title: "MINT - Micro Inertial Navigation Tracker",
    description: "Zaawansowany system navigacji inertialnej z sensor fusion i Kalman filter.",
    tech: ["C/C++", "nRF52840", "Zephyr", "IMU", "Sensor Fusion"],
    image: "/images/mint-icon.png"
  }
]

export function Portfolio() {
  return (
    <section className="py-20 bg-deep-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Projekty</h2>
          <p className="text-deep-400 max-w-2xl mx-auto">
            Główny projekt, nad którym aktualnie pracuję
          </p>
        </div>

        <div className="grid grid-cols-1 max-w-md mx-auto gap-8">
          {projects.map((project, index) => (
            <Card key={project.id} hoverEffect={true} className="flex flex-col">
              <div className="relative aspect-video bg-deep-800/50 rounded-xl mb-4 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain p-8 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
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
