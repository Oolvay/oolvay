import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import {
  THEMES,
  type Theme,
} from "@/app/(protected)/preferences/display/constants/themes"

function StaticPreviewThumbnail({ theme }: { theme: Theme }) {
  if (theme.value === "system") {
    const p = theme.preview as {
      leftBg: string
      rightBg: string
      leftSidebar: string
      rightSidebar: string
      leftBar: string
      rightBar: string
    }
    return (
      <div
        className="rounded-sm overflow-hidden mb-3 h-24 flex border border-border/40"
        aria-hidden="true"
      >
        <div className={cn("flex flex-1", p.leftBg)}>
          <div className={cn("w-3 shrink-0", p.leftSidebar)} />
          <div className="flex-1 p-1.5 space-y-1.5">
            <div className={cn("h-1.5 rounded-sm w-[70%]", p.leftBar)} />
            <div className={cn("h-1.5 rounded-sm w-[45%]", p.leftBar)} />
            <div className={cn("h-1.5 rounded-sm w-[70%]", p.leftBar)} />
            <div className={cn("h-1.5 rounded-sm w-[55%]", p.leftBar)} />
          </div>
        </div>
        <div className="w-px bg-border/60 shrink-0" />
        <div className={cn("flex flex-1", p.rightBg)}>
          <div className={cn("w-3 shrink-0", p.rightSidebar)} />
          <div className="flex-1 p-1.5 space-y-1.5">
            <div className={cn("h-1.5 rounded-sm w-[70%]", p.rightBar)} />
            <div className={cn("h-1.5 rounded-sm w-[45%]", p.rightBar)} />
            <div className={cn("h-1.5 rounded-sm w-[70%]", p.rightBar)} />
            <div className={cn("h-1.5 rounded-sm w-[55%]", p.rightBar)} />
          </div>
        </div>
      </div>
    )
  }

  const p = theme.preview as { bg: string; sidebar: string; bar: string }
  return (
    <div
      className={cn(
        "rounded-sm overflow-hidden mb-3 h-24 flex border border-border/40",
        p.bg
      )}
      aria-hidden="true"
    >
      <div className={cn("w-5 shrink-0", p.sidebar)} />
      <div className="flex-1 p-2 space-y-1.5">
        <div className={cn("h-1.5 rounded-sm w-[70%]", p.bar)} />
        <div className={cn("h-1.5 rounded-sm w-[45%]", p.bar)} />
        <div className={cn("h-1.5 rounded-sm w-[70%]", p.bar)} />
        <div className={cn("h-1.5 rounded-sm w-[55%]", p.bar)} />
      </div>
    </div>
  )
}

function ThemeOptionSkeleton({ theme }: { theme: Theme }) {
  return (
    <div className="rounded-xl border border-border p-3" aria-hidden="true">
      <StaticPreviewThumbnail theme={theme} />
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{theme.label}</span>
        {/* Only the selection indicator is unknown — skeleton it */}
        <Skeleton className="size-4 rounded-full shrink-0" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Display Preferences"
        description="Customize your display mode and visual experience"
      />
      <div
        className="space-y-2"
        aria-busy="true"
        aria-label="Loading display preferences"
      >
        <GatedPageSubheading text="Display Mode" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {THEMES.map((theme) => (
            <ThemeOptionSkeleton key={theme.value} theme={theme} />
          ))}
        </div>
      </div>
    </div>
  )
}
