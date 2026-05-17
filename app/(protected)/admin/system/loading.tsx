import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCwIcon } from "lucide-react"
import { HealthLegend } from "@/app/(protected)/admin/system/components/health-card"

const DB_THRESHOLDS = { good: 200, degraded: 500 }
const CACHE_THRESHOLDS = { good: 50, degraded: 150 }

const ENV_LABELS = [
  "Environment",
  "Node.js Version",
  "Platform",
  "App Version",
  "App URL",
  "Auth URL",
  "Deployment Environment",
  "Region",
  "Git Branch",
  "Commit SHA",
  "Commit Message",
  "Deployment ID",
]

function EnvRowSkeleton({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm">
      <span className="text-muted-foreground font-medium shrink-0">
        {label}
      </span>
      <Skeleton className="h-3.5 w-28 rounded ml-4" aria-hidden="true" />
    </div>
  )
}

function HealthCardSkeleton({ name }: { name: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        {/* Status dot circle */}
        <Skeleton className="size-9 rounded-full" aria-hidden="true" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {/* "Operational" / "Degraded" / "Outage" */}
        <Skeleton className="h-8 w-28 rounded" aria-hidden="true" />
        {/* latency + grade badge */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-12 rounded" aria-hidden="true" />
          <Skeleton className="h-4 w-14 rounded-full" aria-hidden="true" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function Loading() {
  const mid = Math.ceil(ENV_LABELS.length / 2)
  const leftLabels = ENV_LABELS.slice(0, mid)
  const rightLabels = ENV_LABELS.slice(mid)

  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="System Info"
        description="View environment configurations and real-time infrastructure health checks."
      />

      {/* EnvInfo */}
      <div
        className="space-y-2"
        aria-busy="true"
        aria-label="Loading environment info"
      >
        <GatedPageSubheading text="Environment" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border divide-y shadow-none">
            {leftLabels.map((label) => (
              <EnvRowSkeleton key={label} label={label} />
            ))}
          </div>
          <div className="rounded-xl border divide-y shadow-none">
            {rightLabels.map((label) => (
              <EnvRowSkeleton key={label} label={label} />
            ))}
          </div>
        </div>
      </div>

      {/* InfrastructureHealth */}
      <div
        className="flex flex-col gap-4"
        aria-busy="true"
        aria-label="Loading infrastructure health"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <GatedPageSubheading text="Infrastructure" />
            <Button variant="outline" size="sm" disabled aria-disabled="true">
              <RefreshCwIcon className="size-3.5" aria-hidden="true" />
              Refresh
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <HealthCardSkeleton name="Database" />
            <HealthCardSkeleton name="Cache" />
          </div>
        </div>

        {/* HealthLegend — thresholds are hardcoded constants, fully static */}
        <HealthLegend
          dbThresholds={DB_THRESHOLDS}
          cacheThresholds={CACHE_THRESHOLDS}
        />
      </div>
    </div>
  )
}
