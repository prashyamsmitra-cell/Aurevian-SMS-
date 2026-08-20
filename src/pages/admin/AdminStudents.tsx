import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Card, Badge, Avatar, SectionHeading } from '../../components/ui/Basics'
import { Modal, EmptyState } from '../../components/ui/Overlays'
import { Label, BoxInput, Select } from '../../components/ui/Field'
import Button from '../../components/ui/Button'
import type { Student } from '../../types'

const DEPARTMENTS = ['Computer Science', 'Electronics', 'Mechanical', 'Business', 'Architecture']

const emptyForm = {
  name: '', rollNo: '', email: '', password: 'Student@123', program: '', department: 'Computer Science',
  year: 1, semester: 'Semester I', status: 'Active' as Student['status'], gpa: 8, credits: 0,
  phone: '', address: '', guardian: '',
}

export default function AdminStudents() {
  const { students, addStudent, updateStudent, deleteStudent } = useApp()
  const [query, setQuery] = useState('')
  const [dept, setDept] = useState('All')
  const [status, setStatus] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Student | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [confirmDelete, setConfirmDelete] = useState<Student | null>(null)

  const filtered = useMemo(() => students.filter((s) => {
    const q = query.toLowerCase()
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
    const matchDept = dept === 'All' || s.department === dept
    const matchStatus = status === 'All' || s.status === status
    return matchQ && matchDept && matchStatus
  }), [students, query, dept, status])

  function openAdd() {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }
  function openEdit(s: Student) {
    setEditing(s)
    setForm({ ...s })
    setModalOpen(true)
  }
  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (editing) updateStudent(editing.id, form)
    else addStudent(form)
    setModalOpen(false)
  }

  return (
    <div>
      <SectionHeading
        eyebrow={`${students.length} enrolled students`}
        title="Students"
        action={<Button onClick={openAdd}><Plus size={15} /> Add Student</Button>}
      />

      <div className="flex flex-wrap gap-3 mb-7">
        <div className="flex items-center gap-2 text-stone-400 border border-stone-300 dark:border-stone-700 rounded-sm px-3.5 py-2 flex-1 min-w-[220px] focus-within:border-brass-500">
          <Search size={15} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students…" className="bg-transparent outline-none text-sm w-full placeholder:text-stone-400 text-charcoal dark:text-stone-100" />
        </div>
        <select value={dept} onChange={(e) => setDept(e.target.value)} className="border border-stone-300 dark:border-stone-700 rounded-sm px-3 text-sm bg-transparent text-charcoal dark:text-stone-100">
          <option>All</option>
          {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-stone-300 dark:border-stone-700 rounded-sm px-3 text-sm bg-transparent text-charcoal dark:text-stone-100">
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>On Leave</option>
        </select>
      </div>

      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState title="No students found" subtitle="Try adjusting your search or filters." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-left">
                  <th className="eyebrow font-medium px-6 py-4">Student</th>
                  <th className="eyebrow font-medium px-4 py-4">Program</th>
                  <th className="eyebrow font-medium px-4 py-4">Year</th>
                  <th className="eyebrow font-medium px-4 py-4">GPA</th>
                  <th className="eyebrow font-medium px-4 py-4">Status</th>
                  <th className="eyebrow font-medium px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((s) => (
                    <motion.tr
                      key={s.id}
                      layout
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="border-b border-stone-100 dark:border-stone-800/60 hover:bg-stone-100/60 dark:hover:bg-stone-800/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar seed={s.avatarSeed} name={s.name} size={36} />
                          <div>
                            <p className="text-charcoal dark:text-stone-100 font-medium">{s.name}</p>
                            <p className="text-xs text-stone-500">{s.rollNo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-stone-600 dark:text-stone-400">{s.program}</td>
                      <td className="px-4 py-4 text-stone-600 dark:text-stone-400">Year {s.year}</td>
                      <td className="px-4 py-4 text-stone-600 dark:text-stone-400">{s.gpa.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <Badge tone={s.status === 'Active' ? 'success' : s.status === 'On Leave' ? 'warning' : 'neutral'}>{s.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3">
                          <button onClick={() => openEdit(s)} className="text-stone-400 hover:text-charcoal dark:hover:text-stone-100" aria-label={`Edit ${s.name}`}><Pencil size={15} /></button>
                          <button onClick={() => setConfirmDelete(s)} className="text-stone-400 hover:text-claret-600" aria-label={`Remove ${s.name}`}><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Student Record' : 'Add Student'} subtitle={editing ? editing.rollNo : 'Create a new institutional record'} width="max-w-2xl">
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Label>Full name</Label>
            <BoxInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label>Roll number</Label>
            <BoxInput required value={form.rollNo} onChange={(e) => setForm({ ...form, rollNo: e.target.value })} />
          </div>
          <div>
            <Label>Email</Label>
            <BoxInput required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Label>Program</Label>
            <BoxInput required value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} />
          </div>
          <div>
            <Label>Department</Label>
            <Select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
              {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
            </Select>
          </div>
          <div>
            <Label>Year</Label>
            <Select value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}>
              {[1, 2, 3, 4].map((y) => <option key={y} value={y}>Year {y}</option>)}
            </Select>
          </div>
          <div>
            <Label>Semester</Label>
            <BoxInput required value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} />
          </div>
          <div>
            <Label>Status</Label>
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Student['status'] })}>
              <option>Active</option><option>Inactive</option><option>On Leave</option>
            </Select>
          </div>
          <div>
            <Label>GPA</Label>
            <BoxInput required type="number" step="0.01" min={0} max={10} value={form.gpa} onChange={(e) => setForm({ ...form, gpa: Number(e.target.value) })} />
          </div>
          <div>
            <Label>Credits earned</Label>
            <BoxInput required type="number" min={0} value={form.credits} onChange={(e) => setForm({ ...form, credits: Number(e.target.value) })} />
          </div>
          <div>
            <Label>Phone</Label>
            <BoxInput value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Label>Guardian</Label>
            <BoxInput value={form.guardian} onChange={(e) => setForm({ ...form, guardian: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Label>Address</Label>
            <BoxInput value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="sm:col-span-2 flex justify-end gap-3 pt-3">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Create Record'}</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Remove student record" subtitle="This action cannot be undone.">
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
          Are you sure you want to permanently remove <strong className="text-charcoal dark:text-stone-100">{confirmDelete?.name}</strong> ({confirmDelete?.rollNo}) from the institutional record?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={() => { if (confirmDelete) deleteStudent(confirmDelete.id); setConfirmDelete(null) }}>Remove Record</Button>
        </div>
      </Modal>
    </div>
  )
}
