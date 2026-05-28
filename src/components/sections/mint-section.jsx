import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { ArrowRight, Cpu, Activity, BarChart3, Layers, Code, Shield, Clock, Wifi } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

export function MINTSection() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const m = t.mint
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
            {m.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            MINT <span className="text-gradient">{m.title2}</span>
          </h2>
          <p className="text-deep-400 max-w-2xl mx-auto text-lg">{m.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Layers className="text-primary" size={28} />
                {m.archTitle}
              </h3>
              <p className="text-deep-300 leading-relaxed">{m.archDesc}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel">
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="text-primary" size={20} />
                  <span className="text-sm font-semibold text-white">{m.hwTitle}</span>
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
                  <span className="text-sm font-semibold text-white">{m.swTitle}</span>
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
              {m.btnLearn}
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>

          {/* Visualization */}
          <div className="relative">
            <div className="aspect-square bg-deep-800/50 backdrop-blur border border-deep-700/50 rounded-3xl overflow-hidden">
              <svg viewBox="0 0 480 480" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="mintGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#333" strokeWidth="0.8" opacity="0.4"/>
                  </pattern>
                </defs>

                {/* Grid */}
                <rect width="480" height="480" fill="url(#mintGrid)" />

                {/* Lines from center to each sensor */}
                <line x1="240" y1="240" x2="240" y2="72"  stroke="#0ea5e9" strokeOpacity="0.45" strokeWidth="1.5"/>
                <line x1="240" y1="240" x2="82"  y2="168" stroke="#0ea5e9" strokeOpacity="0.45" strokeWidth="1.5"/>
                <line x1="240" y1="240" x2="398" y2="168" stroke="#0ea5e9" strokeOpacity="0.45" strokeWidth="1.5"/>
                <line x1="240" y1="240" x2="82"  y2="312" stroke="#0ea5e9" strokeOpacity="0.45" strokeWidth="1.5"/>
                <line x1="240" y1="240" x2="398" y2="312" stroke="#0ea5e9" strokeOpacity="0.45" strokeWidth="1.5"/>

                {/* Center MINT circle */}
                <circle cx="240" cy="240" r="54" fill="#111111" stroke="#0ea5e9" strokeOpacity="0.25" strokeWidth="1.5"/>
                <circle cx="240" cy="240" r="54" fill="none" stroke="#0ea5e9" strokeOpacity="0.5" strokeWidth="1.5">
                  <animate attributeName="stroke-opacity" values="0.5;0.15;0.5" dur="3s" repeatCount="indefinite"/>
                </circle>
                <text x="240" y="247" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="sans-serif">MINT</text>

                {/* Sensor boxes — drawn last so they cover line ends */}
                {[
                  { label: 'BARO',  cx: 240, cy: 54  },
                  { label: 'ACCEL', cx: 82,  cy: 154 },
                  { label: 'GYRO',  cx: 398, cy: 154 },
                  { label: 'MAG',   cx: 82,  cy: 326 },
                  { label: 'TEMP',  cx: 398, cy: 326 },
                ].map(({ label, cx, cy }) => (
                  <g key={label}>
                    <rect x={cx - 42} y={cy - 18} width="84" height="36" rx="8"
                          fill="#0a0a0a" stroke="#0ea5e9" strokeOpacity="0.4" strokeWidth="1.5"/>
                    <text x={cx} y={cy + 5} textAnchor="middle"
                          fill="#0ea5e9" fontSize="12" fontFamily="monospace">{label}</text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="border-t border-deep-800/50 pt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">{m.techTitle}</h3>
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
