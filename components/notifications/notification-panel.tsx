"use client"

import Link from "next/link"
import type { NotificationItem } from "@/actions/get-notifications"

interface NotificationPanelProps {
  notifications: NotificationItem[]
  loading: boolean
  onMarkAsRead: (notificationId: string) => Promise<void>
  onMarkAllAsRead: () => Promise<void>
}

export function NotificationPanel({
  notifications,
  loading,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationPanelProps) {
  return (
    <section aria-label="Notifications">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <h2 className="font-semibold" id="notifications-heading">
          Notifications
        </h2>

        <button
          type="button"
          onClick={() => {
            void onMarkAllAsRead()
          }}
          className="text-xs text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      <div className="max-h-96 pretty-scrollbar">
        {!loading && notifications.length === 0 ? (
          <div className="px-3 py-6 text-center text-sm text-muted-foreground">
            No notifications yet.
          </div>
        ) : (
          <div className="flex flex-col">
            {notifications.map((notification) => (
              <Link
                key={notification.id}
                href={`/blog/${notification.event.post.slug}`}
                onClick={() => {
                  void onMarkAsRead(notification.id)
                }}
                className="flex w-full flex-col gap-1 border-b border-border px-3 py-3 text-left transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium">
                    {notification.event.post.title}
                  </p>

                  {!notification.read && (
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  /blog/
                  {notification.event.post.slug}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
