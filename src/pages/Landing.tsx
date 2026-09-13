import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Sun, Moon, GraduationCap, ClipboardCheck, ShieldCheck,
  Wallet, LineChart, BarChart3, Check, Quote, Sparkles, Users, UserRound,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { TrendArea } from '../components/charts/Charts'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const GRAIN_LIGHT =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

const GRAIN_DARK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brass-500/20 bg-brass-500/[0.06] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-brass-700 dark:border-brass-500/25 dark:bg-brass-500/10 dark:text-brass-300">
      {children}
    </span>
  )
}

function CtaPrimary({ to, children, className = '' }: { to: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-3 rounded-full border border-charcoal bg-charcoal py-1.5 pl-6 pr-1.5 text-ivory shadow-soft transition-colors duration-300 ease-luxe hover:bg-stone-800 active:scale-[0.98] dark:border-brass-400 dark:bg-brass-400 dark:text-ink dark:shadow-none dark:hover:bg-brass-300 ${className}`}
    >
      <span className="text-sm font-medium tracking-wide">{children}</span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ivory/15 text-ivory transition-transform duration-500 ease-luxe group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105 dark:bg-ink/15 dark:text-ink">
        <ArrowRight size={14} />
      </span>
    </Link>
  )
}

function CtaGhost({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full border border-stone-300 bg-transparent py-1.5 pl-6 pr-1.5 text-charcoal transition-colors duration-300 ease-luxe hover:border-charcoal active:scale-[0.98] dark:border-stone-700 dark:text-stone-100 dark:hover:border-stone-400 ${className}`}
    >
      <span className="text-sm font-medium tracking-wide">{children}</span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-200/70 text-charcoal transition-transform duration-500 ease-luxe group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105 dark:bg-stone-800 dark:text-stone-100">
        <ArrowRight size={14} />
      </span>
    </a>
  )
}

