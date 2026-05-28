import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Primary UI button component
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'ghost'} props.variant
 * @param {'sm' | 'md' | 'lg'} props.size
 * @param {React.ReactNode} props.children
 * @param {boolean} props.disabled
 * @param {() => void} props.onClick
 */
export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  disabled = false, 
  onClick,
  className,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20",
    secondary: "bg-deep-700 text-white hover:bg-deep-600",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-deep-400 hover:text-white hover:bg-deep-800/50",
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  }
  
  return (
    <button
      className={twMerge(baseStyles, variants[variant], sizes[size], className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
