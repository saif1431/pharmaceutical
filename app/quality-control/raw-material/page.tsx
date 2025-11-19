'use client'

import { motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { RawMaterialInspection } from '@/components/qc/raw-material-inspection'
import { FlaskConical } from 'lucide-react'

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

export default function RawMaterialPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <PageHeader
          title="Raw Material Inspection"
          description="Monitor supplier lots, COA status, and quarantine actions"
          icon={<FlaskConical className="w-6 h-6 text-primary" />}
        />

        <main className="p-4 md:p-6 lg:p-8">
          <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <RawMaterialInspection />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
