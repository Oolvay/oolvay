/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og"
import { siteConfig } from "@/config/site"
import { getPostsByCategory } from "@/actions/get-posts-by-category"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function OGImage({ params }: Props) {
  const { slug } = await params

  const { categoryName, categoryDescription, posts } =
    await getPostsByCategory(slug)

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(to bottom right, #0f172a, #111827)",
        color: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.08), transparent 40%)",
        }}
      />

      <img
        src={`${siteConfig.brand.url}/brand-logo.svg`}
        alt=""
        style={{
          position: "absolute",
          right: 48,
          bottom: 48,
          width: 180,
          height: 180,
          opacity: 0.1,
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
            color: "rgba(255,255,255,0.68)",
          }}
        >
          Category • {siteConfig.brand.name}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            maxWidth: "72%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1,
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
            }}
          >
            {categoryName ?? "Category"}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            {categoryDescription ??
              `Browse articles in the ${categoryName ?? "category"} category.`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {posts.length} article{posts.length === 1 ? "" : "s"}
        </div>
      </div>
    </div>,
    size
  )
}
