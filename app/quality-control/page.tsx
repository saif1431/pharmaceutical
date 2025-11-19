'use client'

import { motion } from 'framer-motion'
import { CheckCircle, FlaskConical, Gauge, PackageCheck, LayoutDashboard, ScrollText, Ban, Beaker, FileBadge, ClipboardCheck } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { QualityControl } from '@/components/quality-control'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function QualityControlPage() {
  const subpages = [
    { name: 'Raw Material Inspection', href: '/quality-control/raw-material', icon: FlaskConical, description: 'Supplier intake & COA' },
    { name: 'In-Process Inspection', href: '/quality-control/in-process', icon: Gauge, description: 'Blend & compression checks' },
    { name: 'Finished Goods Inspection', href: '/quality-control/finished-goods', icon: PackageCheck, description: 'Release decisions' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64">
        <PageHeader
          title="Quality Control"
          description="Monitor quality metrics and perform inspections"
          icon={<CheckCircle className="w-6 h-6 text-primary" />}
        />

        <main className="p-4 md:p-6 lg:p-8">
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <QualityControl />
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-4">QC Modules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {subpages.map((page, idx) => {
                    const Icon = page.icon
                    return (
                      <Link
                        key={page.href}
                        href={page.href}
                        className="border border-border rounded-xl p-4 hover:border-primary hover:bg-primary/5 transition-all"
                      >
                        <motion.div
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.02 * idx }}
                        >
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{page.name}</p>
                            <p className="text-xs text-muted-foreground">{page.description}</p>
                          </div>
                        </motion.div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
