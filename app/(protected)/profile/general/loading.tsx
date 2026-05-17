import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { CalendarIcon, ClockIcon } from "lucide-react"

function InfoRowSkeleton({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-2">
      <Icon
        className="size-4 text-muted-foreground shrink-0"
        aria-hidden="true"
      />
      <div className="space-y-1">
        {/* Label e.g. "MEMBER SINCE" */}
        <Skeleton className="h-3 w-24 rounded" aria-hidden="true" />
        {/* Value e.g. "April 25, 2026" */}
        <Skeleton className="h-4 w-28 rounded" aria-hidden="true" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Basic Profile"
        description="Update your basic personal information and bio"
      />

      {/* ProfileInformationCard */}
      <div className="space-y-2">
        <GatedPageSubheading text="Basic Info" />
        <Card className="max-w-2xl">
          <CardContent className="p-6 md:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
              {/* Left column: avatar */}
              <div className="flex shrink-0 flex-col items-center gap-4 md:self-center">
                <Skeleton
                  className="size-36 md:size-60 rounded-full ring-4 ring-foreground/40"
                  aria-hidden="true"
                />
              </div>

              {/* Right column */}
              <div className="flex flex-1 flex-col justify-center min-w-0">
                <div className="mb-6 flex flex-col items-center md:items-start gap-2 min-w-0 w-full">
                  {/* RoleBadge */}
                  <Skeleton
                    className="h-5 w-16 rounded-full"
                    aria-hidden="true"
                  />
                  {/* Name */}
                  <Skeleton
                    className="h-8 w-48 rounded-md"
                    aria-hidden="true"
                  />
                  {/* Username */}
                  <Skeleton
                    className="h-5 w-32 rounded-md"
                    aria-hidden="true"
                  />
                  {/* Email */}
                  <Skeleton className="h-4 w-44 rounded" aria-hidden="true" />
                </div>

                <Separator className="mb-2 opacity-50" />

                <div className="flex flex-row sm:flex-col gap-4 mt-2">
                  <InfoRowSkeleton icon={CalendarIcon} />
                  <InfoRowSkeleton icon={ClockIcon} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BioCard */}
      <div className="space-y-2">
        <GatedPageSubheading text="Brief Bio" />
        <Card className="max-w-2xl">
          <CardContent>
            <div className="flex w-full items-start gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full rounded" aria-hidden="true" />
                <Skeleton className="h-4 w-[85%] rounded" aria-hidden="true" />
                <Skeleton className="h-4 w-[60%] rounded" aria-hidden="true" />
              </div>
              {/* Pencil icon */}
              <Skeleton
                className="size-3 shrink-0 mt-0.5 rounded"
                aria-hidden="true"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
