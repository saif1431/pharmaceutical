'use client'

import { motion } from 'framer-motion'
import { finishedGoodsLots } from '@/data/qc'
import { CardWrapper } from '@/components/card-wrapper'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

export function FinishedGoodsInspection() {
  const [search, setSearch] = useState('')
  const [selectedLot, setSelectedLot] = useState<typeof finishedGoodsLots[number] | null>(null)
  const filtered = finishedGoodsLots.filter((lot) => lot.lot.toLowerCase().includes(search.toLowerCase()) || lot.product.toLowerCase().includes(search.toLowerCase()))

  return (
    <section className="space-y-6">
      <CardWrapper title="Finished Goods Inspection" subtitle="Release status, lab data, and signatures">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search lot or product" className="lg:max-w-xs" />
          <div className="flex gap-2">
            <Button variant="outline">Download COA</Button>
            <Button>Schedule Sampling</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Awaiting Release', value: filtered.filter((lot) => lot.status === 'Awaiting Release').length },
            { label: 'Released lots (30d)', value: '12' },
            { label: 'On Hold', value: '2' },
          ].map((card, idx) => (
            <motion.div key={card.label} className="rounded-2xl border border-border p-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="text-3xl font-semibold text-foreground">{card.value}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="p-3">Lot</th>
                <th>Product</th>
                <th>Assay</th>
                <th>Dissolution</th>
                <th>Micro</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lot) => (
                <motion.tr key={lot.lot} className="border-t border-border/70" whileHover={{ backgroundColor: 'var(--muted)' }}>
                  <td className="p-3 font-semibold text-foreground">{lot.lot}</td>
                  <td>{lot.product}</td>
                  <td>{lot.assay}%</td>
                  <td>{lot.dissolution}</td>
                  <td>{lot.micro}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${lot.status === 'Released' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {lot.status}
                    </span>
                  </td>
                  <td>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedLot(lot)}>
                      Decide
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center py-6 text-muted-foreground">No finished goods found.</p>}
        </div>
      </CardWrapper>

      <Dialog open={!!selectedLot} onOpenChange={() => setSelectedLot(null)}>
        <DialogContent className="max-w-lg">
          {selectedLot && (
            <>
              <DialogHeader>
                <DialogTitle>Release Decision</DialogTitle>
                <DialogDescription>
                  {selectedLot.lot} • {selectedLot.product}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Assay</p>
                  <p className="font-semibold">{selectedLot.assay}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Micro</p>
                  <p className="font-semibold">{selectedLot.micro}</p>
                </div>
              </div>
              <Textarea rows={3} placeholder='Decision notes / signature text' className='mt-4' />
              <DialogFooter>
                <Button variant='ghost'>Hold Lot</Button>
                <Button>Approve Release</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
