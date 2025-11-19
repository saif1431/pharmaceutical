'use client'

import { motion } from 'framer-motion'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { rawMaterialLots } from '@/data/qc'
import { CardWrapper } from '@/components/card-wrapper'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'

const statusColorMap: Record<string, string> = {
  Pending: '#fbbf24',
  Approved: '#10b981',
  Quarantine: '#f87171',
}

export function RawMaterialInspection() {
  const [search, setSearch] = useState('')
  const [selectedLot, setSelectedLot] = useState<typeof rawMaterialLots[number] | null>(null)
  const filtered = rawMaterialLots.filter((lot) => lot.batch.toLowerCase().includes(search.toLowerCase()) || lot.material.toLowerCase().includes(search.toLowerCase()))
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
            <Button>New inspection</Button>
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
                </tr>
              </thead>
              <tbody>
                {filtered.map((lot) => (
                  <motion.tr key={lot.batch} className="border-t border-border/60 cursor-pointer" whileHover={{ backgroundColor: 'var(--muted)' }} onClick={() => setSelectedLot(lot)}>
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
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="text-center py-6 text-muted-foreground">No lots match the current filters.</p>}
          </div>
          <div className="rounded-2xl border border-border p-4">
            <h4 className="text-sm font-semibold mb-3">Status Distribution</h4>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={chartData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {chartData.map((entry) => (
                <li key={entry.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}: {entry.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardWrapper>

      <Dialog open={!!selectedLot} onOpenChange={() => setSelectedLot(null)}>
        <DialogContent className="max-w-xl">
          {selectedLot && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedLot.batch}</DialogTitle>
                <DialogDescription>
                  {selectedLot.material} • {selectedLot.supplier}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Moisture</p>
                  <p className="font-semibold">{selectedLot.moisture}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-semibold">{selectedLot.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Received</p>
                  <p className="font-semibold">{selectedLot.receivedAt}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">COA</p>
                  <p className="font-semibold">{selectedLot.coaReceived ? 'Available' : 'Missing'}</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost">Reject</Button>
                <Button>Approve Lot</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
