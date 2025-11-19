'use client'

import { motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { InProcessInspection } from '@/components/qc/in-process-inspection'
import { Gauge } from 'lucide-react'

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

export default function InProcessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <PageHeader
          title="In-Process Inspection"
          description="Monitor blend checks, compression data, and deviations"
          icon={<Gauge className="w-6 h-6 text-primary" />}
        />
        <main className="p-4 md:p-6 lg:p-8">
          <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <InProcessInspection />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
