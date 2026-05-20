import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function NotificationItemSkeleton() {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-64 rounded" aria-hidden="true" />
        <Skeleton className="h-3 w-40 rounded" aria-hidden="true" />
      </div>
      <Skeleton className="h-8 w-24 rounded-md shrink-0" aria-hidden="true" />
    </div>
  )
}

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Notifications"
        description="View and manage your notification inbox"
      />

      <div
        className="space-y-6"
        aria-busy="true"
        aria-label="Loading notifications"
      >
        <div className="flex justify-end max-w-2xl">
          <Skeleton className="h-9 w-40 rounded-md" aria-hidden="true" />
        </div>

        <Card className="max-w-2xl">
          <CardContent className="px-6 py-4">
            <div className="flex flex-col gap-2">
              <NotificationItemSkeleton />
              <NotificationItemSkeleton />
              <NotificationItemSkeleton />
              <NotificationItemSkeleton />
              <NotificationItemSkeleton />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center max-w-2xl">
          <Skeleton className="h-9 w-28 rounded-md" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
