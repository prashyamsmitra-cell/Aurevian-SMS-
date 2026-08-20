import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Card, Badge, SectionHeading } from '../../components/ui/Basics'
import { Modal, EmptyState } from '../../components/ui/Overlays'
import { Label, BoxInput, Select } from '../../components/ui/Field'
import Button from '../../components/ui/Button'
import { fmtDate } from '../../lib/utils'

export default function StudentNotes() {
  const { session, classes, notes, addNote } = useApp()
  const myClasses = classes.filter((c) => c.enrolledStudentIds.includes(session?.id ?? ''))
  const myNotes = notes.filter((n) => myClasses.some((c) => c.id === n.classId))

  const [modalOpen, setModalOpen] = useState(false)
  const [classId, setClassId] = useState(myClasses[0]?.id ?? '')
  const [title, setTitle] = useState('')
  const [fileName, setFileName] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const cls = myClasses.find((c) => c.id === classId)
    if (!cls || !session) return
    addNote({ classId, className: cls.name, title, fileName: fileName || `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`, uploadedByName: session.name, uploadedByRole: 'student' })
    setModalOpen(false)
    setTitle(''); setFileName('')
  }

  return (
    <div>
      <SectionHeading
        eyebrow={`${myNotes.length} notes available`}
        title="Notes"
        subtitle="Course material from your teachers, and your own notes shared with classmates."
        action={<Button onClick={() => setModalOpen(true)} disabled={myClasses.length === 0}><Upload size={15} /> Upload Note</Button>}
      />

      {myClasses.length === 0 ? (
        <Card><EmptyState title="No classes yet" subtitle="Enrol in a class to access and share notes." /></Card>
      ) : myNotes.length === 0 ? (
        <Card><EmptyState title="No notes yet" subtitle="Notes shared for your classes will appear here." /></Card>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {myNotes.map((n) => (
              <motion.div key={n.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Card hover className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-brass-500/10 flex items-center justify-center text-brass-600 dark:text-brass-400 shrink-0">
                    <FileText size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-charcoal dark:text-stone-100 truncate">{n.title}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{n.className} · {n.fileName}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge tone={n.uploadedByRole === 'teacher' ? 'brass' : 'neutral'}>{n.uploadedByName}</Badge>
                    <p className="text-xs text-stone-500 mt-1.5">{fmtDate(n.date)}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Upload Notes" subtitle="Shared with everyone enrolled in the class.">
        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label>Class</Label>
            <Select required value={classId} onChange={(e) => setClassId(e.target.value)}>
              {myClasses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </div>
          <div>
            <Label>Title</Label>
            <BoxInput required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My revision notes — Unit 3" />
          </div>
          <div>
            <Label>File</Label>
            <input
              type="file"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
              className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:bg-charcoal file:text-ivory dark:file:bg-brass-400 dark:file:text-ink file:text-xs file:font-medium"
            />
            <p className="text-xs text-stone-500 mt-2">Files stay local to this demo session and are not uploaded anywhere.</p>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Share Notes</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
