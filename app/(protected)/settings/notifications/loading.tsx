import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { LockIcon } from "lucide-react"

function NotificationRowSkeleton({
  label,
  description,
  locked = false,
}: {
  label: string
  description: string
  locked?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b last:border-0">
      <span className="text-xs text-muted-foreground uppercase tracking-wide w-28 shrink-0">
        {label}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">{description}</p>
      </div>
      <div className="shrink-0 flex items-center gap-2">
        {locked && (
          <LockIcon
            className="h-3.5 w-3.5 text-muted-foreground"
            aria-hidden="true"
          />
        )}
        {/* Switch state is dynamic */}
        <Skeleton className="h-6 w-11 rounded-full" aria-hidden="true" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Notifications"
        description="Manage your notification preferences"
      />

      <div className="space-y-8">
        {/* SecurityAlertsCard */}
        <div
          className="space-y-2"
          aria-busy="true"
          aria-label="Loading security alert preferences"
        >
          <GatedPageSubheading text="Security Alerts" />
          <Card className="max-w-2xl">
            <CardContent className="px-6 py-2">
              <NotificationRowSkeleton
                label="Email"
                description="Receive security alerts via email. Cannot be disabled."
                locked
              />
              <NotificationRowSkeleton
                label="In-App"
                description="See security alerts inside the app."
              />
              <NotificationRowSkeleton
                label="Web"
                description="Receive browser push notifications for security alerts."
              />
            </CardContent>
          </Card>
        </div>

        {/* ProductUpdatesCard */}
        <div
          className="space-y-2"
          aria-busy="true"
          aria-label="Loading product update preferences"
        >
          <GatedPageSubheading text="Product Updates" />
          <Card className="max-w-2xl">
            <CardContent className="px-6 py-2">
              <NotificationRowSkeleton
                label="Email"
                description="Receive product news and updates via email."
              />
              <NotificationRowSkeleton
                label="In-App"
                description="See product updates inside the app."
              />
              <NotificationRowSkeleton
                label="Web"
                description="Receive browser push notifications for product updates."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
