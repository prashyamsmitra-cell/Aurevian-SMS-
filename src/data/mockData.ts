import type {
  Student, Teacher, ClassSession, Test, AttendanceRecord, Note, FeeRecord,
} from '../types'

export const DEMO_PASSWORD_STUDENT = 'Student@123'
export const DEMO_PASSWORD_TEACHER = 'Teach@123'
export const ADMIN_ACCOUNT = { email: 'admin@aurevian.edu', password: 'Admin@123', name: 'Alexander Whitfield' }

export const initialStudents: Student[] = [
  { id: 'STU-01', rollNo: 'AUR-2048', name: 'Arjun Mehta', email: 'arjun.mehta@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Computer Science & Engineering', department: 'Computer Science', year: 3, semester: 'Semester VI', status: 'Active', gpa: 8.74, credits: 118, phone: '+91 98200 11234', address: '14 Carmichael Road, Mumbai', guardian: 'Rakesh Mehta', avatarSeed: 'arjun', joinedOn: '2023-07-12' },
  { id: 'STU-02', rollNo: 'AUR-2011', name: 'Ananya Mukherjee', email: 'ananya.mukherjee@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Electronics & Communication', department: 'Electronics', year: 2, semester: 'Semester IV', status: 'Active', gpa: 9.02, credits: 76, phone: '+91 98310 22456', address: '22 Salt Lake, Kolkata', guardian: 'Debashish Mukherjee', avatarSeed: 'ananya', joinedOn: '2024-07-08' },
  { id: 'STU-03', rollNo: 'AUR-1987', name: 'Rohan Banerjee', email: 'rohan.banerjee@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Mechanical Engineering', department: 'Mechanical', year: 4, semester: 'Semester VIII', status: 'Active', gpa: 7.91, credits: 152, phone: '+91 90040 33678', address: '9 Park Street, Kolkata', guardian: 'Sourav Banerjee', avatarSeed: 'rohan', joinedOn: '2022-07-15' },
  { id: 'STU-04', rollNo: 'AUR-2102', name: 'Ishita Sen', email: 'ishita.sen@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Computer Science & Engineering', department: 'Computer Science', year: 1, semester: 'Semester II', status: 'Active', gpa: 8.35, credits: 32, phone: '+91 99870 44890', address: '5 Elgin Road, Kolkata', guardian: 'Subrata Sen', avatarSeed: 'ishita', joinedOn: '2025-07-10' },
  { id: 'STU-05', rollNo: 'AUR-2056', name: 'Aditya Kapoor', email: 'aditya.kapoor@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Business Administration', department: 'Business', year: 3, semester: 'Semester VI', status: 'Active', gpa: 7.64, credits: 114, phone: '+91 98111 55201', address: '3 Golf Links, New Delhi', guardian: 'Anil Kapoor', avatarSeed: 'aditya', joinedOn: '2023-07-11' },
  { id: 'STU-06', rollNo: 'AUR-2077', name: 'Meera Nair', email: 'meera.nair@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Computer Science & Engineering', department: 'Computer Science', year: 2, semester: 'Semester IV', status: 'Active', gpa: 9.21, credits: 78, phone: '+91 97400 66123', address: '18 MG Road, Bengaluru', guardian: 'Prakash Nair', avatarSeed: 'meera', joinedOn: '2024-07-09' },
  { id: 'STU-07', rollNo: 'AUR-1999', name: 'Kabir Malhotra', email: 'kabir.malhotra@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Architecture', department: 'Architecture', year: 4, semester: 'Semester VIII', status: 'On Leave', gpa: 8.02, credits: 148, phone: '+91 98450 77345', address: '27 Civil Lines, Delhi', guardian: 'Vivek Malhotra', avatarSeed: 'kabir', joinedOn: '2022-07-14' },
  { id: 'STU-08', rollNo: 'AUR-2033', name: 'Sanya Iyer', email: 'sanya.iyer@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Computer Science & Engineering', department: 'Computer Science', year: 3, semester: 'Semester VI', status: 'Active', gpa: 8.88, credits: 120, phone: '+91 96540 88456', address: '11 Anna Nagar, Chennai', guardian: 'Ramesh Iyer', avatarSeed: 'sanya', joinedOn: '2023-07-13' },
  { id: 'STU-09', rollNo: 'AUR-2134', name: 'Priya Sharma', email: 'priya.sharma@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Computer Science & Engineering', department: 'Computer Science', year: 2, semester: 'Semester IV', status: 'Active', gpa: 8.56, credits: 74, phone: '+91 99120 12340', address: '42 Bandra West, Mumbai', guardian: 'Rajesh Sharma', avatarSeed: 'priya', joinedOn: '2024-07-15' },
  { id: 'STU-10', rollNo: 'AUR-2089', name: 'Nikhil Gupta', email: 'nikhil.gupta@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Electronics & Communication', department: 'Electronics', year: 3, semester: 'Semester VI', status: 'Active', gpa: 7.92, credits: 110, phone: '+91 98765 54321', address: '8 Sector 7, Noida', guardian: 'Rajendra Gupta', avatarSeed: 'nikhil', joinedOn: '2023-07-14' },
  { id: 'STU-11', rollNo: 'AUR-2145', name: 'Divya Patel', email: 'divya.patel@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Business Administration', department: 'Business', year: 2, semester: 'Semester IV', status: 'Active', gpa: 8.67, credits: 72, phone: '+91 97880 11223', address: '56 Ahmedabad Old City', guardian: 'Vikram Patel', avatarSeed: 'divya', joinedOn: '2024-07-16' },
  { id: 'STU-12', rollNo: 'AUR-1965', name: 'Aryan Singh', email: 'aryan.singh@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Mechanical Engineering', department: 'Mechanical', year: 4, semester: 'Semester VIII', status: 'Active', gpa: 7.45, credits: 156, phone: '+91 98340 22334', address: '15 Safdarjung Enclave, Delhi', guardian: 'Colonel Ajay Singh', avatarSeed: 'aryan', joinedOn: '2022-07-18' },
  { id: 'STU-13', rollNo: 'AUR-2178', name: 'Zara Khan', email: 'zara.khan@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Architecture', department: 'Architecture', year: 2, semester: 'Semester IV', status: 'Active', gpa: 8.78, credits: 68, phone: '+91 96540 98765', address: '32 Red Road, Lucknow', guardian: 'Mohammad Khan', avatarSeed: 'zara', joinedOn: '2024-07-12' },
  { id: 'STU-14', rollNo: 'AUR-2091', name: 'Vedant Reddy', email: 'vedant.reddy@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Computer Science & Engineering', department: 'Computer Science', year: 1, semester: 'Semester II', status: 'Active', gpa: 8.9, credits: 30, phone: '+91 99876 34567', address: '99 Somajiguda, Hyderabad', guardian: 'Srinivas Reddy', avatarSeed: 'vedant', joinedOn: '2025-07-11' },
  { id: 'STU-15', rollNo: 'AUR-2156', name: 'Shreya Verma', email: 'shreya.verma@aurevian.edu', password: DEMO_PASSWORD_STUDENT, program: 'Electronics & Communication', department: 'Electronics', year: 1, semester: 'Semester II', status: 'Active', gpa: 9.14, credits: 28, phone: '+91 97654 11223', address: '71 Indiranagar, Bengaluru', guardian: 'Anil Verma', avatarSeed: 'shreya', joinedOn: '2025-07-09' },
]

