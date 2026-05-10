export const SUBSCRIPTION_STATUSES = {
  ACTIVE: "active",
  TRIALING: "trialing",
  PAST_DUE: "past_due",
  UNPAID: "unpaid",
  CANCELED: "canceled",
  INCOMPLETE: "incomplete",
  PAUSED: "paused",
} as const

export type NormalizedSubscriptionStatus =
  (typeof SUBSCRIPTION_STATUSES)[keyof typeof SUBSCRIPTION_STATUSES]
