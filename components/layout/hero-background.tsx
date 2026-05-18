"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext("2d")

    if (!ctx) return

    const parent = canvas.parentElement

    if (!parent) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = parent.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      draw(rect.width, rect.height)
    }

    const draw = (width: number, height: number) => {
      const isDark = resolvedTheme === "dark"

      ctx.clearRect(0, 0, width, height)

      /*
       * Base background
       */

      ctx.fillStyle = isDark ? "#09090B" : "#F5F1E8"
      ctx.fillRect(0, 0, width, height)

      /*
       * Main ambient orb
       */

      const orb = ctx.createRadialGradient(
        width * 0.7,
        height * 0.28,
        0,
        width * 0.7,
        height * 0.28,
        width * 0.45
      )

      if (isDark) {
        orb.addColorStop(0, "rgba(234,179,8,0.14)")
        orb.addColorStop(0.25, "rgba(234,179,8,0.06)")
        orb.addColorStop(1, "rgba(234,179,8,0)")
      } else {
        orb.addColorStop(0, "rgba(251,191,36,0.18)")
        orb.addColorStop(0.2, "rgba(251,191,36,0.10)")
        orb.addColorStop(0.45, "rgba(251,191,36,0.04)")
      }

      ctx.fillStyle = orb
      ctx.fillRect(0, 0, width, height)

      /*
       * Lower atmospheric wash
       */

      const wash = ctx.createLinearGradient(0, height, 0, height * 0.35)

      if (isDark) {
        wash.addColorStop(0, "rgba(120,53,15,0.18)")
        wash.addColorStop(1, "rgba(120,53,15,0)")
      } else {
        wash.addColorStop(0, "rgba(251,191,36,0.06)")
        wash.addColorStop(1, "rgba(251,191,36,0)")
      }

      ctx.fillStyle = wash
      ctx.fillRect(0, 0, width, height)

      /*
       * Extremely subtle grain
       */

      for (let i = 0; i < 12000; i++) {
        const x = Math.random() * width
        const y = Math.random() * height

        const alpha = isDark ? Math.random() * 0.03 : Math.random() * 0.02

        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fillRect(x, y, 1, 1)
      }
    }

    resize()

    const resizeObserver = new ResizeObserver(() => {
      resize()
    })

    resizeObserver.observe(parent)

    return () => {
      resizeObserver.disconnect()
    }
  }, [resolvedTheme])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/80" />
    </>
  )
}
