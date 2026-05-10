import type { NormalizedSubscription } from "@/db/types/payments/normalized-subscription"

export type RawProviderEvent = Record<string, unknown>

export type NormalizedEvent =
  | {
      type: "checkout.completed"
      customerId: string
      sessionId: string
      subscriptionId?: string
      orderId?: string
      amountTotal: number
      currency: string
      metadata: Record<string, string>
    }
  | {
      type: "subscription.created"
      customerId: string
      subscription: NormalizedSubscription
    }
  | {
      type: "subscription.updated"
      customerId: string
      subscription: NormalizedSubscription
    }
  | {
      type: "subscription.deleted"
      customerId: string
      subscriptionId: string
    }
  | {
      type: "subscription.trial_ending"
      customerId: string
      subscriptionId: string
      trialEnd: Date
    }
  | {
      type: "payment.succeeded"
      customerId: string
      subscriptionId?: string
      amountPaid: number
      currency: string
      invoiceId?: string
    }
  | {
      type: "payment.failed"
      customerId: string
      subscriptionId?: string
      invoiceId?: string
    }
  | {
      type: "refund.created"
      customerId: string
      paymentId: string
      refundId: string
      amount: number
      currency: string
    }
  | {
      type: "unknown"
      rawType: string
    }
