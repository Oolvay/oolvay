import { Skeleton } from "@/components/ui/skeleton"
import { siteConfig } from "@/config/site"
import { PostCardSkeletonGrid } from "@/app/blog/components/post-card-skeleton"

export default function Loading() {
  return (
    <section className="flex flex-col gap-20 mx-auto max-w-6xl px-4 md:px-8 py-10">
      <header className="font-bold text-foreground text-center space-y-4">
        <h1 className="text-4xl/tight md:text-6xl">
          {siteConfig.blog.pageHeading}
        </h1>
        <h2 className="text-2xl/tight md:text-4xl">
          {siteConfig.blog.pageSubHeading}
        </h2>
        <div
          className="flex items-center justify-center gap-3 pt-8"
          aria-hidden="true"
        >
          <Skeleton className="h-11 w-32 rounded-md" />
          <Skeleton className="h-11 w-32 rounded-md" />
          <Skeleton className="h-11 w-32 rounded-md" />
        </div>
      </header>

      <PostCardSkeletonGrid aria-busy="true" aria-label="Loading posts" />
    </section>
  )
}
