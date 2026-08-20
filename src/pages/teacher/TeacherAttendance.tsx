import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Card, Avatar, SectionHeading, Divider } from '../../components/ui/Basics'
import { EmptyState } from '../../components/ui/Overlays'
import { Label, BoxInput, Select } from '../../components/ui/Field'
import Button from '../../components/ui/Button'
import { attendancePercent } from '../../lib/utils'

export default function TeacherAttendance() {
  const { session, classes, students, attendance, markAttendance } = useApp()
  const myClasses = classes.filter((c) => c.teacherId === session?.id)
  const [classId, setClassId] = useState(myClasses[0]?.id ?? '')
  const [date, setDate] = useState('2026-08-15')
  const cls = myClasses.find((c) => c.id === classId)

  const existing = useMemo(() => {
    const map: Record<string, 'Present' | 'Absent'> = {}
    cls?.enrolledStudentIds.forEach((id) => {
      const rec = attendance.find((r) => r.classId === classId && r.studentId === id)
      const day = rec?.days.find((d) => d.date === date)
      if (day) map[id] = day.status
    })
    return map
  }, [cls, attendance, classId, date])

  const [draft, setDraft] = useState<Record<string, 'Present' | 'Absent'>>({})

  React.useEffect(() => { setDraft(existing) }, [cls, attendance, classId, date])

  function setStatus(id: string, status: 'Present' | 'Absent') {
    setDraft((d) => ({ ...d, [id]: status }))
  }

  function save() {
    if (!cls) return
    const filled: Record<string, 'Present' | 'Absent'> = {}
    cls.enrolledStudentIds.forEach((id) => { filled[id] = draft[id] ?? 'Present' })
    markAttendance(cls.id, cls.name, date, filled)
  }

  if (myClasses.length === 0) {
    return (
      <div>
        <SectionHeading title="Attendance" subtitle="Open a class before recording attendance." />
        <Card><EmptyState title="No classes yet" subtitle="Create a class from My Classes to begin marking attendance." /></Card>
      </div>
    )
  }

  return (
    <div>
      <SectionHeading title="Attendance" subtitle="Mark today's attendance for any class you teach." />

      <div className="flex flex-wrap gap-4 mb-7">
        <div className="w-64">
          <Label>Class</Label>
          <Select value={classId} onChange={(e) => setClassId(e.target.value)}>
            {myClasses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </div>
        <div className="w-52">
          <Label>Date</Label>
          <BoxInput type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      <Card className="p-6">
        {!cls || cls.enrolledStudentIds.length === 0 ? (
          <EmptyState title="No students enrolled" subtitle="Attendance can be recorded once students have joined this class." />
        ) : (
          <>
            <div className="space-y-4">
              {cls.enrolledStudentIds.map((id, i) => {
                const s = students.find((x) => x.id === id)
                if (!s) return null
                const rec = attendance.find((r) => r.classId === classId && r.studentId === id)
                const pct = rec ? attendancePercent(rec.days) : 0
                const status = draft[id] ?? 'Present'
                return (
                  <div key={id}>
                    <div className="flex items-center gap-4">
                      <Avatar seed={s.avatarSeed} name={s.name} size={36} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-charcoal dark:text-stone-100">{s.name}</p>
                        <p className="text-xs text-stone-500">{s.rollNo} · {pct}% overall</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setStatus(id, 'Present')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-colors ${status === 'Present' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-stone-300 dark:border-stone-700 text-stone-500 hover:border-emerald-600'}`}
                        >
                          <Check size={13} /> Present
                        </button>
                        <button
                          onClick={() => setStatus(id, 'Absent')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-colors ${status === 'Absent' ? 'bg-claret-600 text-white border-claret-600' : 'border-stone-300 dark:border-stone-700 text-stone-500 hover:border-claret-600'}`}
                        >
                          <X size={13} /> Absent
                        </button>
                      </div>
                    </div>
                    {i < cls.enrolledStudentIds.length - 1 && <Divider className="mt-4" />}
                  </div>
                )
              })}
            </div>
            <div className="flex justify-end pt-6 mt-2 border-t border-stone-200 dark:border-stone-800">
              <Button onClick={save}>Save Attendance</Button>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
