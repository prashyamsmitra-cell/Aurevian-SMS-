import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, GraduationCap, BookOpen, Wallet } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Card, Divider } from '../../components/ui/Basics'
import { TrendArea, CompareBars, SplitPie } from '../../components/charts/Charts'
import { fmtCurrency } from '../../lib/utils'

const enrollmentTrend = [
  { label: 'Mar', value: 2210 }, { label: 'Apr', value: 2255 }, { label: 'May', value: 2298 },
  { label: 'Jun', value: 2340 }, { label: 'Jul', value: 2410 }, { label: 'Aug', value: 2481 },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

export default function AdminDashboard() {
  const { students, teachers, classes, fees, tests, attendance } = useApp()

  const totalCollected = fees.reduce((a, f) => a + f.paid, 0)
  const totalBilled = fees.reduce((a, f) => a + f.total, 0)
  const feesOutstanding = totalBilled - totalCollected
  const collectionRate = Math.round((totalCollected / totalBilled) * 100)

  const deptDist = useMemo(() => {
    const map: Record<string, number> = {}
    students.forEach((s) => { map[s.department] = (map[s.department] ?? 0) + 1 })
    const colors = ['#9C7A3C', '#3F5B48', '#7A3B37', '#4C463C', '#B4903F']
    return Object.entries(map).map(([name, value], i) => ({ name, value, color: colors[i % colors.length] }))
  }, [students])

  const perDept = useMemo(() => {
    const map: Record<string, { label: string; students: number; faculty: number }> = {}
    students.forEach((s) => {
      map[s.department] ??= { label: s.department, students: 0, faculty: 0 }
      map[s.department].students += 1
    })
    teachers.forEach((t) => {
      map[t.department] ??= { label: t.department, students: 0, faculty: 0 }
      map[t.department].faculty += 1
    })
    return Object.values(map)
  }, [students, teachers])

  const institutionAttendance = useMemo(() => {
    if (!attendance.length) return 0
    const totalMarked = attendance.reduce((sum, rec) => sum + rec.days.length, 0)
    const totalPresent = attendance.reduce((sum, rec) => sum + rec.days.filter(d => d.status === 'Present').length, 0)
    return totalMarked > 0 ? Math.round((totalPresent / totalMarked) * 100) : 0
  }, [attendance])

  const activity = [
    { time: '14:32', text: 'Fee payment processed', meta: `${fmtCurrency(30000)} — Student #AUR-2091` },
    { time: '13:45', text: 'Test results published', meta: 'Database Systems — 9 students graded' },
    { time: '12:18', text: 'Student enrolled in class', meta: 'Web Development · Computer Science' },
    { time: '11:30', text: 'Attendance recorded', meta: '87 students marked for Database Systems' },
    { time: '10:15', text: 'New teacher added', meta: 'Prof. Anjali Gupta — Architecture' },
    { time: '09:42', text: 'New class opened', meta: 'Building Design · Capacity 30' },
  ]

  const keyMetrics = [
    { label: 'Avg. GPA', value: (students.reduce((a, s) => a + s.gpa, 0) / students.length).toFixed(2), unit: '/10' },
    { label: 'Fee Collection', value: `${collectionRate}%`, meta: `${fmtCurrency(feesOutstanding)} outstanding` },
    { label: 'Tests Scheduled', value: tests.length, unit: '' },
    { label: 'Classes/Teacher', value: (classes.length / teachers.length).toFixed(1), unit: 'avg' },
  ]

  const today = new Date('2026-08-15')

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-10">
        <p className="eyebrow mb-2">
          {today.toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-charcoal dark:text-stone-50">Good morning, Alexander</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-3">Your institution at a glance.</p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="p-9 mb-8">
          <div className="grid sm:grid-cols-2 gap-10">
            <div>
              <p className="font-display text-6xl text-charcoal dark:text-stone-50 leading-none">{students.length.toLocaleString('en-IN')}</p>
              <p className="eyebrow mt-3">Students Enrolled</p>
              <p className="text-emerald-700 dark:text-emerald-400 text-sm mt-1">+8.4% from last term</p>
            </div>
            <div className="sm:border-l sm:pl-10 border-stone-200 dark:border-stone-800">
              <p className="font-display text-6xl text-charcoal dark:text-stone-50 leading-none">{institutionAttendance}%</p>
              <p className="eyebrow mt-3">Institution Attendance</p>
              <p className="text-emerald-700 dark:text-emerald-400 text-sm mt-1">+2.1% from last term</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {keyMetrics.map((m) => (
          <Card key={m.label} hover className="p-5">
            <p className="font-display text-3xl text-charcoal dark:text-stone-50">{m.value}<span className="text-sm text-stone-400">{m.unit}</span></p>
            <p className="eyebrow mt-2">{m.label}</p>
            {m.meta && <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">{m.meta}</p>}
          </Card>
        ))}
      </motion.div>

      <motion.div variants={item} className="grid sm:grid-cols-3 gap-5 mb-8">
        {[
          { icon: Users, label: 'Faculty', value: teachers.length },
          { icon: BookOpen, label: 'Active Classes', value: classes.length },
          { icon: Wallet, label: 'Fees Collected', value: fmtCurrency(totalCollected) },
        ].map((s) => (
          <Card key={s.label} hover className="p-6">
            <s.icon size={17} className="text-brass-500 mb-4" />
            <p className="font-display text-3xl text-charcoal dark:text-stone-50">{s.value}</p>
            <p className="eyebrow mt-1.5">{s.label}</p>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="p-7 h-full">
            <p className="eyebrow mb-1">Growth</p>
            <h3 className="font-display text-xl text-charcoal dark:text-stone-50 mb-6">Enrollment Trend</h3>
            <TrendArea data={enrollmentTrend} />
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="p-7 h-full">
            <p className="eyebrow mb-1">Composition</p>
            <h3 className="font-display text-xl text-charcoal dark:text-stone-50 mb-4">By Department</h3>
            <SplitPie data={deptDist} height={170} />
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3">
              {deptDist.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  {d.name}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item} className="mb-8">
        <Card className="p-7">
          <p className="eyebrow mb-1">Departments</p>
          <h3 className="font-display text-xl text-charcoal dark:text-stone-50 mb-6">Students &amp; Faculty by Department</h3>
          <CompareBars
            data={perDept}
            bars={[{ key: 'students', color: '#1C1A16', name: 'Students' }, { key: 'faculty', color: '#9C7A3C', name: 'Faculty' }]}
          />
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card className="p-7">
            <p className="eyebrow mb-5">Recent Activity</p>
            <div className="space-y-4">
              {activity.map((a, i) => (
                <div key={i}>
                  <div className="flex gap-3">
                    <span className="font-mono text-xs text-stone-400 pt-0.5 w-12 shrink-0">{a.time}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-charcoal dark:text-stone-100">{a.text}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-500 mt-0.5 truncate">{a.meta}</p>
                    </div>
                  </div>
                  {i < activity.length - 1 && <Divider className="mt-4" />}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-7">
            <p className="eyebrow mb-5">Upcoming Exams</p>
            <div className="space-y-4">
              {tests.filter(t => t.submitted.length < (classes.find(c => c.id === t.classId)?.enrolledStudentIds.length || 1)).slice(0, 4).map((t, i) => (
                <div key={t.id}>
                  <div className="flex gap-3">
                    <span className="font-mono text-xs text-stone-400 pt-0.5 w-12 shrink-0">{t.time}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-charcoal dark:text-stone-100">{t.title}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-500 mt-0.5">{t.className} · {t.date}</p>
                    </div>
                  </div>
                  {i < 3 && <Divider className="mt-4" />}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
