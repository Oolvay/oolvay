import { db } from "@/db/drizzle"

import type {
  NotificationChannel,
  NotificationType,
} from "@/db/types/notification-types"

import { NOTIFICATION_TYPE_META } from "@/db/types/notification-types"

export async function getEligibleUsers(
  notificationType: NotificationType,

  channel: NotificationChannel
) {
  const users = await db.query.user.findMany({
    columns: {
      id: true,
      email: true,
      notificationPreferences: true,
    },
  })

  const meta = NOTIFICATION_TYPE_META[notificationType]

  return users.filter((user) => {
    const preferences = user.notificationPreferences?.[notificationType]

    if (!preferences) {
      return false
    }

    const enabled = preferences[channel]

    const locked = meta.lockedChannels.includes(channel)

    return enabled || locked
  })
}
