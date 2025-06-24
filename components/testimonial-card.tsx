"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  rating?: number
  index: number
}

export function TestimonialCard({ quote, name, role, rating = 5, index }: TestimonialCardProps) {
  return (
    <motion.div
      className="flex flex-col space-y-4 rounded-lg border p-6 shadow-sm bg-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center space-x-2">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
        ))}
      </div>
      <p className="text-muted-foreground italic">"{quote}"</p>
      <div className="flex items-center space-x-2">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}
