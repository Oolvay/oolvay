import Stripe from "stripe"
import { env } from "@/env"
import type {
  PaymentProvider,
  ProviderCapabilities,
} from "@/db/types/payments/provider"
import type {
  CreateCustomerParams,
  Customer,
} from "@/db/types/payments/customer"
import type {
  CheckoutParams,
  CheckoutResult,
  VerifyCheckoutParams,
  VerifyCheckoutResult,
} from "@/db/types/payments/checkout"
import type { NormalizedSubscription } from "@/db/types/payments/normalized-subscription"
import type {
  RawProviderEvent,
  NormalizedEvent,
} from "@/db/types/payments/webhook-events"
import { WebhookSignatureError } from "@/db/types/payments/payment-errors"
import {
  resolveProviderPriceId,
  resolveInternalPriceId,
} from "@/lib/payments/tier-utils"

if (!env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set but PAYMENT_PROVIDER=stripe.")
}

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-04-22.dahlia",
})

export class StripeAdapter implements PaymentProvider {
  readonly name = "stripe" as const

  readonly capabilities: ProviderCapabilities = {
    hostedCheckout: true,
    billingPortal: true,
    freeTrials: true,
    proration: true,
    inPlacePlanChange: false,
    automaticTax: true,
    subscriptionPause: true,
    idempotencyKeys: true,
    localPaymentMethods: [],
  }

  // ── Customer ───────────────────────────────────────────────────────────────

  async createCustomer(params: CreateCustomerParams): Promise<Customer> {
    const customer = await stripe.customers.create({
      email: params.email,
      name: params.name,
      metadata: params.metadata,
    })
    return {
      id: customer.id,
      email: customer.email!,
      name: customer.name ?? undefined,
    }
  }

  async getCustomer(customerId: string): Promise<Customer> {
    const customer = await stripe.customers.retrieve(customerId)
    if (customer.deleted) {
      throw new Error(`Stripe customer "${customerId}" has been deleted.`)
    }
    return {
      id: customer.id,
      email: customer.email!,
      name: customer.name ?? undefined,
    }
  }

  // ── Checkout ───────────────────────────────────────────────────────────────

  async initiateCheckout(params: CheckoutParams): Promise<CheckoutResult> {
    const providerPriceId = resolveProviderPriceId(
      params.priceId as Parameters<typeof resolveProviderPriceId>[0],
      "stripe"
    )

    const session = await stripe.checkout.sessions.create({
      mode: params.type === "subscription" ? "subscription" : "payment",
      line_items: [
        {
          price: providerPriceId,
          quantity: params.type === "one_time" ? (params.quantity ?? 1) : 1,
        },
      ],
      customer: params.customerId,
      subscription_data:
        params.type === "subscription" && params.trialDays
          ? { trial_period_days: params.trialDays }
          : undefined,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata,
    })

    return { mode: "redirect", url: session.url! }
  }

  // Stripe verification is handled entirely via webhook — this is a no-op.
  async verifyCheckout(
    _params: VerifyCheckoutParams
  ): Promise<VerifyCheckoutResult> {
    return { success: true, paymentId: _params.razorpayPaymentId }
  }

  // ── Subscription management ────────────────────────────────────────────────

  async getSubscription(
    subscriptionId: string
  ): Promise<NormalizedSubscription> {
    const sub = await stripe.subscriptions.retrieve(subscriptionId)
    return this.normalizeSubscription(sub)
  }

