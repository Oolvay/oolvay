import { env } from "@/env"
import { drizzle } from "drizzle-orm/neon-http"
import * as authSchema from "@/db/auth-schema"
import * as blogSchema from "@/db/blog-schema"
import * as apiKeySchema from "@/db/api-key-schema"
import * as paymentsSchema from "@/db/payments-schema"

export const schema = {
  ...authSchema,
  ...blogSchema,
  ...apiKeySchema,
  ...paymentsSchema,
  apikey: apiKeySchema.apiKey,
}

export const db = drizzle(env.DATABASE_URL!, { schema })
