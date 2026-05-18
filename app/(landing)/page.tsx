import Link from "next/link"
import { siteConfig } from "@/config/site"
import { ArrowRight, Zap, Shield, BarChart3, CreditCard } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/metadata/build-page-metadata"
import { HeroBackground } from "@/components/layout/hero-background"

export const metadata = buildPageMetadata({
  title: siteConfig.seo.metaData.home.title,
  description: siteConfig.seo.metaData.home.description,
  canonical: siteConfig.brand.url,
  absoluteTitle: true,
})

const highlights = [
  {
    icon: Zap,
    title: "Blazing fast",
    description:
      "Built on modern infrastructure so your users never wait. Every page loads instantly.",
  },
  {
    icon: Shield,
    title: "Secure by default",
    description:
      "Rate limiting, CSP headers, and session protection are on from day one.",
  },
  {
    icon: BarChart3,
    title: "Built-in analytics",
    description:
      "Understand how your users behave and where they drop off — without leaving your dashboard.",
  },
  {
    icon: CreditCard,
    title: "Payments ready",
    description:
      "Accept one-time payments or subscriptions. Webhooks, receipts, and billing portals included.",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-screen">
        <HeroBackground />

        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-8 min-h-screen max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/60 backdrop-blur-sm text-muted-foreground text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Now in public beta — try it free
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
            The better way to
            <br />
            <span className="text-primary">run your business</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {`${siteConfig.brand.name} helps teams move faster, collaborate smarter, and ship with confidence. Everything you need, nothing you don’t.`}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/features"
              className="inline-flex items-center gap-2 border border-border bg-background/60 backdrop-blur-sm text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              See what&rsquo;s included
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            No credit card required · Cancel anytime
          </p>
        </div>
      </section>

      {/* Constrained content */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-28 py-24">
          {/* Highlights */}
          <section className="flex flex-col gap-10">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Why teams choose {siteConfig.brand.name}
              </h2>

              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                We&rsquo;ve thought through the hard parts so you don&rsquo;t
                have to.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {highlights.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="flex flex-col gap-3 p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {item.title}
                      </h3>

                      <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Social proof */}
          <section className="flex flex-col items-center gap-6 text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              Trusted by teams at
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
              {[
                "Acme Corp",
                "Globex",
                "Initech",
                "Umbrella",
                "Dunder Mifflin",
              ].map((name) => (
                <span
                  key={name}
                  className="text-lg font-bold text-foreground tracking-tight"
                >
                  {name}
                </span>
              ))}
            </div>
          </section>

          {/* CTA strip */}
          <section className="rounded-2xl border border-border bg-card px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Ready to get started?
              </h2>

              <p className="text-muted-foreground mt-1">
                Join thousands of teams already using {siteConfig.brand.name}.
              </p>
            </div>

            <Link
              href="/pricing"
              className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              View pricing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
