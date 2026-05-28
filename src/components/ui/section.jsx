import React from 'react'
import { clsx } from 'clsx'

/**
 * Section wrapper component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.id
 * @param {string} props.className
 * @param {boolean} props.padding
 */
export function Section({ children, id, className = '', padding = true }) {
  return (
    <section 
      id={id} 
      className={clsx(
        "py-16 md:py-24",
        padding && "px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </section>
  )
}

/**
 * Container component for centered content
 */
export function Container({ children, className = '' }) {
  return (
    <div className={clsx("max-w-7xl mx-auto", className)}>
      {children}
    </div>
  )
}

/**
 * Grid layout component
 */
export function Grid({ children, className = '', columns = 1, gap = 'default' }) {
  const gapClasses = {
    default: "gap-6 md:gap-8",
    small: "gap-4",
    large: "gap-8 md:gap-12",
  }
  
  const columnsClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }
  
  return (
    <div className={clsx(
      "grid",
      columnsClasses[columns],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}
