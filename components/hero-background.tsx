"use client"

import { useEffect, useState } from "react"

interface HeroBackgroundProps {
  images: string[]
  interval?: number
}

export function HeroBackground({ images, interval = 5000 }: HeroBackgroundProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nextImageIndex, setNextImageIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        setNextImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        setIsTransitioning(false)
      }, 1000) // Transition duration
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Current image */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      />

      {/* Next image (preloaded) */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${images[nextImageIndex]})` }}
      />

      {/* Dimming overlay */}
      <div className="absolute inset-0 w-full h-full bg-black opacity-60" />
    </div>
  )
}
