"use server"

import { db } from "@/db/drizzle"
import { user } from "@/db/schemas/auth-schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { guardAction } from "@/lib/guard-action"
import type { NotificationPreferences } from "@/db/types/notification-types"

export async function updateNotificationPreferences(
  preferences: NotificationPreferences
) {
  const { error, user: currentUser } = await guardAction()
  if (error) return { error }

  await db
    .update(user)
    .set({ notificationPreferences: preferences })
    .where(eq(user.id, currentUser.id))

  revalidatePath("/settings/notifications")
  return { success: true }
}
