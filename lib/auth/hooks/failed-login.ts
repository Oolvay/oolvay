import { createAuthMiddleware } from "better-auth/api"
import { db } from "@/db/drizzle"
import { auditLog, user } from "@/db/auth-schema"
import { eq } from "drizzle-orm"
import { siteConfig } from "@/config/site"

const AUTH_ENDPOINTS = ["/magic-link/verify", "/passkey/verify"]

type ReturnedContext =
  | {
      status?: number | string
      statusCode?: number
      headers?: { get: (key: string) => string | null } | Record<string, never>
      name?: string
    }
  | Error
  | null

export const onFailedLogin = createAuthMiddleware(async (ctx) => {
  const isAuthAttempt = AUTH_ENDPOINTS.some((endpoint) =>
    ctx.path.includes(endpoint)
  )

  const returned = ctx.context.returned as ReturnedContext

  const status = returned && "status" in returned ? returned.status : undefined
  const statusCode =
    returned && "statusCode" in returned ? returned.statusCode : undefined
  const headers =
    returned && "headers" in returned && typeof returned.headers === "object"
      ? (returned.headers as { get?: (key: string) => string | null })
      : undefined
  const locationHeader = headers?.get ? headers.get("location") : null

  // Better Auth throws an APIError with status "FOUND" for successful redirects
  const isSuccessRedirect =
    returned !== null &&
    "name" in returned &&
    returned.name === "APIError" &&
    status === "FOUND" &&
    !locationHeader?.includes("error=") &&
    !locationHeader?.includes("error_code=")

  const numericStatus =
    typeof status === "number" ? status : (statusCode ?? undefined)

  const isErrorStatus = numericStatus !== undefined && numericStatus >= 400

  const isThrownError =
    !isSuccessRedirect &&
    (returned instanceof Error ||
      (returned !== null && "name" in returned && returned.name === "APIError"))

  const isErrorRedirect =
    numericStatus !== undefined &&
    numericStatus >= 300 &&
    numericStatus < 400 &&
    (locationHeader?.includes("error=") ||
      locationHeader?.includes("error_code="))

  const isFailure = isErrorStatus || isThrownError || isErrorRedirect

  if (!isAuthAttempt || !isFailure) return

  const body = ctx.body as Record<string, unknown> | undefined
  const attemptedEmail = body?.email as string | undefined

  let targetUserId = null

  if (attemptedEmail) {
    const [targetUser] = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, attemptedEmail))

    if (targetUser) {
      targetUserId = targetUser.id
    }
  }

  const retentionMs = siteConfig.auditLogs.retentionDays * 24 * 60 * 60 * 1000

  await db.insert(auditLog).values({
    id: crypto.randomUUID(),
    userId: targetUserId,
    event: "failed_login_attempt",
    metadata: {
      attemptedEmail: attemptedEmail ?? "Unknown",
      ipAddress:
        ctx.headers?.get("x-forwarded-for") ||
        ctx.headers?.get("x-real-ip") ||
        null,
      userAgent: ctx.headers?.get("user-agent") || null,
      path: ctx.path,
      errorStatus: numericStatus ?? 0,
    },
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + retentionMs),
  })
})
