'use client'

import { motion } from 'framer-motion'
import { CardWrapper } from './card-wrapper'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { AlertCircle, Box, TrendingDown, Zap } from 'lucide-react'

const inventoryData = [
  { product: 'Aspirin', stock: 2400, capacity: 3000 },
  { product: 'Vitamin D3', stock: 1800, capacity: 2500 },
  { product: 'Ibuprofen', stock: 980, capacity: 2000 },
  { product: 'Amoxicillin', stock: 1500, capacity: 2200 },
  { product: 'Metformin', stock: 2100, capacity: 2800 },
]

const lowStockItems = [
  { name: 'Ibuprofen 200mg', current: 980, critical: 500, status: 'warning' },
  { name: 'Lisinopril', current: 450, critical: 400, status: 'critical' },
]

const warehouseData = [
  { warehouse: 'Main', utilization: 78, target: 85 },
  { warehouse: 'East', utilization: 65, target: 80 },
  { warehouse: 'West', utilization: 82, target: 85 },
  { warehouse: 'North', utilization: 71, target: 80 },
]

export function InventoryPanel() {
  return (
    <CardWrapper
      title="Inventory Management Panel"
      subtitle="Real-time stock visualization and warehouse optimization"
    >
      <motion.div 
        className="mb-8 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="font-semibold text-foreground">Low Stock Alerts</h3>
        </div>
        <div className="space-y-2">
          {lowStockItems.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/50"
              whileHover={{ x: 4 }}
            >
              <div>
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">Current: {item.current} units</p>
              </div>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                item.status === 'critical' 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
              }`}>
                {item.status === 'critical' ? '🔴 CRITICAL' : '🟡 WARNING'}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Stock Levels */}
        <div className="bg-card border border-border rounded-xl shadow-sm transition-all hover:shadow-md">
          <h3 className="text-sm font-semibold text-foreground mb-4 p-4">Current Stock Levels</h3>
          <div className="px-4 pb-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={inventoryData} margin={{ top: 10, right: 30, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                <XAxis 
                  dataKey="product" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80} 
                  stroke="var(--muted-foreground)" 
                  fontSize={11}
                />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="stock" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="capacity" fill="var(--chart-2)" opacity={0.3} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Warehouse Utilization */}
        <div className="bg-card border border-border rounded-xl shadow-sm transition-all hover:shadow-md p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Warehouse Utilization</h3>
          <div className="space-y-4">
            {warehouseData.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{item.warehouse}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-primary">{item.utilization}%</span>
                    <span className="text-xs text-muted-foreground">/ {item.target}%</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full transition-colors ${
                      item.utilization > 80 ? 'bg-orange-500' :
                      item.utilization > 70 ? 'bg-amber-500' :
                      'bg-emerald-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.utilization}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Box, label: 'Total SKUs', value: '847', color: 'from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900' },
          { icon: TrendingDown, label: 'Low Stock', value: '12', color: 'from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900' },
          { icon: AlertCircle, label: 'Critical', value: '2', color: 'from-red-50 to-red-100 dark:from-red-950 dark:to-red-900' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className={`bg-gradient-to-br ${stat.color} border border-primary/10 rounded-lg p-4 transition-all hover:border-primary/30`}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <stat.icon className="w-5 h-5 text-primary mb-2 opacity-70" />
            <p className="text-xs font-semibold text-muted-foreground uppercase">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </CardWrapper>
  )
}
