'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sidebar } from '@/components/sidebar'
import { Activity, Package, Boxes, Cog, CheckCircle, Award, ArrowRight, BarChart3, AlertCircle, Package2, Zap } from 'lucide-react'
import { KPICard } from '@/components/kpi-card'
import { DashboardCharts } from '@/components/dashboard-charts'
import { DashboardActivity } from '@/components/dashboard-activity'

const sections = [
  {
    name: 'Procurement & Purchase',
    description: 'Manage supplier relationships and purchase orders',
    href: '/procurement',
    icon: Package,
    gradient: 'from-blue-50 to-blue-100',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
  },
  {
    name: 'Inventory Management',
    description: 'Track raw materials and finished goods',
    href: '/inventory',
    icon: Boxes,
    gradient: 'from-cyan-50 to-cyan-100',
    iconColor: 'text-cyan-600',
    borderColor: 'border-cyan-200',
  },
  {
    name: 'Production Planning',
    description: 'Schedule and plan manufacturing operations',
    href: '/production',
    icon: Cog,
    gradient: 'from-purple-50 to-purple-100',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200',
  },
  {
    name: 'Quality Control',
    description: 'Monitor quality metrics and inspections',
    href: '/quality-control',
    icon: CheckCircle,
    gradient: 'from-emerald-50 to-emerald-100',
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
  },
  {
    name: 'Executive Insights',
    description: 'Deep dive into operations performance signals',
    href: '/insights',
    icon: Activity,
    gradient: 'from-indigo-50 to-indigo-100',
    iconColor: 'text-indigo-600',
    borderColor: 'border-indigo-200',
  },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64">
        {/* Header */}
        <motion.header
          className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-opacity-95"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-8 py-6 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-br from-blue-100 to-cyan-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Pharmaceutical Operations Control Center</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-medium text-amber-900">3 Active Alerts</span>
            </motion.div>
          </div>
        </motion.header>

        <main className="p-8 space-y-8">
          {/* KPI Cards */}
          <section>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold text-foreground mb-6"
            >
              Key Performance Indicators
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Production Volume"
                value="5,840"
                unit="units/month"
                trend={8.5}
                color="blue"
                icon={<Package2 className="w-6 h-6 text-blue-600" />}
                delay={0.1}
              />
              <KPICard
                title="Inventory Value"
                value="$2.4M"
                unit="in stock"
                trend={-2.3}
                color="cyan"
                icon={<Boxes className="w-6 h-6 text-cyan-600" />}
                delay={0.2}
              />
              <KPICard
                title="Quality Pass Rate"
                value="92%"
                unit="acceptable"
                trend={5.1}
                color="emerald"
                icon={<CheckCircle className="w-6 h-6 text-emerald-600" />}
                delay={0.3}
              />
              <KPICard
                title="On-Time Delivery"
                value="96.2%"
                unit="compliance"
                trend={2.8}
                color="amber"
                icon={<Zap className="w-6 h-6 text-amber-600" />}
                delay={0.4}
              />
            </div>
          </section>

          {/* Charts */}
          <section>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl font-semibold text-foreground mb-6"
            >
              Analytics & Performance
            </motion.h2>
            <DashboardCharts />
          </section>

          {/* Activity and Quick Access */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DashboardActivity />
            </div>

            {/* Quick Access */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Quick Access</h3>
              <div className="space-y-3">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <Link
                      key={section.href}
                      href={section.href}
                      className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all group"
                    >
                      <div className={`p-2 rounded-lg bg-linear-to-br ${section.gradient}`}>
                        <Icon className={`w-5 h-5 ${section.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{section.name}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
