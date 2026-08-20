import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, CheckCircle2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Card, Badge, SectionHeading, Divider } from '../../components/ui/Basics'
import { Modal, EmptyState } from '../../components/ui/Overlays'
import { Label, BoxInput, Select } from '../../components/ui/Field'
import Button from '../../components/ui/Button'
import { fmtCurrency, fmtDate } from '../../lib/utils'

export default function StudentFees() {
  const { session, fees, payFee } = useApp()
  const record = fees.find((f) => f.studentId === session?.id)
  const [modalOpen, setModalOpen] = useState(false)
  const [amount, setAmount] = useState(0)
  const [method, setMethod] = useState('UPI')
  const [step, setStep] = useState<'form' | 'success'>('form')

  if (!record) {
    return (
      <div>
        <SectionHeading title="Fees" subtitle="Manage your semester payments." />
        <Card><EmptyState title="No fee record found" subtitle="Contact administration if you believe this is an error." /></Card>
      </div>
    )
  }

  const outstanding = record.total - record.paid
  const progress = Math.round((record.paid / record.total) * 100)

  function openPay() {
    setAmount(outstanding)
    setStep('form')
    setModalOpen(true)
  }
  function confirmPay(e: React.FormEvent) {
    e.preventDefault()
    payFee(session!.id, amount, method)
    setStep('success')
  }

  return (
    <div>
      <SectionHeading eyebrow={record.semester} title="Fees" subtitle="Review your balance and make secure semester payments." />

      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        <Card className="p-7">
          <p className="font-display text-4xl text-charcoal dark:text-stone-50">{fmtCurrency(record.total)}</p>
          <p className="eyebrow mt-2">Total Fees</p>
        </Card>
        <Card className="p-7">
          <p className="font-display text-4xl text-emerald-700 dark:text-emerald-400">{fmtCurrency(record.paid)}</p>
          <p className="eyebrow mt-2">Paid</p>
        </Card>
        <Card className="p-7">
          <p className="font-display text-4xl text-claret-600 dark:text-claret-400">{fmtCurrency(outstanding)}</p>
          <p className="eyebrow mt-2">Outstanding</p>
        </Card>
      </div>

      <Card className="p-7 mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-charcoal dark:text-stone-100">Payment progress</p>
          <span className="text-sm text-stone-500">{progress}%</span>
        </div>
        <div className="h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden mb-6">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="h-full bg-brass-500 rounded-full" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-stone-500">Next due date: {fmtDate(record.dueDate)}</p>
          {outstanding > 0 ? (
            <Button onClick={openPay}><CreditCard size={15} /> Pay Now</Button>
          ) : (
            <Badge tone="success"><CheckCircle2 size={12} /> Fully paid</Badge>
          )}
        </div>
      </Card>

      <Card className="p-7">
        <p className="eyebrow mb-5">Transaction History</p>
        {record.transactions.length === 0 ? (
          <EmptyState title="No payments yet" subtitle="Your transaction history will appear here after your first payment." />
        ) : (
          <div className="space-y-4">
            {record.transactions.map((t, i) => (
              <div key={t.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-charcoal dark:text-stone-100">{fmtCurrency(t.amount)}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{t.method} · {t.reference}</p>
                  </div>
                  <span className="text-xs text-stone-500">{fmtDate(t.date)}</span>
                </div>
                {i < record.transactions.length - 1 && <Divider className="mt-4" />}
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={step === 'form' ? 'Make a Payment' : 'Payment Received'} subtitle={step === 'form' ? record.semester : undefined}>
        {step === 'form' ? (
          <form onSubmit={confirmPay} className="space-y-5">
            <div>
              <Label>Amount</Label>
              <BoxInput required type="number" min={1} max={outstanding} value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
              <p className="text-xs text-stone-500 mt-2">Outstanding balance: {fmtCurrency(outstanding)}</p>
            </div>
            <div>
              <Label>Payment method</Label>
              <Select value={method} onChange={(e) => setMethod(e.target.value)}>
                <option>UPI</option><option>Net Banking</option><option>Credit Card</option><option>Debit Card</option>
              </Select>
            </div>
            {method.includes('Card') && (
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Card number</Label>
                  <BoxInput required placeholder="4242 4242 4242 4242" maxLength={19} />
                </div>
                <div>
                  <Label>Expiry</Label>
                  <BoxInput required placeholder="MM/YY" />
                </div>
                <div>
                  <Label>CVV</Label>
                  <BoxInput required placeholder="•••" maxLength={3} />
                </div>
              </div>
            )}
            {method === 'UPI' && (
              <div>
                <Label>UPI ID</Label>
                <BoxInput required placeholder="yourname@upi" />
              </div>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button type="submit">Confirm Payment</Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-600/10 flex items-center justify-center mx-auto mb-5 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 size={26} />
            </div>
            <p className="font-display text-2xl text-charcoal dark:text-stone-50 mb-2">{fmtCurrency(amount)} received</p>
            <p className="text-sm text-stone-500 mb-8">A receipt has been added to your transaction history.</p>
            <Button onClick={() => setModalOpen(false)}>Done</Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
