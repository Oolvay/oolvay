"use client"

import { useEffect, useState } from "react"
import { getUnreadNotificationCount } from "@/actions/get-unread-notification-count"
import { BellIcon } from "lucide-react"
import { siteConfig } from "@/config/site"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { NotificationPanel } from "@/components/notifications/notification-panel"
import { ablyClient } from "@/lib/ably/client"

export function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    async function loadUnreadCount() {
      const result = await getUnreadNotificationCount()

      if (result.success) {
        setUnreadCount(result.count)
      }
    }

    void loadUnreadCount()

    const interval = setInterval(() => {
      void loadUnreadCount()
    }, siteConfig.notifications.pollingIntervalMs)

    const channel = ablyClient?.channels.get("notifications")

    channel?.subscribe("new-notification", () => {
      void loadUnreadCount()
    })

    return () => {
      clearInterval(interval)

      void channel?.unsubscribe()
    }
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="relative flex items-center justify-center cursor-pointer"
          aria-label="Notifications"
        >
          <BellIcon className="size-5" />

          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        <NotificationPanel />
      </PopoverContent>
    </Popover>
  )
}
