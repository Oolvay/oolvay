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

      if (isDark) {
        /*
         * DARK MODE
         */

        ctx.fillStyle = "#050505"
        ctx.fillRect(0, 0, width, height)

        /*
         * Gold glow
         */

        const goldGlow = ctx.createRadialGradient(
          width * 0.72,
          height * 0.22,
          0,
          width * 0.72,
          height * 0.22,
          width * 0.75
        )

        goldGlow.addColorStop(0, "rgba(255,190,11,0.24)")
        goldGlow.addColorStop(0.2, "rgba(255,190,11,0.12)")
        goldGlow.addColorStop(0.5, "rgba(255,190,11,0.04)")
        goldGlow.addColorStop(1, "rgba(255,190,11,0)")

        ctx.fillStyle = goldGlow
        ctx.fillRect(0, 0, width, height)

        /*
         * Indigo counterglow
         */

        const blueGlow = ctx.createRadialGradient(
          width * 0.18,
          height * 0.15,
          0,
          width * 0.18,
          height * 0.15,
          width * 0.6
        )

        blueGlow.addColorStop(0, "rgba(59,130,246,0.10)")
        blueGlow.addColorStop(0.4, "rgba(59,130,246,0.04)")
        blueGlow.addColorStop(1, "rgba(59,130,246,0)")

        ctx.fillStyle = blueGlow
        ctx.fillRect(0, 0, width, height)

        /*
         * Bottom warmth
         */

        const wash = ctx.createLinearGradient(0, height, 0, height * 0.35)

        wash.addColorStop(0, "rgba(180,83,9,0.20)")
        wash.addColorStop(0.5, "rgba(180,83,9,0.06)")
        wash.addColorStop(1, "rgba(180,83,9,0)")

        ctx.fillStyle = wash
        ctx.fillRect(0, 0, width, height)
      } else {
        /*
         * LIGHT MODE
         */

        ctx.fillStyle = "#F8F4EA"
        ctx.fillRect(0, 0, width, height)

        /*
         * Large warm sunlight glow
         */

        const sunlight = ctx.createRadialGradient(
          width * 0.72,
          height * 0.12,
          0,
          width * 0.72,
          height * 0.12,
          width * 0.9
        )

        sunlight.addColorStop(0, "rgba(251,191,36,0.18)")
        sunlight.addColorStop(0.25, "rgba(251,191,36,0.08)")
        sunlight.addColorStop(0.6, "rgba(251,191,36,0.02)")
        sunlight.addColorStop(1, "rgba(251,191,36,0)")

        ctx.fillStyle = sunlight
        ctx.fillRect(0, 0, width, height)

        /*
         * Soft ambient cream bloom
         */

        const bloom = ctx.createRadialGradient(
          width * 0.5,
          height * 0.25,
          0,
          width * 0.5,
          height * 0.25,
          width * 0.8
        )

        bloom.addColorStop(0, "rgba(255,255,255,0.30)")
        bloom.addColorStop(0.4, "rgba(255,255,255,0.12)")
        bloom.addColorStop(1, "rgba(255,255,255,0)")

        ctx.fillStyle = bloom
        ctx.fillRect(0, 0, width, height)

        /*
         * Gentle lower warmth
         */

        const wash = ctx.createLinearGradient(0, height, 0, height * 0.35)

        wash.addColorStop(0, "rgba(251,191,36,0.06)")
        wash.addColorStop(0.5, "rgba(251,191,36,0.02)")
        wash.addColorStop(1, "rgba(251,191,36,0)")

        ctx.fillStyle = wash
        ctx.fillRect(0, 0, width, height)
      }

      /*
       * Grain
       */

      const grainCount = isDark ? 18000 : 7000

      for (let i = 0; i < grainCount; i++) {
        const x = Math.random() * width
        const y = Math.random() * height

        const alpha = isDark ? Math.random() * 0.05 : Math.random() * 0.008

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

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/50" />
    </>
  )
}
