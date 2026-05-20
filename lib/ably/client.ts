"use client"

import * as Ably from "ably"
import { env } from "@/env"
import { siteConfig } from "@/config/site"

let ablyClientSingleton: Ably.Realtime | null = null

export function getAblyClient() {
  if (
    !siteConfig.notifications.ably.enabled ||
    !env.NEXT_PUBLIC_ABLY_CLIENT_KEY
  ) {
    return null
  }

  if (!ablyClientSingleton) {
    ablyClientSingleton = new Ably.Realtime({
      key: env.NEXT_PUBLIC_ABLY_CLIENT_KEY,
      clientId: "anonymous",
    })
  }

  return ablyClientSingleton
}
