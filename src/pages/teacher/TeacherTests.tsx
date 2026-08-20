import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Card, Badge, Avatar, SectionHeading, Divider } from '../../components/ui/Basics'
import { Modal, EmptyState } from '../../components/ui/Overlays'
import { Label, BoxInput, Select } from '../../components/ui/Field'
import Button from '../../components/ui/Button'
import type { Test, TestQuestion } from '../../types'

const emptyQ = (): TestQuestion => ({ id: Math.random().toString(36).slice(2), prompt: '', options: ['', '', '', ''], correctIndex: 0 })

export default function TeacherTests() {
  const { session, classes, tests, students, scheduleTest, submitTestScore } = useApp()
  const myClasses = classes.filter((c) => c.teacherId === session?.id)
  const myTests = tests.filter((t) => myClasses.some((c) => c.id === t.classId))

  const [modalOpen, setModalOpen] = useState(false)
  const [gradeTest, setGradeTest] = useState<Test | null>(null)
  const [classId, setClassId] = useState(myClasses[0]?.id ?? '')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('2026-09-01')
  const [time, setTime] = useState('10:00 AM')
  const [totalMarks, setTotalMarks] = useState(100)
  const [durationMins, setDurationMins] = useState(60)
  const [questions, setQuestions] = useState<TestQuestion[]>([emptyQ()])

  function resetForm() {
    setClassId(myClasses[0]?.id ?? '')
    setTitle(''); setDate('2026-09-01'); setTime('10:00 AM'); setTotalMarks(100); setDurationMins(60)
    setQuestions([emptyQ()])
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const cls = myClasses.find((c) => c.id === classId)
    if (!cls) return
    scheduleTest({ classId, className: cls.name, title, date, time, totalMarks, durationMins, questions })
    setModalOpen(false)
    resetForm()
  }

  function updateQ(i: number, patch: Partial<TestQuestion>) {
    setQuestions((qs) => qs.map((q, idx) => (idx === i ? { ...q, ...patch } : q)))
  }
  function updateOpt(i: number, oi: number, val: string) {
    setQuestions((qs) => qs.map((q, idx) => (idx === i ? { ...q, options: q.options.map((o, oidx) => (oidx === oi ? val : o)) } : q)))
  }

  return (
    <div>
      <SectionHeading
        eyebrow={`${myTests.length} tests scheduled`}
        title="Tests & Scores"
        subtitle="Schedule examinations for your classes and record results as they come in."
        action={<Button onClick={() => { resetForm(); setModalOpen(true) }} disabled={myClasses.length === 0}><Plus size={15} /> Schedule Test</Button>}
      />

      {myTests.length === 0 ? (
        <Card><EmptyState title="No tests scheduled" subtitle="Schedule your first test to open it to enrolled students." /></Card>
      ) : (
        <div className="space-y-4">
          {myTests.map((t) => {
            const cls = classes.find((c) => c.id === t.classId)
            return (
              <Card key={t.id} className="p-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] tracking-widest2 uppercase text-brass-600 dark:text-brass-400">{t.className}</p>
                  <p className="font-display text-xl text-charcoal dark:text-stone-50 mt-1">{t.title}</p>
                  <p className="text-xs text-stone-500 mt-1">{t.date} · {t.time} · {t.totalMarks} marks · {t.durationMins} min</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge tone={t.submitted.length ? 'success' : 'neutral'}>{t.submitted.length}/{cls?.enrolledStudentIds.length ?? 0} submitted</Badge>
                  <Button variant="secondary" size="sm" onClick={() => setGradeTest(t)}>Manage Scores</Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Schedule a Test" subtitle="Published tests appear immediately to enrolled students." width="max-w-2xl">
        <form onSubmit={submit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Class</Label>
              <Select required value={classId} onChange={(e) => setClassId(e.target.value)}>
                {myClasses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </div>
            <div>
              <Label>Test title</Label>
              <BoxInput required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Unit Test II" />
            </div>
          </div>
          <div className="grid sm:grid-cols-4 gap-4">
            <div>
              <Label>Date</Label>
              <BoxInput required type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <Label>Time</Label>
              <BoxInput required value={time} onChange={(e) => setTime(e.target.value)} placeholder="10:00 AM" />
            </div>
            <div>
              <Label>Total marks</Label>
              <BoxInput required type="number" min={1} value={totalMarks} onChange={(e) => setTotalMarks(Number(e.target.value))} />
            </div>
            <div>
              <Label>Duration (min)</Label>
              <BoxInput required type="number" min={5} value={durationMins} onChange={(e) => setDurationMins(Number(e.target.value))} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Questions</Label>
              <button type="button" onClick={() => setQuestions((q) => [...q, emptyQ()])} className="text-xs text-brass-600 dark:text-brass-400 underline underline-offset-4">+ Add question</button>
            </div>
            <div className="space-y-5">
              {questions.map((q, i) => (
                <div key={q.id} className="border border-stone-200 dark:border-stone-800 rounded-sm p-4">
                  <div className="flex items-start gap-2 mb-3">
                    <BoxInput required placeholder={`Question ${i + 1}`} value={q.prompt} onChange={(e) => updateQ(i, { prompt: e.target.value })} />
                    {questions.length > 1 && (
                      <button type="button" onClick={() => setQuestions((qs) => qs.filter((_, idx) => idx !== i))} className="text-stone-400 hover:text-claret-600 mt-2.5" aria-label="Remove question">
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {q.options.map((o, oi) => (
                      <label key={oi} className="flex items-center gap-2">
                        <input type="radio" name={`correct-${q.id}`} checked={q.correctIndex === oi} onChange={() => updateQ(i, { correctIndex: oi })} className="accent-brass-500" />
                        <BoxInput required placeholder={`Option ${oi + 1}`} value={o} onChange={(e) => updateOpt(i, oi, e.target.value)} className="py-1.5" />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Publish Test</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!gradeTest} onClose={() => setGradeTest(null)} title={gradeTest?.title ?? ''} subtitle={`${gradeTest?.className} · out of ${gradeTest?.totalMarks} marks`}>
        {gradeTest && (
          <ScoreSheet
            test={gradeTest}
            studentIds={classes.find((c) => c.id === gradeTest.classId)?.enrolledStudentIds ?? []}
            onSave={(id, score) => submitTestScore(gradeTest.id, id, score)}
          />
        )}
      </Modal>
    </div>
  )
}

function ScoreSheet({ test, studentIds, onSave }: { test: Test; studentIds: string[]; onSave: (id: string, score: number) => void }) {
  const { students } = useApp()
  const [draft, setDraft] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    studentIds.forEach((id) => { init[id] = test.scores[id]?.toString() ?? '' })
    return init
  })

  if (studentIds.length === 0) return <EmptyState title="No students enrolled" subtitle="Scores can be recorded once students have joined this class." />

  return (
    <div className="space-y-4">
      {studentIds.map((id, i) => {
        const s = students.find((x) => x.id === id)
        if (!s) return null
        return (
          <div key={id}>
            <div className="flex items-center gap-3">
              <Avatar seed={s.avatarSeed} name={s.name} size={34} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-charcoal dark:text-stone-100 truncate">{s.name}</p>
                <p className="text-xs text-stone-500">{s.rollNo}</p>
              </div>
              <BoxInput
                type="number" min={0} max={test.totalMarks} placeholder="—"
                className="w-24 text-center"
                value={draft[id]}
                onChange={(e) => setDraft({ ...draft, [id]: e.target.value })}
                onBlur={() => { if (draft[id] !== '') onSave(id, Math.min(test.totalMarks, Math.max(0, Number(draft[id])))) }}
              />
            </div>
            {i < studentIds.length - 1 && <Divider className="mt-4" />}
          </div>
        )
      })}
      <p className="text-xs text-stone-500 pt-2">Scores save automatically when you leave a field.</p>
    </div>
  )
}
