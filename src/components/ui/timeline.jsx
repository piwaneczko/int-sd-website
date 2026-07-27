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
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                item.future ? 'bg-transparent border-2 border-dashed border-deep-600' : 'bg-deep-800 border-2 border-primary'
              }`}>
                <div className={`w-2 h-2 rounded-full ${item.future ? 'bg-deep-600' : 'bg-primary'}`} />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <div className={`text-xs font-mono mb-1 ${item.future ? 'text-deep-500' : 'text-primary'}`}>{item.year}</div>
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                {item.title}
                {item.future && item.futureLabel && (
                  <span className="text-[10px] uppercase tracking-wider text-deep-400 border border-deep-600 rounded px-1.5 py-0.5">
                    {item.futureLabel}
                  </span>
                )}
              </h4>
              <div className="text-deep-400 text-sm mb-2 flex items-center gap-2">
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span>{item.company}</span>
              </div>
              <p className="text-deep-300 text-sm leading-relaxed">{item.description}</p>
              {item.media && item.media.length > 0 && (
                <div className={`mt-3 grid gap-2 ${
                  item.media.some((m) => m.wide)
                    ? 'grid-cols-1'
                    : item.media.length > 1 ? 'grid-cols-2 max-w-md' : 'grid-cols-1 max-w-xs'
                }`}>
                  {item.media.map((media, i) => (
                    <div key={i}>
                      {media.label && (
                        <span className="inline-block text-[10px] uppercase tracking-wider text-primary bg-primary/10 border border-primary/30 rounded px-2 py-0.5 mb-2">
                          {media.label}
                        </span>
                      )}
                      <div className="aspect-video rounded-lg overflow-hidden border border-deep-700/50 bg-deep-800/50">
                        <img
                          src={media.src}
                          alt={item.title}
                          className={`w-full h-full ${media.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.title)}&background=1a1a2e&color=fff&size=128`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
