"use client"

export function NotificationPanel() {
  return (
    <>
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <h2 className="font-semibold">Notifications</h2>

        <span className="text-xs text-muted-foreground">Latest updates</span>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <div className="px-3 py-6 text-center text-sm text-muted-foreground">
          No notifications yet.
        </div>
      </div>
    </>
  )
}
