"use client"

import { useState } from "react"
import { initiateCheckout, verifyCheckout } from "@/lib/payments/client"
import { Button } from "@/components/ui/button"
import { LoadingSwap } from "@/components/ui/loading-swap"
import type { ComponentProps } from "react"
import { useRouter } from "next/navigation"
import { TIERS } from "@/config/pricing"

// Derived once at module load — the tier with no priceId is the free tier
const FREE_TIER_KEY =
  Object.values(TIERS).find(
    (t) => t.priceId.monthly === null && t.priceId.annual === null
  )?.key ?? null

type ButtonVariant = ComponentProps<typeof Button>["variant"]
type ButtonSize = ComponentProps<typeof Button>["size"]

interface CheckoutButtonProps {
  priceId: string
  type: "one_time" | "subscription"
  currentTier?: string
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  "aria-label"?: string
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void }
  }
}

async function loadRazorpayScript(): Promise<void> {
  if (typeof window.Razorpay !== "undefined") return
  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Razorpay script failed to load"))
    document.body.appendChild(script)
  })
}

export function CheckoutButton({
  priceId,
  type,
  currentTier,
  children,
  variant = "default",
  size = "default",
  className,
  "aria-label": ariaLabel,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleClick() {
    setLoading(true)
    try {
      const result = await initiateCheckout({ priceId, type })

      if (result.mode === "redirect") {
        window.location.href = result.url
        return // keep loading=true — navigation is in progress
      }

      if (result.mode === "modal") {
        await loadRazorpayScript()

        await new Promise<void>((resolve, reject) => {
          const rzp = new window.Razorpay({
            key: result.keyId,
            ...(type === "one_time" ? { customer_id: result.customerId } : {}),
            subscription_id:
              type === "subscription" ? result.orderId : undefined,
            order_id: type === "one_time" ? result.orderId : undefined,
            amount: result.amount,
            currency: result.currency,
            prefill: result.prefill ?? {},
            handler: async (response: {
              razorpay_payment_id: string
              razorpay_order_id?: string
              razorpay_subscription_id?: string
              razorpay_signature: string
            }) => {
              try {
                await verifyCheckout({
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId:
                    response.razorpay_order_id ??
                    response.razorpay_subscription_id ??
                    "",
                  razorpaySignature: response.razorpay_signature,
                })
                // Poll until tier changes from the pre-payment baseline.
                // currentTier is passed in from the server as a prop so we
                // always have the correct baseline — no hardcoded tier names.
                const tierBaseline = currentTier ?? FREE_TIER_KEY
                const pollForTierChange = async () => {
                  for (let i = 0; i < 10; i++) {
                    await new Promise((r) => setTimeout(r, 2000))
                    try {
                      const res = await fetch("/api/payments/subscription")
                      if (res.ok) {
                        const data = await res.json()
                        if (data.tier && data.tier !== tierBaseline) {
                          break
                        }
                      }
                    } catch {
                      // Network hiccup — keep polling
                    }
                  }
                }

                await pollForTierChange()
                router.refresh()
                setLoading(false)
                resolve()
              } catch (err) {
                reject(err)
              }
            },
            modal: {
              ondismiss: () => {
                setLoading(false)
                resolve()
              },
            },
          })
          rzp.open()
        })
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes("Unauthorized")) {
        router.push(`/login?callbackUrl=${encodeURIComponent("/pricing")}`)

        return
      }

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
