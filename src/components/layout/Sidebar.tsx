import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

interface NavGroup { label: string; items: { to: string; label: string }[] }

const NAV: Record<string, NavGroup[]> = {
  admin: [
    { label: 'Overview', items: [{ to: '/admin', label: 'Dashboard' }] },
    { label: 'Directory', items: [
      { to: '/admin/students', label: 'Students' },
      { to: '/admin/teachers', label: 'Faculty' },
    ] },
  ],
  teacher: [
    { label: 'Overview', items: [{ to: '/teacher', label: 'Dashboard' }] },
    { label: 'Teaching', items: [
      { to: '/teacher/classes', label: 'My Classes' },
      { to: '/teacher/tests', label: 'Tests & Scores' },
      { to: '/teacher/attendance', label: 'Attendance' },
      { to: '/teacher/notes', label: 'Notes' },
    ] },
  ],
  student: [
    { label: 'Overview', items: [{ to: '/student', label: 'Dashboard' }] },
    { label: 'Academics', items: [
      { to: '/student/classes', label: 'My Classes' },
      { to: '/student/tests', label: 'Tests' },
      { to: '/student/attendance', label: 'Attendance' },
      { to: '/student/notes', label: 'Notes' },
    ] },
    { label: 'Administration', items: [{ to: '/student/fees', label: 'Fees' }] },
  ],
}

function NavContent({ role, onNavigate }: { role: 'admin' | 'teacher' | 'student'; onNavigate?: () => void }) {
  const { session, logout } = useApp()
  return (
    <div className="flex flex-col h-full">
      <div className="px-7 pt-9 pb-7">
        <div className="font-display text-[26px] tracking-wide text-charcoal dark:text-stone-50 leading-none">AUREVIAN</div>
        <div className="eyebrow mt-2">Institutional Management</div>
      </div>
      <nav className="flex-1 px-4 overflow-y-auto">
        {NAV[role].map((group) => (
          <div key={group.label} className="mb-7">
            <p className="px-3 mb-2 text-[10px] font-semibold tracking-widest2 uppercase text-stone-400 dark:text-stone-600">{group.label}</p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === `/${role}`}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `relative block px-3 py-2.5 text-[14px] rounded-sm transition-colors duration-200 ${
                        isActive
                          ? 'text-charcoal dark:text-stone-50 font-medium'
                          : 'text-stone-500 dark:text-stone-400 hover:text-charcoal dark:hover:text-stone-200'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="active-nav"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-brass-500 dark:bg-brass-400 rounded-full"
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          />
                        )}
                        <span className="pl-2">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="px-7 py-6 border-t border-stone-200 dark:border-stone-800">
        <p className="text-[13px] text-charcoal dark:text-stone-200 font-medium">{session?.name}</p>
        <p className="text-[11px] text-stone-500 dark:text-stone-500 capitalize mb-3">{role} access</p>
        <button onClick={logout} className="text-[12px] tracking-wide text-stone-500 hover:text-brass-600 dark:hover:text-brass-400 transition-colors underline underline-offset-4">
          Sign out
        </button>
      </div>
    </div>
  )
}

export default function Sidebar({ role, mobileOpen, onCloseMobile }: {
  role: 'admin' | 'teacher' | 'student'; mobileOpen: boolean; onCloseMobile: () => void
}) {
  return (
    <>
      <aside className="hidden lg:flex lg:flex-col w-[264px] shrink-0 border-r border-stone-200 dark:border-stone-800 bg-ivory/60 dark:bg-ink/60">
        <NavContent role={role} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-40 lg:hidden" initial="closed" animate="open" exit="closed">
            <motion.div
              className="absolute inset-0 bg-charcoal/50 dark:bg-black/70"
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              transition={{ duration: 0.25 }}
              onClick={onCloseMobile}
            />
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[280px] bg-ivory dark:bg-ink shadow-lift"
              variants={{ open: { x: 0 }, closed: { x: -300 } }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <button onClick={onCloseMobile} className="absolute top-8 right-5 text-stone-400" aria-label="Close menu">
                <X size={20} />
              </button>
              <NavContent role={role} onNavigate={onCloseMobile} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
