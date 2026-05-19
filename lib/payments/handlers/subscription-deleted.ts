import { db } from "@/db/drizzle"
import { subscriptions } from "@/db/schemas/payments-schema"
import { user } from "@/db/schemas/auth-schema"
import { eq, and, inArray, ne } from "drizzle-orm"
import { SUBSCRIPTION_STATUSES } from "@/db/types/payments/subscription-status"
import { TIERS_KEYS } from "@/db/types/payments/tier"
import { resolveTierFromInternalPriceId } from "@/lib/payments/tier-utils"
import type { InternalPriceId } from "@/config/pricing"
import type { NormalizedEvent } from "@/db/types/payments/webhook-events"

type SubscriptionDeletedEvent = Extract<
  NormalizedEvent,
  { type: "subscription.deleted" }
>

const ACCESS_GRANTING_STATUSES = ["active", "trialing", "past_due"] as const

export async function handle(event: SubscriptionDeletedEvent): Promise<void> {
  // Mark the canceled subscription as such
  await db
    .update(subscriptions)
    .set({
      status: SUBSCRIPTION_STATUSES.CANCELED,
      canceledAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.providerSubscriptionId, event.subscriptionId))

  // Find the user via the subscriptions table
  const [existingSubscription] = await db
    .select({ userId: subscriptions.userId })
    .from(subscriptions)
    .where(eq(subscriptions.providerSubscriptionId, event.subscriptionId))

  let userId: string | null = null

  if (existingSubscription) {
    userId = existingSubscription.userId
  } else if (event.customerId) {
    // Fall back to customerId lookup if subscription row not found
    const [existingUser] = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.providerCustomerId, event.customerId))
    if (existingUser) {
      userId = existingUser.id
    }
  }

  if (!userId) {
    throw new Error(
      `No subscription or user found for subscription ID: "${event.subscriptionId}"`
    )
  }

  // Check whether the user has another active subscription before
  // downgrading — webhooks can arrive out of order, so the new sub
  // may already be active by the time the old one's cancellation arrives
  const [otherActiveSub] = await db
    .select({ planId: subscriptions.planId })
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, userId),
        inArray(subscriptions.status, [...ACCESS_GRANTING_STATUSES]),
        ne(subscriptions.providerSubscriptionId, event.subscriptionId)
      )
    )
    .limit(1)

  if (otherActiveSub) {
    // Another active subscription exists — upgrade/switch is in progress.
    // Set the tier to match that subscription instead of downgrading.
    const tierConfig = resolveTierFromInternalPriceId(
      otherActiveSub.planId as InternalPriceId
    )
    await db
      .update(user)
      .set({ tier: tierConfig.key })
      .where(eq(user.id, userId))
    return
  }

  // No other active subscription — genuinely canceled, downgrade to free tier
  await db
    .update(user)
    .set({ tier: TIERS_KEYS.STARTER })
    .where(eq(user.id, userId))
}
