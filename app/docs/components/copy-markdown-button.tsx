"use client"

import { Copy } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

type Props = {
  markdown: string
}

export function CopyMarkdownButton({ markdown }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(markdown)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="gap-2"
    >
      <Copy className="size-4" />
      {copied ? "Copied" : "Copy Markdown"}
    </Button>
  )
}