export const initialTeachers: Teacher[] = [
  { id: 'TCH-01', name: 'Dr. Priya Rao', email: 'priya.rao@aurevian.edu', password: DEMO_PASSWORD_TEACHER, department: 'Computer Science', designation: 'Professor', subjects: ['Database Systems', 'Operating Systems'], office: 'A-204', status: 'Active', phone: '+91 98200 90011', joinedOn: '2016-06-01', avatarSeed: 'priya' },
  { id: 'TCH-02', name: 'Dr. Vikram Desai', email: 'vikram.desai@aurevian.edu', password: DEMO_PASSWORD_TEACHER, department: 'Computer Science', designation: 'Associate Professor', subjects: ['Machine Learning', 'Computer Networks'], office: 'A-210', status: 'Active', phone: '+91 98330 90022', joinedOn: '2018-01-15', avatarSeed: 'vikram', },
  { id: 'TCH-03', name: 'Dr. Neha Kulkarni', email: 'neha.kulkarni@aurevian.edu', password: DEMO_PASSWORD_TEACHER, department: 'Electronics', designation: 'Professor', subjects: ['Signals & Systems', 'Digital Electronics'], office: 'B-110', status: 'Active', phone: '+91 98450 90033', joinedOn: '2015-08-20', avatarSeed: 'neha' },
  { id: 'TCH-04', name: 'Prof. Sameer Joshi', email: 'sameer.joshi@aurevian.edu', password: DEMO_PASSWORD_TEACHER, department: 'Mechanical', designation: 'Assistant Professor', subjects: ['Thermodynamics', 'Heat Transfer'], office: 'C-002', status: 'Active', phone: '+91 97690 90044', joinedOn: '2020-07-03', avatarSeed: 'sameer' },
  { id: 'TCH-05', name: 'Dr. Ritu Chawla', email: 'ritu.chawla@aurevian.edu', password: DEMO_PASSWORD_TEACHER, department: 'Business', designation: 'Professor', subjects: ['Financial Accounting', 'Auditing'], office: 'D-301', status: 'Active', phone: '+91 98110 90055', joinedOn: '2014-06-11', avatarSeed: 'ritu' },
  { id: 'TCH-06', name: 'Prof. Deepak Kumar', email: 'deepak.kumar@aurevian.edu', password: DEMO_PASSWORD_TEACHER, department: 'Computer Science', designation: 'Associate Professor', subjects: ['Web Development', 'Software Engineering'], office: 'A-215', status: 'Active', phone: '+91 99220 90066', joinedOn: '2019-03-20', avatarSeed: 'deepak' },
  { id: 'TCH-07', name: 'Dr. Anjali Gupta', email: 'anjali.gupta@aurevian.edu', password: DEMO_PASSWORD_TEACHER, department: 'Architecture', designation: 'Assistant Professor', subjects: ['Building Design', 'Structural Analysis'], office: 'E-105', status: 'Active', phone: '+91 98980 90077', joinedOn: '2021-05-12', avatarSeed: 'anjali' },
  { id: 'TCH-08', name: 'Prof. Raj Patel', email: 'raj.patel@aurevian.edu', password: DEMO_PASSWORD_TEACHER, department: 'Business', designation: 'Associate Professor', subjects: ['Marketing Management', 'Business Strategy'], office: 'D-305', status: 'Active', phone: '+91 97760 90088', joinedOn: '2017-09-08', avatarSeed: 'raj' },
  { id: 'TCH-09', name: 'Dr. Shalini Singh', email: 'shalini.singh@aurevian.edu', password: DEMO_PASSWORD_TEACHER, department: 'Electronics', designation: 'Assistant Professor', subjects: ['Microprocessors', 'Embedded Systems'], office: 'B-115', status: 'Active', phone: '+91 98540 90099', joinedOn: '2020-11-15', avatarSeed: 'shalini' },
  { id: 'TCH-10', name: 'Prof. Arjun Verma', email: 'arjun.verma@aurevian.edu', password: DEMO_PASSWORD_TEACHER, department: 'Mechanical', designation: 'Associate Professor', subjects: ['Mechanical Design', 'Fluid Mechanics'], office: 'C-008', status: 'Inactive', phone: '+91 96650 90100', joinedOn: '2018-02-20', avatarSeed: 'arjun_v' },
]

