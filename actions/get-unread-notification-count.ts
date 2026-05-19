"use server"

import { db } from "@/db/drizzle"
import { userNotification } from "@/db/schemas/notification-schema"
import { and, count, eq } from "drizzle-orm"
import { guardAction } from "@/lib/guard-action"

type GetUnreadNotificationCountResult =
  | {
      success: true
      count: number
    }
  | {
      success: false
      error: string
      code?: "RATE_LIMITED" | "UNAUTHORIZED"
    }

export async function getUnreadNotificationCount(): Promise<GetUnreadNotificationCountResult> {
  try {
    const { error, code, user } = await guardAction({
      type: "read",
    })

    if (error) {
      return {
        success: false,
        error,
        code,
      }
    }

    const [result] = await db
      .select({
        count: count(),
      })
      .from(userNotification)
      .where(
        and(
          eq(userNotification.userId, user.id),

          eq(userNotification.read, false)
        )
      )

    return {
      success: true,
      count: result.count,
    }
  } catch {
    return {
      success: false,
      error: "Failed to fetch unread notification count.",
    }
  }
}
