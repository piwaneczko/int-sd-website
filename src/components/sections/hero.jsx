import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { ArrowRight, Cpu, Activity, Navigation, Wifi } from 'lucide-react'

export function Hero() {
  const navigate = useNavigate()
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-900 via-deep-800 to-tech-900 -z-10" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary font-medium">Dostępny do współpracy</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Inżynieria <span className="text-gradient">technologii</span> przyszłości
            </h1>
            
            <p className="text-lg text-deep-400 max-w-lg">
              Specjalizuję się w systemach wbudowanych, navigacji inertialnej i 
              rozwoju oprogramowania. Tworzę rozwiązania deep-tech dla wymagających projektów.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" onClick={() => navigate('/about')}>
                O mnie
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
                Kontakt
              </Button>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-8 border-t border-deep-800/50">
              <div>
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-sm text-deep-400">Lat doświadczenia</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="text-sm text-deep-400">Zrealizowanych projektów</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">PhD</div>
                <div className="text-sm text-deep-400">Technical Sciences</div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="relative z-10">
              <div className="aspect-square max-w-md mx-auto">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-cyan-500/10 rounded-3xl border border-deep-700/50 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
                  {/* Grid pattern */}
                  <div className="absolute inset-0" style={{ 
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.3
                  }} />
                  
                  {/* Floating cards */}
                  <div className="absolute top-4 left-4 w-32 h-20 bg-deep-900/90 backdrop-blur border border-deep-700 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu size={16} className="text-primary" />
                      <span className="text-xs font-mono text-deep-300">STM32</span>
                    </div>
                    <div className="w-full bg-deep-800 rounded h-1.5">
                      <div className="bg-primary h-1.5 rounded w-3/4 animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 w-32 h-20 bg-deep-900/90 backdrop-blur border border-deep-700 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity size={16} className="text-primary" />
                      <span className="text-xs font-mono text-deep-300">IMU</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-1.5 bg-deep-800 rounded flex-1" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-primary to-cyan-500/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">MINT</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 w-full h-full border border-deep-700/30 rounded-3xl -z-10" 
                 style={{ transform: 'translate(-50%, -50%) rotate(3deg)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
