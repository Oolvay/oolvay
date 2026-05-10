import { PricingTable } from "@/app/(main)/pricing/components/pricing-table"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: siteConfig.seo.metaData.pricing.title,
  description: siteConfig.seo.metaData.pricing.description,
}

// Replace with your actual FAQs
const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes — all paid plans include a 14-day free trial. No credit card required to start.",
  },
  {
    q: "Can I change plans later?",
    a: "Absolutely. Upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards and debit cards. Enterprise customers can pay via invoice.",
  },
  {
    q: "Do you offer discounts for annual billing?",
    a: "Yes — annual billing saves you 20% compared to monthly pricing.",
  },
  {
    q: "What happens when I cancel?",
    a: "You keep access until the end of your billing period. After that your account is downgraded to the free tier and your data is retained for 30 days.",
  },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-20 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {/* Replace with your pricing headline */}
          Simple pricing, no surprises
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {/* Replace with your pricing subheadline */}
          Start free, scale when you’re ready. Cancel anytime.
        </p>
      </div>

      {/* Plans */}
      <PricingTable />

      {/* FAQ */}
      <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-foreground text-center">
          Frequently asked questions
        </h2>
        <dl className="flex flex-col divide-y divide-border">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-5 flex flex-col gap-2">
              <dt className="font-semibold text-foreground text-sm">{faq.q}</dt>
              <dd className="text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
