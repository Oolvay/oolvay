import { TIERS, PRICE_MAP } from "@/config/pricing"
import type { TierConfig, InternalPriceId } from "@/config/pricing"
import type { TierKey } from "@/db/types/payments/tier"
import type { ProviderName } from "@/db/types/payments/payment-provider"

export function resolveProviderPriceId(
  internalId: InternalPriceId,
  provider: ProviderName
): string {
  const entry = PRICE_MAP[internalId]
  if (!entry) throw new Error(`Unknown internal price ID: "${internalId}"`)
  const providerPriceId = entry[provider]
  if (!providerPriceId)
    throw new Error(
      `No ${provider} price configured for internal ID: "${internalId}"`
    )
  return providerPriceId
}

export function resolveInternalPriceId(
  providerPriceId: string,
  provider: ProviderName
): InternalPriceId | null {
  for (const [internal, map] of Object.entries(PRICE_MAP)) {
    if (map[provider] === providerPriceId) return internal as InternalPriceId
  }
  return null
}

export function resolveTierFromInternalPriceId(
  internalId: InternalPriceId
): TierConfig {
  const entry = Object.values(TIERS).find(
    (tier) =>
      tier.priceId.monthly === internalId || tier.priceId.annual === internalId
  )
  return entry ?? TIERS.starter
}

export function getTierByPriceId(priceId: string | null): TierConfig {
  if (!priceId) return TIERS.starter
  return (
    Object.values(TIERS).find(
      (t) => t.priceId.monthly === priceId || t.priceId.annual === priceId
    ) ?? TIERS.starter
  )
}

export function tierMeetsMinimum(
  userTier: TierKey,
  requiredTier: TierKey
): boolean {
  const order: TierKey[] = ["starter", "pro", "business"]
  return order.indexOf(userTier) >= order.indexOf(requiredTier)
}
