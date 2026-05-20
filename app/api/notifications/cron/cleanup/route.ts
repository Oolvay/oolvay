export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import * as Sentry from "@sentry/nextjs"
import { lt, eq, and } from "drizzle-orm"
import { db } from "@/db/drizzle"
import { userNotification } from "@/db/schemas/notification-schema"
import { env } from "@/env"
import { siteConfig } from "@/config/site"

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")

  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const cutoff = new Date(
      Date.now() - siteConfig.notifications.retentionDays * 24 * 60 * 60 * 1000
    )

    const deleted = await db
      .delete(userNotification)
      .where(
        and(
          eq(userNotification.read, true),
          lt(userNotification.readAt, cutoff)
        )
      )
      .returning({
        id: userNotification.id,
      })

    return NextResponse.json({
      success: true,
      deletedCount: deleted.length,
      retentionDays: siteConfig.notifications.retentionDays,
      cutoff,
    })
  } catch (err) {
    Sentry.captureException(err)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to clean notifications.",
      },
      {
        status: 500,
      }
    )
  }
}
