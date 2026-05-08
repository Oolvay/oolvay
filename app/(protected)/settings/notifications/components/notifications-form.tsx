"use client"

import { useState, useTransition } from "react"
import { SecurityAlertsCard } from "@/app/(protected)/settings/notifications/components/security-alerts-card"
import { ProductUpdatesCard } from "@/app/(protected)/settings/notifications/components/product-updates-card"
import { updateNotificationPreferences } from "@/actions/update-notification-preferences"
import { toast } from "react-hot-toast"
import type { NotificationPreferences } from "@/db/types/notification-preferences"

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
      <SecurityAlertsCard
        preferences={preferences}
        onChange={handleChange}
        disabled={isPending}
      />
      <ProductUpdatesCard
        preferences={preferences}
        onChange={handleChange}
        disabled={isPending}
      />
    </div>
  )
}
