import { describe, expect, it } from "vitest"
import { TIERS } from "@/config/pricing"
import { tierMeetsMinimum } from "@/lib/payments/tier-utils"

describe("tierMeetsMinimum", () => {
  it("grants access when tiers match exactly", () => {
    expect(tierMeetsMinimum("pro", "pro")).toBe(true)
  })

  it("grants access when user tier is higher", () => {
    expect(tierMeetsMinimum("business", "pro")).toBe(true)
    expect(tierMeetsMinimum("business", "starter")).toBe(true)
    expect(tierMeetsMinimum("pro", "starter")).toBe(true)
  })

  it("denies access when user tier is lower", () => {
    expect(tierMeetsMinimum("starter", "pro")).toBe(false)
    expect(tierMeetsMinimum("starter", "business")).toBe(false)
    expect(tierMeetsMinimum("pro", "business")).toBe(false)
  })
})

describe("TIERS", () => {
  it("contains all expected tiers", () => {
    expect(TIERS.starter).toBeDefined()
    expect(TIERS.pro).toBeDefined()
    expect(TIERS.business).toBeDefined()
  })

  it("has exactly one highlighted tier", () => {
    const highlighted = Object.values(TIERS).filter((tier) => tier.highlighted)

    expect(highlighted).toHaveLength(1)
  })
})
