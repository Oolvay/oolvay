import * as Ably from "ably"
import { env } from "@/env"
import { siteConfig } from "@/config/site"

export const ablyServer =
  siteConfig.notifications.ably.enabled && env.ABLY_API_KEY
    ? new Ably.Rest({
        key: env.ABLY_API_KEY,
      })
    : null
