'use client'

import { motion } from 'framer-motion'
import { CardWrapper } from './card-wrapper'
import { Clock, Zap } from 'lucide-react'

const workOrders = [
  { id: 'WO-001', product: 'Aspirin 500mg Tablets', status: 'In Progress', progress: 75, dueDate: '2024-11-25' },
  { id: 'WO-002', product: 'Vitamin D3 Capsules', status: 'Scheduled', progress: 0, dueDate: '2024-11-27' },
  { id: 'WO-003', product: 'Ibuprofen 200mg', status: 'Completed', progress: 100, dueDate: '2024-11-20' },
  { id: 'WO-004', product: 'Metformin Tablets', status: 'In Progress', progress: 45, dueDate: '2024-11-28' },
]

const statusColors = {
  'In Progress': 'bg-blue-500/20 text-blue-400',
  'Scheduled': 'bg-gray-500/20 text-gray-400',
  'Completed': 'bg-green-500/20 text-green-400',
}

export function ProductionPlanning() {
  return (
    <CardWrapper
      title="Production Planning"
      subtitle="Work orders and production schedule"
    >
      <div className="space-y-4">
        {/* Timeline Overview */}
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-medium text-foreground">Production Timeline</h3>
          </div>
          <div className="flex gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <motion.div
                key={i}
                className="flex-1 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-xs text-muted-foreground mb-2">{day}</p>
                <div className={`h-8 rounded-lg ${
                  i < 3 ? 'bg-primary/60' :
                  i < 5 ? 'bg-primary/40' :
                  'bg-muted/50'
                } transition-colors`} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Work Orders */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Active Work Orders
          </h3>
          {workOrders.map((order, i) => (
            <motion.div
              key={i}
              className="bg-muted/30 rounded-lg p-4 border border-border/50"
              whileHover={{ scale: 1.01, borderColor: 'var(--primary)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{order.product}</p>
                  <p className="text-xs text-muted-foreground">{order.id} • Due: {order.dueDate}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                  {order.status}
                </span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${order.progress}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{order.progress}% Complete</p>
            </motion.div>
          ))}
        </div>
      </div>
    </CardWrapper>
  )
}
