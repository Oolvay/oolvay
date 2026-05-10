// Stub — full implementation in Phase 21.
// Do not use until RazorpayAdapter is implemented.
import type { PaymentProvider } from "@/db/types/payments/provider"

export class RazorpayAdapter implements PaymentProvider {
  get name(): "razorpay" {
    return "razorpay"
  }

  get capabilities() {
    return {
      hostedCheckout: false,
      billingPortal: false,
      freeTrials: false,
      proration: false,
      automaticTax: false,
      subscriptionPause: true,
      idempotencyKeys: true,
      localPaymentMethods: ["upi", "netbanking", "cards"] as string[],
    }
  }

  private notImplemented(): never {
    throw new Error("RazorpayAdapter is not yet implemented.")
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
