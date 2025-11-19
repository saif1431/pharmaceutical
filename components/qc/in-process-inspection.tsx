'use client'

import { motion } from 'framer-motion'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { inProcessMetrics } from '@/data/qc'
import { CardWrapper } from '@/components/card-wrapper'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

const lines = ['Line 1', 'Line 2', 'Line 3']

export function InProcessInspection() {
  const [lineFilter, setLineFilter] = useState('Line 1')
  const [noteOpen, setNoteOpen] = useState(false)
  const filtered = inProcessMetrics.filter((metric) => metric.line === lineFilter)

  return (
    <section className="space-y-6">
      <CardWrapper title="In-Process Monitoring" subtitle="Live blend and compression checkpoints">
        <div className="flex flex-wrap items-center gap-3">
          {lines.map((line) => (
            <button
              key={line}
              onClick={() => setLineFilter(line)}
              className={`rounded-full px-4 py-1 text-sm font-medium border ${lineFilter === line ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground'}`}
            >
              {line}
            </button>
          ))}
          <Button className='ml-auto' onClick={() => setNoteOpen(true)}>Log Deviation</Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Current Temp', value: `${filtered.at(-1)?.temp ?? '—'} °C` },
            { label: 'Pressure', value: `${filtered.at(-1)?.pressure ?? '—'} bar` },
            { label: 'Samples Pending', value: '3 lots' },
          ].map((stat, idx) => (
            <motion.div key={stat.label} className="rounded-2xl border border-border p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <p className="text-xs uppercase text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-border p-4">
          <h4 className="text-sm font-semibold mb-4">Process Parameters vs Spec</h4>
          <ResponsiveContainer width='100%' height={280}>
            <LineChart data={filtered} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray='3 3' stroke='var(--border)' />
              <XAxis dataKey='time' stroke='var(--muted-foreground)' fontSize={12} />
              <YAxis yAxisId='left' stroke='var(--muted-foreground)' domain={[35, 40]} />
              <YAxis yAxisId='right' orientation='right' stroke='var(--muted-foreground)' domain={[1, 1.6]} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} />
              <Line yAxisId='left' type='monotone' dataKey='temp' stroke='#2563eb' name='Temp (°C)' strokeWidth={2} activeDot={{ r: 6 }} />
              <Line yAxisId='right' type='monotone' dataKey='pressure' stroke='#f97316' name='Pressure (bar)' strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          {['Blend Uniformity', 'Compression Weight', 'Hardness'].map((check, idx) => (
            <motion.div key={check} className="rounded-2xl border border-border p-4 flex items-center justify-between" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
              <div>
                <p className="text-sm font-semibold text-foreground">{check}</p>
                <p className="text-xs text-muted-foreground">Last check 20 min ago</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">Pass</span>
            </motion.div>
          ))}
        </div>
      </CardWrapper>

      <Dialog open={noteOpen} onOpenChange={setNoteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log In-Process Deviation</DialogTitle>
            <DialogDescription>Record observations for QA follow-up.</DialogDescription>
          </DialogHeader>
          <Textarea placeholder='Describe deviation, lot, equipment' rows={4} />
          <DialogFooter>
            <Button variant='ghost' onClick={() => setNoteOpen(false)}>Cancel</Button>
            <Button>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
