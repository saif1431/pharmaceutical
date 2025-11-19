'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Activity, Package, Boxes, Cog, CheckCircle, Award, Settings } from 'lucide-react'
import Image from 'next/image'

const navItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Activity,
  },
  {
    name: 'Procurement',
    href: '/procurement',
    icon: Package,
  },
  {
    name: 'Inventory',
    href: '/inventory',
    icon: Boxes,
  },
  {
    name: 'Production',
    href: '/production',
    icon: Cog,
  },
  {
    name: 'Quality Control',
    href: '/quality-control',
    icon: CheckCircle,
  },
  {
    name: 'Quality Assurance',
    href: '/quality-assurance',
    icon: Award,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <motion.aside
      className="w-64 bg-sidebar border-r border-sidebar-border fixed left-0 top-0 h-screen overflow-y-auto shadow-sm"
      initial={{ x: -256 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <motion.div
          className="flex items-center gap-3 mb-8 pb-6 border-b border-sidebar-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>
          <Image src='/logo.jpg' width={180} height={10} alt='logo ' />
          </div>
        </motion.div>

        <nav className="space-y-1 mb-8">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 font-medium'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                  {isActive && <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full" />}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <div className="pt-6 border-t border-sidebar-border">
          <Link
            href="/settings"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200 font-medium"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </motion.aside>
  )
}
