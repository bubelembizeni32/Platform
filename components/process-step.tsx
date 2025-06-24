"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ProcessStepProps {
  icon: ReactNode
  number: number
  title: string
  description: string
  delay?: number
}

export function ProcessStep({ icon, number, title, description, delay = 0 }: ProcessStepProps) {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-start gap-4 p-6 rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#00A3E0]/10 text-[#00A3E0]">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#00A3E0] text-white text-xs font-bold">
            {number}
          </span>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}
