"use client"

"use client"

import { useState, useTransition } from "react"
import { toast } from "react-hot-toast"
import { updateNotificationPreferences } from "@/actions/update-notification-preferences"
import {
  NOTIFICATION_TYPE_META,
  type NotificationPreferences,
  type NotificationType,
} from "@/db/types/notification-types"
import { NotificationTypeCard } from "@/app/(protected)/settings/notifications/components/notification-type-card"

interface NotificationsFormProps {
  initialPreferences: NotificationPreferences
}

export function NotificationsForm({
  initialPreferences,
}: NotificationsFormProps) {
  const [preferences, setPreferences] = useState(initialPreferences)
  const [isPending, startTransition] = useTransition()

  const handleChange = (updated: NotificationPreferences) => {
    setPreferences(updated)
    startTransition(async () => {
      const result = await updateNotificationPreferences(updated)
      if (result.error) {
        toast.error(result.error)
        setPreferences(preferences)
      } else {
        toast.success("Preferences saved.")
      }
    })
  }

  return (
    <div className="space-y-8">
      {(Object.keys(NOTIFICATION_TYPE_META) as NotificationType[]).map(
        (type) => (
          <NotificationTypeCard
            key={type}
            type={type}
            preferences={preferences}
            onChange={handleChange}
            disabled={isPending}
          />
        )
      )}
    </div>
  )
}
