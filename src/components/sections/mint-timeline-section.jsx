import React from 'react'
import { Timeline } from '../ui/timeline'
import { useLanguage } from '../../contexts/LanguageContext'

function buildMedia(m) {
  return [
    // HW v0 – render (KiCad) + zdjęcie wyprodukowanej płytki
    [
      { src: '/images/mint-hw-v0-render.png', label: m.mediaRender },
      { src: '/images/mint-hw-v0-photo.jpg', label: m.mediaPhoto },
    ],
    // HW v1 – render (KiCad) + zdjęcie wyprodukowanej płytki
    [
      { src: '/images/mint-hw-v1-render.png', label: m.mediaRender },
      { src: '/images/mint-hw-v1-photo.jpg', label: m.mediaPhoto },
    ],
    // Obudowa v1 – render (FreeCAD) + zdjęcie wyprodukowanej obudowy
    [
      { src: '/images/mint-case-v1-render.png', label: m.mediaRender, fit: 'contain'  },
      { src: '/images/mint-case-v1-photo.jpg', label: m.mediaPhoto },
    ],
    // Firmware v1 (w trakcie) – zrzut z VSCode z debugiem RTT
    [
      { src: '/images/mint-firmware-v1-rtt-debug.png', label: m.mediaDebug, wide: true, fit: 'contain' },
    ],
  ]
}

export function MintTimelineSection() {
  const { t } = useLanguage()
  const m = t.mint
  const media = buildMedia(m)

  const items = m.timeline.map((item, i) => ({
    ...item,
    media: media[i],
  }))

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{m.timelineTitle}</h2>
          <p className="text-deep-400 max-w-2xl mx-auto">{m.timelineSubtitle}</p>
        </div>

        <Timeline items={items} />
      </div>
    </section>
  )
}
