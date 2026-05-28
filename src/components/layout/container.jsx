import React from 'react'

export function Container({ children, className = '', maxWidth = '7xl' }) {
  const maxW = {
    'sm': 'max-w-4xl',
    'md': 'max-w-5xl',
    'lg': 'max-w-7xl',
    'xl': 'max-w-8xl',
  }[maxWidth] || 'max-w-7xl'

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxW} ${className}`}>
      {children}
    </div>
  )
}

export function Section({ children, className = '', padding = 'py-16 md:py-24' }) {
  return (
    <section className={`${padding} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

export function CenteredContent({ children, className = '' }) {
  return (
    <div className={`text-center max-w-3xl mx-auto ${className}`}>
      {children}
    </div>
  )
}
