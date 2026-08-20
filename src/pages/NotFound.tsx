import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-ivory dark:bg-ink px-6">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-4xl text-charcoal dark:text-stone-50 mb-4">This page has stepped out.</h1>
      <p className="text-stone-500 dark:text-stone-400 mb-8 max-w-sm">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/login" className="text-sm underline underline-offset-4 text-charcoal dark:text-stone-200">Return to sign in</Link>
    </div>
  )
}