export const initialClasses: ClassSession[] = [
  { id: 'CLS-01', name: 'Database Systems', subjectCode: 'CS 301', teacherId: 'TCH-01', teacherName: 'Dr. Priya Rao', department: 'Computer Science', schedule: 'Mon · Wed · Fri — 10:00 AM', room: 'Hall A-204', capacity: 60, enrolledStudentIds: ['STU-01', 'STU-06', 'STU-08', 'STU-04', 'STU-09'], description: 'Relational models, indexing, query optimisation and transactions.', createdOn: '2026-06-15' },
  { id: 'CLS-02', name: 'Machine Learning', subjectCode: 'CS 412', teacherId: 'TCH-02', teacherName: 'Dr. Vikram Desai', department: 'Computer Science', schedule: 'Tue · Thu — 12:30 PM', room: 'Hall A-118', capacity: 50, enrolledStudentIds: ['STU-01', 'STU-08', 'STU-06', 'STU-14'], description: 'Supervised and unsupervised learning, model evaluation, and applied projects.', createdOn: '2026-06-16' },
  { id: 'CLS-03', name: 'Operating Systems', subjectCode: 'CS 305', teacherId: 'TCH-01', teacherName: 'Dr. Priya Rao', department: 'Computer Science', schedule: 'Mon · Thu — 2:00 PM', room: 'Hall A-206', capacity: 55, enrolledStudentIds: ['STU-06', 'STU-04', 'STU-09', 'STU-14'], description: 'Process scheduling, memory management, concurrency and file systems.', createdOn: '2026-06-15' },
  { id: 'CLS-04', name: 'Financial Accounting', subjectCode: 'BUS 210', teacherId: 'TCH-05', teacherName: 'Dr. Ritu Chawla', department: 'Business', schedule: 'Wed · Fri — 9:00 AM', room: 'Hall D-301', capacity: 45, enrolledStudentIds: ['STU-05', 'STU-11'], description: 'Principles of financial reporting, statements, and analysis.', createdOn: '2026-06-17' },
  { id: 'CLS-05', name: 'Computer Networks', subjectCode: 'CS 340', teacherId: 'TCH-02', teacherName: 'Dr. Vikram Desai', department: 'Computer Science', schedule: 'Tue · Fri — 3:30 PM', room: 'Hall A-120', capacity: 50, enrolledStudentIds: ['STU-01', 'STU-09', 'STU-14'], description: 'Network architecture, protocols, and the modern internet stack.', createdOn: '2026-06-18' },
  { id: 'CLS-06', name: 'Web Development', subjectCode: 'CS 310', teacherId: 'TCH-06', teacherName: 'Prof. Deepak Kumar', department: 'Computer Science', schedule: 'Mon · Wed · Fri — 1:00 PM', room: 'Hall A-208', capacity: 45, enrolledStudentIds: ['STU-04', 'STU-09', 'STU-14', 'STU-01'], description: 'Frontend and backend web technologies, RESTful APIs, and deployment.', createdOn: '2026-06-19' },
  { id: 'CLS-07', name: 'Software Engineering', subjectCode: 'CS 401', teacherId: 'TCH-06', teacherName: 'Prof. Deepak Kumar', department: 'Computer Science', schedule: 'Tue · Thu — 10:00 AM', room: 'Hall A-210', capacity: 50, enrolledStudentIds: ['STU-01', 'STU-08', 'STU-06'], description: 'Software design patterns, agile methodologies, and project management.', createdOn: '2026-06-20' },
  { id: 'CLS-08', name: 'Signals & Systems', subjectCode: 'ECE 301', teacherId: 'TCH-03', teacherName: 'Dr. Neha Kulkarni', department: 'Electronics', schedule: 'Mon · Wed — 11:00 AM', room: 'Hall B-110', capacity: 40, enrolledStudentIds: ['STU-02', 'STU-10', 'STU-15'], description: 'Continuous and discrete signals, Fourier analysis, and system characterization.', createdOn: '2026-06-21' },
  { id: 'CLS-09', name: 'Digital Electronics', subjectCode: 'ECE 305', teacherId: 'TCH-03', teacherName: 'Dr. Neha Kulkarni', department: 'Electronics', schedule: 'Wed · Fri — 2:00 PM', room: 'Hall B-112', capacity: 38, enrolledStudentIds: ['STU-02', 'STU-10'], description: 'Logic gates, combinational circuits, sequential circuits, and programmable devices.', createdOn: '2026-06-22' },
  { id: 'CLS-10', name: 'Microprocessors', subjectCode: 'ECE 310', teacherId: 'TCH-09', teacherName: 'Dr. Shalini Singh', department: 'Electronics', schedule: 'Tue · Thu — 3:00 PM', room: 'Hall B-115', capacity: 35, enrolledStudentIds: ['STU-02', 'STU-15'], description: 'Instruction sets, assembly programming, and microcontroller applications.', createdOn: '2026-06-23' },
  { id: 'CLS-11', name: 'Thermodynamics', subjectCode: 'ME 301', teacherId: 'TCH-04', teacherName: 'Prof. Sameer Joshi', department: 'Mechanical', schedule: 'Mon · Wed · Fri — 3:00 PM', room: 'Hall C-002', capacity: 50, enrolledStudentIds: ['STU-03', 'STU-12'], description: 'Laws of thermodynamics, cycles, properties, and applications.', createdOn: '2026-06-24' },
  { id: 'CLS-12', name: 'Heat Transfer', subjectCode: 'ME 305', teacherId: 'TCH-04', teacherName: 'Prof. Sameer Joshi', department: 'Mechanical', schedule: 'Tue · Thu — 2:00 PM', room: 'Hall C-004', capacity: 48, enrolledStudentIds: ['STU-03', 'STU-12'], description: 'Conduction, convection, radiation and heat exchanger design.', createdOn: '2026-06-25' },
  { id: 'CLS-13', name: 'Marketing Management', subjectCode: 'BUS 310', teacherId: 'TCH-08', teacherName: 'Prof. Raj Patel', department: 'Business', schedule: 'Wed · Fri — 11:00 AM', room: 'Hall D-303', capacity: 50, enrolledStudentIds: ['STU-05', 'STU-11'], description: 'Market analysis, strategy formulation, and brand management.', createdOn: '2026-06-26' },
  { id: 'CLS-14', name: 'Building Design', subjectCode: 'ARC 301', teacherId: 'TCH-07', teacherName: 'Prof. Anjali Gupta', department: 'Architecture', schedule: 'Mon · Thu — 9:00 AM', room: 'Hall E-105', capacity: 30, enrolledStudentIds: ['STU-13', 'STU-07'], description: 'Architectural principles, spatial design, and aesthetic considerations.', createdOn: '2026-06-27' },
  { id: 'CLS-15', name: 'Auditing Principles', subjectCode: 'BUS 401', teacherId: 'TCH-05', teacherName: 'Dr. Ritu Chawla', department: 'Business', schedule: 'Tue · Thu — 1:00 PM', room: 'Hall D-301', capacity: 40, enrolledStudentIds: ['STU-05'], description: 'Audit standards, procedures, evidence collection, and reporting.', createdOn: '2026-06-28' },
]

