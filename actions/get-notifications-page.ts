"use server"

import { db } from "@/db/drizzle"
import { userNotification } from "@/db/schemas/notification-schema"
import { and, desc, eq, lt, or } from "drizzle-orm"
import { guardAction } from "@/lib/guard-action"
import { siteConfig } from "@/config/site"

export type NotificationsPageItem = {
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

type GetNotificationsPageParams = {
  cursor?: {
    createdAt: Date
    id: string
  }
  limit?: number
}

type GetNotificationsPageResult =
  | {
      success: true
      notifications: NotificationsPageItem[]
      nextCursor: {
        createdAt: Date
        id: string
      } | null
    }
  | {
      success: false
      error: string
      code?: "RATE_LIMITED" | "UNAUTHORIZED"
    }

export async function getNotificationsPage({
  cursor,
  limit = siteConfig.pagination.notifications.inbox,
}: GetNotificationsPageParams = {}): Promise<GetNotificationsPageResult> {
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
      where: (table) => {
        const baseCondition = eq(table.userId, user.id)

        if (!cursor) {
          return baseCondition
        }

        return and(
          baseCondition,

          or(
            lt(table.createdAt, cursor.createdAt),

            and(
              eq(table.createdAt, cursor.createdAt),

              lt(table.id, cursor.id)
            )
          )
        )
      },

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

      orderBy: [desc(userNotification.createdAt), desc(userNotification.id)],

      limit: limit + 1,
    })

    const hasMore = notifications.length > limit

    const items = hasMore ? notifications.slice(0, limit) : notifications

    const lastItem = items.at(-1)

    return {
      success: true,

      notifications: items,

      nextCursor:
        hasMore && lastItem
          ? {
              createdAt: lastItem.createdAt,

              id: lastItem.id,
            }
          : null,
    }
  } catch {
    return {
      success: false,
      error: "Failed to fetch notifications.",
    }
  }
}
