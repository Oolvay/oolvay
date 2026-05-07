"use client"

import { useEffect } from "react"

export function ThemeFlashGuard() {
  useEffect(() => {
    // requestAnimationFrame ensures we're past the first committed paint
    const raf = requestAnimationFrame(() => {
      document.documentElement.classList.remove("no-transitions")
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return null
}
