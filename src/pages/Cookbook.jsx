import React, { useState, useEffect } from 'react'
import { Clock, ExternalLink, ChevronDown, ChevronUp, BookOpen } from 'lucide-react'

const categoryColors = {
  'śniadania':     'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'obiady':        'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'kolacje':       'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'coś słodkiego': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'święta':        'bg-red-500/20 text-red-400 border-red-500/30',
}

function RecipeCard({ recipe }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-deep-800/50 border border-deep-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-deep-700">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover opacity-80"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-900/80 to-transparent" />
        <span className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full border ${categoryColors[recipe.category] ?? 'bg-deep-700 text-deep-300 border-deep-600'}`}>
          {recipe.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2">{recipe.title}</h3>

        <div className="flex items-center gap-4 text-sm text-deep-400 mb-4">
          <span className="flex items-center gap-1"><Clock size={14} /> {recipe.time}</span>
          <span className="text-deep-600">•</span>
          <span>{recipe.serving}</span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          <span>{expanded ? 'Zwiń przepis' : 'Pokaż przepis'}</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {expanded && (
          <div className="mt-4 space-y-4 border-t border-deep-700/50 pt-4">
            {/* Ingredients */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Składniki</h4>
              <table className="w-full text-sm">
                <tbody>
                  {recipe.ingredients.map((ing, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-deep-700/30' : ''}>
                      <td className="py-1 px-2 text-deep-300 rounded-l">{ing.name}</td>
                      <td className="py-1 px-2 text-deep-400 text-right rounded-r">{ing.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Steps */}
            {recipe.steps.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Przygotowanie</h4>
                <ol className="space-y-2">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-deep-300">
                      <span className="shrink-0 w-5 h-5 bg-primary/20 text-primary text-xs rounded-full flex items-center justify-center font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Source */}
            {recipe.source ? (
              <a
                href={recipe.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-deep-400 hover:text-primary transition-colors"
              >
                <ExternalLink size={12} />
                Źródło: {recipe.sourceLabel}
              </a>
            ) : (
              <p className="text-xs text-deep-500 italic">{recipe.sourceLabel}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function CookbookPage() {
  const [data, setData] = useState(null)
  const [activeCategory, setActiveCategory] = useState('wszystkie')
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/recipes.json')
      .then(r => r.json())
      .then(setData)
      .catch(() => setError(true))
  }, [])

  const filtered = data
    ? (activeCategory === 'wszystkie' ? data.recipes : data.recipes.filter(r => r.category === activeCategory))
    : []

  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <BookOpen size={14} className="text-primary" />
            <span className="text-sm text-primary font-medium">Rodzinna kuchnia</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Przepisy <span className="text-gradient">pokoleń</span>
          </h1>
          <p className="text-deep-400 max-w-xl mx-auto">
            Wirtualny spis sprawdzonych przepisów rodzinnych i przyjacielskich.
          </p>
        </div>

        {/* Category filter */}
        {data && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {data.categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-deep-800/50 text-deep-400 border-deep-700/50 hover:border-primary/30 hover:text-white'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}

        {!data && !error && (
          <div className="text-center text-deep-400 py-20">Ładowanie przepisów…</div>
        )}
        {error && (
          <div className="text-center text-red-400 py-20">Nie można załadować przepisów.</div>
        )}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
