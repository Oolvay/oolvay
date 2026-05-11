export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "@/lib/auth/get-server-session"
import { providerPromise } from "@/lib/payments"
import { ajAuth } from "@/lib/arcjet"
import { slidingWindow } from "@arcjet/next"
import { env } from "@/env"
import { z } from "zod"
import { siteConfig } from "@/config/site"

const bodySchema = z.object({
  subscriptionId: z.string().min(1),
  immediately: z.boolean().optional(),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (env.ARCJET_KEY) {
    const decision = await ajAuth
      .withRule(
        slidingWindow({
          mode: "LIVE",
          interval:
            siteConfig.security.arcjet.rateLimits.payments.subscriptionMutate
              .interval,
          max: siteConfig.security.arcjet.rateLimits.payments.subscriptionMutate
            .max,
        })
      )
      .protect(req, { userIdOrIp: session.user.id })
    if (decision.isDenied()) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 })
    }
  }

  const body = bodySchema.parse(await req.json())
  const provider = await providerPromise
  const result = await provider.cancelSubscription(body.subscriptionId, {
    immediately: body.immediately,
  })

  return NextResponse.json(result)
}
