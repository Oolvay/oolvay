"use client"

import Link from "next/link"
import type { NotificationsPageItem } from "@/actions/get-notifications-page"

interface NotificationListItemProps {
  notification: NotificationsPageItem
  onMarkAsRead?: (notificationId: string) => void | Promise<void>
}

export function NotificationListItem({
  notification,
  onMarkAsRead,
}: NotificationListItemProps) {
  return (
    <Link
      href={`/blog/${notification.event.post.slug}`}
      onClick={() => {
        void onMarkAsRead?.(notification.id)
      }}
      className={`
        flex flex-col gap-2 rounded-lg border p-4
        transition-colors hover:bg-muted/50
        ${!notification.read ? "border-primary/30 bg-primary/5" : ""}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">{notification.event.post.title}</p>

          <p className="text-xs text-muted-foreground">
            /blog/
            {notification.event.post.slug}
          </p>
        </div>

        {!notification.read && (
          <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
        )}
      </div>
    </Link>
  )
}
