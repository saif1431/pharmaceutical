'use client'

import { motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { DollarSign, Wallet2, Receipt, Briefcase, FilePieChart, PiggyBank, Coins, ShieldCheck } from 'lucide-react'

const kpis = [
  { label: 'Working Capital', value: '$18.4M', delta: '+6% vs LY' },
  { label: 'Outstanding AP', value: '$4.9M', delta: 'Avg aging 34 days' },
  { label: 'Payroll Ready', value: '842 employees', delta: 'Cutoff in 2d' },
  { label: 'CapEx Pipeline', value: '$3.2M', delta: '5 requests pending' },
]

const ledgers = [
  { name: 'Accounts Payable', amount: '$2.4M', status: 'On Track', notes: '31 invoices > 45d' },
  { name: 'Accounts Receivable', amount: '$3.8M', status: 'Attention', notes: 'DSO 58d, 4 escalations' },
  { name: 'Expense Management', amount: '$640k', status: 'On Track', notes: 'Policy compliance 98%' },
  { name: 'Asset Management', amount: '$21.6M', status: 'Audit', notes: 'Calibration sweep due' },
]

const expenseBreakdown = [
  { category: 'Manufacturing', spend: '$1.8M', trend: '+12% QoQ' },
  { category: 'Quality & Labs', spend: '$920k', trend: '+4% QoQ' },
  { category: 'Commercial', spend: '$640k', trend: '-3% QoQ' },
  { category: 'R&D', spend: '$1.1M', trend: '+6% QoQ' },
]

const complianceTasks = [
  { title: 'SOX Controls', owner: 'Finance Governance', status: 'Completed', due: 'Nov 12' },
  { title: 'GMP Cost Allocation', owner: 'Cost Accounting', status: 'In Progress', due: 'Nov 22' },
  { title: 'Payroll Audit', owner: 'HR Ops', status: 'Scheduled', due: 'Nov 30' },
]

export default function FinanceAdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:ml-64">
        <PageHeader
          title="Finance & Administration"
          description="Consolidated view of accounts, payroll, expenses, and asset utilization"
          icon={<DollarSign className="w-6 h-6 text-primary" />}
        />

        <main className="p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            <motion.div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">{kpi.label}</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{kpi.value}</p>
                  <p className="text-xs text-emerald-600">{kpi.delta}</p>
                </div>
              ))}
            </motion.div>

            <div className="grid gap-4 lg:grid-cols-2">
              {ledgers.map((ledger) => (
                <motion.div
                  key={ledger.name}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{ledger.name}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        ledger.status === 'Attention' ? 'bg-amber-50 text-amber-700' : ledger.status === 'Audit' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {ledger.status}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{ledger.amount}</p>
                  <p className="text-xs text-muted-foreground">{ledger.notes}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div className="rounded-2xl border border-border bg-card p-6 shadow-sm" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}>
                <div className="mb-4 flex items-center gap-3">
                  <Receipt className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Expense Lens</h3>
                    <p className="text-xs text-muted-foreground">Department spend trendlines</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {expenseBreakdown.map((exp) => (
                    <div key={exp.category} className="flex items-center gap-4 rounded-xl border border-border/70 px-4 py-3">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{exp.category}</p>
                        <p className="text-xs text-muted-foreground">{exp.trend}</p>
                      </div>
                      <p className="text-sm font-semibold text-muted-foreground">{exp.spend}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="rounded-2xl border border-border bg-card p-6 shadow-sm" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}>
                <div className="mb-4 flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Compliance & Payroll</h3>
                    <p className="text-xs text-muted-foreground">SOX, GMP, and payroll checkpoints</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {complianceTasks.map((task) => (
                    <div key={task.title} className="rounded-xl border border-border/70 px-4 py-3 text-sm">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground">{task.title}</p>
                        <span className="text-xs text-muted-foreground">Due {task.due}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Owner: {task.owner}</p>
                      <span
                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          task.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : task.status === 'In Progress'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Cash Planning Calendar</h3>
                  <p className="text-xs text-muted-foreground">Next 4 weeks of major inflows/outflows</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {['Week 46', 'Week 47', 'Week 48', 'Week 49'].map((week, idx) => (
                  <div key={week} className="rounded-xl border border-border/70 p-4">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">{week}</p>
                    <p className="text-2xl font-bold text-foreground">${(3.2 + idx * 0.4).toFixed(1)}M</p>
                    <p className="text-xs text-muted-foreground">Committed outflows</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
