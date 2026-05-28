import React from 'react'

export function Timeline({ items }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" 
           style={{ left: '100px' }} />
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative pl-0 md:pl-12">
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-12 top-0 w-4 h-4 bg-deep-800 border-2 border-primary rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
            
            {/* Content */}
            <div className="md:ml-4">
              <div className="text-xs text-primary font-mono mb-1">{item.year}</div>
              <h4 className="text-lg font-semibold text-white">{item.title}</h4>
              <div className="text-deep-400 text-sm mb-2 flex items-center gap-2">
                {item.icon}
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
