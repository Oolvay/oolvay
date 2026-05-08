"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { NotificationChannelRow } from "@/app/(protected)/settings/notifications/components/notification-channel-row"
import type { NotificationPreferences } from "@/db/types/notification-preferences"

interface SecurityAlertsCardProps {
  preferences: NotificationPreferences
  onChange: (updated: NotificationPreferences) => void
  disabled?: boolean
}

export function SecurityAlertsCard({
  preferences,
  onChange,
  disabled,
}: SecurityAlertsCardProps) {
  const { securityAlerts } = preferences

  const update = (key: keyof typeof securityAlerts, value: boolean) => {
    onChange({
      ...preferences,
      securityAlerts: { ...securityAlerts, [key]: value },
    })
  }

  return (
    <div className="space-y-2">
      <GatedPageSubheading text="Security Alerts" />
      <Card className="max-w-2xl">
        <CardContent className="px-6 py-2">
          <NotificationChannelRow
            label="Email"
            description="Receive security alerts via email. Cannot be disabled."
            checked={securityAlerts.email}
            onCheckedChange={(v) => update("email", v)}
            disabled
            lockedReason="Security alert emails cannot be disabled for your protection."
          />
          <NotificationChannelRow
            label="In-App"
            description="See security alerts inside the app."
            checked={securityAlerts.inApp}
            onCheckedChange={(v) => update("inApp", v)}
            disabled={disabled}
          />
          <NotificationChannelRow
            label="Web"
            description="Receive browser push notifications for security alerts."
            checked={securityAlerts.web}
            onCheckedChange={(v) => update("web", v)}
            disabled={disabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}
