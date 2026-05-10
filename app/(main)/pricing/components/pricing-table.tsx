"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TIERS } from "@/config/tiers"

type BillingPeriod = "monthly" | "annual"

export function PricingTable() {
  const [billing, setBilling] = useState<BillingPeriod>("annual")
  const tiers = Object.values(TIERS)

  return (
    <div className="flex flex-col items-center gap-10">
      {/* Billing toggle */}
      <div className="flex flex-col items-center gap-2">
        <Tabs
          value={billing}
          onValueChange={(value) => setBilling(value as BillingPeriod)}
        >
          <TabsList aria-label="Select billing period">
            <TabsTrigger
              value="monthly"
              className="cursor-pointer data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-input/30 dark:data-[state=active]:border-input"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="annual"
              className="cursor-pointer data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-input/30 dark:data-[state=active]:border-input"
            >
              Annual
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <p className="text-sm text-muted-foreground">
          {billing === "annual" ? (
            <>
              <span className="text-xl font-bold text-primary">Save 20%</span> —
              billed as one annual payment
            </>
          ) : (
            "Billed month to month"
          )}
        </p>
      </div>

      {/* Plans */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full"
        role="list"
        aria-label="Pricing plans"
      >
        {tiers.map((tier) => {
          const price = tier.displayPrice[billing]
          const activePriceId = tier.priceId[billing]
          const isFree = activePriceId === null

          return (
            <div
              key={tier.key}
              role="listitem"
              aria-label={`${tier.name} plan`}
              className={`flex flex-col gap-6 p-6 rounded-xl border ${
                tier.highlighted
                  ? "border-primary bg-primary/5 relative"
                  : "border-border bg-card"
              }`}
            >
              {tier.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  aria-label="Most popular plan"
                >
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {tier.name}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {tier.description}
                </p>
              </div>

              <div
                className="flex items-baseline gap-2"
                aria-label={`Price: ${price.amount}${price.period}`}
              >
                {billing === "annual" && !isFree && (
                  <span
                    className="text-2xl font-semibold text-muted-foreground/60 line-through decoration-2"
                    aria-label={`Original monthly price: ${tier.displayPrice.monthly.amount}`}
                  >
                    {tier.displayPrice.monthly.amount}
                  </span>
                )}
                <span className="flex items-baseline">
                  <span className="text-4xl font-bold text-foreground">
                    {price.amount}
                  </span>
                  {price.period && (
                    <span className="text-muted-foreground text-sm">
                      {price.period}
                    </span>
                  )}
                </span>
              </div>

              <ul
                className="flex flex-col gap-2 flex-1"
                aria-label={`${tier.name} plan features`}
              >
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check
                      className="w-4 h-4 text-primary shrink-0"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* TODO Phase 16: replace with <CheckoutButton> for paid tiers */}
              <Link
                href={isFree ? "/sign-up" : "/login"}
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                    : "border border-border bg-background text-foreground hover:bg-muted transition-colors"
                }`}
                aria-label={
                  isFree
                    ? `Get started with ${tier.name} for free`
                    : `Subscribe to ${tier.name}, billed ${billing}`
                }
              >
                {isFree ? "Get started free" : `Get ${tier.name}`}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
