export type TierKey = "starter" | "pro" | "business"

export interface TierConfig {
  key: TierKey
  name: string
  description: string
  priceId: string | null // null = free tier; otherwise matches a key in PRICE_MAP
  limits: {
    seats: number // -1 = unlimited
    projects: number // -1 = unlimited
    storageGb: number // -1 = unlimited
    apiCallsPerMonth: number // -1 = unlimited
  }
  features: string[] // Marketing bullets for pricing page
  highlighted: boolean // Shows "Most Popular" badge
}

export const TIERS: Record<TierKey, TierConfig> = {
  starter: {
    key: "starter",
    name: "Starter",
    description: "Everything you need to get started, free forever.",
    priceId: null,
    limits: { seats: 1, projects: 3, storageGb: 1, apiCallsPerMonth: 1000 },
    features: [
      "Up to 3 projects",
      "1 GB storage",
      "1,000 API calls/month",
      "Community support",
    ],
    highlighted: false,
  },
  pro: {
    key: "pro",
    name: "Pro",
    description: "For individuals and small teams moving fast.",
    priceId: "pro_monthly",
    limits: { seats: 5, projects: 20, storageGb: 20, apiCallsPerMonth: 50000 },
    features: [
      "Up to 20 projects",
      "20 GB storage",
      "50,000 API calls/month",
      "Priority email support",
      "Advanced analytics",
    ],
    highlighted: true,
  },
  business: {
    key: "business",
    name: "Business",
    description: "For growing teams that need scale and control.",
    priceId: "business_monthly",
    limits: { seats: 25, projects: -1, storageGb: 100, apiCallsPerMonth: -1 },
    features: [
      "Unlimited projects",
      "100 GB storage",
      "Unlimited API calls",
      "Up to 25 seats",
      "Dedicated support",
    ],
    highlighted: false,
  },
}

export function getTierByPriceId(priceId: string | null): TierConfig {
  if (!priceId) return TIERS.starter
  return (
    Object.values(TIERS).find((t) => t.priceId === priceId) ?? TIERS.starter
  )
}

export function tierMeetsMinimum(
  userTier: TierKey,
  requiredTier: TierKey
): boolean {
  const order: TierKey[] = ["starter", "pro", "business"]
  return order.indexOf(userTier) >= order.indexOf(requiredTier)
}
