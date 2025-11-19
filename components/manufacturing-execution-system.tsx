'use client'

import { motion } from 'framer-motion'
import { CardWrapper } from './card-wrapper'
import { Activity, AlertTriangle, Zap } from 'lucide-react'

const machines = [
  { id: 'M-001', name: 'Tablet Press Line 1', status: 'Running', efficiency: 94, downtime: '2h 15m' },
  { id: 'M-002', name: 'Capsule Filling A', status: 'Running', efficiency: 88, downtime: '3h 42m' },
  { id: 'M-003', name: 'Blister Packaging', status: 'Idle', efficiency: 0, downtime: '8h 30m' },
  { id: 'M-004', name: 'Quality Inspector', status: 'Running', efficiency: 96, downtime: '1h 20m' },
]

const activityLog = [
  { time: '14:35', event: 'Tablet Press Line 1 - Batch completed', type: 'success' },
  { time: '14:22', event: 'Capsule Filling A - Manual adjustment', type: 'warning' },
  { time: '14:08', event: 'Blister Packaging - Maintenance completed', type: 'info' },
  { time: '13:45', event: 'Quality Inspector - Inspection passed', type: 'success' },
]

export function ManufacturingExecutionSystem() {
  return (
    <CardWrapper
      title="Manufacturing Execution System (MES)"
      subtitle="Machine health and production monitoring"
    >
      <div className="space-y-6">
        {/* Machine Health Indicators */}
        <div className="grid grid-cols-2 gap-3">
          {machines.map((machine, i) => (
            <motion.div
              key={i}
              className={`rounded-lg p-3 border ${
                machine.status === 'Running'
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-gray-500/10 border-gray-500/30'
              }`}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs font-medium text-foreground">{machine.name}</p>
                  <p className="text-xs text-muted-foreground">{machine.id}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  machine.status === 'Running'
                    ? 'bg-green-500 animate-pulse-glow'
                    : 'bg-gray-500'
                }`} />
              </div>
              
              {machine.status === 'Running' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Efficiency</span>
                    <span className="text-xs font-medium text-foreground">{machine.efficiency}%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="h-full bg-green-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${machine.efficiency}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground mt-2">Downtime: {machine.downtime}</p>
            </motion.div>
          ))}
        </div>

        {/* Live Activity Feed */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Live Activity Feed
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {activityLog.map((log, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-2 text-xs"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-muted-foreground min-w-fit">{log.time}</span>
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    log.type === 'success'
                      ? 'bg-green-500'
                      : log.type === 'warning'
                      ? 'bg-yellow-500'
                      : 'bg-blue-500'
                  }`}
                />
                <p className="text-muted-foreground grow">{log.event}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Downtime Tracking */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <div>
            <p className="text-xs font-medium text-foreground">Total Downtime (24h)</p>
            <p className="text-sm font-bold text-red-400">15h 47m</p>
          </div>
        </div>
      </div>
    </CardWrapper>
  )
}
