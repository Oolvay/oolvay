/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og"
import { siteConfig } from "@/config/site"
import { getPostBySlug } from "@/actions/get-post-by-slug"

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

  const post = await getPostBySlug(slug)

  const coverImage =
    post?.coverImage?.startsWith("http") && !post.coverImage.endsWith(".webp")
      ? post.coverImage
      : undefined

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#0a0a0a",
        color: "white",
      }}
    >
      {coverImage && (
        <img
          src={coverImage}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.78), rgba(0,0,0,0.35))",
        }}
      />

      <img
        src={`${siteConfig.brand.url}/brand-logo.svg`}
        alt=""
        style={{
          position: "absolute",
          right: 48,
          bottom: 48,
          width: 160,
          height: 160,
          opacity: 0.08,
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
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
            fontSize: 28,
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {siteConfig.brand.name}
        </div>

        <div
          style={{
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: "60%",
            textShadow: "0 2px 12px rgba(0,0,0,0.45)",
          }}
        >
          {post?.title ?? siteConfig.brand.name}
        </div>

        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          {post?.author?.name ?? ""}
        </div>
      </div>
    </div>,
    size
  )
}
