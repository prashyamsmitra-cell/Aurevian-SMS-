export type Role = 'admin' | 'teacher' | 'student'

export interface Student {
  id: string
  rollNo: string
  name: string
  email: string
  password: string
  program: string
  department: string
  year: number
  semester: string
  status: 'Active' | 'Inactive' | 'On Leave'
  gpa: number
  credits: number
  phone: string
  address: string
  guardian: string
  avatarSeed: string
  joinedOn: string
}

export interface Teacher {
  id: string
  name: string
  email: string
  password: string
  department: string
  designation: string
  subjects: string[]
  office: string
  status: 'Active' | 'Inactive'
  phone: string
  joinedOn: string
  avatarSeed: string
}

export interface ClassSession {
  id: string
  name: string
  subjectCode: string
  teacherId: string
  teacherName: string
  department: string
  schedule: string
  room: string
  capacity: number
  enrolledStudentIds: string[]
  description: string
  createdOn: string
}

export interface TestQuestion {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
}

export interface Test {
  id: string
  classId: string
  className: string
  title: string
  date: string
  time: string
  totalMarks: number
  durationMins: number
  questions: TestQuestion[]
  scores: Record<string, number>
  submitted: string[]
}

export interface AttendanceDay {
  date: string
  status: 'Present' | 'Absent'
}

export interface AttendanceRecord {
  classId: string
  className: string
  studentId: string
  days: AttendanceDay[]
}

export interface Note {
  id: string
  classId: string
  className: string
  title: string
  fileName: string
  uploadedByName: string
  uploadedByRole: Role
  date: string
}

export interface FeeTransaction {
  id: string
  date: string
  amount: number
  method: string
  reference: string
}

export interface FeeRecord {
  studentId: string
  semester: string
  total: number
  paid: number
  dueDate: string
  transactions: FeeTransaction[]
}

export interface Session {
  role: Role
  id: string
  name: string
}
