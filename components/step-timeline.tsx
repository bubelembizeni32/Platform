"use client"

import type React from "react"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface Step {
  title: string
  description: string
  icon?: React.ReactNode
}

interface StepTimelineProps {
  steps: Step[]
}

export function StepTimeline({ steps }: StepTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00A3E0] to-[#4A4A4A] md:left-1/2 md:-ml-0.5"></div>

      {/* Steps */}
      <div className="space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center">
              {/* Step number/icon */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full bg-[#00A3E0] text-white font-bold z-10 ${
                  index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                {step.icon || <CheckCircle className="h-4 w-4" />}
              </div>

              {/* Content */}
              <div
                className={`ml-12 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
