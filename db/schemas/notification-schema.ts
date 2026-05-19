import { pgTable, text, timestamp, index, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { post } from "@/db/schemas/blog-schema"
import { notificationTypeEnum } from "@/db/schemas/enums-schema"
import { user } from "@/db/schemas/auth-schema"

export const notificationEvent = pgTable(
  "notification_event",
  {
    id: text("id").primaryKey(),

    type: notificationTypeEnum("type").notNull(),

    postId: text("post_id")
      .notNull()
      .references(() => post.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("notification_event_type_idx").on(table.type),

    index("notification_event_postId_idx").on(table.postId),

    index("notification_event_createdAt_idx").on(table.createdAt),
  ]
)

export const userNotification = pgTable(
  "user_notification",
  {
    id: text("id").primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    eventId: text("event_id")
      .notNull()
      .references(() => notificationEvent.id, {
        onDelete: "cascade",
      }),
    read: boolean("read").default(false).notNull(),
    readAt: timestamp("read_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("user_notification_userId_idx").on(table.userId),
    index("user_notification_eventId_idx").on(table.eventId),
    index("user_notification_read_idx").on(table.read),
    index("user_notification_createdAt_idx").on(table.createdAt),
  ]
)

export const notificationEventRelations = relations(
  notificationEvent,
  ({ one, many }) => ({
    post: one(post, {
      fields: [notificationEvent.postId],
      references: [post.id],
    }),
    userNotifications: many(userNotification),
  })
)

export const userNotificationRelations = relations(
  userNotification,
  ({ one }) => ({
    user: one(user, {
      fields: [userNotification.userId],
      references: [user.id],
    }),
    event: one(notificationEvent, {
      fields: [userNotification.eventId],
      references: [notificationEvent.id],
    }),
  })
)
