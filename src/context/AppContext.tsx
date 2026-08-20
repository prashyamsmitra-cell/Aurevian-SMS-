import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type {
  Student, Teacher, ClassSession, Test, AttendanceRecord, Note, FeeRecord, Session, Role, TestQuestion,
} from '../types'
import {
  initialStudents, initialTeachers, initialClasses, initialTests,
  initialAttendance, initialNotes, initialFees, ADMIN_ACCOUNT,
} from '../data/mockData'

interface Toast { id: number; message: string; tone: 'success' | 'error' | 'info' }

interface AppState {
  session: Session | null
  theme: 'light' | 'dark'
  toggleTheme: () => void
  login: (role: Role, email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void

  students: Student[]
  teachers: Teacher[]
  classes: ClassSession[]
  tests: Test[]
  attendance: AttendanceRecord[]
  notes: Note[]
  fees: FeeRecord[]

  addStudent: (s: Omit<Student, 'id' | 'avatarSeed' | 'joinedOn'>) => void
  updateStudent: (id: string, patch: Partial<Student>) => void
  deleteStudent: (id: string) => void

  addTeacher: (t: Omit<Teacher, 'id' | 'avatarSeed' | 'joinedOn'>) => void
  updateTeacher: (id: string, patch: Partial<Teacher>) => void
  deleteTeacher: (id: string) => void

  addClass: (c: Omit<ClassSession, 'id' | 'enrolledStudentIds' | 'createdOn'>) => void
  enrollInClass: (classId: string, studentId: string) => void
  unenrollFromClass: (classId: string, studentId: string) => void

  scheduleTest: (t: Omit<Test, 'id' | 'scores' | 'submitted'>) => void
  submitTestScore: (testId: string, studentId: string, score: number) => void

  markAttendance: (classId: string, className: string, date: string, statuses: Record<string, 'Present' | 'Absent'>) => void

  addNote: (n: Omit<Note, 'id' | 'date'>) => void

  payFee: (studentId: string, amount: number, method: string) => void

  toasts: Toast[]
  pushToast: (message: string, tone?: Toast['tone']) => void
}

const AppContext = createContext<AppState | null>(null)

let idCounter = 1000
function nextId(prefix: string) {
  idCounter += 1
  return `${prefix}-${idCounter}`
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers)
  const [classes, setClasses] = useState<ClassSession[]>(initialClasses)
  const [tests, setTests] = useState<Test[]>(initialTests)
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendance)
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [fees, setFees] = useState<FeeRecord[]>(initialFees)
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const pushToast = (message: string, tone: Toast['tone'] = 'success') => {
    const id = Date.now()
    setToasts((t) => [...t, { id, message, tone }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  const login: AppState['login'] = (role, email, password) => {
    const e = email.trim().toLowerCase()
    if (role === 'admin') {
      if (e === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password) {
        setSession({ role: 'admin', id: 'ADMIN', name: ADMIN_ACCOUNT.name })
        return { ok: true }
      }
      return { ok: false, error: 'Those admin credentials were not recognised.' }
    }
    if (role === 'teacher') {
      const t = teachers.find((x) => x.email.toLowerCase() === e)
      if (t && t.password === password) {
        setSession({ role: 'teacher', id: t.id, name: t.name })
        return { ok: true }
      }
      return { ok: false, error: 'Those faculty credentials were not recognised.' }
    }
    const s = students.find((x) => x.email.toLowerCase() === e)
    if (s && s.password === password) {
      setSession({ role: 'student', id: s.id, name: s.name })
      return { ok: true }
    }
    return { ok: false, error: 'Those student credentials were not recognised.' }
  }

  const logout = () => setSession(null)

  const addStudent: AppState['addStudent'] = (s) => {
    setStudents((prev) => [...prev, { ...s, id: nextId('STU'), avatarSeed: s.name.split(' ')[0].toLowerCase(), joinedOn: new Date().toISOString().slice(0, 10) }])
    pushToast('Student record created.')
  }
  const updateStudent: AppState['updateStudent'] = (id, patch) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))
    pushToast('Student record updated.')
  }
  const deleteStudent: AppState['deleteStudent'] = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
    pushToast('Student record removed.', 'info')
  }

  const addTeacher: AppState['addTeacher'] = (t) => {
    setTeachers((prev) => [...prev, { ...t, id: nextId('TCH'), avatarSeed: t.name.split(' ')[0].toLowerCase(), joinedOn: new Date().toISOString().slice(0, 10) }])
    pushToast('Faculty record created.')
  }
  const updateTeacher: AppState['updateTeacher'] = (id, patch) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))
    pushToast('Faculty record updated.')
  }
  const deleteTeacher: AppState['deleteTeacher'] = (id) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id))
    pushToast('Faculty record removed.', 'info')
  }

  const addClass: AppState['addClass'] = (c) => {
    setClasses((prev) => [...prev, { ...c, id: nextId('CLS'), enrolledStudentIds: [], createdOn: new Date().toISOString().slice(0, 10) }])
    pushToast('Class opened for enrolment.')
  }

  const enrollInClass: AppState['enrollInClass'] = (classId, studentId) => {
    setClasses((prev) => prev.map((c) => (c.id === classId && !c.enrolledStudentIds.includes(studentId)
      ? { ...c, enrolledStudentIds: [...c.enrolledStudentIds, studentId] } : c)))
    pushToast('You are enrolled in the class.')
  }
  const unenrollFromClass: AppState['unenrollFromClass'] = (classId, studentId) => {
    setClasses((prev) => prev.map((c) => (c.id === classId
      ? { ...c, enrolledStudentIds: c.enrolledStudentIds.filter((id) => id !== studentId) } : c)))
    pushToast('You have left the class.', 'info')
  }

  const scheduleTest: AppState['scheduleTest'] = (t) => {
    setTests((prev) => [...prev, { ...t, id: nextId('TST'), scores: {}, submitted: [] }])
    pushToast('Test scheduled and published to students.')
  }
  const submitTestScore: AppState['submitTestScore'] = (testId, studentId, score) => {
    setTests((prev) => prev.map((t) => (t.id === testId
      ? { ...t, scores: { ...t.scores, [studentId]: score }, submitted: t.submitted.includes(studentId) ? t.submitted : [...t.submitted, studentId] }
      : t)))
  }

  const markAttendance: AppState['markAttendance'] = (classId, className, date, statuses) => {
    setAttendance((prev) => {
      const next = [...prev]
      Object.entries(statuses).forEach(([studentId, status]) => {
        const idx = next.findIndex((r) => r.classId === classId && r.studentId === studentId)
        if (idx >= 0) {
          const existingDayIdx = next[idx].days.findIndex((d) => d.date === date)
          const days = [...next[idx].days]
          if (existingDayIdx >= 0) days[existingDayIdx] = { date, status }
          else days.push({ date, status })
          next[idx] = { ...next[idx], days }
        } else {
          next.push({ classId, className, studentId, days: [{ date, status }] })
        }
      })
      return next
    })
    pushToast('Attendance saved for ' + date + '.')
  }

  const addNote: AppState['addNote'] = (n) => {
    setNotes((prev) => [{ ...n, id: nextId('NOTE'), date: new Date().toISOString().slice(0, 10) }, ...prev])
    pushToast('Note uploaded.')
  }

  const payFee: AppState['payFee'] = (studentId, amount, method) => {
    setFees((prev) => prev.map((f) => (f.studentId === studentId
      ? { ...f, paid: Math.min(f.total, f.paid + amount), transactions: [{ id: nextId('TXN'), date: new Date().toISOString().slice(0, 10), amount, method, reference: 'AUR-PAY-' + Math.floor(10000 + Math.random() * 89999) }, ...f.transactions] }
      : f)))
    pushToast('Payment received. Receipt generated.')
  }

  const value = useMemo<AppState>(() => ({
    session, theme, toggleTheme, login, logout,
    students, teachers, classes, tests, attendance, notes, fees,
    addStudent, updateStudent, deleteStudent,
    addTeacher, updateTeacher, deleteTeacher,
    addClass, enrollInClass, unenrollFromClass,
    scheduleTest, submitTestScore,
    markAttendance, addNote, payFee,
    toasts, pushToast,
  }), [session, theme, students, teachers, classes, tests, attendance, notes, fees, toasts])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

export type { TestQuestion }
