# Aurevion — Institutional Management System

A frontend-only Student Management System with a "quiet luxury" design language —
ivory/charcoal/brass palette, editorial serif headings, and slow, intentional motion
throughout (Framer Motion page transitions, staggered reveals, hover elevation).

Three role-based portals share one codebase: **Admin**, **Faculty (Teacher)**, and **Student**.
All data is realistic mock data held in memory (React Context) — there is no backend,
so refreshing the page resets everything to the seeded demo state.

## Tech stack

- React 18 + TypeScript + Vite
- Tailwind CSS (custom ivory/charcoal/brass design tokens)
- React Router v6 (role-protected routes)
- Framer Motion (page transitions, modals, staggered lists, tab pills)
- Recharts (trend lines, area charts, bar comparisons, donut chart)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Demo credentials

The login screen has a **"Use demo credentials"** link that autofills the active tab,
or you can use any of the following:

| Role    | Email                        | Password       |
|---------|-------------------------------|----------------|
| Admin   | admin@aurelis.edu             | Admin@123      |
| Faculty | priya.rao@aurelis.edu         | Teach@123      |
| Student | arjun.mehta@aurelis.edu       | Student@123    |

Every seeded teacher uses the password `Teach@123`, and every seeded student uses
`Student@123` (see `src/data/mockData.ts` for the full roster and emails).

## What each role can do

**Admin**
- Dashboard: enrollment trend, department composition, faculty/student counts, fee collection
- Students: search/filter, add, edit, remove student records
- Faculty: search/filter, add, edit, remove faculty records

**Faculty**
- Dashboard: classes taught, students reached, average attendance
- My Classes: open new classes for enrollment, view class rosters
- Tests & Scores: schedule tests (with MCQ questions), record/edit scores per student
- Attendance: mark present/absent per class, per date
- Notes: upload lecture notes shared with enrolled students

**Student**
- Dashboard: GPA, attendance, credits, attendance trend, fee snapshot, upcoming tests
- My Classes: browse open classes and enroll, or leave an enrolled class
- Tests: take pending tests (auto-graded MCQ), view results once graded
- Attendance: overall percentage, trend, per-subject breakdown
- Notes: view faculty/peer notes, upload their own notes for a class
- Fees: view balance, transaction history, and make a mock payment (UPI/card/net banking)

## Project structure

```
src/
  components/
    ui/         Button, form fields, Badge/Avatar/Card, Modal/EmptyState/Toast
    layout/     Sidebar, Header, Shell (role-aware app frame)
    charts/     Recharts wrappers styled to the brand palette
  context/      AppContext — auth session + all in-memory data + actions
  data/         Seeded mock data (students, teachers, classes, tests, attendance, fees, notes)
  pages/
    admin/      Dashboard, Students, Teachers
    teacher/    Dashboard, Classes, Tests, Attendance, Notes
    student/    Dashboard, Classes, Tests, Attendance, Notes, Fees
  types/        Shared TypeScript types
  lib/          Formatting helpers
```

## Notes on the mock data layer

Nothing here talks to a real server. `AppContext` exposes actions like `addStudent`,
`scheduleTest`, `markAttendance`, `payFee`, etc., that mutate in-memory state and show a
toast. Swapping this for real API calls later means replacing the bodies of those
functions — the UI components don't need to change.
