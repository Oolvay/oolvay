import { UserButton } from "@/components/auth/user-button"
import { NotificationBell } from "@/components/notifications/notification-bell"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import type { Session } from "@/lib/auth/auth"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
]

interface NavbarProps {
  session: Session | null
  seeThru?: boolean
}

export function Navbar({ session, seeThru = false }: NavbarProps) {
  return (
    <header
      className={cn(
        "top-0 z-50 w-full transition-colors",
        seeThru
          ? "fixed inset-x-0 border-transparent bg-transparent backdrop-blur-sm"
          : "sticky border-b border-border bg-background/80 backdrop-blur"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label={siteConfig.brand.name}
          className="flex items-center gap-2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand-logo.svg"
            alt={siteConfig.brand.name}
            className="h-7 w-auto"
          />
          <span className="font-extrabold text-2xl tracking-tight">
            {siteConfig.brand.name}
          </span>
        </Link>
        <div className="flex items-center gap-6 font-bold">
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <>
            {session && <NotificationBell />}
            <UserButton session={session} />
          </>
        </div>
      </div>
    </header>
  )
}
