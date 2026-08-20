import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Users, MapPin, Clock } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Card, Badge, Avatar, SectionHeading, Divider } from '../../components/ui/Basics'
import { Modal, EmptyState } from '../../components/ui/Overlays'
import { Label, BoxInput, Textarea } from '../../components/ui/Field'
import Button from '../../components/ui/Button'
import type { ClassSession } from '../../types'

const emptyForm = { name: '', subjectCode: '', schedule: '', room: '', capacity: 50, description: '' }

export default function TeacherClasses() {
  const { session, teachers, classes, students, addClass } = useApp()
  const teacher = teachers.find((t) => t.id === session?.id)
  const myClasses = classes.filter((c) => c.teacherId === session?.id)

  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [roster, setRoster] = useState<ClassSession | null>(null)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!teacher) return
    addClass({ ...form, teacherId: teacher.id, teacherName: teacher.name, department: teacher.department })
    setModalOpen(false)
    setForm(emptyForm)
  }

  return (
    <div>
      <SectionHeading
        eyebrow={`${myClasses.length} classes open`}
        title="My Classes"
        subtitle="Open a class for students to enrol, and review who has joined."
        action={<Button onClick={() => setModalOpen(true)}><Plus size={15} /> New Class</Button>}
      />

      {myClasses.length === 0 ? (
        <Card><EmptyState title="No classes yet" subtitle="Open your first class so students can enrol." /></Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          <AnimatePresence>
            {myClasses.map((c) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Card hover className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-charcoal dark:text-stone-100 font-medium text-[15px]">{c.name}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{c.subjectCode}</p>
                    </div>
                    <Badge tone="brass">{c.enrolledStudentIds.length}/{c.capacity}</Badge>
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-5">{c.description}</p>
                  <div className="text-xs text-stone-500 space-y-1.5 mb-5">
                    <div className="flex items-center gap-2"><Clock size={13} /> {c.schedule}</div>
                    <div className="flex items-center gap-2"><MapPin size={13} /> {c.room}</div>
                  </div>
                  <button onClick={() => setRoster(c)} className="mt-auto flex items-center gap-1.5 text-xs text-brass-600 dark:text-brass-400 underline underline-offset-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                    <Users size={13} /> View roster
                  </button>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Open a New Class" subtitle="This class becomes visible for eligible students to enrol.">
        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label>Class name</Label>
            <BoxInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Advanced Algorithms" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Subject code</Label>
              <BoxInput required value={form.subjectCode} onChange={(e) => setForm({ ...form, subjectCode: e.target.value })} placeholder="CS 420" />
            </div>
            <div>
              <Label>Capacity</Label>
              <BoxInput required type="number" min={1} value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Schedule</Label>
              <BoxInput required value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} placeholder="Mon · Wed — 11:00 AM" />
            </div>
            <div>
              <Label>Room</Label>
              <BoxInput required value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} placeholder="Hall B-114" />
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What this class covers…" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Open Class</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!roster} onClose={() => setRoster(null)} title={roster?.name ?? ''} subtitle={`${roster?.enrolledStudentIds.length ?? 0} students enrolled`}>
        {roster && roster.enrolledStudentIds.length === 0 && (
          <EmptyState title="No students yet" subtitle="Students will appear here once they enrol in this class." />
        )}
        <div className="space-y-4">
          {roster?.enrolledStudentIds.map((id, i) => {
            const s = students.find((x) => x.id === id)
            if (!s) return null
            return (
              <div key={id}>
                <div className="flex items-center gap-3">
                  <Avatar seed={s.avatarSeed} name={s.name} size={36} />
                  <div>
                    <p className="text-sm text-charcoal dark:text-stone-100">{s.name}</p>
                    <p className="text-xs text-stone-500">{s.rollNo} · {s.program}</p>
                  </div>
                </div>
                {i < (roster?.enrolledStudentIds.length ?? 0) - 1 && <Divider className="mt-4" />}
              </div>
            )
          })}
        </div>
      </Modal>
    </div>
  )
}
