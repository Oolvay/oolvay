import type { ProviderName } from "@/db/types/payments/payment-provider"
import type { PaymentProvider } from "@/db/types/payments/provider"

export async function getProviderByName(
  provider: ProviderName
): Promise<PaymentProvider> {
  switch (provider) {
    case "stripe": {
      const mod = await import("@/lib/payments/adapters/stripe")
      return new mod.StripeAdapter()
    }

    case "lemonsqueezy": {
      const mod = await import("@/lib/payments/adapters/lemonsqueezy")
      return new mod.LemonSqueezyAdapter()
    }

    case "razorpay": {
      const mod = await import("@/lib/payments/adapters/razorpay")
      return new mod.RazorpayAdapter()
    }
  }
}
