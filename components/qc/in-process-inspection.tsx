'use client'

import { motion } from 'framer-motion'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts'
import { inProcessMetrics, inProcessLots } from '@/data/qc'
import { CardWrapper } from '@/components/card-wrapper'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useEffect, useMemo, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

const lines = ['Line 1', 'Line 2', 'Line 3']
const PAGE_SIZE = 4

export function InProcessInspection() {
  const [lineFilter, setLineFilter] = useState('Line 1')
  const [noteOpen, setNoteOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [drawerLot, setDrawerLot] = useState<typeof inProcessLots[number] | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [formData, setFormData] = useState({ batch: '', line: '', stage: '', status: 'Within Limits', temp: '', torque: '' })

  const filtered = inProcessMetrics.filter((metric) => metric.line === lineFilter)
  const tableFiltered = useMemo(
    () =>
      inProcessLots.filter((lot) =>
        `${lot.batch} ${lot.stage} ${lot.status}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  )
  const totalPages = Math.max(1, Math.ceil(tableFiltered.length / PAGE_SIZE))
  const paginated = useMemo(
    () => tableFiltered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [tableFiltered, page],
  )

  useEffect(() => {
    setPage(1)
  }, [search])

  const resetForm = () => setFormData({ batch: '', line: '', stage: '', status: 'Within Limits', temp: '', torque: '' })

  const handleSubmit = () => {
    // simulate save
    setFormOpen(false)
    resetForm()
  }

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
          <Button variant="outline" className="ml-auto" onClick={() => setFormOpen(true)}>
            Add Sample
          </Button>
          <Button onClick={() => setNoteOpen(true)}>Log Deviation</Button>
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
          <div className="rounded-2xl border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold">Lot Surveillance</h4>
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search batch or status" className="max-w-xs" />
            </div>
            <div className="overflow-hidden rounded-lg border border-border/60">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="p-3">Batch</th>
                    <th>Stage</th>
                    <th>Status</th>
                    <th>Line</th>
                    <th className="text-right pr-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((lot) => (
                    <motion.tr key={lot.id} className="border-t border-border/60" whileHover={{ backgroundColor: 'var(--muted)' }}>
                      <td className="p-3 font-semibold text-foreground">{lot.batch}</td>
                      <td>{lot.stage}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            lot.status === 'Deviation'
                              ? 'bg-red-50 text-red-600'
                              : lot.status === 'Alert'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {lot.status}
                        </span>
                      </td>
                      <td>{lot.line}</td>
                      <td>
                        <div className="flex justify-end gap-2 pr-3">
                          <Button variant="ghost" size="sm" onClick={() => setDrawerLot(lot)}>
                            Details
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {tableFiltered.length === 0 && <p className="text-center py-4 text-muted-foreground">No lots match the current filters.</p>}
            </div>
            {tableFiltered.length > 0 && (
              <Pagination className="py-3">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <PaginationItem key={idx}>
                      <PaginationLink isActive={page === idx + 1} onClick={() => setPage(idx + 1)}>
                        {idx + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext onClick={() => setPage((p) => Math.min(totalPages, p + 1))} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
          <div className="rounded-2xl border border-border p-4">
            <h4 className="text-sm font-semibold mb-4">Torque & Temp Envelope</h4>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={inProcessLots} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="batch" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis yAxisId="left" stroke="var(--muted-foreground)" fontSize={12} domain={[35, 40]} />
                <YAxis yAxisId="right" orientation="right" stroke="var(--muted-foreground)" domain={[10, 22]} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} />
                <Area type="monotone" yAxisId="left" dataKey="temp" stroke="#2563eb" fill="#2563eb22" name="Temp (°C)" />
                <Area type="monotone" yAxisId="right" dataKey="torque" stroke="#16a34a" fill="#16a34a22" name="Torque (Nm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
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

      <Dialog open={formOpen} onOpenChange={(open) => {
        setFormOpen(open)
        if (!open) resetForm()
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log In-Process Sample</DialogTitle>
            <DialogDescription>Capture mid-batch readings for QA visibility.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="batch">Batch</Label>
              <Input id="batch" value={formData.batch} onChange={(e) => setFormData((prev) => ({ ...prev, batch: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="line">Line</Label>
              <Input id="line" value={formData.line} onChange={(e) => setFormData((prev) => ({ ...prev, line: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="stage">Stage</Label>
              <Input id="stage" value={formData.stage} onChange={(e) => setFormData((prev) => ({ ...prev, stage: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Input id="status" value={formData.status} onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="temp">Temp (°C)</Label>
              <Input id="temp" value={formData.temp} onChange={(e) => setFormData((prev) => ({ ...prev, temp: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="torque">Torque (Nm)</Label>
              <Input id="torque" value={formData.torque} onChange={(e) => setFormData((prev) => ({ ...prev, torque: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save Sample</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={!!drawerLot} onOpenChange={() => setDrawerLot(null)}>
        <SheetContent side="right" className="sm:max-w-md">
          {drawerLot && (
            <>
              <SheetHeader>
                <SheetTitle>{drawerLot.batch}</SheetTitle>
                <SheetDescription>
                  {drawerLot.stage} • {drawerLot.line}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-semibold">{drawerLot.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Timestamp</p>
                  <p className="font-semibold">{drawerLot.timestamp}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Temp</p>
                  <p className="font-semibold">{drawerLot.temp} °C</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Torque</p>
                  <p className="font-semibold">{drawerLot.torque} Nm</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Analyst</p>
                  <p className="font-semibold">{drawerLot.analyst}</p>
                </div>
              </div>
              <div className="mt-4">
                <Textarea rows={4} placeholder="Add investigation notes" />
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="ghost">Escalate</Button>
                <Button>Mark Reviewed</Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  )
}
