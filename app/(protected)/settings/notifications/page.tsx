import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"
import { siteConfig } from "@/config/site"
import { getServerSession } from "@/lib/auth/get-server-session"
import { db } from "@/db/drizzle"
import { user } from "@/db/schemas/auth-schema"
import { eq } from "drizzle-orm"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import {
  DEFAULT_NOTIFICATION_PREFERENCES,
  type NotificationPreferences,
} from "@/db/types/notification-types"
import { NotificationsForm } from "@/app/(protected)/settings/notifications/components/notifications-form"

export const metadata: Metadata = {
  title: siteConfig.seo.metaData.settings.notifications.title,
  description: siteConfig.seo.metaData.settings.notifications.description,
  robots: siteConfig.seo.metaData.settings.notifications.robots,
}

export default async function SettingsNotificationsPage() {
  const session = await getServerSession()
  const u = session?.user

  if (!session || !u) {
    redirect("/login")
  }

  const result = await db
    .select({ notificationPreferences: user.notificationPreferences })
    .from(user)
    .where(eq(user.id, u.id))
    .limit(1)

  const preferences = (result[0]?.notificationPreferences ??
    DEFAULT_NOTIFICATION_PREFERENCES) as NotificationPreferences

  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Notifications"
        description="Manage your notification preferences"
      />
      <NotificationsForm initialPreferences={preferences} />
    </div>
  )
}
