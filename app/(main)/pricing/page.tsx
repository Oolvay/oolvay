import { PricingTable } from "@/app/(main)/pricing/components/pricing-table"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"
import { getServerSession } from "@/lib/auth/get-server-session"
import { PricingFaq } from "@/app/(main)/pricing/components/pricing-faq"

export const metadata: Metadata = {
  title: siteConfig.seo.metaData.pricing.title,
  description: siteConfig.seo.metaData.pricing.description,
}

export default async function PricingPage() {
  const session = await getServerSession()

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
      <PricingTable isLoggedIn={!!session?.user} />

      <PricingFaq />
    </div>
  )
}
