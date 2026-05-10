"use client"

import { useState } from "react"
import { createBillingPortalSession } from "@/lib/payments/client"

interface BillingPortalButtonProps {
  children?: React.ReactNode
  className?: string
}

export function BillingPortalButton({
  children = "Manage Billing",
  className,
}: BillingPortalButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const { url } = await createBillingPortalSession()
      window.location.href = url
    } catch (err) {
      console.error("Billing portal error:", err)
      // 501 means provider doesn't support billing portal (Razorpay)
      // Phase 24 will add a manual billing page for that case
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={className}
      aria-busy={loading}
      aria-disabled={loading}
      aria-label="Open billing management portal"
    >
      {loading ? "Loading…" : children}
    </button>
  )
}
