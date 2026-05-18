import { DocsBody, DocsPage } from "fumadocs-ui/page"
import { notFound } from "next/navigation"
import { source } from "@/lib/source"
import { CopyMarkdownButton } from "@/app/docs/components/copy-markdown-button"
import { getDocMarkdown } from "@/lib/docs/get-doc-markdown"
import { DocsActions } from "@/app/docs/components/docs-actions"
import { Callout } from "fumadocs-ui/components/callout"
import { siteConfig } from "@/config/site"

type PageProps = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const normalizedSlug =
    slug?.[0] === "overview" && slug.length === 1 ? undefined : slug
  const markdown = await getDocMarkdown(normalizedSlug)
  const slugPath = normalizedSlug?.join("/") ?? "index"
  const { github, defaultBranch, docsPath } = siteConfig.brand.repository
  const githubUrl = `${github}/blob/${defaultBranch}/${docsPath}/${slugPath}.mdx`
  const markdownUrl = `/api/docs/raw/${slugPath}`
  const page = source.getPage(normalizedSlug)

  if (!page) {
    notFound()
  }

  const MDX = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <div className="mb-6 flex items-center gap-3">
        <CopyMarkdownButton markdown={markdown} />
        <DocsActions githubUrl={githubUrl} markdownUrl={markdownUrl} />
      </div>
      <DocsBody>
        <MDX components={{ Callout }} />
      </DocsBody>
    </DocsPage>
  )
}
