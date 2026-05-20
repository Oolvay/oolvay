"use client"

import Link from "next/link"

import type { NotificationsPageItem } from "@/actions/get-notifications-page"

import { Button } from "@/components/ui/button"

interface NotificationListItemProps {
  notification: NotificationsPageItem

  onMarkAsRead?: (notificationId: string) => void | Promise<void>
}

export function NotificationListItem({
  notification,
  onMarkAsRead,
}: NotificationListItemProps) {
  return (
    <div
      className={`
        group flex items-start justify-between gap-4
        rounded-lg border p-4 transition-colors
        hover:bg-muted/50
        ${!notification.read ? "border-primary/30 bg-primary/5" : ""}
      `}
    >
      <Link
        href={`/blog/${notification.event.post.slug}`}
        onClick={() => {
          void onMarkAsRead?.(notification.id)
        }}
        className="min-w-0 flex-1 space-y-1"
      >
        <p className="text-sm font-medium">{notification.event.post.title}</p>
        <p className="text-xs text-muted-foreground">
          /blog/
          {notification.event.post.slug}
        </p>
      </Link>

      {!notification.read && (
        <div className="relative flex h-8 w-28 shrink-0 items-center justify-end">
          <span className="absolute transition-opacity duration-200 group-hover:opacity-0">
            <span className="block size-2 rounded-full bg-primary" />
          </span>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            onClick={() => {
              void onMarkAsRead?.(notification.id)
            }}
          >
            Mark as read
          </Button>
        </div>
      )}
    </div>
  )
}
