"use client"

import * as Ably from "ably"
import { env } from "@/env"
import { siteConfig } from "@/config/site"

export function createAblyClient() {
  if (
    !siteConfig.notifications.ably.enabled ||
    !env.NEXT_PUBLIC_ABLY_CLIENT_KEY
  ) {
    return null
  }

  return new Ably.Realtime({
    key: env.NEXT_PUBLIC_ABLY_CLIENT_KEY,
    clientId: "anonymous",
  })
}
