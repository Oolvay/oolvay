import { siteConfig } from "@/config/site"

interface BuildDocsJsonLdInput {
  title: string
  description: string
  canonical: string
}

export function buildDocsJsonLd({
  title,
  description,
  canonical,
}: BuildDocsJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",

    headline: title,

    description,

    url: canonical,

    author: {
      "@type": "Organization",
      name: siteConfig.brand.name,
      url: siteConfig.brand.url,
    },

    publisher: {
      "@type": "Organization",
      name: siteConfig.brand.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.brand.url}/opengraph-image.png`,
      },
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  }
}
