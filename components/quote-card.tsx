"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

interface QuoteCardProps {
  quote: string
  author: string
  role: string
  index?: number
}

export function QuoteCard({ quote, author, role, index = 0 }: QuoteCardProps) {
  return (
    <motion.div
      className="relative flex flex-col p-6 rounded-lg border bg-card shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Quote className="h-8 w-8 text-[#00A3E0]/30 mb-4" />
      <p className="text-lg mb-4">"{quote}"</p>
      <div className="mt-auto flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}
