import type { PaymentProvider } from "@/db/types/payments/provider"
import { env } from "@/env"

async function createProvider(): Promise<PaymentProvider> {
  const provider = env.PAYMENT_PROVIDER

  if (!provider) {
    throw new Error(
      "PAYMENT_PROVIDER is not set. Add it to your .env.local file."
    )
  }

  switch (provider) {
    case "stripe": {
      const { StripeAdapter } = await import("@/lib/payments/adapters/stripe")
      return new StripeAdapter()
    }
    case "lemonsqueezy": {
      const { LemonSqueezyAdapter } =
        await import("@/lib/payments/adapters/lemonsqueezy")
      return new LemonSqueezyAdapter()
    }
    case "razorpay": {
      const { RazorpayAdapter } =
        await import("@/lib/payments/adapters/razorpay")
      return new RazorpayAdapter()
    }
  }
}

export const providerPromise: Promise<PaymentProvider> = createProvider()
