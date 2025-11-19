'use client'

import { motion } from 'framer-motion'
import { CardWrapper } from './card-wrapper'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { CheckCircle, XCircle, Zap } from 'lucide-react'

const qualityData = [
  { batch: 'B-2401', approved: 98, rejected: 2 },
  { batch: 'B-2402', approved: 96, rejected: 4 },
  { batch: 'B-2403', approved: 99, rejected: 1 },
  { batch: 'B-2404', approved: 97, rejected: 3 },
  { batch: 'B-2405', approved: 99, rejected: 1 },
]

const defectData = [
  { name: 'Color Variation', value: 12, color: '#f59e0b' },
  { name: 'Size Deviation', value: 8, color: '#dc2626' },
  { name: 'Packaging', value: 5, color: '#ec4899' },
  { name: 'Labeling', value: 3, color: '#8b5cf6' },
]

const qcChecklist = [
  { item: 'Visual Inspection', status: 'pass' },
  { item: 'Potency Testing', status: 'pass' },
  { item: 'Moisture Analysis', status: 'pass' },
  { item: 'Dissolution Test', status: 'pass' },
  { item: 'Microbial Limits', status: 'pass' },
]

export function QualityControl() {
  return (
    <CardWrapper
      title="Quality Control (QC)"
      subtitle="Batch approval rates and defect tracking"
    >
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-2 border-emerald-200 dark:border-emerald-800 rounded-lg p-5 transition-all hover:border-emerald-400"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-300 uppercase tracking-wide">Approved Batches</p>
              <p className="text-3xl font-bold text-foreground mt-2">4,847</p>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300 mt-2">98.2% Pass Rate</p>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-2 border-red-200 dark:border-red-800 rounded-lg p-5 transition-all hover:border-red-400"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-red-600 dark:text-red-300 uppercase tracking-wide">Rejected Batches</p>
              <p className="text-3xl font-bold text-foreground mt-2">89</p>
              <p className="text-sm font-semibold text-red-600 dark:text-red-300 mt-2">1.8% Reject Rate</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batch Quality Trend */}
        <div className="bg-card border border-border rounded-xl shadow-sm transition-all hover:shadow-md">
          <h3 className="text-sm font-semibold text-foreground mb-4 p-4">Recent Batch Results</h3>
          <div className="px-4 pb-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={qualityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="batch" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="approved" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="rejected" fill="var(--chart-5)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Defects Distribution */}
        <div className="bg-card border border-border rounded-xl shadow-sm transition-all hover:shadow-md">
          <h3 className="text-sm font-semibold text-foreground mb-4 p-4">Defect Categories</h3>
          <div className="px-4 pb-4 flex items-center justify-center gap-6">
            <ResponsiveContainer width="45%" height={240}>
              <PieChart>
                <Pie
                  data={defectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {defectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center gap-2">
              {defectData.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between p-2 rounded bg-muted/50 hover:bg-muted transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-medium text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-foreground">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-card border border-border rounded-xl shadow-sm transition-all hover:shadow-md p-4">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">QC Inspection Checklist</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {qcChecklist.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-5 h-5 rounded-full border-2 border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
              </div>
              <span className="text-sm font-medium text-foreground">{item.item}</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 ml-auto">✓</span>
            </motion.div>
          ))}
        </div>
      </div>
    </CardWrapper>
  )
}
