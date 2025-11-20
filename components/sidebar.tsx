'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Activity, Package, Boxes, Cog, CheckCircle, Award, Settings, Menu, X, Truck, Handshake, DollarSign, Building2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

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
    name: 'Supply Chain',
    href: '/supply-chain',
    icon: Truck,
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
  {
    name: 'Sales & Marketing',
    href: '/sales',
    icon: Handshake,
  },
  {
    name: 'Finance & Admin',
    href: '/finance',
    icon: DollarSign,
  },
  {
    name: 'Management',
    href: '/management',
    icon: Building2,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`${
          isMobile
            ? 'fixed left-0 top-0 z-40 w-64 h-screen'
            : 'w-64 fixed left-0 top-0 h-screen'
        } bg-sidebar border-r border-sidebar-border overflow-y-auto shadow-sm`}
        initial={isMobile ? { x: -256 } : { x: 0 }}
        animate={isMobile ? { x: isOpen ? 0 : -256 } : { x: 0 }}
        transition={{ duration: 0.3 }}
      >
      <div className="p-6">
        <motion.div
          className="flex items-center mx-auto w-full gap-3 mb-8 p-6 border-b border-sidebar-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>
          <Image className='mx-auto w-[50%]' src='/favicon.png' width={70} height={10} alt='logo ' />
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
                  onClick={handleNavClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 font-medium'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
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
            onClick={handleNavClick}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200 font-medium"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
      </motion.aside>
    </>
  )
}
