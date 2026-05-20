"use client"

import { BellIcon } from "lucide-react"

import type { auth } from "@/lib/auth/auth"

import { AppSidebar } from "@/components/layout/app-sidebar"

const navItems = [
  {
    href: "/notifications/inbox",
    label: "Inbox",
    icon: BellIcon,
  },
]

interface NotificationsPageSidebarProps {
  user: typeof auth.$Infer.Session.user
}

export function NotificationsPageSidebar({
  user,
}: NotificationsPageSidebarProps) {
  return <AppSidebar user={user} navItems={navItems} />
}
