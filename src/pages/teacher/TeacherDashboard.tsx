import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, BookOpen, ClipboardCheck, FileText } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Card, Divider, Badge } from '../../components/ui/Basics'
import { attendancePercent } from '../../lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

export default function TeacherDashboard() {
  const { session, classes, tests, attendance, notes } = useApp()
  const myClasses = classes.filter((c) => c.teacherId === session?.id)
  const myTests = tests.filter((t) => myClasses.some((c) => c.id === t.classId))
  const myNotes = notes.filter((n) => myClasses.some((c) => c.id === n.classId) && n.uploadedByRole === 'teacher')
  const totalStudents = new Set(myClasses.flatMap((c) => c.enrolledStudentIds)).size
  const totalCapacity = myClasses.reduce((sum, c) => sum + c.capacity, 0)
  const enrollmentRate = totalCapacity > 0 ? Math.round((totalStudents / totalCapacity) * 100) : 0

  const avgAttendance = useMemo(() => {
    const records = attendance.filter((r) => myClasses.some((c) => c.id === r.classId))
    if (!records.length) return 0
    const total = records.reduce((a, r) => a + attendancePercent(r.days), 0)
    return Math.round((total / records.length) * 10) / 10
  }, [attendance, myClasses])

  const testsStats = useMemo(() => {
    const total = myTests.length
    const graded = myTests.filter(t => t.submitted.length === classes.find(c => c.id === t.classId)?.enrolledStudentIds.length).length
    const pending = total - graded
    return { total, graded, pending }
  }, [myTests, classes])

  const today = new Date('2026-08-15')

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-10">
        <p className="eyebrow mb-2">{today.toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</p>
        <h1 className="font-display text-4xl md:text-5xl text-charcoal dark:text-stone-50">Good morning, {session?.name.split(' ')[0]}</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-3">Your teaching portfolio at a glance.</p>
      </motion.div>

      <motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[
          { icon: BookOpen, label: 'Classes Taught', value: myClasses.length },
          { icon: Users, label: 'Students Reached', value: totalStudents },
          { icon: ClipboardCheck, label: 'Avg. Attendance', value: `${avgAttendance}%` },
          { icon: FileText, label: 'Notes Shared', value: myNotes.length },
        ].map((s) => (
          <Card key={s.label} hover className="p-6">
            <s.icon size={17} className="text-brass-500 mb-4" />
            <p className="font-display text-3xl text-charcoal dark:text-stone-50">{s.value}</p>
            <p className="eyebrow mt-1.5">{s.label}</p>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={item} className="mb-8">
        <Card className="p-7">
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-stone-500 mb-1">Enrollment Rate</p>
              <p className="font-display text-4xl text-charcoal dark:text-stone-50">{enrollmentRate}%</p>
              <p className="text-xs text-stone-500 mt-2">{totalStudents} / {totalCapacity} seats</p>
            </div>
            <div className="sm:border-l sm:pl-8 border-stone-200 dark:border-stone-800">
              <p className="text-sm text-stone-500 mb-1">Test Progress</p>
              <p className="font-display text-4xl text-charcoal dark:text-stone-50">{testsStats.graded}/{testsStats.total}</p>
              <p className="text-xs text-stone-500 mt-2">{testsStats.pending} awaiting grading</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="p-7">
            <div className="flex items-center justify-between mb-5">
              <p className="eyebrow">My Classes</p>
              <Link to="/teacher/classes" className="text-xs text-brass-600 dark:text-brass-400 underline underline-offset-4">View all</Link>
            </div>
            <div className="space-y-4">
              {myClasses.length === 0 ? (
                <p className="text-sm text-stone-500">No classes opened yet. Create your first class to get started.</p>
              ) : (
                myClasses.map((c, i) => (
                  <div key={c.id}>
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <p className="text-sm text-charcoal dark:text-stone-100 font-medium">{c.name}</p>
                        <p className="text-xs text-stone-500 mt-1">{c.subjectCode} · {c.schedule}</p>
                        <p className="text-xs text-stone-500 mt-1">{c.room} — Capacity: {c.capacity}</p>
                      </div>
                      <Badge tone={c.enrolledStudentIds.length >= c.capacity * 0.8 ? 'warning' : 'brass'}>{c.enrolledStudentIds.length} enrolled</Badge>
                    </div>
                    {i < myClasses.length - 1 && <Divider className="mt-4" />}
                  </div>
                ))
              )}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-7">
            <div className="flex items-center justify-between mb-5">
              <p className="eyebrow">Scheduled Tests</p>
              <Link to="/teacher/tests" className="text-xs text-brass-600 dark:text-brass-400 underline underline-offset-4">View all</Link>
            </div>
            <div className="space-y-3">
              {myTests.length === 0 ? (
                <p className="text-sm text-stone-500">No tests scheduled yet.</p>
              ) : (
                myTests.slice(0, 5).map((t, i) => (
                  <div key={t.id}>
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-stone-500">{t.date} · {t.time}</p>
                        <p className="text-sm text-charcoal dark:text-stone-100 mt-0.5 truncate">{t.title}</p>
                      </div>
                      <Badge tone={t.submitted.length > 0 ? 'success' : 'neutral'} className="text-xs shrink-0">{t.submitted.length}</Badge>
                    </div>
                    {i < Math.min(myTests.length - 1, 4) && <Divider className="mt-3" />}
                  </div>
                ))
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
