import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { redirect } from "next/navigation"

import { getServerSession } from "@/lib/auth/get-server-session"

import { PostHogIdentify } from "@/components/analytics/posthog-identify"

import { NotificationsPageSidebar } from "@/app/(protected)/notifications/components/notifications-page-sidebar"

export default async function NotificationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  const user = session?.user

  if (!session || !user) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <PostHogIdentify userId={user.id} email={user.email} name={user.name} />

      <NotificationsPageSidebar user={user} />

      <SidebarInset>
        <div className="flex flex-1 flex-col gap-6 p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
