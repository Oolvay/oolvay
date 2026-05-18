import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: [
        "/dashboard/",
        "/profile/",
        "/settings/",
        "/security/",
        "/billing/",
        "/preferences/",
        "/developer/",
        "/api/",
        "/monitoring/",
        "/admin/",
        "/blog/drafts/",
        "/blog/edit/",
        "/blog/categories",
      ],
    },

    sitemap: `${siteConfig.brand.url}/sitemap.xml`,
  }
}
