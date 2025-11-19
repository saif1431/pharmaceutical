'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Filter, PackagePlus, Share2 } from 'lucide-react'
import { inventoryItems, type InventoryItem, type InventoryType } from '@/data/inventory'
import { CardWrapper } from '@/components/card-wrapper'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const typeOptions: (InventoryType | 'All')[] = ['All', 'Raw Materials', 'Finished Goods']
const statusOptions = ['All', 'Healthy', 'Warning', 'Critical'] as const

const statusStyles: Record<InventoryItem['status'], string> = {
  Healthy: 'bg-emerald-50 text-emerald-600',
  Warning: 'bg-amber-50 text-amber-600',
  Critical: 'bg-red-50 text-red-600',
}

export function InventoryTable() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<(typeof typeOptions)[number]>('All')
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>('All')
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [isAdjustOpen, setIsAdjustOpen] = useState(false)
  const [isTransferOpen, setIsTransferOpen] = useState(false)
  const [adjustForm, setAdjustForm] = useState({ delta: '', reason: '' })
  const [transferForm, setTransferForm] = useState({ sku: '', quantity: '', from: '', to: '' })

  const filteredItems = useMemo(() => {
    return inventoryItems.filter((item) => {
      const matchesSearch =
        item.sku.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase())
      const matchesType = typeFilter === 'All' || item.type === typeFilter
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter
      return matchesSearch && matchesType && matchesStatus
    })
  }, [search, statusFilter, typeFilter])

  return (
    <CardWrapper
      title="Inventory Ledger"
      subtitle="Detailed stock ledger across warehouses with quick forms"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Filter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search SKU or material"
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as (typeof typeOptions)[number])}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as (typeof statusOptions)[number])}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setIsTransferOpen(true)}>
            <Share2 className="h-4 w-4" />
            Transfer Stock
          </Button>
          <Button className="gap-2" onClick={() => setIsAdjustOpen(true)}>
            <PackagePlus className="h-4 w-4" />
            Log Adjustment
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Temp</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.sku} className="cursor-pointer" onClick={() => setSelectedItem(item)}>
                <TableCell className="font-semibold text-foreground">{item.sku}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  {item.quantity.toLocaleString()} {item.unit}
                </TableCell>
                <TableCell>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusStyles[item.status]}`}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>{item.expiry}</TableCell>
                <TableCell>{item.temperature}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/inventory/${item.sku}`} className="text-primary text-sm font-medium">
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredItems.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-6">No inventory matches the selected filters.</p>
        )}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedItem.name}</DialogTitle>
                <DialogDescription>
                  {selectedItem.sku} • {selectedItem.location}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Quantity</p>
                  <p className="font-semibold">
                    {selectedItem.quantity.toLocaleString()} {selectedItem.unit}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-semibold">{selectedItem.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Expiry</p>
                  <p className="font-semibold">{selectedItem.expiry}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Temperature</p>
                  <p className="font-semibold">{selectedItem.temperature}</p>
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsAdjustOpen(true)}>
                  Adjust Stock
                </Button>
                <Button onClick={() => setIsTransferOpen(true)}>Transfer</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAdjustOpen} onOpenChange={setIsAdjustOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Log Stock Adjustment</DialogTitle>
            <DialogDescription>Update quantities for audit trail (mock only).</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Quantity Delta</Label>
              <Input
                type="number"
                value={adjustForm.delta}
                onChange={(e) => setAdjustForm((prev) => ({ ...prev, delta: e.target.value }))}
                placeholder="e.g., -45"
              />
            </div>
            <div>
              <Label>Reason</Label>
              <Textarea
                rows={3}
                value={adjustForm.reason}
                onChange={(e) => setAdjustForm((prev) => ({ ...prev, reason: e.target.value }))}
                placeholder="Cycle count variance, damage, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsAdjustOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAdjustOpen(false)}>Submit Adjustment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Transfer Request</DialogTitle>
            <DialogDescription>Mock workflow to move inventory between warehouses.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>SKU</Label>
              <Input
                value={transferForm.sku}
                onChange={(e) => setTransferForm((prev) => ({ ...prev, sku: e.target.value }))}
                placeholder="RM-CEF-250"
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                min="1"
                value={transferForm.quantity}
                onChange={(e) => setTransferForm((prev) => ({ ...prev, quantity: e.target.value }))}
              />
            </div>
            <div>
              <Label>From Location</Label>
              <Input
                value={transferForm.from}
                onChange={(e) => setTransferForm((prev) => ({ ...prev, from: e.target.value }))}
                placeholder="WH-01"
              />
            </div>
            <div>
              <Label>To Location</Label>
              <Input
                value={transferForm.to}
                onChange={(e) => setTransferForm((prev) => ({ ...prev, to: e.target.value }))}
                placeholder="WH-02"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsTransferOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsTransferOpen(false)}>Submit Transfer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardWrapper>
  )
}
