import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { ArrowRight, Cpu, Activity, BarChart3, Layers, Code, Shield, Clock, FileText, Wifi } from 'lucide-react'

export function MINTSection() {
  const navigate = useNavigate()
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-900 via-tech-900 to-deep-900 -z-20" />
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider text-sm uppercase mb-2 block">
            Nasz Główny Projekt
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            MINT <span className="text-gradient">Inertial Navigation</span>
          </h2>
          <p className="text-deep-400 max-w-2xl mx-auto text-lg">
            Micro Inertial Navigation Technology - zaawansowany system pomiaru 
            orientacji i pozycji na bazie sensorów IMU i algorytmów sensor fusion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Layers className="text-primary" size={28} />
                Architektura Systemu
              </h3>
              <p className="text-deep-300 leading-relaxed">
                MINT to kompletne rozwiązanie inertial navigation wykorzystujące
                zaawansowane algorytmy kalman filter i sensor fusion. System
                integruje dane z akcelerometrów, żyroskopów i magnetometrów
                dla precyzyjnego wyznaczania orientacji i ruchu.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel">
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="text-primary" size={20} />
                  <span className="text-sm font-semibold text-white">Hardware</span>
                </div>
                <ul className="text-xs text-deep-400 space-y-1">
                  <li>• STM32 / nRF52</li>
                  <li>• MEMS IMU</li>
                  <li>• Low-noise amplifiers</li>
                  <li>• Temperature compensation</li>
                </ul>
              </div>
              <div className="glass-panel">
                <div className="flex items-center gap-3 mb-3">
                  <Code className="text-primary" size={20} />
                  <span className="text-sm font-semibold text-white">Software</span>
                </div>
                <ul className="text-xs text-deep-400 space-y-1">
                  <li>• Kalman Filter</li>
                  <li>• Quaternion math</li>
                  <li>• Real-time OS</li>
                  <li>• Sensor fusion</li>
                </ul>
              </div>
            </div>

            <Button variant="primary" size="lg" className="w-full md:w-auto" onClick={() => navigate('/mint')}>
              Poznaj MINT
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>

          {/* Visualization */}
          <div className="relative">
            <div className="aspect-square bg-deep-800/50 backdrop-blur border border-deep-700/50 rounded-3xl p-8 relative overflow-hidden">
              {/* Background grid */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.3
              }} />
              
              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary/20 to-cyan-500/10 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-pulse" />
                <div className="w-24 h-24 flex items-center justify-center">
                  <Activity className="text-primary" size={48} />
                </div>
              </div>

              {/* Sensor positions */}
              <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-deep-900/90 border border-primary/30 rounded-xl p-3 flex items-center justify-center">
                <span className="text-xs font-mono text-primary">ACCEL</span>
              </div>
              
              <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-deep-900/90 border border-primary/30 rounded-xl p-3 flex items-center justify-center">
                <span className="text-xs font-mono text-primary">GYRO</span>
              </div>
              
              <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-deep-900/90 border border-primary/30 rounded-xl p-3 flex items-center justify-center">
                <span className="text-xs font-mono text-primary">MAG</span>
              </div>
              
              <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-deep-900/90 border border-primary/30 rounded-xl p-3 flex items-center justify-center">
                <span className="text-xs font-mono text-primary">TEMP</span>
              </div>

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
                <path d="M 160 160 L 240 240" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
                <path d="M 320 160 L 240 240" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
                <path d="M 160 320 L 240 240" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
                <path d="M 320 320 L 240 240" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="border-t border-deep-800/50 pt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Technologie MINT</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Cpu />, name: "STM32", desc: "MCU platform" },
              { icon: <Code />, name: "C/C++", desc: "Embedded code" },
              { icon: <Layers />, name: "FreeRTOS", desc: "Real-time OS" },
              { icon: <Shield />, name: "IMU", desc: "Sensor hardware" },
              { icon: <BarChart3 />, name: "Kalman", desc: "Filter algorithm" },
              { icon: <Clock />, name: "Real-time", desc: "Low latency" },
              { icon: <Wifi />, name: "Bluetooth", desc: "Wireless" },
              { icon: <Activity />, name: "IMU", desc: "Sensor fusion" },
            ].map((tech, i) => (
              <div key={i} className="text-center p-6 bg-deep-800/30 rounded-xl border border-deep-700/30">
                <div className="text-primary mb-3">{tech.icon}</div>
                <div className="font-semibold text-white">{tech.name}</div>
                <div className="text-xs text-deep-400">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
