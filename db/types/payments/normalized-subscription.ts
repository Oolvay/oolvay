import type { NormalizedSubscriptionStatus } from "@/db/types/payments/subscription-status"

export interface NormalizedSubscription {
  id: string
  providerId: string
  customerId: string
  customerEmail?: string
  planId: string
  status: NormalizedSubscriptionStatus
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  trialEnd: Date | null
  metadata: Record<string, string>
}
