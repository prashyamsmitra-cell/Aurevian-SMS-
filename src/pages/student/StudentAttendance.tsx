import React, { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Card, SectionHeading, Badge } from '../../components/ui/Basics'
import { EmptyState } from '../../components/ui/Overlays'
import { TrendLine } from '../../components/charts/Charts'
import { attendancePercent } from '../../lib/utils'

export default function StudentAttendance() {
  const { session, attendance } = useApp()
  const myRecords = attendance.filter((r) => r.studentId === session?.id)

  const overall = useMemo(() => {
    if (!myRecords.length) return 0
    const total = myRecords.reduce((a, r) => a + attendancePercent(r.days), 0)
    return Math.round((total / myRecords.length) * 10) / 10
  }, [myRecords])

  const trend = useMemo(() => {
    const merged: Record<string, { present: number; total: number }> = {}
    myRecords.forEach((r) => r.days.forEach((d) => {
      merged[d.date] ??= { present: 0, total: 0 }
      merged[d.date].total += 1
      if (d.status === 'Present') merged[d.date].present += 1
    }))
    return Object.entries(merged).sort(([a], [b]) => a.localeCompare(b)).map(([, v], i) => ({ label: `W${i + 1}`, value: Math.round((v.present / v.total) * 100) }))
  }, [myRecords])

  return (
    <div>
      <SectionHeading eyebrow="Updated by faculty" title="Attendance" subtitle="Your standing across every enrolled class." />

      {myRecords.length === 0 ? (
        <Card><EmptyState title="No attendance recorded" subtitle="Attendance will appear here once your teachers begin marking it." /></Card>
      ) : (
        <>
          <Card className="p-9 mb-8">
            <p className="font-display text-6xl text-charcoal dark:text-stone-50 leading-none">{overall}%</p>
            <p className="eyebrow mt-3">Overall Attendance</p>
          </Card>

          <Card className="p-7 mb-8">
            <p className="eyebrow mb-1">Trend</p>
            <h3 className="font-display text-xl text-charcoal dark:text-stone-50 mb-6">Attendance over time</h3>
            <TrendLine data={trend} />
          </Card>

          <Card className="p-7">
            <p className="eyebrow mb-5">Subject Breakdown</p>
            <div className="space-y-5">
              {myRecords.map((r) => {
                const pct = attendancePercent(r.days)
                return (
                  <div key={r.classId}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-charcoal dark:text-stone-100">{r.className}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-stone-500">{pct}%</span>
                        <Badge tone={pct >= 90 ? 'success' : pct >= 75 ? 'brass' : 'danger'}>{pct >= 90 ? 'Excellent' : pct >= 75 ? 'Good' : 'Low'}</Badge>
                      </div>
                    </div>
                    <div className="h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brass-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
