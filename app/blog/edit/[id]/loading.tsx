import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <article className="mx-auto max-w-4xl pb-10 px-4">
      <div className="flex flex-col gap-6">
        {/* Sticky toolbar */}
        <div className="sticky top-14 z-40 bg-background/80 backdrop-blur -mx-4 px-4 py-2 border-b">
          <div className="flex items-center gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton
                key={i}
                className="size-8 rounded-md"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-3/4 rounded" aria-hidden="true" />
          {/* TitleCaseButton */}
          <Skeleton className="size-8 rounded-md shrink-0" aria-hidden="true" />
        </div>

        {/* Logline */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-1/2 rounded" aria-hidden="true" />
          <Skeleton className="size-8 rounded-md shrink-0" aria-hidden="true" />
        </div>

        {/* Editor body */}
        <div
          className="flex flex-col gap-3 min-h-[500px]"
          aria-busy="true"
          aria-label="Loading post content"
        >
          <Skeleton className="h-4 w-full rounded" aria-hidden="true" />
          <Skeleton className="h-4 w-full rounded" aria-hidden="true" />
          <Skeleton className="h-4 w-5/6 rounded" aria-hidden="true" />
          <Skeleton className="h-4 w-full rounded" aria-hidden="true" />
          <Skeleton className="h-4 w-2/3 rounded" aria-hidden="true" />
        </div>
      </div>
    </article>
  )
}
