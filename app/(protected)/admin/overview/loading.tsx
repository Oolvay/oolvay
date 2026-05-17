import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  UsersIcon,
  UserPlusIcon,
  CalendarIcon,
  ActivityIcon,
  ShieldUserIcon,
  UserIcon,
} from "lucide-react"

function StatCardSkeleton({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div
          className="p-2 bg-primary/10 rounded-full text-primary"
          aria-hidden="true"
        >
          <Icon className="size-4" />
        </div>
      </CardHeader>
      <CardContent>
        {/* value */}
        <Skeleton className="h-8 w-16 rounded mb-1" aria-hidden="true" />
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function RoleStatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {/* Role name */}
        <Skeleton className="h-4 w-16 rounded" aria-hidden="true" />
        <Skeleton className="size-8 rounded-full shrink-0" aria-hidden="true" />
      </CardHeader>
      <CardContent>
        {/* count */}
        <Skeleton className="h-8 w-12 rounded mb-1" aria-hidden="true" />
        {/* description */}
        <Skeleton className="h-3 w-28 rounded" aria-hidden="true" />
      </CardContent>
    </Card>
  )
}

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Overview"
        description="High-level statistics and user distribution for your application"
      />

      {/* UserStats */}
      <div
        className="space-y-2"
        aria-busy="true"
        aria-label="Loading user statistics"
      >
        <GatedPageSubheading text="Users Summary" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCardSkeleton
            title="Total Users"
            description="All registered users"
            icon={UsersIcon}
          />
          <StatCardSkeleton
            title="New This Week"
            description="Signups in the last 7 days"
            icon={UserPlusIcon}
          />
          <StatCardSkeleton
            title="New This Month"
            description="Signups in the last 30 days"
            icon={CalendarIcon}
          />
          <StatCardSkeleton
            title="Active Sessions"
            description="Currently active across all users"
            icon={ActivityIcon}
          />
        </div>
      </div>

      {/* RoleStats — role names and counts are fully dynamic */}
      <div
        className="space-y-2"
        aria-busy="true"
        aria-label="Loading role statistics"
      >
        <GatedPageSubheading text="Role Summary" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <RoleStatCardSkeleton />
          <RoleStatCardSkeleton />
        </div>
      </div>
    </div>
  )
}