  async cancelSubscription(
    subscriptionId: string,
    opts?: { immediately?: boolean }
  ): Promise<NormalizedSubscription> {
    if (opts?.immediately) {
      const sub = await stripe.subscriptions.cancel(subscriptionId)
      return this.normalizeSubscription(sub)
    }
    const sub = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })
    return this.normalizeSubscription(sub)
  }

  async resumeSubscription(
    subscriptionId: string
  ): Promise<NormalizedSubscription> {
    const sub = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    })
    return this.normalizeSubscription(sub)
  }

  async changeSubscriptionPlan(
    subscriptionId: string,
    newPlanId: string
  ): Promise<NormalizedSubscription> {
    const sub = await stripe.subscriptions.retrieve(subscriptionId)
    const newProviderPriceId = resolveProviderPriceId(
      newPlanId as Parameters<typeof resolveProviderPriceId>[0],
      "stripe"
    )
    const updated = await stripe.subscriptions.update(subscriptionId, {
      items: [{ id: sub.items.data[0].id, price: newProviderPriceId }],
      proration_behavior: "create_prorations",
    })
    return this.normalizeSubscription(updated)
  }

  // ── Billing portal ─────────────────────────────────────────────────────────

  async createBillingPortalSession(
    customerId: string,
    returnUrl: string
  ): Promise<{ url: string }> {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })
    return { url: session.url }
  }

  // ── Webhooks ───────────────────────────────────────────────────────────────

  async constructWebhookEvent(
    rawBody: Buffer,
    signature: string
  ): Promise<RawProviderEvent> {
    if (!env.STRIPE_WEBHOOK_SECRET) {
      throw new Error(
        "STRIPE_WEBHOOK_SECRET is not set but a Stripe webhook was received."
      )
    }
    try {
      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      )
      return event as unknown as RawProviderEvent
    } catch {
      throw new WebhookSignatureError("stripe")
    }
  }

  normalizeWebhookEvent(raw: RawProviderEvent): NormalizedEvent | null {
    // Cast through unknown first — RawProviderEvent is Record<string, unknown>
    // and Stripe.Event is a large discriminated union; double-cast is intentional.
    const event = raw as unknown as Stripe.Event

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        return {
          type: "checkout.completed",
          customerId: session.customer as string,
          sessionId: session.id,
          subscriptionId: session.subscription as string | undefined,
          amountTotal: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
          metadata: session.metadata ?? {},
        }
      }

      case "customer.subscription.created": {
        const sub = event.data.object as Stripe.Subscription
        return {
          type: "subscription.created",
          customerId: sub.customer as string,
          subscription: this.normalizeSubscription(sub),
        }
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription
        return {
          type: "subscription.updated",
          customerId: sub.customer as string,
          subscription: this.normalizeSubscription(sub),
        }
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription
        return {
          type: "subscription.deleted",
          customerId: sub.customer as string,
          subscriptionId: sub.id,
        }
      }

      case "customer.subscription.trial_will_end": {
        const sub = event.data.object as Stripe.Subscription
        return {
          type: "subscription.trial_ending",
          customerId: sub.customer as string,
          subscriptionId: sub.id,
          trialEnd: new Date(sub.trial_end! * 1000),
        }
      }

      case "invoice.payment_succeeded": {
        const inv = event.data.object as Stripe.Invoice
        // Basil: invoice.subscription removed — now at invoice.parent.subscription_details.subscription
        const subscriptionId =
          inv.parent?.type === "subscription_details"
            ? (inv.parent.subscription_details?.subscription as
                | string
                | undefined)
            : undefined
        return {
          type: "payment.succeeded",
          customerId: inv.customer as string,
          subscriptionId,
          amountPaid: inv.amount_paid,
          currency: inv.currency,
          invoiceId: inv.id,
        }
      }

      case "invoice.payment_failed": {
        const inv = event.data.object as Stripe.Invoice
        const subscriptionId =
          inv.parent?.type === "subscription_details"
            ? (inv.parent.subscription_details?.subscription as
                | string
                | undefined)
            : undefined
        return {
          type: "payment.failed",
          customerId: inv.customer as string,
          subscriptionId,
          invoiceId: inv.id,
        }
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge
        const refund = charge.refunds?.data[0]
        return {
          type: "refund.created",
          customerId: charge.customer as string,
          paymentId: charge.id,
          refundId: refund?.id ?? "",
          amount: refund?.amount ?? 0,
          currency: charge.currency,
        }
      }

      default:
        return { type: "unknown", rawType: event.type }
    }
  }

  // ── Refunds ────────────────────────────────────────────────────────────────

  async refundPayment(
    paymentId: string,
    amount?: number
  ): Promise<{ refundId: string; status: string }> {
    const refund = await stripe.refunds.create({
      charge: paymentId,
      ...(amount !== undefined ? { amount } : {}),
    })
    return { refundId: refund.id, status: refund.status ?? "unknown" }
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private normalizeSubscription(
    sub: Stripe.Subscription
  ): NormalizedSubscription {
    const item = sub.items.data[0]
    const priceId = item?.price.id

    // Basil: current_period_start/end moved from Subscription → SubscriptionItem
    const currentPeriodStart = item?.current_period_start
      ? new Date(item.current_period_start * 1000)
      : new Date()
    const currentPeriodEnd = item?.current_period_end
      ? new Date(item.current_period_end * 1000)
      : new Date()

    const internalPlanId = priceId
      ? (resolveInternalPriceId(priceId, "stripe") ?? "pro_monthly")
      : "pro_monthly"

    return {
      id: sub.id,
      providerId: sub.id,
      customerId: sub.customer as string,
      planId: internalPlanId,
      status: sub.status as NormalizedSubscription["status"],
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
      trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
      metadata: sub.metadata ?? {},
    }
  }
}
