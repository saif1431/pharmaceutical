'use client'

import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string
  unit?: string
  trend?: number
  icon: React.ReactNode
  color: 'blue' | 'cyan' | 'emerald' | 'amber' | 'purple' | 'pink'
  delay?: number
}

const colorClasses = {
  blue: 'bg-blue-50 border-blue-200 text-blue-600',
  cyan: 'bg-cyan-50 border-cyan-200 text-cyan-600',
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-600',
  amber: 'bg-amber-50 border-amber-200 text-amber-600',
  purple: 'bg-purple-50 border-purple-200 text-purple-600',
  pink: 'bg-pink-50 border-pink-200 text-pink-600',
}

const iconBgClasses = {
  blue: 'bg-blue-100',
  cyan: 'bg-cyan-100',
  emerald: 'bg-emerald-100',
  amber: 'bg-amber-100',
  purple: 'bg-purple-100',
  pink: 'bg-pink-100',
}

export function KPICard({ title, value, unit, trend, icon, color, delay = 0 }: KPICardProps) {
  const isTrendPositive = (trend ?? 0) >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`border-2 rounded-xl p-6 bg-white transition-all hover:shadow-lg hover:border-opacity-100 ${colorClasses[color]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${iconBgClasses[color]}`}>
          {icon}
        </div>
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-1">
          {isTrendPositive ? (
            <ArrowUp className="w-4 h-4 text-emerald-600" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-600" />
          )}
          <span className={`text-xs font-semibold ${isTrendPositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {Math.abs(trend)}% vs last month
          </span>
        </div>
      )}
    </motion.div>
  )
}
