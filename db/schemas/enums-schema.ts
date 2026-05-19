import { pgEnum } from "drizzle-orm/pg-core"

import { NOTIFICATION_TYPE_VALUES } from "@/db/types/notification-types"

export const notificationTypeEnum = pgEnum(
  "notification_type",
  NOTIFICATION_TYPE_VALUES
)
