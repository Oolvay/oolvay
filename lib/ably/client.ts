"use client"

import Ably from "ably"
import { env } from "@/env"

export const ablyClient = env.NEXT_PUBLIC_ABLY_CLIENT_KEY
  ? new Ably.Realtime({
      key: env.NEXT_PUBLIC_ABLY_CLIENT_KEY,
    })
  : null
