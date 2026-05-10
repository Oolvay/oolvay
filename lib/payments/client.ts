import type {
  CheckoutResult,
  VerifyCheckoutParams,
  VerifyCheckoutResult,
} from "@/db/types/payments/checkout"
import type { UserAccessLevel } from "@/lib/payments/subscription-state"

export async function initiateCheckout(params: {
  priceId: string
  type: "one_time" | "subscription"
  trialDays?: number
}): Promise<CheckoutResult> {
  const res = await fetch("/api/payments/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json() as Promise<CheckoutResult>
}

export async function verifyCheckout(
  params: VerifyCheckoutParams
): Promise<VerifyCheckoutResult> {
  const res = await fetch("/api/payments/checkout/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json() as Promise<VerifyCheckoutResult>
}

export async function getSubscriptionStatus(): Promise<UserAccessLevel> {
  const res = await fetch("/api/payments/subscription")
  if (!res.ok) throw new Error(await res.text())
  return res.json() as Promise<UserAccessLevel>
}

export async function cancelSubscription(params: {
  subscriptionId: string
  immediately?: boolean
}): Promise<void> {
  const res = await fetch("/api/payments/subscription/cancel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
  if (!res.ok) throw new Error(await res.text())
}

export async function resumeSubscription(params: {
  subscriptionId: string
}): Promise<void> {
  const res = await fetch("/api/payments/subscription/resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
  if (!res.ok) throw new Error(await res.text())
}

export async function createBillingPortalSession(): Promise<{ url: string }> {
  const res = await fetch("/api/payments/billing-portal", {
    method: "POST",
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json() as Promise<{ url: string }>
}
