"use client"

import type React from "react"

import { motion } from "framer-motion"

interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

export function BenefitCard({ icon, title, description, index }: BenefitCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center p-6 rounded-lg border bg-card shadow-sm hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-12 w-12 rounded-full bg-[#00A3E0]/10 flex items-center justify-center text-[#00A3E0] mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-center text-muted-foreground">{description}</p>
    </motion.div>
  )
}
