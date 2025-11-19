'use client'

import { motion } from 'framer-motion'
import { Cog } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { ProductionPlanning } from '@/components/production-planning'
import { ManufacturingExecutionSystem } from '@/components/manufacturing-execution-system'

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

export default function ProductionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64">
        <PageHeader
          title="Production Planning & Manufacturing"
          description="Schedule and execute manufacturing operations"
          icon={<Cog className="w-6 h-6 text-primary" />}
        />

        <main className="p-4 md:p-6 lg:p-8">
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <ProductionPlanning />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ManufacturingExecutionSystem />
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
