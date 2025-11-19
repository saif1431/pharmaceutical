'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, ShieldCheck, Bell, PlugZap, Activity } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const integrationApps = [
  { name: 'SAP S/4HANA', status: 'Connected', lastSync: '2m ago' },
  { name: 'LIMS Cloud', status: 'Partial', lastSync: '12m ago' },
  { name: 'Warehouse IoT Gateway', status: 'Connected', lastSync: 'Just now' },
]

const auditTrail = [
  { id: 1, action: 'Updated procurement approval matrix', user: 'A. Patel', time: '09:42' },
  { id: 2, action: 'Enabled MES alerts for Line 3', user: 'L. Khan', time: '08:15' },
  { id: 3, action: 'Rotated API keys for LIMS', user: 'System', time: 'Yesterday' },
]

export default function SettingsPage() {
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifySMS, setNotifySMS] = useState(false)
  const [autoLock, setAutoLock] = useState(true)
  const [twoFactor, setTwoFactor] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64">
        <PageHeader
          title="Platform Settings"
          description="Manage profile, compliance preferences, notifications, and integrations"
          icon={<Settings className="w-6 h-6 text-primary" />}
        />

        <main className="p-4 md:p-6 lg:p-8">
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.section variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <div>
                    <h2 className="text-lg font-semibold">Account & Security</h2>
                    <p className="text-sm text-muted-foreground">Keep identity information up-to-date</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground">Full Name</label>
                    <Input defaultValue="Amelia Reed" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground">Title</label>
                    <Input defaultValue="Director, Manufacturing Ops" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground">Email</label>
                    <Input type="email" defaultValue="amelia.reed@pharma.com" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground">Phone</label>
                    <Input defaultValue="+1 617 555 0112" className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-foreground">Signature / Escalation Note</label>
                    <Textarea rows={3} placeholder="Add escalation policy or signature" className="mt-1" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="ghost">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <LockIcon />
                  <div>
                    <h3 className="font-semibold">Security Policies</h3>
                    <p className="text-sm text-muted-foreground">Realtime compliance controls</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <SettingSwitch
                    label="Require two factor authentication"
                    description="Applies to all admin roles"
                    checked={twoFactor}
                    onCheckedChange={setTwoFactor}
                  />
                  <SettingSwitch
                    label="Auto-lock console"
                    description="Lock after 10 min of inactivity"
                    checked={autoLock}
                    onCheckedChange={setAutoLock}
                  />
                  <SettingSwitch
                    label="Allow API key rotation"
                    description="Recommended weekly for GMP environments"
                    checked
                    onCheckedChange={() => null}
                  />
                </div>
                <Button variant="outline" className="w-full mt-6">View audit controls</Button>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Notifications</h3>
                    <p className="text-sm text-muted-foreground">Choose how teams hear about events</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <SettingSwitch
                    label="Email alerts"
                    description="PO approvals, deviations, critical alarms"
                    checked={notifyEmail}
                    onCheckedChange={setNotifyEmail}
                  />
                  <SettingSwitch
                    label="SMS for production downtime"
                    description="Only during on-call windows"
                    checked={notifySMS}
                    onCheckedChange={setNotifySMS}
                  />
                  <SettingSwitch
                    label="Slack sync"
                    description="Push summaries to #manufacturing-ops"
                    checked
                    onCheckedChange={() => null}
                  />
                </div>
                <div className="mt-6">
                  <label className="text-sm font-semibold text-foreground">Daily digest time</label>
                  <Input type="time" defaultValue="07:30" className="mt-1" />
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <PlugZap className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Integrations</h3>
                    <p className="text-sm text-muted-foreground">Manage connected enterprise systems</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {integrationApps.map((app) => (
                    <div key={app.name} className="flex items-center justify-between rounded-xl border border-border/70 p-4">
                      <div>
                        <p className="font-semibold text-foreground">{app.name}</p>
                        <p className="text-xs text-muted-foreground">Last sync {app.lastSync}</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${app.status === 'Connected' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6">Add connector</Button>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Recent Changes</h3>
                    <p className="text-sm text-muted-foreground">Human-readable audit trail</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {auditTrail.map((entry) => (
                    <div key={entry.id} className="rounded-xl border border-border/70 p-3">
                      <p className="text-sm font-semibold text-foreground">{entry.action}</p>
                      <p className="text-xs text-muted-foreground">{entry.user} • {entry.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-semibold">Theme & Display</h3>
                <div className="space-y-3 text-sm">
                  <SettingSwitch
                    label="Enable dark mode"
                    description="Matches browser preference by default"
                    checked
                    onCheckedChange={() => null}
                  />
                  <SettingSwitch
                    label="Compact tables"
                    description="Reduces row height for dense data"
                    checked={false}
                    onCheckedChange={() => null}
                  />
                </div>
                <Button variant="outline">Preview layout</Button>
              </div>
            </motion.section>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

function SettingSwitch({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string
  description: string
  checked: boolean
  onCheckedChange: (value: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}

function LockIcon() {
  return (
    <div className="p-2 bg-primary/10 rounded-lg">
      <ShieldCheck className="w-4 h-4 text-primary" />
    </div>
  )
}
