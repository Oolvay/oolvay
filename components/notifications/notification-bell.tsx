"use client"

import { BellIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { NotificationPanel } from "@/components/notifications/notification-panel"
import { useNotifications } from "@/lib/notifications/use-notifications"

export function NotificationBell() {
  const { notifications, unreadCount, loading, markAsRead } = useNotifications()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="relative flex items-center justify-center cursor-pointer"
          aria-label={
            unreadCount > 0
              ? `Notifications — ${unreadCount} unread`
              : "Notifications"
          }
        >
          <BellIcon className="size-5" aria-hidden="true" />

          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        <NotificationPanel
          notifications={notifications}
          loading={loading}
          onMarkAsRead={markAsRead}
        />
      </PopoverContent>
    </Popover>
  )
}
