"use server"

import { db } from "@/db/drizzle"
import { userNotification } from "@/db/schemas/notification-schema"
import { eq, and } from "drizzle-orm"
import { guardAction } from "@/lib/guard-action"

type MarkAllNotificationsAsReadResult =
  | { success: true }
  | {
      success: false
      error: string
      code?: "RATE_LIMITED" | "UNAUTHORIZED"
    }

export async function markAllNotificationsAsRead(): Promise<MarkAllNotificationsAsReadResult> {
  try {
    const { error, code, user } = await guardAction({
      type: "write",
    })

    if (error) {
      return {
        success: false,
        error,
        code,
      }
    }

    await db
      .update(userNotification)
      .set({
        read: true,
        readAt: new Date(),
      })
      .where(
        and(
          eq(userNotification.userId, user.id),

          eq(userNotification.read, false)
        )
      )

    return {
      success: true,
    }
  } catch {
    return {
      success: false,
      error: "Failed to mark notifications as read.",
    }
  }
}
