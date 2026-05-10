// Stub — full implementation in Phase 19.
// Do not use until LemonSqueezyAdapter is implemented.
import type { PaymentProvider } from "@/db/types/payments/provider"

export class LemonSqueezyAdapter implements PaymentProvider {
  get name(): "lemonsqueezy" {
    return "lemonsqueezy"
  }

  get capabilities() {
    return {
      hostedCheckout: true,
      billingPortal: true,
      freeTrials: true,
      proration: false,
      automaticTax: true,
      subscriptionPause: true,
      idempotencyKeys: false,
      localPaymentMethods: [] as string[],
    }
  }

  private notImplemented(): never {
    throw new Error("LemonSqueezyAdapter is not yet implemented.")
  }

  createCustomer() {
    return this.notImplemented()
  }
  getCustomer() {
    return this.notImplemented()
  }
  initiateCheckout() {
    return this.notImplemented()
  }
  verifyCheckout() {
    return this.notImplemented()
  }
  getSubscription() {
    return this.notImplemented()
  }
  cancelSubscription() {
    return this.notImplemented()
  }
  resumeSubscription() {
    return this.notImplemented()
  }
  changeSubscriptionPlan() {
    return this.notImplemented()
  }
  createBillingPortalSession() {
    return this.notImplemented()
  }
  constructWebhookEvent() {
    return this.notImplemented()
  }
  normalizeWebhookEvent() {
    return this.notImplemented()
  }
  refundPayment() {
    return this.notImplemented()
  }
}
