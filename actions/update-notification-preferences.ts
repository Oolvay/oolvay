"use server"

import { db } from "@/db/drizzle"
import { user } from "@/db/auth-schema"
import { getServerSession } from "@/lib/auth/get-server-session"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { NotificationPreferences } from "@/db/types/notification-preferences"

export async function updateNotificationPreferences(
  preferences: NotificationPreferences
) {
  const session = await getServerSession()
  if (!session?.user) return { error: "Unauthorized" }

  await db
    .update(user)
    .set({ notificationPreferences: preferences })
    .where(eq(user.id, session.user.id))

  revalidatePath("/settings/notifications")
  return { success: true }
}
