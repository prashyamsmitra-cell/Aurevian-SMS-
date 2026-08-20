export function fmtCurrency(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function attendancePercent(days: { status: string }[]) {
  if (!days.length) return 0
  const present = days.filter((d) => d.status === 'Present').length
  return Math.round((present / days.length) * 1000) / 10
}

export function initialsOf(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
}
