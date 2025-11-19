'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const productionData = [
  { month: 'Jan', units: 4200, target: 4500 },
  { month: 'Feb', units: 4800, target: 4500 },
  { month: 'Mar', units: 3800, target: 4500 },
  { month: 'Apr', units: 5200, target: 4500 },
  { month: 'May', units: 4900, target: 4500 },
  { month: 'Jun', units: 5800, target: 4500 },
]

const qualityMetrics = [
  { name: 'Passed', value: 92, color: '#10b981' },
  { name: 'Failed', value: 5, color: '#ef4444' },
  { name: 'Rework', value: 3, color: '#f59e0b' },
]

const inventoryTrend = [
  { month: 'Week 1', raw: 8500, finished: 3200 },
  { month: 'Week 2', raw: 8200, finished: 3400 },
  { month: 'Week 3', raw: 7800, finished: 3800 },
  { month: 'Week 4', raw: 8100, finished: 3600 },
]

export function DashboardCharts() {
  return (
    <div className="space-y-6">
      {/* Production Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <h3 className="text-lg font-semibold text-foreground mb-6">Production Output vs Target</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              cursor={{ fill: '#f1f5f9' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="units" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Actual Units" />
            <Bar dataKey="target" fill="#cbd5e1" radius={[8, 8, 0, 0]} name="Target Units" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Quality and Inventory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Quality Control Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={qualityMetrics} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                {qualityMetrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-6">
            {qualityMetrics.map((metric) => (
              <div key={metric.name} className="text-center">
                <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: metric.color }} />
                <p className="text-xs text-muted-foreground">{metric.name}</p>
                <p className="text-sm font-semibold text-foreground">{metric.value}%</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Inventory Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Inventory Levels (Weekly)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={inventoryTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Area type="monotone" dataKey="raw" stackId="1" stroke="#06b6d4" fill="#cffafe" name="Raw Materials" />
              <Area type="monotone" dataKey="finished" stackId="1" stroke="#0ea5e9" fill="#bfdbfe" name="Finished Goods" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Supplier Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <h3 className="text-lg font-semibold text-foreground mb-6">Supplier Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={productionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="units" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 5 }} name="On-Time Delivery" />
            <Line type="monotone" dataKey="target" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4', r: 5 }} name="Quality Score" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
