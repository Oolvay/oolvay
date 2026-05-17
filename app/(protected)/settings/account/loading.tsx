import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

function AccountRowSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b last:border-0">
      <Skeleton className="h-3 w-28 shrink-0 rounded" aria-hidden="true" />
      <Skeleton className="h-4 flex-1 max-w-48 rounded" aria-hidden="true" />
      <Skeleton className="h-8 w-24 rounded-md shrink-0" aria-hidden="true" />
    </div>
  )
}

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Account"
        description="Manage your sign-in methods and account deletion"
      />

      {/* ConnectedAccountsCard — rows are fully dynamic */}
      <div
        className="space-y-2"
        aria-busy="true"
        aria-label="Loading sign-in methods"
      >
        <GatedPageSubheading text="Sign-in Methods" />
        <Card className="max-w-2xl">
          <CardContent className="px-6 py-2">
            <AccountRowSkeleton />
            <AccountRowSkeleton />
          </CardContent>
        </Card>
      </div>

      {/* DeleteAccountCard — static except username in the confirm step, which is hidden by default */}
      <div className="space-y-2">
        <GatedPageSubheading text="Delete Account" />
        <Card className="max-w-2xl border-destructive/40">
          <CardContent className="px-6 py-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
            <Button variant="destructive" disabled aria-disabled="true">
              Delete My Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
