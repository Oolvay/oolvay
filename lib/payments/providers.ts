import { StripeAdapter } from "@/lib/payments/adapters/stripe"
import { LemonSqueezyAdapter } from "@/lib/payments/adapters/lemonsqueezy"
import { RazorpayAdapter } from "@/lib/payments/adapters/razorpay"

export const stripeProvider = new StripeAdapter()

export const lemonsqueezyProvider = new LemonSqueezyAdapter()

export const razorpayProvider = new RazorpayAdapter()
