import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, ClipboardCheck, Wallet, TrendingUp } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Card, Badge, Divider } from '../../components/ui/Basics'
import { TrendLine } from '../../components/charts/Charts'
import { attendancePercent, fmtCurrency } from '../../lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

export default function StudentDashboard() {
  const { session, students, classes, attendance, tests, fees } = useApp()
  const me = students.find((s) => s.id === session?.id)
  const myClasses = classes.filter((c) => c.enrolledStudentIds.includes(session?.id ?? ''))
  const myRecords = attendance.filter((r) => r.studentId === session?.id)
  const myFee = fees.find((f) => f.studentId === session?.id)
  const myTests = tests.filter((t) => myClasses.some((c) => c.id === t.classId))

  const overallAttendance = useMemo(() => {
    if (!myRecords.length) return 0
    const total = myRecords.reduce((a, r) => a + attendancePercent(r.days), 0)
    return Math.round((total / myRecords.length) * 10) / 10
  }, [myRecords])

  const trend = useMemo(() => {
    if (!myRecords.length) return []
    const merged: Record<string, { present: number; total: number }> = {}
    myRecords.forEach((r) => r.days.forEach((d) => {
      merged[d.date] ??= { present: 0, total: 0 }
      merged[d.date].total += 1
      if (d.status === 'Present') merged[d.date].present += 1
    }))
    return Object.entries(merged).sort(([a], [b]) => a.localeCompare(b)).map(([date, v], i) => ({
      label: `W${i + 1}`, value: Math.round((v.present / v.total) * 100),
    }))
  }, [myRecords])

  const upcomingTests = myTests.filter((t) => !t.submitted.includes(session?.id ?? ''))
  const completedTests = myTests.filter((t) => t.submitted.includes(session?.id ?? ''))
  const avgTestScore = useMemo(() => {
    if (!completedTests.length) return 0
    const sum = completedTests.reduce((a, t) => a + (t.scores[session?.id ?? ''] || 0), 0)
    return Math.round(sum / completedTests.length)
  }, [completedTests, session?.id])

  const feeProgress = myFee ? Math.round((myFee.paid / myFee.total) * 100) : 0

  const today = new Date('2026-08-15')

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-10">
        <p className="eyebrow mb-2">{today.toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</p>
        <h1 className="font-display text-4xl md:text-5xl text-charcoal dark:text-stone-50">Good morning, {session?.name.split(' ')[0]}</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-3">{me?.program} · {me?.semester}</p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="p-9 mb-8">
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <p className="font-display text-5xl text-charcoal dark:text-stone-50 leading-none">{me?.gpa.toFixed(2)}</p>
              <p className="eyebrow mt-3">Current GPA</p>
              <p className="text-xs text-stone-500 mt-2">{me?.credits} credits earned</p>
            </div>
            <div className="sm:border-l sm:pl-8 border-stone-200 dark:border-stone-800">
              <p className="font-display text-5xl text-charcoal dark:text-stone-50 leading-none">{overallAttendance}%</p>
              <p className="eyebrow mt-3">Attendance</p>
              <p className="text-xs text-stone-500 mt-2">{myRecords.length} classes tracked</p>
            </div>
            <div className="sm:border-l sm:pl-8 border-stone-200 dark:border-stone-800">
              <p className="font-display text-5xl text-charcoal dark:text-stone-50 leading-none">{completedTests.length}</p>
              <p className="eyebrow mt-3">Tests Completed</p>
              {completedTests.length > 0 && <p className="text-xs text-stone-500 mt-2">Avg: {avgTestScore}/{completedTests[0]?.totalMarks || 100}</p>}
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={item} className="mb-8">
        <Card className="p-7">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Wallet size={17} className="text-brass-500 mb-3" />
              <p className="eyebrow">Fees</p>
              <h3 className="font-display text-2xl text-charcoal dark:text-stone-50 mt-1">{myFee ? fmtCurrency(myFee.total - myFee.paid) : fmtCurrency(0)}</h3>
              <p className="text-xs text-stone-500 mt-1">Outstanding balance</p>
            </div>
            {myFee && <Badge tone={feeProgress === 100 ? 'success' : 'warning'}>{feeProgress}% paid</Badge>}
          </div>
          {myFee && (
            <>
              <div className="my-4 h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${feeProgress}%` }} 
                  transition={{ duration: 0.8 }} 
                  className="h-full bg-brass-500 rounded-full" 
                />
              </div>
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>{fmtCurrency(myFee.paid)} paid</span>
                <Link to="/student/fees" className="text-brass-600 dark:text-brass-400 underline">View details</Link>
              </div>
            </>
          )}
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="p-7 h-full">
            <p className="eyebrow mb-1">Progress</p>
            <h3 className="font-display text-xl text-charcoal dark:text-stone-50 mb-6">Attendance Trend</h3>
            {trend.length ? <TrendLine data={trend} /> : <p className="text-sm text-stone-500 py-16 text-center">No attendance recorded yet.</p>}
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="p-7 h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <TrendingUp size={17} className="text-brass-500 mb-2" />
                <p className="eyebrow">Performance</p>
              </div>
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <p className="text-xs text-stone-500 mb-1">GPA Target: 8.5+</p>
                <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brass-500 rounded-full" style={{ width: `${Math.min((me?.gpa ?? 0) / 10 * 100, 100)}%` }} />
                </div>
              </div>
              <div>
                <p className="text-xs text-stone-500 mb-1">Attendance Target: 85%</p>
                <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(overallAttendance, 100)}%` }} />
                </div>
              </div>
            </div>
            <Link to="/student/attendance" className="mt-auto text-xs text-brass-600 dark:text-brass-400 underline underline-offset-4">View details</Link>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card className="p-7">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="eyebrow">My Classes</p>
                <p className="text-xs text-stone-500 mt-1">{myClasses.length} enrolled</p>
              </div>
              <BookOpen size={15} className="text-brass-500" />
            </div>
            <div className="space-y-4">
              {myClasses.slice(0, 5).map((c, i) => (
                <div key={c.id}>
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="text-sm text-charcoal dark:text-stone-100 font-medium">{c.name}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{c.teacherName}</p>
                    </div>
                    <Badge tone="brass" className="text-xs shrink-0">{c.schedule.split(' ')[0]}</Badge>
                  </div>
                  {i < Math.min(myClasses.length - 1, 4) && <Divider className="mt-4" />}
                </div>
              ))}
              {myClasses.length === 0 && <p className="text-sm text-stone-500">You haven't enrolled in any classes yet.</p>}
              {myClasses.length > 5 && <Link to="/student/classes" className="text-xs text-brass-600 dark:text-brass-400 underline mt-2 block">View all classes</Link>}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-7">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="eyebrow">Upcoming Tests</p>
                <p className="text-xs text-stone-500 mt-1">{upcomingTests.length} pending</p>
              </div>
              <ClipboardCheck size={15} className="text-brass-500" />
            </div>
            <div className="space-y-3">
              {upcomingTests.slice(0, 5).map((t, i) => (
                <div key={t.id}>
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-charcoal dark:text-stone-100 truncate">{t.title}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{t.date} · {t.durationMins}m</p>
                    </div>
                    <Badge tone="warning" className="text-xs shrink-0">{t.totalMarks}</Badge>
                  </div>
                  {i < Math.min(upcomingTests.length - 1, 4) && <Divider className="mt-3" />}
                </div>
              ))}
              {upcomingTests.length === 0 && <p className="text-sm text-stone-500">No pending tests. You're all caught up!</p>}
              {upcomingTests.length > 5 && <Link to="/student/tests" className="text-xs text-brass-600 dark:text-brass-400 underline mt-2 block">View all tests</Link>}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
