"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { NotificationChannelRow } from "@/app/(protected)/settings/notifications/components/notification-channel-row"
import type { NotificationPreferences } from "@/db/types/notification-preferences"

interface ProductUpdatesCardProps {
  preferences: NotificationPreferences
  onChange: (updated: NotificationPreferences) => void
  disabled?: boolean
}

export function ProductUpdatesCard({
  preferences,
  onChange,
  disabled,
}: ProductUpdatesCardProps) {
  const { productUpdates } = preferences

  const update = (key: keyof typeof productUpdates, value: boolean) => {
    onChange({
      ...preferences,
      productUpdates: { ...productUpdates, [key]: value },
    })
  }

  return (
    <div className="space-y-2">
      <GatedPageSubheading text="Product Updates" />
      <Card className="max-w-2xl">
        <CardContent className="px-6 py-2">
          <NotificationChannelRow
            label="Email"
            description="Receive product news and updates via email."
            checked={productUpdates.email}
            onCheckedChange={(v) => update("email", v)}
            disabled={disabled}
          />
          <NotificationChannelRow
            label="In-App"
            description="See product updates inside the app."
            checked={productUpdates.inApp}
            onCheckedChange={(v) => update("inApp", v)}
            disabled={disabled}
          />
          <NotificationChannelRow
            label="Web"
            description="Receive browser push notifications for product updates."
            checked={productUpdates.web}
            onCheckedChange={(v) => update("web", v)}
            disabled={disabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}
