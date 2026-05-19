"use client"

import { useCallback, useEffect, useState } from "react"
import {
  getNotifications,
  type NotificationItem,
} from "@/actions/get-notifications"
import { markNotificationAsRead } from "@/actions/mark-notification-as-read"
import { createAblyClient } from "@/lib/ably/client"
import { siteConfig } from "@/config/site"

interface UseNotificationsResult {
  notifications: NotificationItem[]
  unreadCount: number
  loading: boolean
  markAsRead: (notificationId: string) => Promise<void>
}

export function useNotifications(): UseNotificationsResult {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const result = await getNotifications()

    if (result.success) {
      setNotifications(result.notifications)
    }

    setLoading(false)
  }, [])

  const markAsRead = useCallback(async (notificationId: string) => {
    await markNotificationAsRead(notificationId)

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
  }, [])

  useEffect(() => {
    let mounted = true

    async function initialize() {
      const result = await getNotifications()
      if (!mounted) {
        return
      }
      if (result.success) {
        setNotifications(result.notifications)
      }
      setLoading(false)
    }
    void initialize()

    if (siteConfig.notifications.ably.enabled) {
      const ablyClient = createAblyClient()

      const channel = ablyClient?.channels.get("notifications")

      channel?.subscribe("new-notification", () => {
        void refresh()
      })

      return () => {
        mounted = false
        channel?.unsubscribe()
      }
    }

    const interval = setInterval(() => {
      void refresh()
    }, siteConfig.notifications.pollingIntervalMs)

    return () => {
      mounted = false

      clearInterval(interval)
    }
  }, [refresh])

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
  }
}
