import { env } from "@/env"
import { drizzle } from "drizzle-orm/neon-http"
import * as authSchema from "@/db/schemas/auth-schema"
import * as blogSchema from "@/db/schemas/blog-schema"
import * as apiKeySchema from "@/db/schemas/api-key-schema"
import * as paymentsSchema from "@/db/schemas/payments-schema"
import * as notificationSchema from "@/db/schemas/notification-schema"

export const schema = {
  ...authSchema,
  ...blogSchema,
  ...apiKeySchema,
  ...paymentsSchema,
  ...notificationSchema,
  apikey: apiKeySchema.apiKey,
}

export const db = drizzle(env.DATABASE_URL!, { schema })
