import { readFile } from "fs/promises"
import path from "path"

export async function getDocMarkdown(slug?: string[]) {
  const resolvedSlug = !slug || slug.length === 0 ? ["index"] : slug

  const filePath = path.join(
    process.cwd(),
    "content",
    "docs",
    `${resolvedSlug.join("/")}.mdx`
  )

  return readFile(filePath, "utf8")
}