function Shell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.5rem] bg-parchment/70 p-2 ring-1 ring-stone-200/70 dark:bg-white/[0.04] dark:ring-white/10 ${className}`}>
      {children}
    </div>
  )
}

const NAV_LINKS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Why Aurevian', href: '#why' },
  { label: 'Contact', href: '#contact' },
]

const heroTrend = [
  { label: 'Mar', value: 2210 }, { label: 'Apr', value: 2255 }, { label: 'May', value: 2298 },
  { label: 'Jun', value: 2340 }, { label: 'Jul', value: 2410 }, { label: 'Aug', value: 2481 },
]

const STATS = [
  { value: '2,481', label: 'Students enrolled' },
  { value: '146', label: 'Faculty members' },
  { value: '5', label: 'Departments' },
  { value: '1998', label: 'Established' },
]

const PROBLEMS = [
  { no: '01', title: 'Fragmented records', body: 'Student files split across desks, drives and thirty versions of the same spreadsheet. Nobody holds the authoritative copy.' },
  { no: '02', title: 'Manual attendance', body: 'Proxies slip through, teachers lose minutes to paper, and reporting lags by a whole term.' },
  { no: '03', title: 'Leaky fee collection', body: 'Outstanding balances chase different ledgers. Reminders are handwritten, and revenue quietly evaporates.' },
  { no: '04', title: 'Silent communication', body: 'Announcements echo through informal channels, and nothing — exam dates, results, notices — is ever officially official.' },
]

const MODULES = [
  { icon: GraduationCap, title: 'Student Portal', body: 'Timetable, attendance, tests, notes and the fee ledger in one calm dashboard.' },
  { icon: ClipboardCheck, title: 'Faculty Suite', body: 'Publish assessments, grade in a single pass, share notes, and take attendance without the clipboard.' },
  { icon: ShieldCheck, title: 'Administration', body: 'One authoritative record for every student and faculty member, from enrolment to graduation.' },
  { icon: Wallet, title: 'Fees & Finance', body: 'Billing, collections, receipts and outstanding tracking with a live view for leadership.' },
  { icon: LineChart, title: 'Attendance Intelligence', body: 'Rates by class, cohort and day — surfaced before attendance becomes a problem.' },
  { icon: BarChart3, title: 'Assessment & Insights', body: 'Scorecards, GPA trends and analytics that turn raw marks into institutional decisions.' },
]

const PERSONAS = [
  {
    icon: GraduationCap,
    tag: 'For Students',
    title: 'Everything academic, in one place',
    points: ['Their timetable, classes and room changes', 'Attendance in real time, not end-of-year guesswork', 'Test schedules, results and honest-to-goodness scores', 'Fee ledger with receipts, outstanding and due dates'],
  },
  {
    icon: UserRound,
    tag: 'For Faculty',
    title: 'Spend your time teaching',
    points: ['Roll call in seconds from any device', 'Publish notes and tests to enrolled students instantly', 'Grade once — analytics appear by themselves', 'Every class, cohort and student picture at hand'],
  },
  {
    icon: Users,
    tag: 'For Administration',
    title: 'See the institution as one picture',
    points: ['Authoritative records for students and staff', 'Collection rates and outstanding by department', 'Enrolment, capacity and attendance trends live', 'Clean exports and a single, trusted source of truth'],
  },
]

function Grain() {
  const { theme } = useApp()
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[45]"
      style={{
        backgroundImage: theme === 'dark' ? GRAIN_DARK : GRAIN_LIGHT,
        mixBlendMode: theme === 'dark' ? 'screen' : 'multiply',
        opacity: theme === 'dark' ? 0.14 : 0.22,
      }}
    />
  )
}

function Navbar() {
  const { theme, toggleTheme } = useApp()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mt-4 flex h-[60px] w-max max-w-full items-center gap-4 rounded-full border border-white/40 bg-ivory/60 px-3 shadow-soft backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_8px_32px_-16px_rgba(28,26,22,0.25)] ring-1 ring-black/5 dark:border-white/10 dark:bg-ink/50 dark:shadow-none dark:ring-white/10 sm:pl-5 sm:pr-3"
        >
          <Link to="/" className="flex items-center gap-2 font-display text-[20px] leading-none tracking-wide text-charcoal dark:text-stone-50">
            AUREVIAN <span className="h-1.5 w-1.5 rounded-full bg-brass-500" />
          </Link>

          <nav className="ml-6 hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-[13px] tracking-wide text-stone-500 transition-colors duration-300 ease-luxe hover:text-charcoal dark:hover:text-stone-100">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="flex h-10 w-10 items-center justify-center rounded-full text-stone-500 transition-colors duration-300 ease-luxe hover:text-charcoal dark:hover:text-stone-100"
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>

            <a
              href="#contact"
              className="hidden rounded-full px-4 py-2 text-[13px] tracking-wide text-stone-600 transition-colors duration-300 ease-luxe hover:text-charcoal dark:text-stone-300 dark:hover:text-stone-100 sm:inline-flex"
            >
              Request a demo
            </a>

            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 rounded-full border border-charcoal bg-charcoal px-4 py-2 text-[13px] font-medium tracking-wide text-ivory transition-colors duration-300 ease-luxe hover:bg-stone-800 active:scale-[0.98] dark:border-brass-400 dark:bg-brass-400 dark:text-ink dark:hover:bg-brass-300"
            >
              Login <ArrowRight size={14} />
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-charcoal transition-colors duration-300 dark:border-stone-800 dark:text-stone-100 md:hidden"
            >
              <span className="relative block h-[14px] w-[18px]">
                <span className={`absolute left-0 top-[2px] block h-[2px] w-full rounded-full bg-current transition-all duration-500 ease-luxe ${open ? 'top-[6px] rotate-45' : ''}`} />
                <span className={`absolute bottom-[2px] left-0 block h-[2px] w-full rounded-full bg-current transition-all duration-500 ease-luxe ${open ? 'bottom-[6px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="absolute inset-0 bg-ivory/95 backdrop-blur-2xl dark:bg-ink/95" />
            <nav className="relative flex h-[100dvh] flex-col justify-start px-8 pb-12 pt-28">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.55, ease: EASE }}
                  className="border-b border-stone-200/80 py-4 font-display text-4xl text-charcoal transition-colors duration-300 hover:text-brass-600 dark:border-stone-800 dark:text-stone-50"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.5, ease: EASE }}
                className="mt-10"
              >
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full border border-charcoal bg-charcoal px-6 py-3 text-sm font-medium text-ivory dark:border-brass-400 dark:bg-brass-400 dark:text-ink"
                >
                  Login to the portal <ArrowRight size={15} />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 lg:pt-40">
      <div
        className="absolute inset-0 -z-10 opacity-[0.55] dark:opacity-[0.18]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, transparent 0 92px, rgba(156,122,60,0.07) 92px 93px), repeating-linear-gradient(25deg, transparent 0 112px, rgba(156,122,60,0.05) 112px 113px)',
        }}
      />

      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-16 px-6 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-10 lg:pb-32">
        <motion.div initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, ease: EASE }}>
          <Eyebrow><Sparkles size={11} /> Institutional estates · Est. 1998</Eyebrow>
          <h1 className="mt-8 font-display text-[54px] font-semibold leading-[0.98] tracking-[-0.01em] text-charcoal dark:text-stone-50 md:text-[72px]">
            The operating system
            <br />
            for the <em className="not-italic text-brass-500 dark:text-brass-300">modern institution.</em>
          </h1>
          <p className="mt-7 max-w-md text-[15px] leading-[1.8] text-stone-600 dark:text-stone-400">
            Aurevian brings students, faculty and administration into one considered workspace — admissions,
            attendance, assessments and fees, resolved into a single portrait of your school.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <CtaPrimary to="/login">Login to the portal</CtaPrimary>
            <CtaGhost href="#platform">Explore the platform</CtaGhost>
          </div>

          <motion.ul
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.35 }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-stone-500 dark:text-stone-500"
          >
            {['Student, faculty & admin modules', 'Fee & attendance ledgers included', 'No setup fees'].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check size={13} className="text-emerald-600 dark:text-emerald-400" /> {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          className="relative mx-auto w-full max-w-[520px] lg:justify-self-end"
        >
          <div className="absolute -inset-4 -rotate-2 rounded-[1.75rem] border border-stone-200/70 bg-parchment/60 dark:border-stone-800 dark:bg-white/[0.03]" />

          <Shell className="relative">
            <div className="rounded-[1rem] bg-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:bg-stone-900/70 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between px-6 pt-6">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-claret-600/70" />
                  <span className="h-2 w-2 rounded-full bg-brass-400/80" />
                  <span className="h-2 w-2 rounded-full bg-emerald-600/80" />
                </div>
                <p className="eyebrow">Portal · Live terms</p>
              </div>
              <p className="px-6 pb-1 pt-5 font-display text-xl text-charcoal dark:text-stone-50">Enrolment is climbing.</p>
              <div className="px-2">
                <TrendArea data={heroTrend} height={190} />
              </div>
              <div className="mx-6 mb-6 grid grid-cols-3 gap-4 border-t border-stone-200 pt-5 dark:border-stone-800">
                <div>
                  <p className="font-display text-2xl leading-none text-charcoal dark:text-stone-50">96.4%</p>
                  <p className="eyebrow mt-2">Attendance</p>
                </div>
                <div className="border-l border-stone-200 pl-4 dark:border-stone-800">
                  <p className="font-display text-2xl leading-none text-charcoal dark:text-stone-50">87%</p>
                  <p className="eyebrow mt-2">Collections</p>
                </div>
                <div className="border-l border-stone-200 pl-4 dark:border-stone-800">
                  <p className="font-display text-2xl leading-none text-charcoal dark:text-stone-50">8.4</p>
                  <p className="eyebrow mt-2">Avg. GPA</p>
                </div>
              </div>
            </div>
          </Shell>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 -left-4 flex -rotate-1 items-center gap-2.5 rounded-full bg-charcoal px-4 py-2.5 shadow-lift ring-1 ring-white/10 dark:bg-brass-400 dark:text-ink"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brass-300 dark:bg-ink" />
            <span className="text-[12px] tracking-wide">One source of truth for the whole term</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function StatsBand() {
  return (
    <section className="px-6 pb-24 lg:px-10">
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <Shell>
            <div className="grid grid-cols-2 divide-y divide-x divide-stone-200/80 rounded-[1rem] bg-white/80 dark:divide-stone-800 dark:bg-stone-900/60 md:grid-cols-4 md:divide-y-0">
              {STATS.map((s) => (
                <div key={s.label} className="px-6 py-9 text-center">
                  <p className="font-display text-4xl leading-none text-charcoal dark:text-stone-50 md:text-[44px]">{s.value}</p>
                  <p className="eyebrow mt-3">{s.label}</p>
                </div>
              ))}
            </div>
          </Shell>
        </Reveal>
      </div>
    </section>
  )
}

function Solutions() {
  return (
    <section id="solutions" className="scroll-mt-28">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <Eyebrow>The problem</Eyebrow>
            <h2 className="mt-7 font-display text-4xl font-semibold leading-[1.06] tracking-[-0.01em] text-charcoal dark:text-stone-50 md:text-[46px]">
              Great institutions flounder on broken operations.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.8] text-stone-500 dark:text-stone-400">
              Admissions in one inbox, attendance on paper, fees in a spreadsheet, grades scattered across three
              dashboards. Aurevian exists to end that, quietly and permanently.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((pr, i) => (
            <Reveal key={pr.no} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-md border border-stone-200/70 bg-white/70 p-7 shadow-soft transition-all duration-500 ease-luxe hover:-translate-y-1.5 hover:border-stone-300 hover:shadow-lift dark:border-stone-800 dark:bg-stone-900/40 dark:hover:border-stone-700">
                <p className="font-mono text-xs text-brass-500 dark:text-brass-400">{pr.no}</p>
                <h3 className="mt-4 font-display text-2xl text-charcoal dark:text-stone-50">{pr.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500 dark:text-stone-400">{pr.body}</p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-brass-500 transition-all duration-500 ease-luxe group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Platform() {
  return (
    <section id="platform" className="scroll-mt-28 bg-parchment/50 dark:bg-stone-900/20">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <Eyebrow>The platform</Eyebrow>
            <h2 className="mt-7 font-display text-4xl font-semibold leading-[1.06] tracking-[-0.01em] text-charcoal dark:text-stone-50 md:text-[46px]">
              One considered workspace. Every answer.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.8] text-stone-500 dark:text-stone-400">
              Aurevian consolidates the entire institutional lifecycle into modules that actually talk to one another —
              no exports, no reconciliation Friday.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-md border border-stone-200/70 bg-white/80 p-7 shadow-soft transition-all duration-500 ease-luxe hover:-translate-y-1.5 hover:border-stone-300 hover:shadow-lift dark:border-stone-800 dark:bg-stone-900/40 dark:hover:border-stone-700">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg border border-brass-500/25 bg-brass-500/[0.08] text-brass-600 transition-colors duration-500 ease-luxe group-hover:border-brass-500 group-hover:bg-brass-500 dark:text-brass-300">
                  <m.icon size={18} />
                </div>
                <h3 className="font-display text-xl text-charcoal dark:text-stone-50">{m.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-stone-500 dark:text-stone-400">{m.body}</p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-brass-500 transition-all duration-500 ease-luxe group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Personas() {
  return (
    <section id="roles" className="scroll-mt-28">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <Eyebrow>Built for every seat</Eyebrow>
            <h2 className="mt-7 font-display text-4xl font-semibold leading-[1.06] tracking-[-0.01em] text-charcoal dark:text-stone-50 md:text-[46px]">
              Purpose-built for each role in the room.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {PERSONAS.map((persona, i) => (
            <Reveal key={persona.tag} delay={i * 0.08}>
              <div className="group h-full rounded-md border border-stone-200/70 bg-white/70 p-9 shadow-soft transition-all duration-500 ease-luxe hover:-translate-y-1.5 hover:border-stone-300 hover:shadow-lift dark:border-stone-800 dark:bg-stone-900/40 dark:hover:border-stone-700">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal text-ivory transition-colors duration-500 ease-luxe group-hover:bg-brass-600 dark:bg-brass-400 dark:text-ink">
                    <persona.icon size={16} />
                  </div>
                  <p className="eyebrow">{persona.tag}</p>
                </div>
                <h3 className="mt-7 font-display text-2xl leading-tight text-charcoal dark:text-stone-50">{persona.title}</h3>
                <ul className="mt-7 space-y-4">
                  {persona.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brass-500/30 text-brass-600 dark:text-brass-300">
                        <Check size={11} />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Why() {
  return (
    <section id="why" className="scroll-mt-28 px-6 lg:px-10">
      <div className="mx-auto w-full max-w-[1200px] pb-24 lg:pb-32">
        <Reveal>
          <Shell>
            <div className="relative overflow-hidden rounded-[1rem] bg-charcoal px-8 py-16 text-ivory shadow-lift md:px-16 md:py-20 dark:bg-stone-900">
              <div
                className="absolute inset-0 opacity-[0.13]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(115deg, transparent 0 68px, rgba(230,207,148,0.5) 68px 69px), repeating-linear-gradient(25deg, transparent 0 84px, rgba(230,207,148,0.35) 84px 85px)',
                }}
              />
              <div className="relative z-10 max-w-2xl">
                <Quote size={30} className="text-brass-300" />
                <p className="mt-8 font-display text-3xl font-medium leading-[1.18] md:text-[40px]">
                  For the first time, our attendance, fees and results live in the same place. The term runs itself.
                </p>
                <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
                  Registrar's office — Higher-education pilot, 2025–26
                </p>
              </div>
              <div className="relative z-10 mt-14 flex flex-wrap gap-x-12 gap-y-6 text-sm text-stone-300">
                <span><strong className="mr-2 font-display text-3xl font-semibold text-brass-200">6 hrs</strong>saved per teacher, weekly</span>
                <span><strong className="mr-2 font-display text-3xl font-semibold text-brass-200">100%</strong>fee-ledger reconciliation</span>
                <span><strong className="mr-2 font-display text-3xl font-semibold text-brass-200">1</strong>source of truth</span>
              </div>
            </div>
          </Shell>
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-28">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-28 lg:px-10 lg:pb-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Get started</Eyebrow>
          <h2 className="mt-7 font-display text-4xl font-semibold leading-[1.06] tracking-[-0.01em] text-charcoal dark:text-stone-50 md:text-[46px]">
            Ready to bring order to your institution?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-[1.8] text-stone-500 dark:text-stone-400">
            Sign in to explore the live portal with demo data, or request a private walkthrough with our team.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CtaPrimary to="/login">Login to the portal</CtaPrimary>
            <CtaGhost href="mailto:hello@aurevian.edu">Request a walkthrough</CtaGhost>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-stone-200/80 bg-parchment/50 dark:border-stone-800 dark:bg-stone-900/20">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2 font-display text-[20px] leading-none tracking-wide text-charcoal dark:text-stone-50">
              AUREVIAN <span className="h-1.5 w-1.5 rounded-full bg-brass-500" />
            </div>
            <p className="eyebrow mt-3">Institutional Management</p>
            <p className="mt-5 max-w-xs text-[12px] leading-relaxed text-stone-500 dark:text-stone-500">
              A single, considered portal for students, faculty and administration — built for institutions that treat
              every detail as consequential.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-[13px]">
            <div className="space-y-2">
              <p className="eyebrow mb-3">Product</p>
              {['Platform', 'Solutions', 'Why Aurevian', 'Contact'].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-stone-600 transition-colors duration-300 ease-luxe hover:text-charcoal dark:text-stone-300 dark:hover:text-stone-100">
                  {l}
                </a>
              ))}
            </div>
            <div className="space-y-2">
              <p className="eyebrow mb-3">Portal</p>
              <Link to="/login" className="block text-stone-600 transition-colors duration-300 ease-luxe hover:text-charcoal dark:text-stone-300 dark:hover:text-stone-100">Sign in as student</Link>
              <Link to="/login" className="block text-stone-600 transition-colors duration-300 ease-luxe hover:text-charcoal dark:text-stone-300 dark:hover:text-stone-100">Sign in as faculty</Link>
              <Link to="/login" className="block text-stone-600 transition-colors duration-300 ease-luxe hover:text-charcoal dark:text-stone-300 dark:hover:text-stone-100">Sign in as admin</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-stone-200/80 pt-6 text-[11px] text-stone-500 dark:border-stone-800 dark:text-stone-500 sm:flex-row sm:items-center">
          <span>© 2026 Aurevian Educational Systems. Demo build — data shown is illustrative.</span>
          <span>Crafted with care for institutional detail.</span>
        </div>
      </div>
    </footer>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal antialiased dark:bg-ink dark:text-stone-100">
      <Grain />
      <Navbar />
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: EASE }}>
        <Hero />
        <StatsBand />
        <Solutions />
        <Platform />
        <Personas />
        <Why />
        <Contact />
      </motion.main>
      <Footer />
    </div>
  )
}