export const initialTests: Test[] = [
  {
    id: 'TST-01', classId: 'CLS-01', className: 'Database Systems', title: 'Midterm Examination', date: '2026-08-24', time: '10:00 AM', totalMarks: 100, durationMins: 90,
    questions: [
      { id: 'q1', prompt: 'Which normal form eliminates transitive dependency?', options: ['1NF', '2NF', '3NF', 'BCNF'], correctIndex: 2 },
      { id: 'q2', prompt: 'A primary key can contain NULL values.', options: ['True', 'False'], correctIndex: 1 },
      { id: 'q3', prompt: 'Which command removes a table definition entirely?', options: ['DELETE', 'TRUNCATE', 'DROP', 'REMOVE'], correctIndex: 2 },
      { id: 'q4', prompt: 'ACID stands for Atomicity, Consistency, Isolation and —', options: ['Durability', 'Dependency', 'Direction', 'Deletion'], correctIndex: 0 },
      { id: 'q5', prompt: 'Which join returns unmatched rows from both tables?', options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'], correctIndex: 3 },
      { id: 'q6', prompt: 'An index speeds up query performance but slows down —', options: ['SELECT', 'INSERT/UPDATE', 'JOIN', 'WHERE'], correctIndex: 1 },
      { id: 'q7', prompt: 'What is a foreign key used for?', options: ['Sorting records', 'Establishing relationships', 'Encrypting data', 'Indexing'], correctIndex: 1 },
      { id: 'q8', prompt: 'Which statement is used to modify existing data?', options: ['INSERT', 'UPDATE', 'ALTER', 'MODIFY'], correctIndex: 1 },
    ],
    scores: { 'STU-01': 88, 'STU-08': 91, 'STU-06': 85, 'STU-04': 79, 'STU-09': 82 },
    submitted: ['STU-01', 'STU-08', 'STU-06', 'STU-04', 'STU-09'],
  },
  {
    id: 'TST-02', classId: 'CLS-02', className: 'Machine Learning', title: 'Quiz I — Foundations', date: '2026-08-20', time: '12:30 PM', totalMarks: 50, durationMins: 40,
    questions: [
      { id: 'q1', prompt: 'Which of the following is an unsupervised technique?', options: ['Linear Regression', 'K-Means Clustering', 'Logistic Regression', 'Decision Trees'], correctIndex: 1 },
      { id: 'q2', prompt: 'Overfitting typically results from —', options: ['Too little model complexity', 'Too much model complexity', 'Too much data', 'Feature scaling'], correctIndex: 1 },
      { id: 'q3', prompt: 'Which metric is best for imbalanced classification?', options: ['Accuracy', 'F1 Score', 'MSE', 'R²'], correctIndex: 1 },
      { id: 'q4', prompt: 'What does gradient descent do?', options: ['Scales features', 'Finds optimal weights', 'Encodes categories', 'Normalizes data'], correctIndex: 1 },
      { id: 'q5', prompt: 'A confusion matrix is used for —', options: ['Regression', 'Classification evaluation', 'Data cleaning', 'Feature selection'], correctIndex: 1 },
    ],
    scores: { 'STU-01': 45, 'STU-06': 48 }, submitted: ['STU-01', 'STU-06'],
  },
  {
    id: 'TST-03', classId: 'CLS-01', className: 'Database Systems', title: 'Quiz II — Indexing', date: '2026-09-02', time: '10:00 AM', totalMarks: 30, durationMins: 25,
    questions: [
      { id: 'q1', prompt: 'B+ Trees are commonly used for —', options: ['Hashing', 'Indexing', 'Encryption', 'Compression'], correctIndex: 1 },
      { id: 'q2', prompt: 'A clustered index determines physical row order.', options: ['True', 'False'], correctIndex: 0 },
    ],
    scores: {}, submitted: [],
  },
  {
    id: 'TST-04', classId: 'CLS-03', className: 'Operating Systems', title: 'Midterm Exam', date: '2026-08-28', time: '2:00 PM', totalMarks: 80, durationMins: 75,
    questions: [
      { id: 'q1', prompt: 'What is a process?', options: ['A thread', 'An executing program', 'A file', 'A memory block'], correctIndex: 1 },
      { id: 'q2', prompt: 'Context switching involves —', options: ['Changing processes', 'Saving/restoring state', 'Memory allocation', 'File operations'], correctIndex: 1 },
      { id: 'q3', prompt: 'Deadlock requires which condition?', options: ['Mutual exclusion', 'Hold and wait', 'No preemption', 'All of above'], correctIndex: 3 },
    ],
    scores: { 'STU-06': 75, 'STU-04': 68, 'STU-09': 72 }, submitted: ['STU-06', 'STU-04', 'STU-09'],
  },
  {
    id: 'TST-05', classId: 'CLS-06', className: 'Web Development', title: 'Assignment 1 — Frontend', date: '2026-08-22', time: '12:00 PM', totalMarks: 40, durationMins: 120,
    questions: [
      { id: 'q1', prompt: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'None'], correctIndex: 0 },
      { id: 'q2', prompt: 'CSS is used for —', options: ['Styling', 'Logic', 'Databases', 'Servers'], correctIndex: 0 },
    ],
    scores: { 'STU-01': 38, 'STU-14': 35, 'STU-09': 40 }, submitted: ['STU-01', 'STU-14', 'STU-09'],
  },
]

