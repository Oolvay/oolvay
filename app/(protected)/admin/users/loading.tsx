import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
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

function UserRowSkeleton() {
  return (
    <TableRow>
      {/* User: avatar + name + username */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton
            className="size-8 rounded-full shrink-0"
            aria-hidden="true"
          />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-24 rounded" aria-hidden="true" />
            <Skeleton className="h-3 w-16 rounded" aria-hidden="true" />
          </div>
        </div>
      </TableCell>
      {/* Email */}
      <TableCell>
        <Skeleton className="h-3.5 w-40 rounded" aria-hidden="true" />
      </TableCell>
      {/* Role badge */}
      <TableCell>
        <Skeleton className="h-5 w-14 rounded-full" aria-hidden="true" />
      </TableCell>
      {/* Joined date */}
      <TableCell>
        <Skeleton className="h-3.5 w-24 rounded" aria-hidden="true" />
      </TableCell>
      {/* Verified icon */}
      <TableCell>
        <Skeleton className="size-4 rounded-full" aria-hidden="true" />
      </TableCell>
      {/* Actions button */}
      <TableCell>
        <Skeleton className="size-8 rounded-md" aria-hidden="true" />
      </TableCell>
    </TableRow>
  )
}

const PAGE_SIZE = siteConfig.pagination.admin.usersPageSize

export default function Loading() {
  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Manage Users"
        description="View and manage platform users, assign roles, and control account access"
      />

      <div className="space-y-2" aria-busy="true" aria-label="Loading users">
        {/* UsersToolbar — rendered for real, no data dependency */}
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search by name or email…"
            className="max-w-sm"
            aria-label="Search users"
            disabled
          />
          <Select disabled>
            <SelectTrigger className="w-36" aria-label="Filter by role">
              <SelectValue placeholder="All roles" />
            </SelectTrigger>
          </Select>
        </div>

        {/* UsersTable — header static, rows dynamic */}
        <div className="rounded-xl border">
          <Table aria-label="Users table">
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <UserRowSkeleton key={i} />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination — dynamic, skeleton it */}
        <div className="flex items-center justify-end gap-3">
          <Skeleton className="size-8 rounded-md" aria-hidden="true" />
          <Skeleton className="h-4 w-24 rounded" aria-hidden="true" />
          <Skeleton className="size-8 rounded-md" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
