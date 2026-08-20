import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Shell from './components/layout/Shell'
import { ToastStack } from './components/ui/Overlays'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminStudents from './pages/admin/AdminStudents'
import AdminTeachers from './pages/admin/AdminTeachers'

import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherClasses from './pages/teacher/TeacherClasses'
import TeacherTests from './pages/teacher/TeacherTests'
import TeacherAttendance from './pages/teacher/TeacherAttendance'
import TeacherNotes from './pages/teacher/TeacherNotes'

import StudentDashboard from './pages/student/StudentDashboard'
import StudentClasses from './pages/student/StudentClasses'
import StudentTests from './pages/student/StudentTests'
import StudentAttendance from './pages/student/StudentAttendance'
import StudentNotes from './pages/student/StudentNotes'
import StudentFees from './pages/student/StudentFees'

function Protected({ role, children }: { role: 'admin' | 'teacher' | 'student'; children: React.ReactNode }) {
  const { session } = useApp()
  if (!session) return <Navigate to="/login" replace />
  if (session.role !== role) return <Navigate to={`/${session.role}`} replace />
  return <>{children}</>
}

export default function App() {
  const { session } = useApp()

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={session ? `/${session.role}` : '/login'} replace />} />
        <Route path="/login" element={session ? <Navigate to={`/${session.role}`} replace /> : <Login />} />

        <Route path="/admin" element={<Protected role="admin"><Shell role="admin" /></Protected>}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="teachers" element={<AdminTeachers />} />
        </Route>

        <Route path="/teacher" element={<Protected role="teacher"><Shell role="teacher" /></Protected>}>
          <Route index element={<TeacherDashboard />} />
          <Route path="classes" element={<TeacherClasses />} />
          <Route path="tests" element={<TeacherTests />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="notes" element={<TeacherNotes />} />
        </Route>

        <Route path="/student" element={<Protected role="student"><Shell role="student" /></Protected>}>
          <Route index element={<StudentDashboard />} />
          <Route path="classes" element={<StudentClasses />} />
          <Route path="tests" element={<StudentTests />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="notes" element={<StudentNotes />} />
          <Route path="fees" element={<StudentFees />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastStack />
    </>
  )
}
