import { siteConfig } from "@/config/site"

export function buildPricingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",

    name: "Pricing",

    description: siteConfig.seo.metaData.pricing.description,

    url: `${siteConfig.brand.url}/pricing`,

    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.brand.url}/#website`,
    },

    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.brand.url}/#organization`,
      name: siteConfig.brand.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.brand.url}/opengraph-image.png`,
      },
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.brand.url}/pricing`,
    },
  }
}
