"use client"

import { useState } from "react"
import { initiateCheckout } from "@/lib/payments/client"
import { Button } from "@/components/ui/button"
import { LoadingSwap } from "@/components/ui/loading-swap"
import type { ComponentProps } from "react"

type ButtonVariant = ComponentProps<typeof Button>["variant"]
type ButtonSize = ComponentProps<typeof Button>["size"]

interface CheckoutButtonProps {
  priceId: string
  type: "one_time" | "subscription"
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  "aria-label"?: string
}

export function CheckoutButton({
  priceId,
  type,
  children,
  variant = "default",
  size = "default",
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
        return
      }

      // result.mode === "modal" — Razorpay, implemented in Phase 21
    } catch (err) {
      console.error("Checkout failed:", err)
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      variant={variant}
      size={size}
      className={className}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      <LoadingSwap isLoading={loading}>
        <span className="flex items-center justify-center gap-x-2">
          {children}
        </span>
      </LoadingSwap>
    </Button>
  )
}
