import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Card, Badge, Avatar, SectionHeading } from '../../components/ui/Basics'
import { Modal, EmptyState } from '../../components/ui/Overlays'
import { Label, BoxInput, Select } from '../../components/ui/Field'
import Button from '../../components/ui/Button'
import type { Teacher } from '../../types'

const DEPARTMENTS = ['Computer Science', 'Electronics', 'Mechanical', 'Business', 'Architecture']
const DESIGNATIONS = ['Assistant Professor', 'Associate Professor', 'Professor']

const emptyForm = {
  name: '', email: '', password: 'Teach@123', department: 'Computer Science', designation: 'Assistant Professor',
  subjects: '', office: '', status: 'Active' as Teacher['status'], phone: '',
}

export default function AdminTeachers() {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useApp()
  const [query, setQuery] = useState('')
  const [dept, setDept] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Teacher | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [confirmDelete, setConfirmDelete] = useState<Teacher | null>(null)

  const filtered = useMemo(() => teachers.filter((t) => {
    const q = query.toLowerCase()
    const matchQ = !q || t.name.toLowerCase().includes(q) || t.email.toLowerCase().includes(q) || t.subjects.join(' ').toLowerCase().includes(q)
    const matchDept = dept === 'All' || t.department === dept
    return matchQ && matchDept
  }), [teachers, query, dept])

  function openAdd() {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }
  function openEdit(t: Teacher) {
    setEditing(t)
    setForm({ ...t, subjects: t.subjects.join(', ') })
    setModalOpen(true)
  }
  function submit(e: React.FormEvent) {
    e.preventDefault()
    const payload = { ...form, subjects: form.subjects.split(',').map((s) => s.trim()).filter(Boolean) }
    if (editing) updateTeacher(editing.id, payload)
    else addTeacher(payload)
    setModalOpen(false)
  }

  return (
    <div>
      <SectionHeading
        eyebrow={`${teachers.length} faculty members`}
        title="Faculty"
        action={<Button onClick={openAdd}><Plus size={15} /> Add Faculty</Button>}
      />

      <div className="flex flex-wrap gap-3 mb-7">
        <div className="flex items-center gap-2 text-stone-400 border border-stone-300 dark:border-stone-700 rounded-sm px-3.5 py-2 flex-1 min-w-[220px] focus-within:border-brass-500">
          <Search size={15} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search faculty…" className="bg-transparent outline-none text-sm w-full placeholder:text-stone-400 text-charcoal dark:text-stone-100" />
        </div>
        <select value={dept} onChange={(e) => setDept(e.target.value)} className="border border-stone-300 dark:border-stone-700 rounded-sm px-3 text-sm bg-transparent text-charcoal dark:text-stone-100">
          <option>All</option>
          {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <Card><EmptyState title="No faculty found" subtitle="Try adjusting your search or filters." /></Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((t) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Card hover className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <Avatar seed={t.avatarSeed} name={t.name} size={44} />
                    <Badge tone={t.status === 'Active' ? 'success' : 'neutral'}>{t.status}</Badge>
                  </div>
                  <p className="text-charcoal dark:text-stone-100 font-medium">{t.name}</p>
                  <p className="text-xs text-stone-500 mb-4">{t.designation} · {t.department}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {t.subjects.map((s) => <Badge key={s} tone="brass">{s}</Badge>)}
                  </div>
                  <div className="text-xs text-stone-500 space-y-1 mb-5 mt-auto">
                    <p>Office {t.office}</p>
                    <p>{t.email}</p>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
                    <button onClick={() => openEdit(t)} className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-charcoal dark:hover:text-stone-100"><Pencil size={13} /> Edit</button>
                    <button onClick={() => setConfirmDelete(t)} className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-claret-600"><Trash2 size={13} /> Remove</button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Faculty Record' : 'Add Faculty'} subtitle={editing ? editing.email : 'Create a new faculty record'} width="max-w-2xl">
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Label>Full name</Label>
            <BoxInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label>Email</Label>
            <BoxInput required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <Label>Phone</Label>
            <BoxInput value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <Label>Department</Label>
            <Select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
              {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
            </Select>
          </div>
          <div>
            <Label>Designation</Label>
            <Select value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })}>
              {DESIGNATIONS.map((d) => <option key={d}>{d}</option>)}
            </Select>
          </div>
          <div>
            <Label>Office</Label>
            <BoxInput value={form.office} onChange={(e) => setForm({ ...form, office: e.target.value })} />
          </div>
          <div>
            <Label>Status</Label>
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Teacher['status'] })}>
              <option>Active</option><option>Inactive</option>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label>Subjects taught (comma separated)</Label>
            <BoxInput required value={form.subjects} onChange={(e) => setForm({ ...form, subjects: e.target.value })} placeholder="Database Systems, Operating Systems" />
          </div>
          <div className="sm:col-span-2 flex justify-end gap-3 pt-3">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Create Record'}</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Remove faculty record" subtitle="This action cannot be undone.">
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
          Are you sure you want to permanently remove <strong className="text-charcoal dark:text-stone-100">{confirmDelete?.name}</strong> from the institutional record?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={() => { if (confirmDelete) deleteTeacher(confirmDelete.id); setConfirmDelete(null) }}>Remove Record</Button>
        </div>
      </Modal>
    </div>
  )
}
