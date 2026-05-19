interface PostNotificationEmailProps {
  title: string
  excerpt: string
  url: string
}

export function PostNotificationEmail({
  title,
  excerpt,
  url,
}: PostNotificationEmailProps) {
  return `
    <div>
      <h1>${title}</h1>

      <p>${excerpt}</p>

      <p>
        <a href="${url}">
          Read more
        </a>
      </p>
    </div>
  `
}
