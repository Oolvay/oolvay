import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

function ActionRowSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b last:border-0">
      <div className="flex-1 min-w-0 space-y-1.5">
        <Skeleton className="h-4 w-36 rounded" aria-hidden="true" />
        <Skeleton className="h-3.5 w-72 rounded" aria-hidden="true" />
      </div>
      <Skeleton className="h-8 w-24 rounded-md shrink-0" aria-hidden="true" />
    </div>
  )
}

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Billing"
        description="Manage your subscription, invoices, and billing preferences"
      />

      {/* CurrentPlanCard */}
      <div
        className="space-y-2"
        aria-busy="true"
        aria-label="Loading current plan"
      >
        <GatedPageSubheading text="Current Plan" />
        <Card className="max-w-2xl">
          <CardContent className="px-6 py-2">
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="space-y-1">
                {/* planName */}
                <Skeleton className="h-4 w-24 rounded" aria-hidden="true" />
                {/* "Renews …" / "Ends …" / free plan line */}
                <Skeleton className="h-3.5 w-52 rounded" aria-hidden="true" />
              </div>
              <div className="flex flex-col space-y-4 items-end shrink-0">
                {/* Status badge */}
                <Skeleton
                  className="h-6 w-20 rounded-full"
                  aria-hidden="true"
                />
                <Link
                  href="/pricing"
                  className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  Compare plans
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SubscriptionActionsCard — all rows are dynamic */}
      <div
        className="space-y-2"
        aria-busy="true"
        aria-label="Loading subscription actions"
      >
        <GatedPageSubheading text="Subscription Actions" />
        <Card className="max-w-2xl">
          <CardContent className="px-6 py-2">
            <ActionRowSkeleton />
            <ActionRowSkeleton />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
