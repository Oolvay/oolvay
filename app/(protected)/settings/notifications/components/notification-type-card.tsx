"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GatedPageSubheading } from "@/app/(protected)/components/gated-page-subheading"
import { NotificationChannelRow } from "@/app/(protected)/settings/notifications/components/notification-channel-row"

import {
  NOTIFICATION_CHANNELS,
  NOTIFICATION_TYPE_META,
  type NotificationChannel,
  type NotificationPreferences,
  type NotificationType,
} from "@/db/types/notification-types"

interface NotificationTypeCardProps {
  type: NotificationType
  preferences: NotificationPreferences
  onChange: (updated: NotificationPreferences) => void
  disabled?: boolean
}

const CHANNEL_LABELS: Record<NotificationChannel, string> = {
  email: "Email",
  inApp: "In-App",
  web: "Web",
}

export function NotificationTypeCard({
  type,
  preferences,
  onChange,
  disabled,
}: NotificationTypeCardProps) {
  const meta = NOTIFICATION_TYPE_META[type]

  const current = preferences[type]

  const update = (channel: NotificationChannel, value: boolean) => {
    onChange({
      ...preferences,
      [type]: {
        ...current,
        [channel]: value,
      },
    })
  }

  return (
    <div className="space-y-2">
      <GatedPageSubheading text={meta.label} />

      <Card className="max-w-2xl">
        <CardContent className="px-6 py-2">
          <p className="py-3 text-sm text-muted-foreground border-b">
            {meta.description}
          </p>

          {Object.values(NOTIFICATION_CHANNELS).map((channel) => {
            const locked = meta.lockedChannels.includes(channel)

            return (
              <NotificationChannelRow
                key={channel}
                label={CHANNEL_LABELS[channel]}
                checked={current[channel]}
                onCheckedChange={(v) => update(channel, v)}
                disabled={disabled || locked}
                lockedReason={
                  locked
                    ? `${meta.label} via ${CHANNEL_LABELS[channel]} cannot be disabled.`
                    : undefined
                }
              />
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
