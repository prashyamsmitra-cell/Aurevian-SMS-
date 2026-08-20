import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const variants: Record<string, string> = {
  primary: 'bg-charcoal text-ivory hover:bg-stone-800 dark:bg-brass-400 dark:text-ink dark:hover:bg-brass-300 border border-charcoal dark:border-brass-400',
  secondary: 'bg-transparent text-charcoal border border-stone-300 hover:border-charcoal dark:text-stone-100 dark:border-stone-700 dark:hover:border-stone-400',
  ghost: 'bg-transparent text-stone-600 hover:text-charcoal dark:text-stone-400 dark:hover:text-stone-100 border border-transparent',
  danger: 'bg-transparent text-claret-600 border border-claret-600/40 hover:bg-claret-600/5',
}

const sizes: Record<string, string> = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-sm px-6 py-3.5',
}

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center justify-center gap-2 font-medium tracking-wide rounded-sm transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
