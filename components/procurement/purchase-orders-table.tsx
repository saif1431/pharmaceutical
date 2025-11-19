'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { purchaseOrders, type PurchaseOrder, type PurchaseOrderStatus } from '@/data/procurement'
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

const statusOptions: PurchaseOrderStatus[] = ['Draft', 'Pending Approval', 'Approved', 'In Transit', 'Received']
const priorityOptions = ['Low', 'Medium', 'High'] as const

const statusColors: Record<PurchaseOrderStatus, string> = {
  Draft: 'bg-slate-100 text-slate-700',
  'Pending Approval': 'bg-amber-100 text-amber-700',
  Approved: 'bg-emerald-100 text-emerald-700',
  'In Transit': 'bg-blue-100 text-blue-700',
  Received: 'bg-cyan-100 text-cyan-700',
}

const priorityColors = {
  Low: 'bg-slate-100 text-slate-600',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-red-100 text-red-700',
}

export function PurchaseOrdersTable() {
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [priorityFilter, setPriorityFilter] = useState<string>('All')
  const [search, setSearch] = useState('')
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [formState, setFormState] = useState({
    supplier: '',
    category: 'Active Ingredients',
    amount: '',
    currency: 'USD',
    priority: 'Medium',
    items: '',
    dueDate: '',
    notes: '',
  })

  const filteredOrders = useMemo(() => {
    return purchaseOrders.filter((po) => {
      const matchesSearch = (
        po.id.toLowerCase().includes(search.toLowerCase()) ||
        po.supplier.toLowerCase().includes(search.toLowerCase())
      )
      const matchesStatus = statusFilter === 'All' || po.status === statusFilter
      const matchesPriority = priorityFilter === 'All' || po.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [priorityFilter, search, statusFilter])

  return (
    <CardWrapper
      title="Purchase Orders"
      subtitle="Filter, review, and approve current procurement pipeline"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-wrap gap-3">
          <div className="relative flex-1 min-w-[180px]">
            <Filter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search PO or supplier"
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Priorities</SelectItem>
              {priorityOptions.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2" onClick={() => setIsCreateOpen(true)}>
            <PlusCircle className="h-4 w-4" />
            New Purchase Order
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO #</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((po) => (
              <TableRow key={po.id} className="cursor-pointer" onClick={() => setSelectedPO(po)}>
                <TableCell className="font-semibold text-foreground">{po.id}</TableCell>
                <TableCell>{po.supplier}</TableCell>
                <TableCell>{po.category}</TableCell>
                <TableCell>
                  {po.currency} {po.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusColors[po.status]}`}>
                    {po.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${priorityColors[po.priority]}`}>
                    {po.priority}
                  </span>
                </TableCell>
                <TableCell>{po.dueDate}</TableCell>
                <TableCell>{po.owner}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/procurement/purchase-orders/${po.id}`} className="text-primary text-sm font-medium">
                      View
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredOrders.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-6">No purchase orders match the selected filters.</p>
        )}
      </div>

      <Dialog open={!!selectedPO} onOpenChange={() => setSelectedPO(null)}>
        <DialogContent className="max-w-xl">
          {selectedPO && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPO.id}</DialogTitle>
                <DialogDescription>
                  {selectedPO.supplier} • {selectedPO.category}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-semibold">
                    {selectedPO.currency} {selectedPO.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-semibold">{selectedPO.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Priority</p>
                  <p className="font-semibold">{selectedPO.priority}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Owner</p>
                  <p className="font-semibold">{selectedPO.owner}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Due Date</p>
                  <p className="font-semibold">{selectedPO.dueDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Lead Time</p>
                  <p className="font-semibold">{selectedPO.leadTimeDays} days</p>
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Link href={`/procurement/purchase-orders/${selectedPO.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
                <Button>Approve Request</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
            <DialogDescription>Use dummy data to simulate creating a new request.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Supplier</Label>
              <Input
                value={formState.supplier}
                onChange={(e) => setFormState((prev) => ({ ...prev, supplier: e.target.value }))}
                placeholder="Supplier name"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={formState.category}
                onValueChange={(value) => setFormState((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active Ingredients">Active Ingredients</SelectItem>
                  <SelectItem value="Packaging">Packaging</SelectItem>
                  <SelectItem value="Excipients">Excipients</SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                min="0"
                value={formState.amount}
                onChange={(e) => setFormState((prev) => ({ ...prev, amount: e.target.value }))}
                placeholder="Amount"
              />
            </div>
            <div>
              <Label>Currency</Label>
              <Select
                value={formState.currency}
                onValueChange={(value) => setFormState((prev) => ({ ...prev, currency: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select
                value={formState.priority}
                onValueChange={(value) => setFormState((prev) => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Items</Label>
              <Input
                type="number"
                min="1"
                value={formState.items}
                onChange={(e) => setFormState((prev) => ({ ...prev, items: e.target.value }))}
                placeholder="# line items"
              />
            </div>
            <div>
              <Label>Due Date</Label>
              <Input
                type="date"
                value={formState.dueDate}
                onChange={(e) => setFormState((prev) => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Notes / Justification</Label>
              <Textarea
                rows={3}
                value={formState.notes}
                onChange={(e) => setFormState((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Describe business justification"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateOpen(false)}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardWrapper>
  )
}
