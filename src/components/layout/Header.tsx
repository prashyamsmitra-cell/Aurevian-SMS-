import React, { useState } from 'react'
import { Menu, Search, Bell, Sun, Moon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { Avatar } from '../ui/Basics'

export default function Header({ title, onMenu }: { title: string; onMenu: () => void }) {
  const { session, theme, toggleTheme } = useApp()
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-6 lg:px-10 h-[76px] border-b border-stone-200 dark:border-stone-800 bg-ivory/85 dark:bg-ink/85 backdrop-blur-md">
      <button onClick={onMenu} className="lg:hidden text-charcoal dark:text-stone-200" aria-label="Open menu">
        <Menu size={22} />
      </button>

      <h1 className="font-display text-xl md:text-2xl text-charcoal dark:text-stone-50 mr-auto truncate">{title}</h1>

      <div className="hidden md:flex items-center gap-2 text-stone-400 border border-stone-300 dark:border-stone-700 rounded-full px-3.5 py-1.5 w-[220px] focus-within:border-brass-500 transition-colors">
        <Search size={15} />
        <input placeholder="Search…" className="bg-transparent outline-none text-sm w-full placeholder:text-stone-400 text-charcoal dark:text-stone-100" />
      </div>

      <button
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="text-stone-500 hover:text-charcoal dark:hover:text-stone-100 transition-colors"
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>

      <div className="relative">
        <button onClick={() => setNotifOpen((v) => !v)} aria-label="Notifications" className="relative text-stone-500 hover:text-charcoal dark:hover:text-stone-100 transition-colors">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-brass-500" />
        </button>
        <AnimatePresence>
          {notifOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-72 bg-ivory dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm shadow-lift p-4"
            >
              <p className="eyebrow mb-3">Notifications</p>
              <div className="space-y-3 text-sm">
                <p className="text-charcoal dark:text-stone-200">Semester VI examination schedule released.</p>
                <p className="text-charcoal dark:text-stone-200">Fee payment received for AUR‑2048.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {session && <Avatar seed={session.id} name={session.name} size={36} />}
    </header>
  )
}
