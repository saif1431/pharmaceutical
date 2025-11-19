'use client'

import { motion } from 'framer-motion'
import { CardWrapper } from './card-wrapper'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FileCheck, TrendingUp, AlertCircle } from 'lucide-react'

const sopComplianceData = [
  { week: 'W1', compliance: 92 },
  { week: 'W2', compliance: 94 },
  { week: 'W3', compliance: 91 },
  { week: 'W4', compliance: 96 },
  { week: 'W5', compliance: 95 },
]

const auditLog = [
  { id: 'A-001', date: '2024-11-18', dept: 'Manufacturing', status: 'Passed', score: '98%' },
  { id: 'A-002', date: '2024-11-15', dept: 'Quality Lab', status: 'Passed', score: '95%' },
  { id: 'A-003', date: '2024-11-12', dept: 'Warehousing', status: 'Passed', score: '92%' },
  { id: 'A-004', date: '2024-11-08', dept: 'Packaging', status: 'Passed', score: '97%' },
]

const capaItems = [
  { id: 'CAPA-001', issue: 'Temperature Deviation', status: 'In Progress', progress: 65 },
  { id: 'CAPA-002', issue: 'Label Defect', status: 'Completed', progress: 100 },
  { id: 'CAPA-003', issue: 'Moisture Control', status: 'In Progress', progress: 40 },
]

export function QualityAssurance() {
  return (
    <CardWrapper
      title="Quality Assurance (QA)"
      subtitle="SOP compliance and audit tracking"
    >
      <div className="space-y-6">
        {/* Overall Compliance */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">SOP Compliance</p>
              <p className="text-3xl font-bold text-primary mt-1">94.8%</p>
            </div>
            <FileCheck className="w-6 h-6 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">Target: 95% • Current: 94.8% • Gap: -0.2%</p>
        </div>

        {/* Compliance Trend */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="text-sm font-medium text-foreground mb-4">Compliance Trend (Weekly)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sopComplianceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" domain={[85, 100]} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: 'none', borderRadius: '8px' }} />
              <Line
                type="monotone"
                dataKey="compliance"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{ fill: 'var(--chart-1)', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Audit Log */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Recent Audit Results
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {auditLog.map((audit, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between p-3 rounded bg-muted/50 text-xs"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div>
                  <p className="text-foreground font-medium">{audit.dept}</p>
                  <p className="text-muted-foreground">{audit.id} • {audit.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-medium">
                    {audit.score}
                  </span>
                  <span className="text-muted-foreground">{audit.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CAPA Progress */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            CAPA Progress Flowchart
          </h3>
          <div className="space-y-3">
            {capaItems.map((item, i) => (
              <motion.div
                key={i}
                className="p-3 rounded bg-muted/50 border border-border/50"
                whileHover={{ scale: 1.01 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.issue}</p>
                    <p className="text-xs text-muted-foreground">{item.id}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.status === 'Completed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      item.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{item.progress}% Complete</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CardWrapper>
  )
}
