"use client"

import type React from "react"

import { motion } from "framer-motion"

interface ValueCardProps {
  title: string
  description: string
  icon: React.ReactNode
  index: number
}

export function ValueCard({ title, description, icon, index }: ValueCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center p-6 rounded-lg bg-[#00A3E0]/5 border border-[#00A3E0]/10 transition-all duration-300 hover:shadow-lg hover:bg-[#00A3E0]/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-12 w-12 rounded-full bg-[#00A3E0]/10 flex items-center justify-center text-[#00A3E0] mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-center text-muted-foreground">{description}</p>
    </motion.div>
  )
}
