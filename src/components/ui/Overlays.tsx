import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Inbox, AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export function Modal({ open, onClose, title, subtitle, children, width = 'max-w-lg' }: {
  open: boolean; onClose: () => void; title: string; subtitle?: string; children: React.ReactNode; width?: string
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-charcoal/50 dark:bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog" aria-modal="true" aria-label={title}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full ${width} max-h-[88vh] overflow-y-auto bg-ivory dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-lift rounded-sm`}
          >
            <div className="flex items-start justify-between px-7 pt-7 pb-5 border-b border-stone-200 dark:border-stone-800">
              <div>
                <h3 className="font-display text-2xl text-charcoal dark:text-stone-50">{title}</h3>
                {subtitle && <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">{subtitle}</p>}
              </div>
              <button onClick={onClose} aria-label="Close dialog" className="text-stone-400 hover:text-charcoal dark:hover:text-stone-100 transition-colors p-1 -mr-1 -mt-1">
                <X size={20} />
              </button>
            </div>
            <div className="px-7 py-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function EmptyState({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center py-20 px-6"
    >
      <div className="w-12 h-12 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center mb-5 text-stone-400">
        <Inbox size={20} />
      </div>
      <p className="eyebrow mb-2">{title}</p>
      <p className="text-stone-500 dark:text-stone-400 text-sm max-w-sm">{subtitle}</p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  )
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-12 h-12 rounded-full border border-claret-600/40 flex items-center justify-center mb-5 text-claret-600">
        <AlertTriangle size={20} />
      </div>
      <p className="eyebrow mb-2 text-claret-600">We couldn't load this</p>
      <p className="text-stone-500 dark:text-stone-400 text-sm max-w-sm">Something went wrong while retrieving the information.</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-6 text-sm underline underline-offset-4 text-charcoal dark:text-stone-200">
          Try again
        </button>
      )}
    </div>
  )
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-stone-200 dark:bg-stone-800 rounded-sm ${className}`} />
}

export function ToastStack() {
  const { toasts } = useApp()
  const icons = { success: CheckCircle2, error: AlertTriangle, info: Info }
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2 w-[300px]">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = icons[t.tone]
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-charcoal dark:bg-stone-100 text-ivory dark:text-charcoal px-4 py-3.5 rounded-sm shadow-lift flex items-center gap-3 text-sm"
            >
              <Icon size={16} className="shrink-0 text-brass-300 dark:text-brass-600" />
              <span>{t.message}</span>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
