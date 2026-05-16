"use client"

import { useTransition } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createBillingPortalSession } from "@/lib/payments/client"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"

interface SubscriptionActionsCardProps {
  tier: string
  provider: string | null
  cancelAtPeriodEnd: boolean
  onCancel: () => Promise<void>
  onResume: () => Promise<void>
}

export function SubscriptionActionsCard({
  tier,
  provider,
  cancelAtPeriodEnd,
  onCancel,
  onResume,
}: SubscriptionActionsCardProps) {
  const [isPending, startTransition] = useTransition()
  const isFree = tier === "starter"
  const supportsBillingPortal =
    provider === "lemonsqueezy" || provider === "stripe"
  const supportsDelayedCancellation =
    provider === "lemonsqueezy" || provider === "stripe"
  const showCancel = !isFree && !cancelAtPeriodEnd
  const showResume = !isFree && supportsDelayedCancellation && cancelAtPeriodEnd

  if (isFree) {
    return null
  }

  return (
    <div className="space-y-2">
      <GatedPageSubheading text="Subscription Actions" />

      <Card className="max-w-2xl">
        <CardContent className="px-6 py-2">
          {supportsBillingPortal && (
            <div className="flex items-center justify-between gap-4 py-3 border-b last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Billing portal</p>

                <p className="text-sm text-muted-foreground">
                  Manage invoices, payment methods, and billing details
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={isPending}
                onClick={() =>
                  startTransition(async () => {
                    const result = await createBillingPortalSession()
                    window.location.href = result.url
                  })
                }
                className="shrink-0"
              >
                Manage billing
              </Button>
            </div>
          )}

          {showCancel && (
            <div className="flex items-center justify-between gap-4 py-3 border-b last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Cancel subscription</p>

                <p className="text-sm text-muted-foreground">
                  {supportsDelayedCancellation
                    ? "Your subscription will remain active until the end of the current billing period"
                    : "Your subscription will be canceled immediately"}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={isPending}
                onClick={() =>
                  startTransition(async () => {
                    await onCancel()
                  })
                }
                className="shrink-0"
              >
                Cancel
              </Button>
            </div>
          )}

          {showResume && (
            <div className="flex items-center justify-between gap-4 py-3 border-b last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Resume subscription</p>

                <p className="text-sm text-muted-foreground">
                  Your subscription is scheduled to end at the end of the
                  current billing period
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={isPending}
                onClick={() =>
                  startTransition(async () => {
                    await onResume()
                  })
                }
                className="shrink-0"
              >
                Resume
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
