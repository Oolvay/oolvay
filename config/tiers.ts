import type { TierKey } from "@/db/types/payments/tier"

export interface TierDisplayPrice {
  amount: string
  period: string
  saving?: string // e.g. "Save 20%" — only relevant for annual
}

export interface TierConfig {
  key: TierKey
  name: string
  description: string
  priceId: {
    monthly: string | null
    annual: string | null
  }
  displayPrice: {
    monthly: TierDisplayPrice
    annual: TierDisplayPrice
  }
  limits: {
    seats: number
    projects: number
    storageGb: number
    apiCallsPerMonth: number
  }
  features: string[]
  highlighted: boolean
}

export const TIERS: Record<TierKey, TierConfig> = {
  starter: {
    key: "starter",
    name: "Starter",
    description: "Everything you need to get started, free forever",
    priceId: {
      monthly: null,
      annual: null,
    },
    displayPrice: {
      monthly: { amount: "Free", period: "" },
      annual: { amount: "Free", period: "" },
    },
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
    description: "For individuals and small teams moving fast",
    priceId: {
      monthly: "pro_monthly",
      annual: "pro_yearly",
    },
    displayPrice: {
      monthly: { amount: "$29", period: "/month" },
      annual: { amount: "$23", period: "/month", saving: "Save 20%" },
    },
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
    description: "For growing teams that need scale and control",
    priceId: {
      monthly: "business_monthly",
      annual: "business_yearly",
    },
    displayPrice: {
      monthly: { amount: "$79", period: "/month" },
      annual: { amount: "$63", period: "/month", saving: "Save 20%" },
    },
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
