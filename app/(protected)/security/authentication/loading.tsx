import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus } from "lucide-react"

function PasskeyCardSkeleton() {
  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="flex items-center gap-3">
          {/* Authenticator icon circle */}
          <Skeleton
            className="size-10 rounded-full shrink-0"
            aria-hidden="true"
          />
          <div className="space-y-1.5">
            {/* Passkey name */}
            <Skeleton className="h-4 w-32 rounded" aria-hidden="true" />
            {/* Authenticator name + date + usage */}
            <Skeleton className="h-3 w-48 rounded" aria-hidden="true" />
            <Skeleton className="h-3 w-36 rounded" aria-hidden="true" />
          </div>
        </div>
        {/* Delete button */}
        <Skeleton className="size-8 rounded-md shrink-0" aria-hidden="true" />
      </CardHeader>
    </Card>
  )
}

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Authentication"
        description="Manage your passkeys and sign-in methods"
      />

      <div
        className="space-y-2 max-w-2xl"
        aria-busy="true"
        aria-label="Loading passkeys"
      >
        <div className="flex items-center justify-between">
          <GatedPageSubheading text="Passkeys" />
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
            disabled
            aria-disabled="true"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add Passkey
          </Button>
        </div>

        <div className="grid gap-4">
          <PasskeyCardSkeleton />
          <PasskeyCardSkeleton />
        </div>
      </div>
    </div>
  )
}
