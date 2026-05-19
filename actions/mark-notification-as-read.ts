"use server"

import { db } from "@/db/drizzle"
import { userNotification } from "@/db/schemas/notification-schema"
import { eq, and } from "drizzle-orm"
import { guardAction } from "@/lib/guard-action"

type MarkNotificationAsReadResult =
  | { success: true }
  | {
      success: false
      error: string
      code?: "RATE_LIMITED" | "UNAUTHORIZED"
    }

export async function markNotificationAsRead(
  notificationId: string
): Promise<MarkNotificationAsReadResult> {
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
          eq(userNotification.id, notificationId),

          eq(userNotification.userId, user.id)
        )
      )

    return {
      success: true,
    }
  } catch {
    return {
      success: false,
      error: "Failed to mark notification as read.",
    }
  }
}
