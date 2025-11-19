'use client'

import { motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { Truck, Boxes, Factory, LineChart, PackageCheck, Globe } from 'lucide-react'

const stats = [
  { label: 'Active Suppliers', value: '56', delta: '+4 new this month' },
  { label: 'Open Purchase Orders', value: '18', delta: 'Avg approval 12h' },
  { label: 'In-Transit Shipments', value: '7', delta: '3 delayed > 24h' },
  { label: 'Forecast Accuracy', value: '92%', delta: 'Rolling 90-day window' },
]

const modules = [
  {
    title: 'Supplier & Vendor Management',
    description: 'Track qualification status, SLAs, audits, and risk ratings for every API/excipient partner.',
    icon: Truck,
    highlights: ['23 API partners', '12 excipient vendors', '5 audits scheduled'],
  },
  {
    title: 'Warehouse Management (WMS)',
    description: 'Visualize bin utilization, receiving queues, and cold-chain thresholds across warehouses.',
    icon: Boxes,
    highlights: ['3 sites online', '84% space utilization', '2 temp alerts'],
  },
  {
    title: 'Supply Chain Control Tower',
    description: 'Cross-facility ETA tracker with supplier ETD, customs checkpoints, and QA release handoffs.',
    icon: Globe,
    highlights: ['11 active lanes', 'On-time 96%', 'Customs holds: 1'],
  },
  {
    title: 'Forecasting & Demand Planning',
    description: 'Blend historical consumption with sales commitments to generate 26-week coverage outlooks.',
    icon: LineChart,
    highlights: ['Coverage 12.4 weeks', 'Safety stock 1.8x', 'Next S&OP: Tue'],
  },
]

const forecastTimeline = [
  { week: 'WK 46', demand: 12.3, supply: 13.1 },
  { week: 'WK 47', demand: 11.8, supply: 12.6 },
  { week: 'WK 48', demand: 13.4, supply: 14.1 },
  { week: 'WK 49', demand: 14.0, supply: 13.7 },
  { week: 'WK 50', demand: 12.6, supply: 13.3 },
  { week: 'WK 51', demand: 11.9, supply: 12.2 },
]

const shipmentTable = [
  { lane: 'Mumbai ➝ Boston', eta: '2d', status: 'On Schedule', mode: 'Ocean + Truck' },
  { lane: 'Frankfurt ➝ Toronto', eta: 'Delayed', status: 'Customs Hold', mode: 'Air' },
  { lane: 'Shenzhen ➝ Dubai', eta: '5d', status: 'In Transit', mode: 'Ocean' },
]

export default function SupplyChainPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:ml-64">
        <PageHeader
          title="Supply Chain Control"
          description="Supplier relationships, warehouse orchestration, and demand planning in one view"
          icon={<Factory className="w-6 h-6 text-primary" />}
        />

        <main className="p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            <motion.div
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-emerald-600">{stat.delta}</p>
                </div>
              ))}
            </motion.div>

            <div className="grid gap-4 lg:grid-cols-2">
              {modules.map((module) => {
                const Icon = module.icon
                return (
                  <motion.div
                    key={module.title}
                    className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-xl bg-primary/10 p-2 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{module.title}</h3>
                        <p className="text-xs text-muted-foreground">{module.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {module.highlights.map((item) => (
                        <span key={item} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <LineChart className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Coverage Forecast (MT)</h3>
                    <p className="text-xs text-muted-foreground">Demand vs. confirmed supply by week</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {forecastTimeline.map((item) => (
                    <div key={item.week} className="flex items-center gap-4 rounded-xl border border-border/60 px-3 py-2">
                      <div className="w-16 text-sm font-semibold text-muted-foreground">{item.week}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Demand</span>
                          <span>{item.demand} MT</span>
                        </div>
                        <div className="mt-1 h-2 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-destructive"
                            style={{ width: `${Math.min(item.demand * 6, 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Supply</span>
                          <span>{item.supply} MT</span>
                        </div>
                        <div className="mt-1 h-2 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-emerald-500"
                            style={{ width: `${Math.min(item.supply * 6, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <PackageCheck className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Critical Shipments</h3>
                    <p className="text-xs text-muted-foreground">Prioritized for QA intake this week</p>
                  </div>
                </div>
                <div className="divide-y divide-border/60">
                  {shipmentTable.map((shipment) => (
                    <div key={shipment.lane} className="py-3 text-sm">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground">{shipment.lane}</p>
                        <span className="text-xs text-muted-foreground">ETA {shipment.eta}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Mode: {shipment.mode}</p>
                      <span
                        className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          shipment.status === 'Customs Hold'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {shipment.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
