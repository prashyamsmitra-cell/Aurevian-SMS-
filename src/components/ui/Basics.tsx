import React from 'react'
import { motion } from 'framer-motion'

export function Badge({ tone = 'neutral', children }: { tone?: 'success' | 'warning' | 'danger' | 'neutral' | 'brass'; children: React.ReactNode }) {
  const tones: Record<string, string> = {
    success: 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border-emerald-600/25',
    warning: 'bg-brass-400/10 text-brass-700 dark:text-brass-300 border-brass-400/30',
    danger: 'bg-claret-600/10 text-claret-700 dark:text-claret-400 border-claret-600/25',
    neutral: 'bg-stone-500/10 text-stone-600 dark:text-stone-400 border-stone-400/25',
    brass: 'bg-brass-500/10 text-brass-700 dark:text-brass-300 border-brass-500/30',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  )
}

export function Avatar({ seed, name, size = 40 }: { seed: string; name: string; size?: number }) {
  const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
  const hue = Array.from(seed).reduce((a, c) => a + c.charCodeAt(0), 0) % 40
  return (
    <div
      className="flex items-center justify-center rounded-full font-display text-stone-50 shrink-0 select-none"
      style={{
        width: size, height: size,
        background: `linear-gradient(135deg, hsl(${30 + hue} 28% 24%), hsl(${30 + hue} 20% 14%))`,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  )
}

export function Card({ className = '', children, hover = false, ...rest }: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  const Comp: any = hover ? motion.div : 'div'
  const hoverProps = hover ? { whileHover: { y: -3 }, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } } : {}
  return (
    <Comp
      className={`bg-white/70 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 rounded-sm ${hover ? 'hover:shadow-lift hover:border-stone-300 dark:hover:border-stone-700' : ''} transition-all duration-300 ${className}`}
      {...hoverProps}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function Divider({ className = '' }: { className?: string }) {
  return <div className={`h-px w-full bg-stone-200 dark:bg-stone-800 ${className}`} />
}

export function SectionHeading({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="font-display text-3xl md:text-4xl text-charcoal dark:text-stone-50 leading-tight">{title}</h2>
        {subtitle && <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm max-w-xl">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
