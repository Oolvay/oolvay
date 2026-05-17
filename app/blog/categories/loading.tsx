import { Skeleton } from "@/components/ui/skeleton"
import { PostCardSkeletonGrid } from "@/app/blog/components/post-card-skeleton"

export default function Loading() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="px-4 md:px-8 pt-6 max-w-6xl mx-auto">
        <Skeleton className="h-4 w-48 rounded" aria-hidden="true" />
      </div>

      <section className="flex flex-col gap-20 mx-auto max-w-6xl px-4 md:px-8 py-10">
        <header
          className="text-center space-y-4"
          aria-busy="true"
          aria-label="Loading category"
        >
          <Skeleton
            className="h-14 w-64 md:h-20 rounded mx-auto"
            aria-hidden="true"
          />
          <Skeleton
            className="h-8 w-96 md:h-10 rounded mx-auto"
            aria-hidden="true"
          />
        </header>

        <PostCardSkeletonGrid aria-busy="true" aria-label="Loading posts" />
      </section>
    </>
  )
}
