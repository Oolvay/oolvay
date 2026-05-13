"use client"

import { useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function CheckoutListener() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isPolling = useRef(false)

  useEffect(() => {
    const isSuccess = searchParams.get("success") === "true"

    if (isSuccess && !isPolling.current) {
      isPolling.current = true

      const pollForTierChange = async () => {
        for (let i = 0; i < 15; i++) {
          // Poll 15 times (30 seconds)
          await new Promise((r) => setTimeout(r, 2000))
          try {
            const res = await fetch("/api/payments/subscription")
            if (res.ok) {
              const data = await res.json()
              // If tier changed from starter to something else
              if (data.tier && data.tier !== "starter") {
                router.refresh() // Refresh server components to show Pro table
                // Optional: Clean up the URL so it doesn't poll on manual refresh
                router.replace("/pricing", { scroll: false })
                break
              }
            }
          } catch (err) {
            console.error("Polling failed", err)
          }
        }
      }

      pollForTierChange()
    }
  }, [searchParams, router])

  return null // This is a hidden logic component
}
