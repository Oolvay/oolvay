import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"

function FieldRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-xs text-muted-foreground uppercase tracking-wide w-28 shrink-0">
        {label}
      </span>
      <div className="flex flex-1 items-center justify-between gap-4">
        <Skeleton className="h-4 w-40 rounded" aria-hidden="true" />
        <Skeleton className="size-3 shrink-0 rounded" aria-hidden="true" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Personal Information"
        description="Update additional personal information about yourself"
      />

      <div className="space-y-2">
        <GatedPageSubheading text="Place, Language, Etc." />

        <Card className="max-w-2xl overflow-visible">
          <CardContent className="px-6 py-2">
            <FieldRow label="Date of Birth" />
            <FieldRow label="Location" />
            {/* LocaleField renders a full Select, not an inline text value */}
            <div className="flex items-center justify-between gap-4 py-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wide w-28 shrink-0">
                Locale
              </span>
              <Skeleton className="h-9 flex-1 rounded-md" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
