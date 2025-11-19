'use client'

import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Activity, CalendarRange, Filter, Layers, Users, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { CardWrapper } from '@/components/card-wrapper'

const performanceTrend = [
  { month: 'Jan', production: 92, quality: 95 },
  { month: 'Feb', production: 94, quality: 93 },
  { month: 'Mar', production: 90, quality: 96 },
  { month: 'Apr', production: 96, quality: 94 },
  { month: 'May', production: 97, quality: 95 },
  { month: 'Jun', production: 95, quality: 92 },
]

const efficiencyByLine = [
  { line: 'Tablet Line 1', oee: 89, uptime: 94 },
  { line: 'Tablet Line 2', oee: 92, uptime: 91 },
  { line: 'Vial Fill', oee: 86, uptime: 88 },
  { line: 'Packaging', oee: 90, uptime: 93 },
]

const deviationTable = [
  {
    id: 'DEV-9821',
    title: 'Temperature spike in Line 2',
    owner: 'A. Patel',
    status: 'Investigating',
    impact: 'High',
  },
  {
    id: 'DEV-9822',
    title: 'Delayed raw material lot',
    owner: 'J. Lopez',
    status: 'Resolved',
    impact: 'Medium',
  },
  {
    id: 'DEV-9823',
    title: 'QC retest triggered',
    owner: 'K. Shah',
    status: 'Pending',
    impact: 'Low',
  },
]

const kpiCards = [
  {
    label: 'Overall Equipment Effectiveness',
    value: '92.4%',
    delta: '+1.8%',
    color: 'from-blue-50 to-blue-100',
    icon: Activity,
  },
  {
    label: 'Headcount On Shift',
    value: '148',
    delta: '+5',
    color: 'from-cyan-50 to-cyan-100',
    icon: Users,
  },
  {
    label: 'Batches At Risk',
    value: '3',
    delta: '-2',
    color: 'from-amber-50 to-amber-100',
    icon: AlertTriangle,
  },
]

export function DashboardDetail() {
  return (
    <section className="space-y-10">
      <motion.div
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">Executive View</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              Operational Insights & Performance
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Monitor multi-line production performance, people utilization, and quality signals in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Select defaultValue="week">
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Last 24h</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Log Insight</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Capture Dashboard Insight</DialogTitle>
                  <DialogDescription>
                    Document trends or risks spotted on the dashboard and route them to the right team.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Insight title" />
                  <Select defaultValue="ops">
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ops">Operations</SelectItem>
                      <SelectItem value="quality">Quality</SelectItem>
                      <SelectItem value="supply">Supply Chain</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Summary / action items" rows={4} />
                </div>
                <DialogFooter>
                  <Button variant="ghost">Cancel</Button>
                  <Button>Save Insight</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {kpiCards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              className={`bg-gradient-to-br ${card.color} border border-slate-200 rounded-2xl p-5 shadow-sm`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">{card.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-3">{card.value}</p>
                </div>
                <div className="p-3 bg-white/70 rounded-xl">
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
              </div>
              <p className="text-xs font-semibold text-emerald-600 mt-5">{card.delta} vs last period</p>
            </motion.div>
          )
        })}
      </div>

      <Tabs defaultValue="trend" className="space-y-6">
        <TabsList>
          <TabsTrigger value="trend">Performance Trend</TabsTrigger>
          <TabsTrigger value="lines">Line Utilization</TabsTrigger>
        </TabsList>
        <TabsContent value="trend">
          <CardWrapper title="Production & Quality Trend" subtitle="Weekly view of key metrics">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceTrend} margin={{ top: 10, left: 0, right: 10 }}>
                  <defs>
                    <linearGradient id="production" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="quality" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" domain={[80, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} />
                  <Legend />
                  <Area type="monotone" dataKey="production" stroke="var(--chart-1)" fill="url(#production)" strokeWidth={2} />
                  <Area type="monotone" dataKey="quality" stroke="var(--chart-2)" fill="url(#quality)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardWrapper>
        </TabsContent>
        <TabsContent value="lines">
          <CardWrapper title="Line Efficiency vs Uptime" subtitle="Compare performance across production lines">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={efficiencyByLine} margin={{ top: 10, left: 0, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="line" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" domain={[70, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} />
                  <Legend />
                  <Bar dataKey="oee" fill="var(--chart-1)" radius={[8, 8, 0, 0]} name="OEE %" />
                  <Bar dataKey="uptime" fill="var(--chart-3)" radius={[8, 8, 0, 0]} name="Uptime %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardWrapper>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CardWrapper title="Upcoming Milestones" subtitle="Key initiatives tied to dashboard KPIs">
          <div className="space-y-4">
            {[
              {
                title: 'Scale-up validation lot',
                date: 'Nov 24',
                owner: 'Process Engineering',
                status: 'On Track',
              },
              {
                title: 'Supplier capacity review',
                date: 'Nov 26',
                owner: 'Procurement',
                status: 'At Risk',
              },
              {
                title: 'QA data integrity audit',
                date: 'Dec 03',
                owner: 'Quality Assurance',
                status: 'Scheduled',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
                whileHover={{ scale: 1.01 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">Owner: {item.owner}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">{item.date}</p>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      item.status === 'On Track'
                        ? 'bg-emerald-50 text-emerald-600'
                        : item.status === 'At Risk'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-blue-50 text-blue-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardWrapper>

        <CardWrapper title="Recent Deviations" subtitle="Focus on items requiring leadership attention">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-2">ID</th>
                  <th>Title</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Impact</th>
                </tr>
              </thead>
              <tbody>
                {deviationTable.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100">
                    <td className="py-3 font-semibold text-slate-900">{row.id}</td>
                    <td className="text-slate-600">{row.title}</td>
                    <td className="text-slate-600">{row.owner}</td>
                    <td>
                      <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                        {row.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          row.impact === 'High'
                            ? 'bg-red-50 text-red-600'
                            : row.impact === 'Medium'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-emerald-50 text-emerald-600'
                        }`}
                      >
                        {row.impact}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardWrapper>
      </div>
    </section>
  )
}
