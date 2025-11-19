'use client'

import { motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { Megaphone, Target, Users2, BarChart2, Layers3, Globe2, ShoppingBag, ArrowUpRight } from 'lucide-react'

const highlights = [
  { label: 'Quarter Pipeline', value: '$48.2M', detail: '74 active opportunities' },
  { label: 'Conversion Rate', value: '36%', detail: 'Up 4 pts vs last quarter' },
  { label: 'Key Accounts', value: '128', detail: '32 with open renewals' },
  { label: 'Samples Dispatched', value: '412', detail: '78% responded' },
]

const initiatives = [
  {
    title: 'Sales & Distribution',
    icon: ShoppingBag,
    description: 'Order orchestration, distributor visibility, and shipment readiness for every SKU.',
    chips: ['13 distributors', 'Fill rate 97%', 'Returns 0.5%'],
  },
  {
    title: 'CRM & Customer Management',
    icon: Users2,
    description: '360° customer cards, call planning, and KAM scorecards for regulated launches.',
    chips: ['210 KOLs tracked', 'NPS 72', '18 escalations'],
  },
  {
    title: 'Campaign Performance',
    icon: Megaphone,
    description: 'Digital + field campaign attribution with compliant HCP engagement logs.',
    chips: ['4 live campaigns', 'CTR 5.2%', 'Budget $1.2M'],
  },
  {
    title: 'Forecast vs Commitment',
    icon: Target,
    description: 'Align commercial demand with S&OP signals for export + domestic markets.',
    chips: ['Coverage 14 weeks', 'Contracted 92%', 'Backorders 3'],
  },
]

const regionalSales = [
  { region: 'North America', revenue: '$18.7M', growth: '+12%', priority: 'Biologics hospitals' },
  { region: 'EU & UK', revenue: '$14.1M', growth: '+8%', priority: 'Tender renewals' },
  { region: 'MENA', revenue: '$6.5M', growth: '+15%', priority: 'Vaccines rollout' },
  { region: 'APAC', revenue: '$8.9M', growth: '+5%', priority: 'New distributor onboarding' },
]

const campaignSteps = [
  { stage: 'Awareness', status: 'Completed', notes: 'Regulatory-compliant content localized' },
  { stage: 'Engagement', status: 'In Flight', notes: 'Field reps + webinars running' },
  { stage: 'Evaluation', status: 'Scheduled', notes: 'Clinical dossier drops next week' },
  { stage: 'Conversion', status: 'Planned', notes: 'Legal + medical review pending' },
]

export default function SalesMarketingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:ml-64">
        <PageHeader
          title="Sales & Marketing"
          description="Commercial visibility, CRM intelligence, and compliant engagement workflows"
          icon={<BarChart2 className="w-6 h-6 text-primary" />}
        />

        <main className="p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            <motion.div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </motion.div>

            <div className="grid gap-4 lg:grid-cols-2">
              {initiatives.map((initiative) => {
                const Icon = initiative.icon
                return (
                  <motion.div
                    key={initiative.title}
                    className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-xl bg-primary/10 p-2 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{initiative.title}</h3>
                        <p className="text-xs text-muted-foreground">{initiative.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {initiative.chips.map((chip) => (
                        <span key={chip} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div className="rounded-2xl border border-border bg-card p-6 shadow-sm" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}>
                <div className="mb-4 flex items-center gap-3">
                  <Globe2 className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Regional Performance</h3>
                    <p className="text-xs text-muted-foreground">Revenue pace vs. target</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {regionalSales.map((region) => (
                    <div key={region.region} className="rounded-xl border border-border/70 px-4 py-3 text-sm">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground">{region.region}</p>
                        <span className="text-xs font-semibold text-emerald-600">{region.growth}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{region.priority}</p>
                      <p className="text-sm font-semibold text-muted-foreground">{region.revenue}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="rounded-2xl border border-border bg-card p-6 shadow-sm" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}>
                <div className="mb-4 flex items-center gap-3">
                  <Layers3 className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Campaign Orchestration</h3>
                    <p className="text-xs text-muted-foreground">Status across the regulated funnel</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {campaignSteps.map((step) => (
                    <div key={step.stage} className="flex items-center gap-4 rounded-xl border border-border/70 px-4 py-3">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{step.stage}</p>
                        <p className="text-xs text-muted-foreground">{step.notes}</p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                          step.status === 'In Flight'
                            ? 'bg-amber-50 text-amber-700'
                            : step.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {step.status}
                        <ArrowUpRight className="h-3 w-3" />
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
