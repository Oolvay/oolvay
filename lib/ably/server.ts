import * as Ably from "ably"
import { env } from "@/env"
import { siteConfig } from "@/config/site"

export function createAblyServer() {
  if (!siteConfig.notifications.ably.enabled || !env.ABLY_API_KEY) {
    return null
  }
  return new Ably.Rest({
    key: env.ABLY_API_KEY,
  })
}
