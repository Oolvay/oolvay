import type { ProviderName } from "@/db/types/payments/payment-provider"
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

export interface ProviderCapabilities {
  hostedCheckout: boolean
  billingPortal: boolean
  freeTrials: boolean
  proration: boolean
  automaticTax: boolean
  subscriptionPause: boolean
  idempotencyKeys: boolean
  localPaymentMethods: string[]
}

export interface PaymentProvider {
  readonly name: ProviderName
  readonly capabilities: ProviderCapabilities

  createCustomer(params: CreateCustomerParams): Promise<Customer>
  getCustomer(customerId: string): Promise<Customer>

  initiateCheckout(params: CheckoutParams): Promise<CheckoutResult>
  verifyCheckout(params: VerifyCheckoutParams): Promise<VerifyCheckoutResult>

  getSubscription(subscriptionId: string): Promise<NormalizedSubscription>
  cancelSubscription(
    subscriptionId: string,
    opts?: { immediately?: boolean }
  ): Promise<NormalizedSubscription>
  resumeSubscription(subscriptionId: string): Promise<NormalizedSubscription>
  changeSubscriptionPlan(
    subscriptionId: string,
    newPlanId: string
  ): Promise<NormalizedSubscription>

  createBillingPortalSession(
    customerId: string,
    returnUrl: string
  ): Promise<{ url: string }>

  constructWebhookEvent(
    rawBody: Buffer,
    signature: string
  ): Promise<RawProviderEvent>
  normalizeWebhookEvent(raw: RawProviderEvent): NormalizedEvent | null

  refundPayment(
    paymentId: string,
    amount?: number
  ): Promise<{ refundId: string; status: string }>
}
