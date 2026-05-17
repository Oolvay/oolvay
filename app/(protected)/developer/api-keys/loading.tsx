import { Card, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { CreateKeyDialog } from "@/app/(protected)/developer/api-keys/components/create-key-dialog"

function KeyRowSkeleton() {
  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="flex items-center gap-3">
          <Skeleton
            className="size-8 rounded-full shrink-0"
            aria-hidden="true"
          />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-32 rounded" aria-hidden="true" />
            <Skeleton className="h-3 w-48 rounded" aria-hidden="true" />
            <Skeleton className="h-3 w-40 rounded" aria-hidden="true" />
          </div>
        </div>
        <Skeleton className="size-8 rounded-md shrink-0" aria-hidden="true" />
      </CardHeader>
    </Card>
  )
}

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="API Keys"
        description="Generate and manage your API keys and monitor usage"
      />

      <div className="space-y-2 max-w-2xl">
        <div className="flex items-center justify-between">
          <GatedPageSubheading text="API Keys" />
          <CreateKeyDialog />
        </div>

        <div className="grid gap-4">
          <KeyRowSkeleton />
          <KeyRowSkeleton />
        </div>
      </div>
    </div>
  )
}
