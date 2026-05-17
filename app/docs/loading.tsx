import { DocsBody, DocsPage } from "fumadocs-ui/page"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <DocsPage>
      {/* Action bar: mirrors <CopyMarkdownButton> + <DocsActions> */}
      <div className="mb-6 flex items-center gap-3" aria-hidden="true">
        <Skeleton className="h-8 w-36 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      <DocsBody>
        {/* H1 title */}
        <Skeleton className="mb-3 h-9 w-1/2 rounded-md" />
        {/* Description paragraph */}
        <Skeleton className="mb-8 h-5 w-3/4 rounded-md" />

        {/* Intro paragraph */}
        <div className="space-y-2 mb-6" aria-hidden="true">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-[93%] rounded" />
          <Skeleton className="h-4 w-[80%] rounded" />
        </div>

        {/* HR */}
        <Skeleton className="mb-6 h-px w-full rounded-none" />

        {/* H2 */}
        <Skeleton className="mb-4 h-7 w-2/5 rounded-md" />

        {/* Paragraph */}
        <div className="space-y-2 mb-5" aria-hidden="true">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-[88%] rounded" />
        </div>

        {/* Bullet list */}
        <div className="space-y-3 mb-6 pl-4" aria-hidden="true">
          {[72, 60, 68].map((w) => (
            <div key={w} className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 shrink-0 rounded-full" />
              <Skeleton className={`h-4 w-[${w}%] rounded`} />
            </div>
          ))}
        </div>

        {/* HR */}
        <Skeleton className="mb-6 h-px w-full rounded-none" />

        {/* H2 */}
        <Skeleton className="mb-4 h-7 w-1/3 rounded-md" />

        {/* Table: 4 rows × 2 cols */}
        <div
          className="mb-6 overflow-hidden rounded-lg border border-border"
          aria-hidden="true"
        >
          {/* Header row */}
          <div className="flex gap-4 border-b border-border bg-muted/40 px-4 py-2.5">
            <Skeleton className="h-4 w-36 rounded" />
            <Skeleton className="h-4 w-48 rounded" />
          </div>
          {[48, 40, 52, 44, 38, 50].map((w, i) => (
            <div
              key={i}
              className="flex gap-4 border-b border-border px-4 py-2.5 last:border-0"
            >
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className={`h-4 w-[${w}%] rounded`} />
            </div>
          ))}
        </div>

        {/* HR */}
        <Skeleton className="mb-6 h-px w-full rounded-none" />

        {/* H2 */}
        <Skeleton className="mb-4 h-7 w-2/5 rounded-md" />

        {/* Bullet list */}
        <div className="space-y-3 pl-4" aria-hidden="true">
          {[65, 55, 70].map((w) => (
            <div key={w} className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 shrink-0 rounded-full" />
              <Skeleton className={`h-4 w-[${w}%] rounded`} />
            </div>
          ))}
        </div>
      </DocsBody>
    </DocsPage>
  )
}
