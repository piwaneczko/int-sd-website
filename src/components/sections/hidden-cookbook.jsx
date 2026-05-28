import React, { useState } from 'react'
import { Terminal, X, MenuSquare } from 'lucide-react'
import { CookbookSection } from './cookbook'

export function HiddenCookbook() {
  const [isHidden, setIsHidden] = useState(true)

  return (
    <div className="relative">
      {isHidden ? (
        <button
          onClick={() => setIsHidden(false)}
          className="fixed bottom-6 right-6 p-4 bg-primary/90 hover:bg-primary text-white rounded-full shadow-2xl shadow-primary/40 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-50"
          aria-label="Open Developer Cookbook"
        >
          <Terminal size={24} />
        </button>
      ) : (
        <div className="fixed inset-0 bg-deep-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-deep-700 bg-deep-800/50">
              <div className="flex items-center gap-3">
                <Terminal className="text-primary" size={24} />
                <h2 className="text-xl font-bold text-white">Developer Cookbook</h2>
              </div>
              <button 
                onClick={() => setIsHidden(true)}
                className="p-2 hover:bg-deep-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
              <CookbookSection />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
