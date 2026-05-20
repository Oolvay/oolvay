import type { Metadata } from "next"

import { redirect } from "next/navigation"

import { GatedPageTitle } from "@/app/(protected)/components/gated-page-title"

import { siteConfig } from "@/config/site"

import { getServerSession } from "@/lib/auth/get-server-session"

import { getNotificationsPage } from "@/actions/get-notifications-page"
import { NotificationList } from "@/app/(protected)/notifications/components/notification-list"

export const metadata: Metadata = {
  title: siteConfig.seo.metaData.notifications.inbox.title,

  description: siteConfig.seo.metaData.notifications.inbox.description,

  robots: siteConfig.seo.metaData.notifications.inbox.robots,
}

export default async function NotificationsInboxPage() {
  const session = await getServerSession()

  const user = session?.user

  if (!session || !user) {
    redirect("/login")
  }

  const result = await getNotificationsPage()

  if (!result.success) {
    return (
      <div className="container">
        <p className="text-sm text-muted-foreground">
          Failed to load notifications.
        </p>
      </div>
    )
  }

  return (
    <div className="container space-y-8">
      <GatedPageTitle
        title="Notifications"
        description="View and manage your notification inbox"
      />

      <NotificationList notifications={result.notifications} />
    </div>
  )
}
