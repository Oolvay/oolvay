import { Skeleton } from "@/components/ui/skeleton"

function DraftCardSkeleton() {
  return (
    <article className="flex flex-col gap-4 p-6 border rounded-xl">
      <Skeleton className="h-4 w-24 rounded" aria-hidden="true" />
      <Skeleton className="h-8 w-3/4 rounded" aria-hidden="true" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full rounded" aria-hidden="true" />
        <Skeleton className="h-4 w-full rounded" aria-hidden="true" />
        <Skeleton className="h-4 w-2/3 rounded" aria-hidden="true" />
      </div>
      <div className="flex items-center gap-2 mt-auto pt-4 border-t">
        <Skeleton className="h-4 w-28 rounded" aria-hidden="true" />
        <Skeleton className="h-4 w-4 rounded" aria-hidden="true" />
        <Skeleton className="h-4 w-24 rounded" aria-hidden="true" />
      </div>
    </article>
  )
}

export default function Loading() {
  return (
    <section className="flex flex-col gap-20 mx-auto max-w-6xl px-4 md:px-8 py-10">
      <header className="font-bold text-foreground text-center space-y-4">
        <h1 className="text-4xl/tight md:text-6xl">My Drafts</h1>
        {/* draft count is dynamic */}
        <Skeleton className="h-9 w-64 rounded mx-auto" aria-hidden="true" />
      </header>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        aria-busy="true"
        aria-label="Loading drafts"
      >
        <DraftCardSkeleton />
        <DraftCardSkeleton />
        <DraftCardSkeleton />
        <DraftCardSkeleton />
      </div>
    </section>
  )
}
