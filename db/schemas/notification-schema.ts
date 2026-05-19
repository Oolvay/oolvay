import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { post } from "@/db/schemas/blog-schema"
import { notificationTypeEnum } from "@/db/schemas/enums-schema"

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

export const notificationEventRelations = relations(
  notificationEvent,
  ({ one }) => ({
    post: one(post, {
      fields: [notificationEvent.postId],
      references: [post.id],
    }),
  })
)
