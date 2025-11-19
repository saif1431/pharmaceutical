'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardWrapperProps {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function CardWrapper({ title, subtitle, children, className = '' }: CardWrapperProps) {
  return (
    <motion.div
      className={`bg-card border border-border rounded-xl p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 pb-6 border-b border-border/50">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  )
}
