'use client'

import { motion } from 'framer-motion'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { CalendarClock, Plus, ThermometerSun } from 'lucide-react'
import {
  productionBatches,
  lineUtilization,
} from '@/data/production'
import { CardWrapper } from '@/components/card-wrapper'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ProductionSchedule() {
  return (
    <CardWrapper
      title="Today’s Production Schedule"
      subtitle="Timeline view plus live line utilization"
    >
      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="flex-1 space-y-4">
          {productionBatches.map((batch, index) => (
            <motion.div
              key={batch.id}
              className="border border-border/70 rounded-2xl p-4 shadow-sm flex flex-col gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {batch.line}
                  </p>
                  <p className="text-lg font-semibold text-foreground">{batch.product}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: `${batch.color}15`, color: batch.color }}>
                  {batch.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarClock className="w-4 h-4" />
                  {batch.start} – {batch.end}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ThermometerSun className="w-4 h-4" />
                  Stage: <span className="font-medium text-foreground">{batch.stage}</span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: batch.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${batch.status === 'In Progress' ? 65 : batch.status === 'Scheduled' ? 25 : 85}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="xl:w-72 space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Schedule Batch
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Create Production Slot</DialogTitle>
                <DialogDescription>Mock scheduling form for a new batch.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Product</Label>
                  <Input placeholder="e.g., PainRelief 500mg" />
                </div>
                <div>
                  <Label>Line</Label>
                  <Input placeholder="Tablet Line 2" />
                </div>
                <div>
                  <Label>Start</Label>
                  <Input type="time" defaultValue="07:00" />
                </div>
                <div>
                  <Label>End</Label>
                  <Input type="time" defaultValue="13:00" />
                </div>
                <div>
                  <Label>Status</Label>
                  <Input placeholder="Scheduled" />
                </div>
                <div className="col-span-2">
                  <Label>Notes</Label>
                  <Textarea rows={3} placeholder="Add process instructions" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost">Cancel</Button>
                <Button>Save Slot</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
            <h4 className="text-sm font-semibold mb-4">Line Utilization</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineUtilization} margin={{ top: 10, left: 0, right: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="line1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="line2" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="hour" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" domain={[30, 100]} fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} />
                  <Area type="monotone" dataKey="line1" stroke="#2563eb" fill="url(#line1)" name="Line 1" />
                  <Area type="monotone" dataKey="line2" stroke="#06b6d4" fill="url(#line2)" name="Line 2" />
                  <Area type="monotone" dataKey="line3" stroke="#8b5cf6" fillOpacity={0.1} name="Line 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  )
}
