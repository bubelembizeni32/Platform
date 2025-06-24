"use client"

import type React from "react"

import { motion } from "framer-motion"

interface ProcessStep {
  icon: React.ReactNode
  title: string
  description: string
}

interface ProcessTimelineProps {
  steps: ProcessStep[]
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-7 md:gap-6">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="relative flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#00A3E0] to-[#4A4A4A]/50"></div>
          )}

          {/* Step icon */}
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#00A3E0]/10 text-[#00A3E0] mb-4 z-10">
            {step.icon}
          </div>

          {/* Step number */}
          <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-[#00A3E0] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
            {index + 1}
          </div>

          {/* Step content */}
          <h3 className="text-lg font-bold mb-2 text-center">{step.title}</h3>
          <p className="text-center text-muted-foreground text-sm">{step.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
