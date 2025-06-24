"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ParallaxHeroProps {
  title: string
  subtitle: string
  children?: React.ReactNode
}

export function ParallaxHero({ title, subtitle, children }: ParallaxHeroProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#00A3E0]/10 to-[#4A4A4A]/20"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        {/* Watermark logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="text-8xl font-bold tracking-wider">
            ProL<span className="text-[#00A3E0]">ii</span>nk
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">{title}</h1>
          <p className="max-w-[700px] mx-auto text-lg md:text-xl text-muted-foreground">{subtitle}</p>
          {children}
        </motion.div>
      </div>
    </div>
  )
}
