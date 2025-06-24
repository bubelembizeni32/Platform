"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface InfoBlockProps {
  items: {
    text: string
  }[]
}

export function InfoBlock({ items }: InfoBlockProps) {
  return (
    <motion.div
      className="p-6 rounded-lg border bg-card shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <ul className="space-y-4">
        {items.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <CheckCircle className="h-5 w-5 text-[#00A3E0] mt-0.5" />
            <span>{item.text}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
