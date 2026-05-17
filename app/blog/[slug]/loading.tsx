import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <article className="pb-10 -mt-14">
      {/* Hero */}
      <div className="relative w-full h-[65vh] md:h-[60vh]">
        {/* Cover image */}
        <Skeleton
          className="absolute inset-0 rounded-none"
          aria-hidden="true"
        />

        {/* Breadcrumbs */}
        <div className="absolute top-0 left-0 right-0 px-6 pt-18 md:px-16 max-w-5xl mx-auto">
          <Skeleton className="h-7 w-48 rounded-full" aria-hidden="true" />
        </div>

        {/* Title block */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8 md:px-16 md:pb-12 max-w-5xl mx-auto w-full left-0 right-0">
          <div className="space-y-3">
            {/* Category pill */}
            <Skeleton className="h-6 w-24 rounded-full" aria-hidden="true" />
            {/* Title */}
            <Skeleton
              className="h-10 w-3/4 md:h-12 rounded"
              aria-hidden="true"
            />
            <Skeleton
              className="h-10 w-1/2 md:h-12 rounded"
              aria-hidden="true"
            />
            {/* Logline */}
            <Skeleton className="h-6 w-2/3 rounded" aria-hidden="true" />
            {/* Meta row */}
            <div className="flex items-center gap-3 pt-2">
              <Skeleton
                className="size-6 rounded-full shrink-0"
                aria-hidden="true"
              />
              <Skeleton className="h-4 w-28 rounded" aria-hidden="true" />
              <Skeleton className="h-4 w-px rounded" aria-hidden="true" />
              <Skeleton className="h-4 w-32 rounded" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="mx-auto max-w-4xl px-4 pt-10"
        aria-busy="true"
        aria-label="Loading post content"
      >
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-full rounded" aria-hidden="true" />
          <Skeleton className="h-4 w-full rounded" aria-hidden="true" />
          <Skeleton className="h-4 w-5/6 rounded" aria-hidden="true" />
          <Skeleton className="h-4 w-full rounded" aria-hidden="true" />
          <Skeleton className="h-4 w-4/5 rounded" aria-hidden="true" />
          <Skeleton className="h-4 w-full rounded" aria-hidden="true" />
          <Skeleton className="h-4 w-2/3 rounded" aria-hidden="true" />
        </div>
      </div>
    </article>
  )
}
