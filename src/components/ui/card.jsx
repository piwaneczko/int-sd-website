import React from 'react'
import { clsx } from 'clsx'

/**
 * Card component for content containers
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.className
 * @param {boolean} props.hoverEffect
 */
export function Card({ children, className = '', hoverEffect = true }) {
  return (
    <div 
      className={clsx(
        "bg-deep-800/50 backdrop-blur-sm border border-deep-700/50 rounded-2xl p-6",
        "transition-all duration-300",
        hoverEffect && "hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10",
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * CardHeader component
 */
export function CardHeader({ title, subtitle, icon }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        {icon && <div className="text-primary">{icon}</div>}
        {title && <h3 className="text-xl font-semibold text-white">{title}</h3>}
      </div>
      {subtitle && <p className="text-deep-400 text-sm">{subtitle}</p>}
    </div>
  )
}

/**
 * CardContent component
 */
export function CardContent({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

/**
 * CardFooter component
 */
export function CardFooter({ children, className = '' }) {
  return (
    <div className={clsx("mt-4 pt-4 border-t border-deep-700/50", className)}>
      {children}
    </div>
  )
}
