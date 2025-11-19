'use client'

import { motion } from 'framer-motion'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { rawMaterialLots, qcThroughputTrend } from '@/data/qc'
import { CardWrapper } from '@/components/card-wrapper'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useMemo, useState } from 'react'

const statusColorMap: Record<string, string> = {
  Pending: '#fbbf24',
  Approved: '#10b981',
  Quarantine: '#f87171',
}

const PAGE_SIZE = 5

export function RawMaterialInspection() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [drawerLot, setDrawerLot] = useState<typeof rawMaterialLots[number] | null>(null)
  const [formState, setFormState] = useState<{ mode: 'create' | 'edit'; lot?: typeof rawMaterialLots[number] } | null>(null)
  const [formData, setFormData] = useState({
    batch: '',
    supplier: '',
    material: '',
    status: 'Pending',
    moisture: '0.0',
    receivedAt: '',
  })

  const filtered = useMemo(
    () =>
      rawMaterialLots.filter((lot) =>
        `${lot.batch} ${lot.material} ${lot.supplier}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page],
  )

  useEffect(() => {
    setPage(1)
  }, [search])

  useEffect(() => {
    if (formState?.lot) {
      setFormData({
        batch: formState.lot.batch,
        supplier: formState.lot.supplier,
        material: formState.lot.material,
        status: formState.lot.status,
        moisture: String(formState.lot.moisture),
        receivedAt: formState.lot.receivedAt,
      })
    } else {
      setFormData({ batch: '', supplier: '', material: '', status: 'Pending', moisture: '0.0', receivedAt: '' })
    }
  }, [formState])

  const chartData = Object.entries(
    rawMaterialLots.reduce<Record<string, number>>((acc, lot) => {
      acc[lot.status] = (acc[lot.status] ?? 0) + 1
      return acc
    }, {}),
  ).map(([name, value]) => ({ name, value, color: statusColorMap[name] }))

  return (
    <section className="space-y-6">
      <CardWrapper title="Raw Material Queue" subtitle="Track supplier intake, COA status, and quarantine actions">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search batch or material" className="lg:max-w-xs" />
          <div className="flex gap-3">
            <Button variant="outline">Download log</Button>
            <Button onClick={() => setFormState({ mode: 'create' })}>New inspection</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {[{ label: 'Pending Lots', value: rawMaterialLots.filter((lot) => lot.status === 'Pending').length, color: 'text-amber-600' }, { label: 'Approved', value: rawMaterialLots.filter((lot) => lot.status === 'Approved').length, color: 'text-emerald-600' }, { label: 'Quarantine', value: rawMaterialLots.filter((lot) => lot.status === 'Quarantine').length, color: 'text-red-600' }].map((stat, idx) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-border p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="p-3">Batch</th>
                  <th>Material</th>
                  <th>Supplier</th>
                  <th>Moisture %</th>
                  <th>COA</th>
                  <th>Status</th>
                  <th className="text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((lot) => (
                  <motion.tr key={lot.batch} className="border-t border-border/60" whileHover={{ backgroundColor: 'var(--muted)' }}>
                    <td className="p-3 font-semibold text-foreground">{lot.batch}</td>
                    <td>{lot.material}</td>
                    <td>{lot.supplier}</td>
                    <td>{lot.moisture}%</td>
                    <td>{lot.coaReceived ? 'Received' : 'Missing'}</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: statusColorMap[lot.status] + '33', color: statusColorMap[lot.status] }}>
                        {lot.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-end gap-2 pr-4">
                        <Button variant="ghost" size="sm" onClick={() => setDrawerLot(lot)}>
                          Details
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setFormState({ mode: 'edit', lot })}>
                          Edit
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="text-center py-6 text-muted-foreground">No lots match the current filters.</p>}
            {filtered.length > 0 && (
              <Pagination className="border-t border-border/60 py-3">
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
            <h4 className="text-sm font-semibold mb-3">Status Distribution</h4>
            <ResponsiveContainer width="45%" height={220}>
              <BarChart data={qcThroughputTrend} margin={{ top: 10, left: 0, right: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} />
                <Bar dataKey="pass" fill="#10b981" name="Pass %" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fail" fill="#ef4444" name="Fail %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2 text-xs text-muted-foreground">
              <p>Daily throughput trend mixing pass/fail/rework loads.</p>
              <p>Use this to prioritize retests before production release windows close.</p>
            </div>
          </div>
        </div>
      </CardWrapper>

      <Sheet open={!!drawerLot} onOpenChange={() => setDrawerLot(null)}>
        <SheetContent side="right" className="sm:max-w-xl">
          {drawerLot && (
            <>
              <SheetHeader>
                <SheetTitle>{drawerLot.batch}</SheetTitle>
                <SheetDescription>
                  {drawerLot.material} • {drawerLot.supplier}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-semibold">{drawerLot.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Received</p>
                  <p className="font-semibold">{drawerLot.receivedAt}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Moisture</p>
                  <p className="font-semibold">{drawerLot.moisture}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">COA</p>
                  <p className="font-semibold">{drawerLot.coaReceived ? 'Available' : 'Missing'}</p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-2">Notes</h4>
                <Textarea rows={4} defaultValue="Incoming inspection queued for 10:00 QA slot." />
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="ghost">Reject Lot</Button>
                <Button>Approve Lot</Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={!!formState} onOpenChange={() => setFormState(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{formState?.mode === 'edit' ? 'Edit Inspection' : 'New Inspection'}</DialogTitle>
            <DialogDescription>Capture receiving and COA metadata (sample only).</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="batch">Batch</Label>
              <Input id="batch" value={formData.batch} onChange={(e) => setFormData((prev) => ({ ...prev, batch: e.target.value }))} placeholder="RM-XXX" />
            </div>
            <div>
              <Label htmlFor="material">Material</Label>
              <Input id="material" value={formData.material} onChange={(e) => setFormData((prev) => ({ ...prev, material: e.target.value }))} placeholder="API Name" />
            </div>
            <div>
              <Label htmlFor="supplier">Supplier</Label>
              <Input id="supplier" value={formData.supplier} onChange={(e) => setFormData((prev) => ({ ...prev, supplier: e.target.value }))} placeholder="Supplier Co." />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Input id="status" value={formData.status} onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))} placeholder="Pending" />
            </div>
            <div>
              <Label htmlFor="moisture">Moisture (%)</Label>
              <Input id="moisture" value={formData.moisture} onChange={(e) => setFormData((prev) => ({ ...prev, moisture: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="received">Received Date</Label>
              <Input id="received" type="date" value={formData.receivedAt} onChange={(e) => setFormData((prev) => ({ ...prev, receivedAt: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setFormState(null)}>
              Cancel
            </Button>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
