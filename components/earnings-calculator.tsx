"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"

export function EarningsCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(20)
  const [jobsPerWeek, setJobsPerWeek] = useState(5)
  const [averageRate, setAverageRate] = useState(350)

  const weeklyEarnings = jobsPerWeek * averageRate
  const monthlyEarnings = weeklyEarnings * 4
  const yearlyEarnings = monthlyEarnings * 12

  return (
    <motion.div
      className="p-6 rounded-lg border bg-card shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-4">Earnings Calculator</h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="hours-per-week" className="text-sm font-medium">
              Hours per week
            </label>
            <span className="text-sm font-medium">{hoursPerWeek} hours</span>
          </div>
          <Slider
            id="hours-per-week"
            min={5}
            max={40}
            step={1}
            value={[hoursPerWeek]}
            onValueChange={(value) => setHoursPerWeek(value[0])}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="jobs-per-week" className="text-sm font-medium">
              Jobs per week
            </label>
            <span className="text-sm font-medium">{jobsPerWeek} jobs</span>
          </div>
          <Slider
            id="jobs-per-week"
            min={1}
            max={20}
            step={1}
            value={[jobsPerWeek]}
            onValueChange={(value) => setJobsPerWeek(value[0])}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="average-rate" className="text-sm font-medium">
              Average rate per job (R)
            </label>
            <span className="text-sm font-medium">R{averageRate}</span>
          </div>
          <Slider
            id="average-rate"
            min={100}
            max={1000}
            step={50}
            value={[averageRate]}
            onValueChange={(value) => setAverageRate(value[0])}
            className="w-full"
          />
        </div>

        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Weekly</p>
              <p className="text-xl font-bold text-[#00A3E0]">R{weeklyEarnings.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Monthly</p>
              <p className="text-xl font-bold text-[#00A3E0]">R{monthlyEarnings.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Yearly</p>
              <p className="text-xl font-bold text-[#00A3E0]">R{yearlyEarnings.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
