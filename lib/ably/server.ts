import Ably from "ably"
import { env } from "@/env"

export const ablyServer = env.ABLY_API_KEY
  ? new Ably.Rest({
      key: env.ABLY_API_KEY,
    })
  : null
