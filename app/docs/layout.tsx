import type { ReactNode } from "react"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { BookOpen } from "lucide-react"
import { source } from "@/lib/source"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="fd-wrapper">
      <DocsLayout
        tree={source.pageTree}
        nav={{
          title: (
            <div className="flex items-center gap-2 font-semibold">
              <BookOpen
                className="size-4 shrink-0"
                style={{ color: "var(--foreground)" }}
              />
              <span className="text-foreground">Documentation</span>
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
