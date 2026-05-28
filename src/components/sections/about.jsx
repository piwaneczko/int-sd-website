import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Timeline } from '../ui/timeline'
import { FileText, Cpu, Layers, BookOpen, GraduationCap, Briefcase, MapPin } from 'lucide-react'

const techStack = [
  { name: 'C/C++', level: 95, category: 'Programming' },
  { name: 'Embedded', level: 90, category: 'Embedded' },
  { name: 'STM32', level: 85, category: 'MCU' },
  { name: 'Linux', level: 80, category: 'OS' },
  { name: 'Yocto', level: 75, category: 'Build' },
  { name: 'AI/LLM', level: 70, category: 'AI' },
]

const experience = [
  {
    year: '2026 – Present',
    title: 'PhD in Technical Sciences',
    company: 'Int Software Development',
    description: 'Research in inertial navigation, signal processing and embedded systems. Lead developer of MINT project.',
    icon: <GraduationCap />
  },
  {
    year: '2020 – 2026',
    title: 'Senior Embedded Systems Engineer',
    company: 'Various Projects',
    description: 'Development of embedded solutions for automotive and industrial applications. Linux kernel development.',
    icon: <Briefcase />
  },
  {
    year: '2015 – 2020',
    title: 'Embedded Systems Developer',
    company: 'Technology Companies',
    description: 'Firmware development for IoT devices, sensor integration, and system optimization.',
    icon: <Briefcase />
  },
  {
    year: '2010 – 2015',
    title: 'Junior Developer',
    company: 'Software Houses',
    description: 'Started career with Qt/QML applications and C/C++ embedded programming.',
    icon: <Briefcase />
  }
]

export function About() {
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
              <h2 className="text-3xl font-bold text-white mb-2">Paweł Iwaneczko</h2>
              <p className="text-primary font-medium mb-4">PhD in Technical Sciences</p>
              <p className="text-deep-400 mb-6">
                Software developer and R&D engineer specializing in embedded systems, 
                inertial navigation, and intelligent solutions. With over 15 years 
                of experience in low-level programming and system architecture.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <a 
                  href="https://github.com/piwaneczko" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-deep-800 text-white rounded-lg text-sm font-medium hover:bg-deep-700 transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/pawel-iwaneczko-61590710a/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-deep-800 text-white rounded-lg text-sm font-medium hover:bg-deep-700 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* CV Button */}
            <div className="text-center lg:text-left">
              <Button variant="secondary" className="w-full lg:w-auto">
                <FileText className="mr-2" size={18} />
                Pobierz CV
              </Button>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Stack Technologiczny</h3>
              <div className="space-y-4">
                {techStack.map((tech, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">{tech.name}</span>
                      <span className="text-deep-400">{tech.category}</span>
                    </div>
                    <div className="w-full bg-deep-800 rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all duration-1000"
                        style={{ width: `${tech.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-6">Kariera i Doświadczenie</h3>
            <Timeline items={experience} />
            
            <div className="mt-8 p-6 bg-deep-800/30 rounded-2xl border border-deep-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Certyfikaty i Edukacja</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="text-primary mt-1" size={20} />
                  <div>
                    <div className="text-white text-sm font-medium">PhD in Technical Sciences</div>
                    <div className="text-deep-400 text-xs">Specjalizacja: Inertial Navigation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Cpu className="text-primary mt-1" size={20} />
                  <div>
                    <div className="text-white text-sm font-medium">Embedded Systems Expert</div>
                    <div className="text-deep-400 text-xs">STM32, FreeRTOS, IoT</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Layers className="text-primary mt-1" size={20} />
                  <div>
                    <div className="text-white text-sm font-medium">Linux System Administrator</div>
                    <div className="text-deep-400 text-xs">Yocto, Buildroot, Kernel</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1" size={20} />
                  <div>
                    <div className="text-white text-sm font-medium">Professional Engineer</div>
                    <div className="text-deep-400 text-xs">Inżynieria oprogramowania</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
