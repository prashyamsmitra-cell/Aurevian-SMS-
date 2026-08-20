import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './Sidebar'
import Header from './Header'

const TITLES: Record<string, string> = {
  '/admin': 'Dashboard', '/admin/students': 'Students', '/admin/teachers': 'Faculty',
  '/teacher': 'Dashboard', '/teacher/classes': 'My Classes', '/teacher/tests': 'Tests & Scores', '/teacher/attendance': 'Attendance', '/teacher/notes': 'Notes',
  '/student': 'Dashboard', '/student/classes': 'My Classes', '/student/tests': 'Tests', '/student/attendance': 'Attendance', '/student/notes': 'Notes', '/student/fees': 'Fees',
}

export default function Shell({ role }: { role: 'admin' | 'teacher' | 'student' }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const title = TITLES[location.pathname] ?? 'Aurevian'

  const layoutKey = `layout-${location.pathname}`

  return (
    <div key={layoutKey} className="flex h-screen overflow-hidden bg-ivory dark:bg-ink">
      <Sidebar role={role} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} onMenu={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 lg:px-10 py-9 max-w-[1400px] mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
