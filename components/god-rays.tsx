"use client"

import { useEffect, useRef } from "react"

export function GodRays() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Ray configuration
    const rays = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      width: 100 + Math.random() * 200,
      angle: Math.random() * Math.PI,
      speed: 0.0005 + Math.random() * 0.001,
      opacity: 0.05 + Math.random() * 0.15,
    }))

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw rays
      rays.forEach((ray) => {
        // Update ray angle
        ray.angle += ray.speed

        // Calculate ray endpoints
        const length = Math.max(canvas.width, canvas.height) * 2
        const startX = ray.x
        const startY = ray.y
        const endX = startX + Math.cos(ray.angle) * length
        const endY = startY + Math.sin(ray.angle) * length

        // Create gradient
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${ray.opacity})`)
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        // Draw ray
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.lineWidth = ray.width
        ctx.strokeStyle = gradient
        ctx.globalCompositeOperation = "lighter"
        ctx.stroke()
        ctx.globalCompositeOperation = "source-over"
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.2 }} />
  )
}
