import { Skeleton } from "@/components/ui/skeleton"

export function PostCardSkeleton() {
  return (
    <article className="flex flex-col gap-4 p-6 border rounded-xl">
      <Skeleton className="h-4 w-24" aria-hidden="true" />
      <Skeleton className="h-8 w-3/4" aria-hidden="true" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" aria-hidden="true" />
        <Skeleton className="h-4 w-full" aria-hidden="true" />
        <Skeleton className="h-4 w-2/3" aria-hidden="true" />
      </div>
      <div className="flex items-center gap-2 mt-auto pt-4 border-t">
        <Skeleton className="h-4 w-28" aria-hidden="true" />
        <Skeleton className="h-4 w-4" aria-hidden="true" />
        <Skeleton className="h-4 w-24" aria-hidden="true" />
      </div>
    </article>
  )
}

export function PostCardSkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="md:grid md:grid-cols-2 flex flex-col gap-10">
      {Array.from({ length: count }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  )
}
