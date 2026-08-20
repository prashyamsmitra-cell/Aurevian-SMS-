import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, GraduationCap, UserRound, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Input } from '../components/ui/Field'
import Button from '../components/ui/Button'
import type { Role } from '../types'
import { ADMIN_ACCOUNT, DEMO_PASSWORD_STUDENT, DEMO_PASSWORD_TEACHER } from '../data/mockData'

const ROLE_TABS: { role: Role; label: string; icon: React.ElementType }[] = [
  { role: 'student', label: 'Student', icon: GraduationCap },
  { role: 'teacher', label: 'Faculty', icon: UserRound },
  { role: 'admin', label: 'Admin', icon: ShieldCheck },
]

const DEMO: Record<Role, { email: string; password: string }> = {
  student: { email: 'arjun.mehta@aurevian.edu', password: DEMO_PASSWORD_STUDENT },
  teacher: { email: 'priya.rao@aurevian.edu', password: DEMO_PASSWORD_TEACHER },
  admin: { email: ADMIN_ACCOUNT.email, password: ADMIN_ACCOUNT.password },
}

export default function Login() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [role, setRole] = useState<Role>('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleRole(r: Role) {
    setRole(r)
    setError('')
    setEmail('')
    setPassword('')
  }

  function fillDemo() {
    setEmail(DEMO[role].email)
    setPassword(DEMO[role].password)
    setError('')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const res = login(role, email, password)
      setLoading(false)
      if (res.ok) navigate(`/${role}`)
      else setError(res.error ?? 'Something went wrong.')
    }, 500)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-ivory dark:bg-ink">
      {/* Editorial visual panel */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-charcoal text-ivory px-14 py-14">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg, transparent 0 68px, rgba(230,207,148,0.5) 68px 69px), repeating-linear-gradient(25deg, transparent 0 84px, rgba(230,207,148,0.35) 84px 85px)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 font-display text-2xl tracking-wide"
        >
          AUREVIAN
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-md"
        >
          <p className="eyebrow text-brass-300 mb-5">Institutional Management</p>
          <h1 className="font-display text-[52px] leading-[1.05] mb-6">
            Where potential<br /><em className="not-italic text-brass-200">becomes</em> legacy.
          </h1>
          <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
            A single, considered portal for students, faculty and administration — built for
            an institution that treats every detail as consequential.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 flex items-center gap-8 text-stone-400 text-xs tracking-wide"
        >
          <span>2,481 students</span>
          <span className="w-1 h-1 rounded-full bg-stone-500" />
          <span>146 faculty</span>
          <span className="w-1 h-1 rounded-full bg-stone-500" />
          <span>Est. 1998</span>
        </motion.div>
      </div>

      {/* Login form panel */}
      <div className="flex items-center justify-center px-6 py-16 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[400px]"
        >
          <div className="lg:hidden font-display text-2xl tracking-wide text-charcoal dark:text-stone-50 mb-10">AUREVIAN</div>

          <p className="eyebrow mb-3">Welcome back</p>
          <h2 className="font-display text-3xl text-charcoal dark:text-stone-50 mb-8">Sign in to your institutional portal.</h2>

          <div className="flex border border-stone-300 dark:border-stone-700 rounded-full p-1 mb-9 relative">
            {ROLE_TABS.map((t) => (
              <button
                key={t.role}
                type="button"
                onClick={() => handleRole(t.role)}
                className={`relative flex-1 flex items-center justify-center gap-1.5 text-[13px] py-2 rounded-full transition-colors duration-300 z-10 ${
                  role === t.role ? 'text-ivory dark:text-ink' : 'text-stone-500 hover:text-charcoal dark:hover:text-stone-200'
                }`}
              >
                {role === t.role && (
                  <motion.span
                    layoutId="role-pill"
                    className="absolute inset-0 bg-charcoal dark:bg-brass-400 rounded-full -z-10"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <t.icon size={14} />
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={role}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-[11px] font-medium tracking-widest2 uppercase text-stone-500 mb-2">Institutional email</label>
                <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@aurevian.edu" autoComplete="username" />
              </div>
              <div>
                <label className="block text-[11px] font-medium tracking-widest2 uppercase text-stone-500 mb-2">Password</label>
                <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" autoComplete="current-password" />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="text-claret-600 text-[13px]"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Verifying…' : 'Sign In'} {!loading && <ArrowRight size={15} />}
              </Button>

              <div className="flex items-center justify-between pt-1">
                <button type="button" onClick={fillDemo} className="text-[12px] text-stone-500 hover:text-brass-600 dark:hover:text-brass-400 underline underline-offset-4 transition-colors">
                  Use demo credentials
                </button>
                <span className="text-[12px] text-stone-400">v1.0 — Frontend Preview</span>
              </div>
            </motion.form>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