function genDays(base: number, present: number): { date: string; status: 'Present' | 'Absent' }[] {
  const days: { date: string; status: 'Present' | 'Absent' }[] = []
  const start = new Date('2026-07-15')
  for (let i = 0; i < base; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i * 2)
    days.push({ date: d.toISOString().slice(0, 10), status: i < present ? 'Present' : 'Absent' })
  }
  return days
}

export const initialAttendance: AttendanceRecord[] = [
  { classId: 'CLS-01', className: 'Database Systems', studentId: 'STU-01', days: genDays(20, 19) },
  { classId: 'CLS-01', className: 'Database Systems', studentId: 'STU-06', days: genDays(20, 18) },
  { classId: 'CLS-01', className: 'Database Systems', studentId: 'STU-08', days: genDays(20, 20) },
  { classId: 'CLS-01', className: 'Database Systems', studentId: 'STU-04', days: genDays(20, 15) },
  { classId: 'CLS-01', className: 'Database Systems', studentId: 'STU-09', days: genDays(20, 17) },
  { classId: 'CLS-02', className: 'Machine Learning', studentId: 'STU-01', days: genDays(16, 15) },
  { classId: 'CLS-02', className: 'Machine Learning', studentId: 'STU-08', days: genDays(16, 14) },
  { classId: 'CLS-02', className: 'Machine Learning', studentId: 'STU-06', days: genDays(16, 16) },
  { classId: 'CLS-02', className: 'Machine Learning', studentId: 'STU-14', days: genDays(16, 13) },
  { classId: 'CLS-03', className: 'Operating Systems', studentId: 'STU-06', days: genDays(14, 13) },
  { classId: 'CLS-03', className: 'Operating Systems', studentId: 'STU-04', days: genDays(14, 11) },
  { classId: 'CLS-03', className: 'Operating Systems', studentId: 'STU-09', days: genDays(14, 12) },
  { classId: 'CLS-03', className: 'Operating Systems', studentId: 'STU-14', days: genDays(14, 14) },
  { classId: 'CLS-04', className: 'Financial Accounting', studentId: 'STU-05', days: genDays(18, 16) },
  { classId: 'CLS-04', className: 'Financial Accounting', studentId: 'STU-11', days: genDays(18, 18) },
  { classId: 'CLS-05', className: 'Computer Networks', studentId: 'STU-01', days: genDays(12, 12) },
  { classId: 'CLS-05', className: 'Computer Networks', studentId: 'STU-09', days: genDays(12, 10) },
  { classId: 'CLS-05', className: 'Computer Networks', studentId: 'STU-14', days: genDays(12, 11) },
  { classId: 'CLS-06', className: 'Web Development', studentId: 'STU-04', days: genDays(18, 16) },
  { classId: 'CLS-06', className: 'Web Development', studentId: 'STU-09', days: genDays(18, 17) },
  { classId: 'CLS-06', className: 'Web Development', studentId: 'STU-14', days: genDays(18, 18) },
  { classId: 'CLS-06', className: 'Web Development', studentId: 'STU-01', days: genDays(18, 15) },
  { classId: 'CLS-08', className: 'Signals & Systems', studentId: 'STU-02', days: genDays(16, 14) },
  { classId: 'CLS-08', className: 'Signals & Systems', studentId: 'STU-10', days: genDays(16, 15) },
  { classId: 'CLS-08', className: 'Signals & Systems', studentId: 'STU-15', days: genDays(16, 16) },
  { classId: 'CLS-11', className: 'Thermodynamics', studentId: 'STU-03', days: genDays(20, 18) },
  { classId: 'CLS-11', className: 'Thermodynamics', studentId: 'STU-12', days: genDays(20, 19) },
]

