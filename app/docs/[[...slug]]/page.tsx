import { DocsBody, DocsPage } from "fumadocs-ui/page"
import { notFound } from "next/navigation"

import { source } from "@/lib/source"

type PageProps = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  const page = source.getPage(slug)

  if (!page) {
    notFound()
  }

  const MDX = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsBody>
        <MDX />
      </DocsBody>
    </DocsPage>
  )
}
