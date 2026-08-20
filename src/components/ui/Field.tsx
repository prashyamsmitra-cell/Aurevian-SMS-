import React from 'react'

export function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[11px] font-medium tracking-widest2 uppercase text-stone-500 mb-2">{children}</label>
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props
  return (
    <input
      className={`w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-2.5 text-[15px] text-charcoal dark:text-stone-100 placeholder:text-stone-400 focus:border-brass-500 dark:focus:border-brass-400 outline-none transition-colors duration-200 ${className}`}
      {...rest}
    />
  )
}

export function BoxInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props
  return (
    <input
      className={`w-full bg-white/70 dark:bg-stone-900/50 border border-stone-300 dark:border-stone-700 rounded-sm px-3.5 py-2.5 text-sm text-charcoal dark:text-stone-100 placeholder:text-stone-400 focus:border-brass-500 dark:focus:border-brass-400 outline-none transition-colors duration-200 ${className}`}
      {...rest}
    />
  )
}

export function Select({ className = '', children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full bg-white/70 dark:bg-stone-900/50 border border-stone-300 dark:border-stone-700 rounded-sm px-3.5 py-2.5 text-sm text-charcoal dark:text-stone-100 focus:border-brass-500 dark:focus:border-brass-400 outline-none transition-colors duration-200 ${className}`}
      {...rest}
    >
      {children}
    </select>
  )
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = '', ...rest } = props
  return (
    <textarea
      className={`w-full bg-white/70 dark:bg-stone-900/50 border border-stone-300 dark:border-stone-700 rounded-sm px-3.5 py-2.5 text-sm text-charcoal dark:text-stone-100 placeholder:text-stone-400 focus:border-brass-500 dark:focus:border-brass-400 outline-none transition-colors duration-200 ${className}`}
      {...rest}
    />
  )
}
