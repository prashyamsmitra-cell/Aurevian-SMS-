import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, Users } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Card, Badge, SectionHeading } from '../../components/ui/Basics'
import Button from '../../components/ui/Button'

export default function StudentClasses() {
  const { session, classes, enrollInClass, unenrollFromClass } = useApp()
  const [tab, setTab] = useState<'enrolled' | 'browse'>('enrolled')

  const enrolled = classes.filter((c) => c.enrolledStudentIds.includes(session?.id ?? ''))
  const browsable = classes.filter((c) => !c.enrolledStudentIds.includes(session?.id ?? ''))

  const list = tab === 'enrolled' ? enrolled : browsable

  return (
    <div>
      <SectionHeading eyebrow={`${enrolled.length} classes enrolled`} title="My Classes" subtitle="Take classes offered across the institution, open to enrolment." />

      <div className="flex border border-stone-300 dark:border-stone-700 rounded-full p-1 mb-8 w-fit relative">
        {(['enrolled', 'browse'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative px-5 py-2 text-[13px] rounded-full transition-colors duration-300 z-10 ${tab === t ? 'text-ivory dark:text-ink' : 'text-stone-500'}`}
          >
            {tab === t && <motion.span layoutId="class-tab" className="absolute inset-0 bg-charcoal dark:bg-brass-400 rounded-full -z-10" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} />}
            {t === 'enrolled' ? 'Enrolled' : 'Browse Classes'}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {list.map((c) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Card hover className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-charcoal dark:text-stone-100 font-medium text-[15px]">{c.name}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{c.subjectCode} · {c.teacherName}</p>
                  </div>
                  <Badge tone={c.enrolledStudentIds.length >= c.capacity ? 'danger' : 'brass'}>
                    {c.enrolledStudentIds.length}/{c.capacity}
                  </Badge>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-5">{c.description}</p>
                <div className="text-xs text-stone-500 space-y-1.5 mb-6">
                  <div className="flex items-center gap-2"><Clock size={13} /> {c.schedule}</div>
                  <div className="flex items-center gap-2"><MapPin size={13} /> {c.room}</div>
                  <div className="flex items-center gap-2"><Users size={13} /> {c.department}</div>
                </div>
                <div className="mt-auto pt-4 border-t border-stone-200 dark:border-stone-800">
                  {tab === 'enrolled' ? (
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => unenrollFromClass(c.id, session!.id)}>Leave class</Button>
                  ) : (
                    <Button size="sm" className="w-full" disabled={c.enrolledStudentIds.length >= c.capacity} onClick={() => enrollInClass(c.id, session!.id)}>
                      {c.enrolledStudentIds.length >= c.capacity ? 'Class full' : 'Enrol now'}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {list.length === 0 && (
        <Card className="mt-2">
          <div className="text-center py-16">
            <p className="text-sm text-stone-500">{tab === 'enrolled' ? "You haven't enrolled in any classes yet." : 'No further classes are open right now.'}</p>
          </div>
        </Card>
      )}
    </div>
  )
}
