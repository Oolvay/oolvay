export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "@/lib/auth/get-server-session"
import { providerPromise } from "@/lib/payments"
import { db } from "@/db/drizzle"
import { orders } from "@/db/schemas/payments-schema"
import { eq } from "drizzle-orm"
import { ajAuth } from "@/lib/arcjet"
import { slidingWindow } from "@arcjet/next"
import { env } from "@/env"
import { siteConfig } from "@/config/site"
import { CheckoutVerificationError } from "@/db/types/payments/payment-errors"
import { z } from "zod"

const bodySchema = z.object({
  razorpayPaymentId: z.string().min(1),
  razorpayOrderId: z.string(),
  razorpaySignature: z.string().min(1),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (ajAuth) {
    const decision = await ajAuth
      .withRule(
        slidingWindow({
          mode: "LIVE",
          interval:
            siteConfig.security.arcjet.rateLimits.payments.verify.interval,
          max: siteConfig.security.arcjet.rateLimits.payments.verify.max,
        })
      )
      .protect(req, { userIdOrIp: session.user.id })
    if (decision.isDenied()) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 })
    }
  }

  const body = bodySchema.parse(await req.json())

  try {
    const provider = await providerPromise
    const result = await provider.verifyCheckout(body)

    // Mark any pending order as paid
    // Only update orders table for one-time payments, not subscriptions
    if (!body.razorpayOrderId.startsWith("sub_")) {
      await db
        .update(orders)
        .set({ status: "paid", providerPaymentId: result.paymentId })
        .where(eq(orders.providerOrderId, body.razorpayOrderId))
    }

    return NextResponse.json(result)
  } catch (err) {
    if (err instanceof CheckoutVerificationError) {
      return NextResponse.json({ error: err.message }, { status: 401 })
    }
    throw err
  }
}