export const initialNotes: Note[] = [
  { id: 'NOTE-01', classId: 'CLS-01', className: 'Database Systems', title: 'Normalisation — Lecture Summary', fileName: 'normalisation-summary.pdf', uploadedByName: 'Dr. Priya Rao', uploadedByRole: 'teacher', date: '2026-08-02' },
  { id: 'NOTE-02', classId: 'CLS-01', className: 'Database Systems', title: 'Indexing Practice Set', fileName: 'indexing-practice.pdf', uploadedByName: 'Arjun Mehta', uploadedByRole: 'student', date: '2026-08-10' },
  { id: 'NOTE-03', classId: 'CLS-02', className: 'Machine Learning', title: 'Gradient Descent — Worked Examples', fileName: 'gradient-descent.pdf', uploadedByName: 'Dr. Vikram Desai', uploadedByRole: 'teacher', date: '2026-08-05' },
  { id: 'NOTE-04', classId: 'CLS-02', className: 'Machine Learning', title: 'Neural Networks Cheatsheet', fileName: 'neural-networks.pdf', uploadedByName: 'Sanya Iyer', uploadedByRole: 'student', date: '2026-08-12' },
  { id: 'NOTE-05', classId: 'CLS-03', className: 'Operating Systems', title: 'Process Scheduling Algorithms', fileName: 'scheduling.pdf', uploadedByName: 'Dr. Priya Rao', uploadedByRole: 'teacher', date: '2026-08-06' },
  { id: 'NOTE-06', classId: 'CLS-06', className: 'Web Development', title: 'React Hooks Explained', fileName: 'react-hooks.pdf', uploadedByName: 'Prof. Deepak Kumar', uploadedByRole: 'teacher', date: '2026-08-08' },
  { id: 'NOTE-07', classId: 'CLS-06', className: 'Web Development', title: 'CSS Grid & Flexbox Guide', fileName: 'css-layout.pdf', uploadedByName: 'Ishita Sen', uploadedByRole: 'student', date: '2026-08-14' },
  { id: 'NOTE-08', classId: 'CLS-08', className: 'Signals & Systems', title: 'Fourier Transform Derivations', fileName: 'fourier.pdf', uploadedByName: 'Dr. Neha Kulkarni', uploadedByRole: 'teacher', date: '2026-08-07' },
  { id: 'NOTE-09', classId: 'CLS-11', className: 'Thermodynamics', title: 'Steam Tables & Properties', fileName: 'steam-tables.pdf', uploadedByName: 'Prof. Sameer Joshi', uploadedByRole: 'teacher', date: '2026-08-09' },
]

