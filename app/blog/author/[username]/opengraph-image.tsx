import { ImageResponse } from "next/og"
import { siteConfig } from "@/config/site"
import { getPostsByAuthor } from "@/actions/get-posts-by-author"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

interface Props {
  params: Promise<{
    username: string
  }>
}

export default async function OGImage({ params }: Props) {
  const { username } = await params

  const { authorName, authorBio, authorImage } =
    await getPostsByAuthor(username)

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(to bottom right, #111827, #1e293b)",
        color: "white",
      }}
    >
      /* eslint-disable-next-line @next/next/no-img-element */
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
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "72px",
          gap: "48px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "65%",
            gap: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 600,
              color: "rgba(255,255,255,0.68)",
            }}
          >
            Author • {siteConfig.brand.name}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1,
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
            }}
          >
            {authorName ?? "Author"}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.74)",
              maxWidth: "90%",
            }}
          >
            {authorBio ?? `Read articles by ${authorName ?? "this author"}.`}
          </div>
        </div>

        {authorImage && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={authorImage}
            alt=""
            style={{
              width: 280,
              height: 280,
              borderRadius: 9999,
              objectFit: "cover",
              border: "6px solid rgba(255,255,255,0.12)",
            }}
          />
        )}
      </div>
    </div>,
    size
  )
}
