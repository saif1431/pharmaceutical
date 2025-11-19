'use client'

import { motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { Building2, FileText, Activity, ServerCog, FlaskConical, FolderArchive, Shield, AlertTriangle } from 'lucide-react'

const governanceCards = [
  {
    title: 'Document Management System (DMS)',
    icon: FileText,
    description: 'GxP-controlled repository for SOPs, BMR/BPR, specifications, and change controls.',
    metrics: ['1,248 controlled docs', '15 awaiting approval', 'Audit-ready links'],
  },
  {
    title: 'BI Dashboards & Analytics',
    icon: Activity,
    description: 'Executive KPIs blending manufacturing, finance, and commercial signals.',
    metrics: ['12 live dashboards', 'Latency < 5m', 'PowerBI + Looker connectors'],
  },
  {
    title: 'System Logs & Audit Trails',
    icon: Shield,
    description: 'Immutable audit log with e-signatures, CFR Part 11 attribution, and redaction tracking.',
    metrics: ['32k log entries', 'Retention 7 years', '4 anomalies flagged'],
  },
  {
    title: 'Research & Development (R&D)',
    icon: FlaskConical,
    description: 'Pipeline visibility across molecule stages, trials, and tech-transfer readiness.',
    metrics: ['9 active programs', '2 tech transfers', 'QMS handoffs synced'],
  },
]

const auditTimeline = [
  { owner: 'IT Compliance', activity: 'Rotated API secrets for MES connectors', time: '08:42', severity: 'low' },
  { owner: 'QA Ops', activity: 'Approved SOP-214 (Line clearance V2)', time: '10:15', severity: 'info' },
  { owner: 'Security', activity: 'Rejected login attempt (geo anomaly)', time: '11:02', severity: 'high' },
  { owner: 'Manufacturing', activity: 'BMR-348 signed off with e-sig', time: '12:37', severity: 'info' },
]

const knowledgeVault = [
  { label: 'SOPs', count: 428, owner: 'QA Documentation', freshness: 'Updated 2d ago' },
  { label: 'Validation Packs', count: 112, owner: 'CSV Team', freshness: 'Updated 6d ago' },
  { label: 'R&D Dossiers', count: 54, owner: 'R&D PMO', freshness: 'Updated today' },
  { label: 'Audit Packages', count: 37, owner: 'Regulatory Affairs', freshness: 'Updated 4d ago' },
]

const riskItems = [
  { title: 'CAPA backlog for Line 5', owner: 'Quality Systems', status: 'Mitigate', notes: '4 open items need exec sign-off' },
  { title: 'DMS storage nearing threshold', owner: 'IT Infra', status: 'Monitor', notes: '78% of encrypted volume used' },
  { title: 'R&D tech-transfer delay', owner: 'Process Dev', status: 'Escalate', notes: 'CMC dossier pending stability data' },
]

export default function ManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:ml-64">
        <PageHeader
          title="Management & Corporate"
          description="Cross-enterprise governance: docs, analytics, audit, and R&D coordination"
          icon={<Building2 className="w-6 h-6 text-primary" />}
        />

        <main className="p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {governanceCards.map((card) => {
                const Icon = card.icon
                return (
                  <motion.div
                    key={card.title}
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-xl bg-primary/10 p-2 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                        <p className="text-xs text-muted-foreground">{card.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {card.metrics.map((metric) => (
                        <span key={metric} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div className="rounded-2xl border border-border bg-card p-6 shadow-sm" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}>
              <div className="mb-4 flex items-center gap-3">
                <ServerCog className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Enterprise Audit Stream</h3>
                  <p className="text-xs text-muted-foreground">Realtime log of signatures, approvals, and alerts</p>
                </div>
              </div>
              <div className="space-y-3">
                {auditTimeline.map((entry) => (
                  <div key={entry.activity} className="flex items-center gap-4 rounded-xl border border-border/70 px-4 py-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{entry.activity}</p>
                      <p className="text-xs text-muted-foreground">{entry.owner}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{entry.time}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        entry.severity === 'high'
                          ? 'bg-red-50 text-red-700'
                          : entry.severity === 'info'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {entry.severity.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div className="rounded-2xl border border-border bg-card p-6 shadow-sm" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}>
                <div className="mb-4 flex items-center gap-3">
                  <FolderArchive className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Knowledge Vault</h3>
                    <p className="text-xs text-muted-foreground">Key repositories and last refresh</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {knowledgeVault.map((vault) => (
                    <div key={vault.label} className="rounded-xl border border-border/70 px-4 py-3 text-sm">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground">{vault.label}</p>
                        <span className="text-xs text-muted-foreground">{vault.freshness}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Owner: {vault.owner}</p>
                      <p className="text-sm font-semibold text-muted-foreground">{vault.count} entries</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="rounded-2xl border border-border bg-card p-6 shadow-sm" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}>
                <div className="mb-4 flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Risk & Escalations</h3>
                    <p className="text-xs text-muted-foreground">Monitor CAPA, infra, and R&D blockers</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {riskItems.map((risk) => (
                    <div key={risk.title} className="rounded-xl border border-border/70 px-4 py-3 text-sm">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground">{risk.title}</p>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            risk.status === 'Escalate'
                              ? 'bg-red-50 text-red-700'
                              : risk.status === 'Mitigate'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {risk.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Owner: {risk.owner}</p>
                      <p className="text-sm text-muted-foreground">{risk.notes}</p>
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
