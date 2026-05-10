"use client"

import { useEffect, useState } from "react"
import { getSubscriptionStatus } from "@/lib/payments/client"
import type { UserAccessLevel } from "@/lib/payments/subscription-state"

interface SubscriptionStatusProps {
  className?: string
}

export function SubscriptionStatus({ className }: SubscriptionStatusProps) {
  const [access, setAccess] = useState<UserAccessLevel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getSubscriptionStatus()
      .then(setAccess)
      .catch((err: unknown) => {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load subscription status."
        )
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <p
        className={className}
        aria-busy="true"
        aria-label="Loading subscription status"
      >
        Loading…
      </p>
    )
  }

  if (error) {
    return (
      <p
        className={className}
        role="alert"
        aria-label="Subscription status error"
      >
        {error}
      </p>
    )
  }

  if (!access) return null

  return (
    <dl className={className} aria-label="Subscription status">
      <div className="flex gap-2">
        <dt className="text-muted-foreground text-sm">Plan</dt>
        <dd className="text-sm font-semibold capitalize">{access.tier}</dd>
      </div>

      {access.status && (
        <div className="flex gap-2">
          <dt className="text-muted-foreground text-sm">Status</dt>
          <dd className="text-sm font-semibold capitalize">{access.status}</dd>
        </div>
      )}

      {access.currentPeriodEnd && (
        <div className="flex gap-2">
          <dt className="text-muted-foreground text-sm">
            {access.cancelAtPeriodEnd ? "Ends" : "Renews"}
          </dt>
          <dd className="text-sm font-semibold">
            {access.currentPeriodEnd.toLocaleDateString()}
          </dd>
        </div>
      )}

      {access.trialEnd && (
        <div className="flex gap-2">
          <dt className="text-muted-foreground text-sm">Trial ends</dt>
          <dd className="text-sm font-semibold">
            {access.trialEnd.toLocaleDateString()}
          </dd>
        </div>
      )}
    </dl>
  )
}
