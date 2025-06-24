"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface TrustBadgeProps {
  icon: ReactNode
  title: string
  description: string
  index: number
}

export function TrustBadge({ icon, title, description, index }: TrustBadgeProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-12 w-12 rounded-full bg-[#00A3E0]/10 flex items-center justify-center text-[#00A3E0] mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}
