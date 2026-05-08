"use client"

import { UserCogIcon, BellIcon, DatabaseIcon } from "lucide-react"
import type { auth } from "@/lib/auth/auth"
import { AppSidebar } from "@/components/layout/app-sidebar"

const navItems = [
  { href: "/settings/account", label: "Account", icon: UserCogIcon },
  { href: "/settings/notifications", label: "Notifications", icon: BellIcon },
  { href: "/settings/data", label: "Data", icon: DatabaseIcon },
]

interface SettingsPageSidebarProps {
  user: typeof auth.$Infer.Session.user
}

export function SettingsPageSidebar({ user }: SettingsPageSidebarProps) {
  return <AppSidebar user={user} navItems={navItems} />
}
