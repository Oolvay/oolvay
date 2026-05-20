"use client"

import type { NotificationsPageItem } from "@/actions/get-notifications-page"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NotificationListItem } from "@/app/(protected)/notifications/components/notification-list-item"
import { BellIcon } from "lucide-react"

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
      <Card className="max-w-2xl">
        <CardHeader className="flex flex-col items-center py-10 text-center">
          <BellIcon className="mb-4 h-10 w-10 text-muted-foreground" />

          <CardTitle>No notifications yet</CardTitle>

          <CardDescription>
            New activity and updates will appear here.
          </CardDescription>
        </CardHeader>
      </Card>
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
