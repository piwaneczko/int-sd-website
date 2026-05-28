import React from 'react'

export function Timeline({ items }) {
  return (
    <div className="relative">
      {/* Vertical line aligned to dot center (dot is w-4 = 16px, center at 8px) */}
      <div className="absolute top-2 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent"
           style={{ left: '7px' }} />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="flex gap-5">
            {/* Dot */}
            <div className="relative flex-shrink-0 mt-1">
              <div className="w-4 h-4 bg-deep-800 border-2 border-primary rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="text-xs text-primary font-mono mb-1">{item.year}</div>
              <h4 className="text-lg font-semibold text-white">{item.title}</h4>
              <div className="text-deep-400 text-sm mb-2 flex items-center gap-2">
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span>{item.company}</span>
              </div>
              <p className="text-deep-300 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
