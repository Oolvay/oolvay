import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { siteConfig } from "@/config/site"

function formatCacheTime(minutes: number): string {
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"}`

  const years = Math.floor(minutes / 525960)
  const weeks = Math.floor((minutes % 525960) / 10080)
  const days = Math.floor((minutes % 10080) / 1440)
  const hours = Math.floor((minutes % 1440) / 60)
  const remainder = minutes % 60

  const yearStr = years > 0 ? `${years} year${years === 1 ? "" : "s"}` : ""
  const weekStr = weeks > 0 ? `${weeks} week${weeks === 1 ? "" : "s"}` : ""
  const dayStr = days > 0 ? `${days} day${days === 1 ? "" : "s"}` : ""
  const hourStr = hours > 0 ? `${hours} hour${hours === 1 ? "" : "s"}` : ""
  const minStr =
    remainder > 0 ? `${remainder} minute${remainder === 1 ? "" : "s"}` : ""

  return [yearStr, weekStr, dayStr, hourStr, minStr].filter(Boolean).join(" ")
}

function SessionCardSkeleton({ showRevoke }: { showRevoke: boolean }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="flex items-center gap-3">
          {/* Device icon circle */}
          <Skeleton
            className="size-10 rounded-full shrink-0"
            aria-hidden="true"
          />
          <div className="space-y-1.5">
            {/* "Desktop device · Chrome" + optional Current badge */}
            <Skeleton className="h-4 w-44 rounded" aria-hidden="true" />
            {/* IP · Started date */}
            <Skeleton className="h-3 w-52 rounded" aria-hidden="true" />
            {/* User agent string */}
            <Skeleton className="h-3 w-64 rounded" aria-hidden="true" />
          </div>
        </div>
        {showRevoke && (
          <Skeleton className="size-8 rounded-md shrink-0" aria-hidden="true" />
        )}
      </CardHeader>
    </Card>
  )
}

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Sessions"
        description="Manage your active sessions and devices"
      />

      {/* SessionManagement */}
      <div
        className="space-y-2 max-w-2xl"
        aria-busy="true"
        aria-label="Loading active sessions"
      >
        <GatedPageSubheading text="Active Sessions" />
        <div className="grid gap-4">
          {/* First card = current session (no revoke button) */}
          <SessionCardSkeleton showRevoke={false} />
          <SessionCardSkeleton showRevoke={true} />
          <SessionCardSkeleton showRevoke={true} />
        </div>
      </div>

      {/* LogOutEverywhereButton — fully static */}
      <div>
        <Button variant="destructive" size="lg" disabled aria-disabled="true">
          Log Out Everywhere
        </Button>
        {!siteConfig.authAndSession.logOutEverywhereInstantly && (
          <p className="text-sm text-muted-foreground mt-2">
            Other devices may take up to{" "}
            {formatCacheTime(siteConfig.authAndSession.cookieMaxAgeInMinutes)}{" "}
            to be logged out.
          </p>
        )}
      </div>
    </div>
  )
}
