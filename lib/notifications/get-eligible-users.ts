import { db } from "@/db/drizzle"
import type { NotificationType } from "@/db/types/notification-types"
import {
  NOTIFICATION_CHANNELS,
  NOTIFICATION_TYPE_META,
} from "@/db/types/notification-types"

export async function getEligibleUsers(notificationType: NotificationType) {
  void notificationType

  const users = await db.query.user.findMany({
    columns: {
      id: true,
      email: true,
      notificationPreferences: true,
    },
  })

  const meta = NOTIFICATION_TYPE_META[notificationType]

  const eligibleUsers = users.filter((user) => {
    const preferences = user.notificationPreferences?.[notificationType]

    if (!preferences) {
      return false
    }
    const emailEnabled = preferences[NOTIFICATION_CHANNELS.EMAIL]
    const emailLocked = meta.lockedChannels.includes(
      NOTIFICATION_CHANNELS.EMAIL
    )
    return emailEnabled || emailLocked
  })
  return eligibleUsers
}
