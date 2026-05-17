import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Accessibility"
        description="Adjust font size and motion settings to suit your needs"
      />

      {/* FontSizeSelector */}
      <div
        className="space-y-2"
        aria-busy="true"
        aria-label="Loading font size setting"
      >
        <GatedPageSubheading text="Font Size" />
        <div className="space-y-1">
          <div className="flex items-center gap-4 w-full max-w-sm">
            <span
              className="text-sm font-medium select-none text-muted-foreground/80"
              aria-hidden="true"
            >
              Aa
            </span>
            {/* Slider track — static chrome, thumb position is dynamic */}
            <Skeleton className="h-4 flex-1 rounded-full" aria-hidden="true" />
            <span
              className="text-2xl font-medium select-none text-muted-foreground/80"
              aria-hidden="true"
            >
              Aa
            </span>
          </div>
          {/* "Size selected: Medium" — value is dynamic */}
          <p className="text-sm text-foreground" aria-hidden="true">
            Size selected:{" "}
            <span className="inline-block h-3.5 w-14 rounded align-middle animate-pulse bg-muted" />
          </p>
        </div>
      </div>

      {/* ReduceMotionToggle */}
      <div
        className="space-y-2"
        aria-busy="true"
        aria-label="Loading motion setting"
      >
        <GatedPageSubheading text="Motion" />
        <div className="flex items-center justify-between max-w-2xl rounded-xl border border-border p-4">
          <div className="space-y-0.5">
            <Label
              htmlFor="reduce-motion-skeleton"
              className="text-sm font-medium"
            >
              Reduce motion
            </Label>
            <p className="text-sm text-muted-foreground">
              Minimizes animations and transitions across the interface
            </p>
          </div>
          {/* Switch state is dynamic */}
          <Skeleton
            className="h-6 w-11 rounded-full shrink-0"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}
