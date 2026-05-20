import Script from "next/script"
import { siteConfig } from "@/config/site"

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.brand.url}/#website`,
        url: siteConfig.brand.url,
        name: siteConfig.brand.name,
        description: siteConfig.seo.metaData.home.description,
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.brand.url}/#organization`,
        url: siteConfig.brand.url,
        name: siteConfig.brand.name,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.brand.url}/opengraph-image.png`,
        },
      },
    ],
  }

  return (
    <Script
      id="json-ld-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
