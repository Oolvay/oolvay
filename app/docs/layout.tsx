import type { ReactNode } from "react"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { siteConfig } from "@/config/site"
import { source } from "@/lib/source"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="fd-wrapper">
      <DocsLayout
        tree={source.pageTree}
        nav={{
          title: (
            <div className="flex items-center gap-2 text-foreground">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand-logo.svg"
                alt={siteConfig.brand.name}
                className="size-6 shrink-0"
              />
              <span className="font-extrabold text-2xl tracking-tight">
                {siteConfig.brand.name}
              </span>
            </div>
          ),
        }}
        sidebar={{
          defaultOpenLevel: 1,
          tabs: false,
        }}
      >
        {children}
      </DocsLayout>
    </div>
  )
}
