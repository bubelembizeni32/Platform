"use client"

import { useEffect, useRef } from "react"

interface HorizontalScrollBackgroundProps {
  images: string[]
}

export function HorizontalScrollBackground({ images }: HorizontalScrollBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure we have enough images for a smooth scroll effect
    if (containerRef.current && images.length > 0) {
      const scrollContainer = containerRef.current

      // Make sure the animation is running
      scrollContainer.style.animationPlayState = "running"
    }
  }, [images])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Dimming overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/60 z-10" />

      {/* Scrolling container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full flex animate-scroll-x">
        {/* First set of images */}
        {images.map((src, index) => (
          <div
            key={`img-${index}`}
            className="flex-shrink-0 min-w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}

        {/* Duplicate set for seamless looping */}
        {images.map((src, index) => (
          <div
            key={`img-dup-${index}`}
            className="flex-shrink-0 min-w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
    </div>
  )
}