export const initialFees: FeeRecord[] = [
  { studentId: 'STU-01', semester: 'Academic Year 2026–27', total: 124000, paid: 108000, dueDate: '2026-09-15', transactions: [
    { id: 'TXN-01', date: '2026-07-18', amount: 62000, method: 'Net Banking', reference: 'AUR-PAY-88213' },
    { id: 'TXN-02', date: '2026-08-05', amount: 46000, method: 'UPI', reference: 'AUR-PAY-88940' },
  ] },
  { studentId: 'STU-02', semester: 'Academic Year 2026–27', total: 118000, paid: 59000, dueDate: '2026-09-15', transactions: [
    { id: 'TXN-07', date: '2026-07-20', amount: 59000, method: 'Credit Card', reference: 'AUR-PAY-88512' },
  ] },
  { studentId: 'STU-03', semester: 'Academic Year 2026–27', total: 128000, paid: 128000, dueDate: '2026-09-15', transactions: [
    { id: 'TXN-08', date: '2026-07-12', amount: 128000, method: 'Net Banking', reference: 'AUR-PAY-87834' },
  ] },
  { studentId: 'STU-04', semester: 'Academic Year 2026–27', total: 96000, paid: 96000, dueDate: '2026-09-15', transactions: [
    { id: 'TXN-09', date: '2026-07-11', amount: 96000, method: 'UPI', reference: 'AUR-PAY-87890' },
  ] },
  { studentId: 'STU-05', semester: 'Academic Year 2026–27', total: 130000, paid: 70000, dueDate: '2026-09-15', transactions: [
    { id: 'TXN-10', date: '2026-07-19', amount: 70000, method: 'Net Banking', reference: 'AUR-PAY-88301' },
  ] },
  { studentId: 'STU-06', semester: 'Academic Year 2026–27', total: 118000, paid: 118000, dueDate: '2026-09-15', transactions: [
    { id: 'TXN-03', date: '2026-07-10', amount: 118000, method: 'Net Banking', reference: 'AUR-PAY-87710' },
  ] },
  { studentId: 'STU-08', semester: 'Academic Year 2026–27', total: 124000, paid: 62000, dueDate: '2026-09-15', transactions: [
    { id: 'TXN-04', date: '2026-07-22', amount: 62000, method: 'Credit Card', reference: 'AUR-PAY-88410' },
  ] },
  { studentId: 'STU-09', semester: 'Academic Year 2026–27', total: 118000, paid: 89000, dueDate: '2026-09-15', transactions: [
    { id: 'TXN-11', date: '2026-07-15', amount: 59000, method: 'UPI', reference: 'AUR-PAY-88145' },
    { id: 'TXN-12', date: '2026-08-02', amount: 30000, method: 'Net Banking', reference: 'AUR-PAY-88756' },
  ] },
  { studentId: 'STU-10', semester: 'Academic Year 2026–27', total: 118000, paid: 59000, dueDate: '2026-09-15', transactions: [
    { id: 'TXN-13', date: '2026-07-18', amount: 59000, method: 'Credit Card', reference: 'AUR-PAY-88234' },
  ] },
  { studentId: 'STU-11', semester: 'Academic Year 2026–27', total: 130000, paid: 130000, dueDate: '2026-09-15', transactions: [
    { id: 'TXN-14', date: '2026-07-08', amount: 130000, method: 'Net Banking', reference: 'AUR-PAY-87623' },
  ] },
  { studentId: 'STU-12', semester: 'Academic Year 2026–27', total: 128000, paid: 64000, dueDate: '2026-09-15', transactions: [
    { id: 'TXN-15', date: '2026-07-21', amount: 64000, method: 'UPI', reference: 'AUR-PAY-88345' },
  ] },
  { studentId: 'STU-13', semester: 'Academic Year 2026–27', total: 126000, paid: 126000, dueDate: '2026-09-15', transactions: [
    { id: 'TXN-16', date: '2026-07-09', amount: 126000, method: 'Net Banking', reference: 'AUR-PAY-87945' },
  ] },
  { studentId: 'STU-14', semester: 'Academic Year 2026–27', total: 96000, paid: 48000, dueDate: '2026-09-15', transactions: [
    { id: 'TXN-17', date: '2026-07-25', amount: 48000, method: 'Credit Card', reference: 'AUR-PAY-88567' },
  ] },
  { studentId: 'STU-15', semester: 'Academic Year 2026–27', total: 118000, paid: 118000, dueDate: '2026-09-15', transactions: [
    { id: 'TXN-18', date: '2026-07-11', amount: 118000, method: 'UPI', reference: 'AUR-PAY-87834' },
  ] },
]
