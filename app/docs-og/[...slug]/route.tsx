/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og"
import { siteConfig } from "@/config/site"
import { source } from "@/lib/source"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

function normalizeDocSlug(slug: string[] | undefined): string[] | undefined {
  return slug?.[0] === "overview" && slug.length === 1 ? undefined : slug
}

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      slug: string[]
    }>
  }
) {
  const { slug } = await context.params

  const normalizedSlug = normalizeDocSlug(slug)

  const page = source.getPage(normalizedSlug)

  const title = page?.data.title ?? "Documentation"

  const description =
    page?.data.description ??
    `${title} — ${siteConfig.brand.name} documentation`

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#0f1115",
        color: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background: "linear-gradient(to bottom right, #111827, #020617)",
        }}
      />

      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={`v-${i}`}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${i * 56}px`,
            width: 1,
            background: "rgba(255,255,255,0.05)",
          }}
        />
      ))}

      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={`h-${i}`}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${i * 56}px`,
            height: 1,
            background: "rgba(255,255,255,0.05)",
          }}
        />
      ))}

      <img
        src={`${siteConfig.brand.url}/brand-logo.svg`}
        alt=""
        style={{
          position: "absolute",
          right: 48,
          bottom: 48,
          width: 180,
          height: 180,
          opacity: 0.12,
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 600,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          {siteConfig.brand.name} Docs
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "72%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.02,
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {siteConfig.brand.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    </div>,
    size
  )
}
