import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { siteConfig } from "@/config/site"

function ActivityRowSkeleton() {
  return (
    <TableRow>
      {/* User: avatar + name + email */}
      <TableCell className="w-[200px]">
        <div className="flex items-center gap-3 min-w-0">
          <Skeleton
            className="size-8 rounded-full shrink-0"
            aria-hidden="true"
          />
          <div className="space-y-1.5 min-w-0">
            <Skeleton className="h-3.5 w-24 rounded" aria-hidden="true" />
            <Skeleton className="h-3 w-32 rounded" aria-hidden="true" />
          </div>
        </div>
      </TableCell>
      {/* Event badge */}
      <TableCell className="w-[130px]">
        <Skeleton className="h-5 w-20 rounded-full" aria-hidden="true" />
      </TableCell>
      {/* Details */}
      <TableCell>
        <Skeleton
          className="h-3.5 w-full max-w-xs rounded"
          aria-hidden="true"
        />
      </TableCell>
      {/* Date */}
      <TableCell className="w-[250px]">
        <Skeleton className="h-3.5 w-36 rounded" aria-hidden="true" />
      </TableCell>
    </TableRow>
  )
}

const PAGE_SIZE = siteConfig.pagination.admin.usersPageSize

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Activity"
        description="Monitor platform events and user activity"
      />

      <div
        className="space-y-2"
        aria-busy="true"
        aria-label="Loading activity log"
      >
        {/* ActivityToolbar — no data dependency, rendered for real */}
        <div className="flex items-center gap-3">
          <Select disabled>
            <SelectTrigger className="w-40" aria-label="Filter by event type">
              <SelectValue placeholder="All events" />
            </SelectTrigger>
          </Select>
          {/* DateRangePicker — two disabled inputs */}
          <Skeleton className="h-9 w-56 rounded-md" aria-hidden="true" />
        </div>

        {/* ActivityTable */}
        <div className="rounded-xl border overflow-hidden">
          <Table aria-label="Activity log" className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">User</TableHead>
                <TableHead className="w-[130px]">Event</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="w-[250px]">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <ActivityRowSkeleton key={i} />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-3">
          <Skeleton className="size-8 rounded-md" aria-hidden="true" />
          <Skeleton className="h-4 w-24 rounded" aria-hidden="true" />
          <Skeleton className="size-8 rounded-md" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
