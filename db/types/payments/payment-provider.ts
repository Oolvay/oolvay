export const PAYMENT_PROVIDERS = {
  STRIPE: "stripe",
  LEMONSQUEEZY: "lemonsqueezy",
  RAZORPAY: "razorpay",
} as const

export type ProviderName =
  (typeof PAYMENT_PROVIDERS)[keyof typeof PAYMENT_PROVIDERS]
