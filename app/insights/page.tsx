'use client'

import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { DashboardDetail } from '@/components/dashboard-detail'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64">
        <PageHeader
          title="Executive Insights"
          description="Deep dive into cross-functional KPIs and leadership signals"
          icon={<Activity className="w-6 h-6 text-primary" />}
        />

        <main className="p-4 md:p-6 lg:p-8">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <DashboardDetail />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
