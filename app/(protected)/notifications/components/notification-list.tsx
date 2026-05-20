"use client"

import type { NotificationsPageItem } from "@/actions/get-notifications-page"
import { Card, CardContent } from "@/components/ui/card"
import { NotificationListItem } from "@/app/(protected)/notifications/components/notification-list-item"

interface NotificationListProps {
  notifications: NotificationsPageItem[]
  onMarkAsRead?: (notificationId: string) => void | Promise<void>
}

export function NotificationList({
  notifications,
  onMarkAsRead,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-sm text-muted-foreground">No notifications yet.</p>
      </div>
    )
  }

  return (
    <Card className="max-w-2xl">
      <CardContent className="px-6 py-2">
        {notifications.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground">
              No notifications yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 py-2">
            {notifications.map((notification) => (
              <NotificationListItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
