export const TIERS_KEYS = {
  STARTER: "starter",
  PRO: "pro",
  BUSINESS: "business",
} as const

export type TierKey = (typeof TIERS_KEYS)[keyof typeof TIERS_KEYS]
