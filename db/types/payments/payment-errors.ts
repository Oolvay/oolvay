import type { ProviderName } from "@/db/types/payments/payment-provider"

export class ProviderCapabilityError extends Error {
  constructor(provider: ProviderName, capability: string) {
    super(`Provider "${provider}" does not support: ${capability}`)
    this.name = "ProviderCapabilityError"
  }
}

export class WebhookSignatureError extends Error {
  constructor(provider: ProviderName) {
    super(`Webhook signature verification failed for provider: ${provider}`)
    this.name = "WebhookSignatureError"
  }
}

export class CheckoutVerificationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "CheckoutVerificationError"
  }
}
