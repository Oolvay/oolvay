import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { SOCIAL_CONFIG, SOCIAL_PLATFORMS } from "@/db/types/socials"

function FieldRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-xs text-muted-foreground uppercase tracking-wide w-28 shrink-0">
        {label}
      </span>
      <div className="flex flex-1 min-w-0 items-center justify-between gap-3">
        <Skeleton className="h-4 w-36 rounded" aria-hidden="true" />
        <Skeleton className="size-3 shrink-0 rounded" aria-hidden="true" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Professional Information"
        description="Update additional personal information about your profile"
      />

      {/* WorkInfoCard */}
      <div className="space-y-2">
        <GatedPageSubheading text="Work" />
        <Card className="max-w-2xl">
          <CardContent className="px-6 py-2">
            <FieldRow label="Job Title" />
            <FieldRow label="Company" />
          </CardContent>
        </Card>
      </div>

      {/* OnlinePresenceCard */}
      <div className="space-y-2">
        <GatedPageSubheading text="Online Presence" />
        <Card className="max-w-2xl">
          <CardContent className="px-6 py-2">
            <FieldRow label="Website" />
            {SOCIAL_PLATFORMS.map((platform) => (
              <FieldRow key={platform} label={SOCIAL_CONFIG[platform].label} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
