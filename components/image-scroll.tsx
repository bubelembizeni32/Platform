"use client"

import { useState, useEffect, useRef } from "react"

interface ImageScrollProps {
  images: string[]
  speed?: number
  height?: number
}

export function ImageScroll({ images, speed = 30, height = 180 }: ImageScrollProps) {
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Clone the first set of images and append them to create the infinite scroll effect
    if (containerRef.current) {
      const scrollContainer = containerRef.current
      const scrollWidth = scrollContainer.scrollWidth
      const containerWidth = scrollContainer.offsetWidth

      // Only apply animation if there are enough images to scroll
      if (scrollWidth > containerWidth) {
        const scrollDuration = (scrollWidth / speed) * 1000 // milliseconds

        scrollContainer.style.animationDuration = `${scrollDuration}ms`
        scrollContainer.style.animationPlayState = isPaused ? "paused" : "running"
      }
    }
  }, [speed, isPaused])

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{ height: `${height}px` }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={containerRef}
        className="flex absolute animate-scroll"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* First set of images */}
        {images.map((src, index) => (
          <div key={`img-${index}`} className="flex-shrink-0 px-2">
            <img
              src={src || "/placeholder.svg"}
              alt={`Gallery image ${index + 1}`}
              className="h-full w-auto object-cover rounded-lg shadow-sm"
              style={{ height: `${height}px` }}
            />
          </div>
        ))}

        {/* Duplicated set of images for seamless looping */}
        {images.map((src, index) => (
          <div key={`img-dup-${index}`} className="flex-shrink-0 px-2">
            <img
              src={src || "/placeholder.svg"}
              alt={`Gallery image ${index + 1}`}
              className="h-full w-auto object-cover rounded-lg shadow-sm"
              style={{ height: `${height}px` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
