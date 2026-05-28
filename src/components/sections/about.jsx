import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Timeline } from '../ui/timeline'
import { FileText, Cpu, Layers, BookOpen, GraduationCap, Briefcase, Download } from 'lucide-react'

const techStack = [
  { name: 'C/C++', level: 95, category: 'Programming' },
  { name: 'Embedded', level: 95, category: 'Embedded' },
  { name: 'STM32 / nRF52', level: 90, category: 'MCU' },
  { name: 'Linux / Yocto', level: 85, category: 'OS' },
  { name: 'OpenBMC / PlatformBMC', level: 80, category: 'BMC' },
  { name: 'AI / LLM', level: 70, category: 'AI' },
]

const experience = [
  {
    year: '10/2023 – obecnie',
    title: 'Senior Embedded Software Developer',
    company: 'Conclusive Engineering Sp. z o.o., Katowice',
    description: 'Software Architect. C/C++ Embedded. OpenBMC / Yocto (NSMD Core Team). PlatformBMC / Robot / Jenkins (NVIDIA USA Team). Embedded Video-phone application (Qt / Buildroot).',
    icon: <Briefcase />
  },
  {
    year: '09/2019 – 12/2023',
    title: 'Software Development Team Leader / Manager',
    company: 'ENDEGO (prev. CADM Automotive), Gliwice',
    description: 'Zarządzanie zespołem, Software Architect. C Embedded, C++, C#, Java Android. DC/DC automotive charger (C/C++). nRF52 + BLE detection algorithm. CI/CD: CMake, Docker, Jenkins.',
    icon: <Briefcase />
  },
  {
    year: '05/2018 – 08/2019',
    title: 'Software Development Manager',
    company: 'Aircom AI Automotive, Gliwice',
    description: 'C/C++, Java Android, JavaScript, Qt/QML, CMake, Jenkins. ASTECH Proxy-developer – SCRUM (code review & merging). Team management.',
    icon: <Briefcase />
  },
  {
    year: '02/2011 – 12/2018',
    title: 'C/C++/C# Software Developer & PhD',
    company: 'Politechnika Śląska, Gliwice',
    description: 'Prowadzenie zajęć, programowanie embedded. PhD z cyfrowego przetwarzania sygnałów. Wykonawca w 8 projektach B+R (6 obronność / NCBiR), projekt WIMA (Wirtualny Maszt, Straż Graniczna).',
    icon: <GraduationCap />
  },
]

const education = [
  {
    title: 'PhD in Technical Sciences',
    detail: 'Politechnika Śląska, 10/2012 – 09/2019',
    note: 'Temat: „Application of inertial sensors in pedestrian navigation"',
  },
  {
    title: 'Magister (MSc)',
    detail: 'Politechnika Śląska, 02/2011 – 09/2012',
    note: 'Temat: „Management and control of UAV group"',
  },
  {
    title: 'Inżynier (BE)',
    detail: 'Politechnika Śląska, 10/2007 – 01/2011',
    note: 'Temat: „Autonomous control of unmanned aerial vehicle in Prepar3D"',
  },
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
              <h2 className="text-3xl font-bold text-white mb-1">Paweł Iwaneczko</h2>
              <p className="text-primary font-medium mb-1">PhD in Technical Sciences</p>
              <p className="text-deep-400 text-sm mb-2">mob. +48 503 124 502</p>
              <p className="text-deep-400 mb-6">
                Senior Embedded Software Developer i Software Architect z ponad 15-letnim
                doświadczeniem w programowaniu niskopoziomowym, systemach embedded,
                nawigacji inercialnej i projektach B+R.
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

            {/* CV Download */}
            <div className="text-center lg:text-left">
              <a href="/cv-pawel-iwaneczko.pdf" download="CV Paweł Iwaneczko.pdf">
                <Button variant="secondary" className="w-full lg:w-auto">
                  <Download className="mr-2" size={18} />
                  Pobierz CV (PDF)
                </Button>
              </a>
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

          {/* Timeline + Education */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Doświadczenie zawodowe</h3>
              <Timeline items={experience} />
            </div>

            <div className="p-6 bg-deep-800/30 rounded-2xl border border-deep-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Edukacja</h3>
              <div className="space-y-4">
                {education.map((edu, i) => (
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
