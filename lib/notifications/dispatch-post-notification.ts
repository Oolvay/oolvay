import { db } from "@/db/drizzle"
import { post } from "@/db/schemas/blog-schema"
import { eq } from "drizzle-orm"
import { notificationEvent } from "@/db/schemas/notification-schema"
import { getEligibleUsers } from "@/lib/notifications/get-eligible-users"
import { sendPostNotificationEmail } from "@/lib/notifications/channels/email"
import { PostNotificationEmail } from "@/emails/post-notification-email"
import { userNotification } from "@/db/schemas/notification-schema"
import { createAblyServer } from "@/lib/ably/server"

export async function dispatchPostNotification(postId: string) {
  const publishedPost = await db.query.post.findFirst({
    where: eq(post.id, postId),

    columns: {
      id: true,
      title: true,
      excerpt: true,
      slug: true,
      notificationType: true,
      published: true,
    },
  })

  if (!publishedPost) {
    return
  }

  if (!publishedPost.published) {
    return
  }

  if (!publishedPost.notificationType) {
    return
  }

  const [event] = await db
    .insert(notificationEvent)
    .values({
      id: crypto.randomUUID(),
      type: publishedPost.notificationType,
      postId: publishedPost.id,
    })
    .returning({
      id: notificationEvent.id,
    })

  const inAppUsers = await getEligibleUsers(
    publishedPost.notificationType,
    "inApp"
  )

  if (inAppUsers.length > 0) {
    await db.insert(userNotification).values(
      inAppUsers.map((user) => ({
        id: crypto.randomUUID(),

        userId: user.id,

        eventId: event.id,
      }))
    )
  }

  const emailUsers = await getEligibleUsers(
    publishedPost.notificationType,
    "email"
  )

  await Promise.all(
    emailUsers.map(async (user) => {
      if (!user.email) {
        return
      }

      await sendPostNotificationEmail({
        to: user.email,

        subject: publishedPost.title,

        body: PostNotificationEmail({
          title: publishedPost.title,

          excerpt: publishedPost.excerpt ?? publishedPost.title,

          url: `/blog/${publishedPost.slug}`,
        }),
      })
    })
  )

  const ablyServer = createAblyServer()
  if (ablyServer && inAppUsers.length > 0) {
    try {
      await ablyServer.channels
        .get("notifications")
        .publish("new-notification", {
          postId: publishedPost.id,

          notificationType: publishedPost.notificationType,
        })
    } catch (error) {
      console.error("Failed to publish Ably notification:", error)
    }
  }
}
