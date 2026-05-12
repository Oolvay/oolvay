import { db } from "@/db/drizzle"
import { subscriptions } from "@/db/payments-schema"
import { user } from "@/db/auth-schema"
import { eq } from "drizzle-orm"
import { SUBSCRIPTION_STATUSES } from "@/db/types/payments/subscription-status"
import { TIERS_KEYS } from "@/db/types/payments/tier"
import type { NormalizedEvent } from "@/db/types/payments/webhook-events"

type SubscriptionDeletedEvent = Extract<
  NormalizedEvent,
  { type: "subscription.deleted" }
>

export async function handle(event: SubscriptionDeletedEvent): Promise<void> {
  // First update the subscription status — we always have the subscriptionId
  await db
    .update(subscriptions)
    .set({
      status: SUBSCRIPTION_STATUSES.CANCELED,
      canceledAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.providerSubscriptionId, event.subscriptionId))

  // Find the user via the subscriptions table (works even when customerId is null)
  const [existingSubscription] = await db
    .select({ userId: subscriptions.userId })
    .from(subscriptions)
    .where(eq(subscriptions.providerSubscriptionId, event.subscriptionId))

  if (!existingSubscription) {
    // Fall back to customerId lookup if subscription row not found
    if (event.customerId) {
      const [existingUser] = await db
        .select()
        .from(user)
        .where(eq(user.providerCustomerId, event.customerId))

      if (existingUser) {
        await db
          .update(user)
          .set({ tier: TIERS_KEYS.STARTER })
          .where(eq(user.id, existingUser.id))
        return
      }
    }
    throw new Error(
      `No subscription or user found for subscription ID: "${event.subscriptionId}"`
    )
  }

  await db
    .update(user)
    .set({ tier: TIERS_KEYS.STARTER })
    .where(eq(user.id, existingSubscription.userId))
}
