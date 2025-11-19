'use client'

import { motion } from 'framer-motion'
import { CardWrapper } from './card-wrapper'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Package, CheckCircle, ArrowUpRight } from 'lucide-react'

const purchaseData = [
  { month: 'Jan', orders: 24, approved: 18 },
  { month: 'Feb', orders: 32, approved: 28 },
  { month: 'Mar', orders: 28, approved: 25 },
  { month: 'Apr', orders: 35, approved: 31 },
  { month: 'May', orders: 42, approved: 38 },
  { month: 'Jun', orders: 38, approved: 34 },
]

const supplierData = [
  { name: 'Supplier A', performance: 94 },
  { name: 'Supplier B', performance: 88 },
  { name: 'Supplier C', performance: 91 },
  { name: 'Supplier D', performance: 86 },
]

const statusData = [
  { name: 'Approved', value: 35, color: '#2563eb' },
  { name: 'Pending', value: 12, color: '#f59e0b' },
  { name: 'Rejected', value: 3, color: '#dc2626' },
]

export function ProcurementOverview() {
  return (
    <CardWrapper
      title="Procurement & Purchase Overview"
      subtitle="Monitor purchase orders and supplier performance"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Package, label: 'Total Orders', value: '284', trend: '+12%', color: 'from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900' },
          { icon: CheckCircle, label: 'Approved', value: '256', trend: '+8%', color: 'from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900' },
          { icon: TrendingUp, label: 'On-Time Rate', value: '94%', trend: '+2%', color: 'from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className={`bg-gradient-to-br ${stat.color} border border-primary/10 rounded-lg p-5 transition-all hover:border-primary/30 hover:shadow-md`}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
              </div>
              <stat.icon className="w-6 h-6 text-primary opacity-70" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-primary">
              <ArrowUpRight className="w-4 h-4" />
              <span>{stat.trend} this month</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Purchase Orders Trend */}
        <div className="bg-card border border-border rounded-xl shadow-sm transition-all hover:shadow-md">
          <h3 className="text-sm font-semibold text-foreground mb-4 p-4">Purchase Orders Trend</h3>
          <div className="px-4 pb-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={purchaseData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                  cursor={{ fill: 'var(--primary)', opacity: 0.1 }}
                />
                <Legend />
                <Bar dataKey="orders" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="approved" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Supplier Performance */}
        <div className="bg-card border border-border rounded-xl shadow-sm transition-all hover:shadow-md">
          <h3 className="text-sm font-semibold text-foreground mb-4 p-4">Supplier Performance</h3>
          <div className="px-4 pb-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={supplierData} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="performance" fill="var(--chart-3)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-card border border-border rounded-xl shadow-sm transition-all hover:shadow-md">
          <h3 className="text-sm font-semibold text-foreground mb-4 p-4">Order Status Distribution</h3>
          <div className="px-4 pb-4 flex items-center justify-center gap-8">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center gap-3">
              {statusData.map((item) => (
                <motion.div key={item.name} className="flex items-center gap-2" whileHover={{ x: 4 }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div>
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">({item.value})</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  )
}
