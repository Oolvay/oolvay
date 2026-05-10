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

export function PricingFaq() {
  return (
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
  )
}
