"use client"

import { useState } from "react"
import { initiateCheckout } from "@/lib/payments/client"

interface CheckoutButtonProps {
  priceId: string
  type: "one_time" | "subscription"
  children: React.ReactNode
  className?: string
  "aria-label"?: string
}

export function CheckoutButton({
  priceId,
  type,
  children,
  className,
  "aria-label": ariaLabel,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const result = await initiateCheckout({ priceId, type })

      if (result.mode === "redirect") {
        window.location.href = result.url
        return // keep loading=true; navigation is in progress
      }

      // result.mode === "modal" — Razorpay, implemented in Phase 21
    } catch (err) {
      console.error("Checkout failed:", err)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={className}
      aria-label={ariaLabel}
      aria-busy={loading}
      aria-disabled={loading}
    >
      {loading ? "Loading…" : children}
    </button>
  )
}
