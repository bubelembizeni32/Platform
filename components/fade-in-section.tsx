"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface FadeInSectionProps {
  children: React.ReactNode
  delay?: number
}

export function FadeInSection({ children, delay = 0 }: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-1000 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {children}
    </div>
  )
}
