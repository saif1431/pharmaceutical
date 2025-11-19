'use client'

import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react'

interface ActivityItem {
  id: string
  title: string
  description: string
  time: string
  type: 'alert' | 'success' | 'pending' | 'info'
  icon: React.ReactNode
}

const activities: ActivityItem[] = [
  {
    id: '1',
    title: 'Production Target Met',
    description: 'Batch #P2024-001 completed ahead of schedule',
    time: '2 hours ago',
    type: 'success',
    icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: '2',
    title: 'Quality Alert',
    description: 'QC inspection flagged 3 units for rework',
    time: '4 hours ago',
    type: 'alert',
    icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
  },
  {
    id: '3',
    title: 'Shipment Pending',
    description: 'Order #ORD-2024-156 ready for dispatch',
    time: '6 hours ago',
    type: 'pending',
    icon: <Clock className="w-5 h-5 text-blue-600" />,
  },
  {
    id: '4',
    title: 'Inventory Low',
    description: 'Raw material Component-A below threshold',
    time: '1 day ago',
    type: 'info',
    icon: <TrendingUp className="w-5 h-5 text-purple-600" />,
  },
]

export function DashboardActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            className="flex gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
          >
            <div className="shrink-0 mt-1">{activity.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
