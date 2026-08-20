import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Card, Badge, SectionHeading, Divider } from '../../components/ui/Basics'
import { Modal, EmptyState } from '../../components/ui/Overlays'
import Button from '../../components/ui/Button'
import type { Test, TestQuestion } from '../../types'

export default function StudentTests() {
  const { session, classes, tests, submitTestScore } = useApp()
  const myClasses = classes.filter((c) => c.enrolledStudentIds.includes(session?.id ?? ''))
  const myTests = tests.filter((t) => myClasses.some((c) => c.id === t.classId))
  const pending = myTests.filter((t) => !t.submitted.includes(session?.id ?? ''))
  const done = myTests.filter((t) => t.submitted.includes(session?.id ?? ''))

  const [takingTestId, setTakingTestId] = useState<string | null>(null)
  const takingTest = myTests.find((t) => t.id === takingTestId) ?? null

  return (
    <div>
      <SectionHeading eyebrow={`${pending.length} pending`} title="Tests" subtitle="Sit scheduled examinations and review your results." />

      {myTests.length === 0 ? (
        <Card><EmptyState title="No tests yet" subtitle="Tests scheduled by your teachers will appear here." /></Card>
      ) : (
        <div className="space-y-8">
          {pending.length > 0 && (
            <div>
              <p className="eyebrow mb-4">Pending</p>
              <div className="space-y-3">
                {pending.map((t) => (
                  <Card key={t.id} hover className="p-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] tracking-widest2 uppercase text-brass-600 dark:text-brass-400">{t.className}</p>
                      <p className="font-display text-xl text-charcoal dark:text-stone-50 mt-1">{t.title}</p>
                      <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5"><Clock size={12} /> {t.date} · {t.time} · {t.durationMins} min · {t.totalMarks} marks</p>
                    </div>
                    <Button size="sm" onClick={() => setTakingTestId(t.id)}>Take Test</Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {done.length > 0 && (
            <div>
              <p className="eyebrow mb-4">Completed</p>
              <div className="space-y-3">
                {done.map((t) => (
                  <Card key={t.id} className="p-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] tracking-widest2 uppercase text-stone-500">{t.className}</p>
                      <p className="font-display text-xl text-charcoal dark:text-stone-50 mt-1">{t.title}</p>
                      <p className="text-xs text-stone-500 mt-1">{t.date}</p>
                    </div>
                    <div className="text-right">
                      {t.scores[session?.id ?? ''] !== undefined ? (
                        <>
                          <p className="font-display text-2xl text-charcoal dark:text-stone-50">{t.scores[session!.id]}<span className="text-sm text-stone-400">/{t.totalMarks}</span></p>
                          <Badge tone="success"><CheckCircle2 size={11} /> Graded</Badge>
                        </>
                      ) : (
                        <Badge tone="neutral">Awaiting grading</Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Modal open={!!takingTest} onClose={() => setTakingTestId(null)} title={takingTest?.title ?? ''} subtitle={`${takingTest?.className} · ${takingTest?.totalMarks} marks`} width="max-w-xl">
        {takingTest && (
          <TestRunner
            test={takingTest}
            onSubmit={(score) => { submitTestScore(takingTest.id, session!.id, score); setTakingTestId(null) }}
          />
        )}
      </Modal>
    </div>
  )
}

function TestRunner({ test, onSubmit }: { test: Test; onSubmit: (score: number) => void }) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const allAnswered = test.questions.every((q: TestQuestion) => answers[q.id] !== undefined)

  function handleSubmit() {
    const correct = test.questions.filter((q: TestQuestion) => answers[q.id] === q.correctIndex).length
    const score = Math.round((correct / test.questions.length) * test.totalMarks)
    onSubmit(score)
  }

  return (
    <div className="space-y-7">
      {test.questions.map((q: TestQuestion, i: number) => (
        <div key={q.id}>
          <p className="text-sm text-charcoal dark:text-stone-100 mb-3"><span className="text-stone-400 mr-2">{i + 1}.</span>{q.prompt}</p>
          <div className="grid gap-2">
            {q.options.map((o: string, oi: number) => (
              <label key={oi} className={`flex items-center gap-3 px-4 py-2.5 rounded-sm border cursor-pointer transition-colors ${answers[q.id] === oi ? 'border-brass-500 bg-brass-500/5' : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'}`}>
                <input type="radio" name={q.id} checked={answers[q.id] === oi} onChange={() => setAnswers({ ...answers, [q.id]: oi })} className="accent-brass-500" />
                <span className="text-sm text-charcoal dark:text-stone-200">{o}</span>
              </label>
            ))}
          </div>
          {i < test.questions.length - 1 && <Divider className="mt-6" />}
        </div>
      ))}
      <div className="flex justify-end pt-2">
        <Button onClick={handleSubmit} disabled={!allAnswered}>Submit Test</Button>
      </div>
    </div>
  )
}
