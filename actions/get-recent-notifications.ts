"use server"

import { db } from "@/db/drizzle"
import { userNotification } from "@/db/schemas/notification-schema"
import { asc, desc, eq } from "drizzle-orm"
import { guardAction } from "@/lib/guard-action"
import { siteConfig } from "@/config/site"

export type RecentNotificationItem = {
  id: string
  read: boolean
  readAt: Date | null
  createdAt: Date
  event: {
    id: string
    type: string
    post: {
      id: string
      title: string
      slug: string
    }
  }
}

type GetRecentNotificationsResult =
  | {
      success: true
      notifications: RecentNotificationItem[]
    }
  | {
      success: false
      error: string
      code?: "RATE_LIMITED" | "UNAUTHORIZED"
    }

export async function getRecentNotifications(): Promise<GetRecentNotificationsResult> {
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

    const notifications = await db.query.userNotification.findMany({
      where: eq(userNotification.userId, user.id),

      columns: {
        id: true,
        read: true,
        readAt: true,
        createdAt: true,
      },

      with: {
        event: {
          columns: {
            id: true,
            type: true,
          },

          with: {
            post: {
              columns: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
        },
      },

      orderBy: [asc(userNotification.read), desc(userNotification.createdAt)],

      limit: siteConfig.pagination.notifications.dropdown,
    })

    return {
      success: true,
      notifications,
    }
  } catch {
    return {
      success: false,
      error: "Failed to fetch notifications.",
    }
  }
}
