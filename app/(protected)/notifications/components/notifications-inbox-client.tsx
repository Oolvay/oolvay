"use client"

import { useState } from "react"
import type { NotificationsPageItem } from "@/actions/get-notifications-page"
import { NotificationList } from "@/app/(protected)/notifications/components/notification-list"
import { markNotificationAsRead } from "@/actions/mark-notification-as-read"
import { Button } from "@/components/ui/button"
import { getNotificationsPage } from "@/actions/get-notifications-page"
import { LoadingSwap } from "@/components/ui/loading-swap"
import { markAllNotificationsAsRead } from "@/actions/mark-all-notifications-as-read"
import { CheckCheckIcon } from "lucide-react"

interface NotificationsInboxClientProps {
  initialNotifications: NotificationsPageItem[]

  initialCursor: {
    createdAt: Date
    id: string
  } | null
}

export function NotificationsInboxClient({
  initialNotifications,
  initialCursor,
}: NotificationsInboxClientProps) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [nextCursor, setNextCursor] = useState(initialCursor)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isMarkingAllAsRead, setIsMarkingAllAsRead] = useState(false)

  async function handleMarkAsRead(notificationId: string) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              read: true,
              readAt: new Date(),
            }
          : notification
      )
    )
    await markNotificationAsRead(notificationId)
  }

  async function handleMarkAllAsRead() {
    setIsMarkingAllAsRead(true)

    try {
      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          read: true,
          readAt: notification.readAt ?? new Date(),
        }))
      )

      await markAllNotificationsAsRead()
    } finally {
      setIsMarkingAllAsRead(false)
    }
  }

  async function handleLoadMore() {
    if (!nextCursor) {
      return
    }
    setIsLoadingMore(true)
    try {
      const result = await getNotificationsPage({
        cursor: nextCursor,
      })
      if (!result.success) {
        return
      }
      setNotifications((current) => [...current, ...result.notifications])
      setNextCursor(result.nextCursor)
    } finally {
      setIsLoadingMore(false)
    }
  }

  const hasUnreadNotifications = notifications.some(
    (notification) => !notification.read
  )

  return (
    <div className="space-y-6">
      {hasUnreadNotifications && (
        <div className="flex justify-end max-w-2xl">
          <Button
            variant="outline"
            onClick={() => {
              void handleMarkAllAsRead()
            }}
            disabled={isMarkingAllAsRead}
            aria-live="polite"
          >
            <LoadingSwap isLoading={isMarkingAllAsRead}>
              <span className="flex items-center gap-x-2">
                <CheckCheckIcon className="size-4" />
                Mark all as read
              </span>
            </LoadingSwap>
          </Button>
        </div>
      )}
      <NotificationList
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
      />

      {nextCursor && (
        <div className="flex justify-center max-w-2xl">
          <Button
            variant="outline"
            onClick={() => {
              void handleLoadMore()
            }}
            disabled={isLoadingMore}
            aria-live="polite"
          >
            <LoadingSwap isLoading={isLoadingMore}>
              <span className="flex items-center justify-center gap-x-2">
                Load More
              </span>
            </LoadingSwap>
          </Button>
        </div>
      )}
    </div>
  )
}
