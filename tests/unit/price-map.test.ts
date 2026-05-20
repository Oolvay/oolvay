import { describe, expect, it } from "vitest"
import {
  resolveInternalPriceId,
  resolveProviderPriceId,
} from "@/lib/payments/tier-utils"
import { PRICE_MAP } from "@/config/pricing"
import type { InternalPriceId } from "@/config/pricing"
import type { ProviderName } from "@/db/types/payments/payment-provider"

const INTERNAL_IDS: InternalPriceId[] = [
  "pro_monthly",
  "pro_yearly",
  "business_monthly",
  "business_yearly",
]

const PROVIDERS: ProviderName[] = ["stripe", "lemonsqueezy", "razorpay"]

describe("resolveProviderPriceId", () => {
  it("returns a valid provider price ID", () => {
    for (const internalId of INTERNAL_IDS) {
      for (const provider of PROVIDERS) {
        const result = resolveProviderPriceId(internalId, provider)

        expect(typeof result).toBe("string")
        expect(result.length).toBeGreaterThan(0)
      }
    }
  })
})

describe("resolveInternalPriceId", () => {
  it("round-trips provider IDs correctly", () => {
    for (const internalId of INTERNAL_IDS) {
      for (const provider of PROVIDERS) {
        const providerPriceId = resolveProviderPriceId(internalId, provider)

        const resolved = resolveInternalPriceId(providerPriceId, provider)

        expect(resolved).toBe(internalId)
      }
    }
  })

  it("returns null for unknown provider IDs", () => {
    expect(resolveInternalPriceId("does_not_exist", "stripe")).toBeNull()
  })
})

describe("PRICE_MAP", () => {
  it("contains all providers for every plan", () => {
    for (const [internalId, mapping] of Object.entries(PRICE_MAP)) {
      for (const provider of PROVIDERS) {
        expect(
          mapping[provider],
          `${internalId} missing ${provider} mapping`
        ).toBeDefined()
      }
    }
  })
})
