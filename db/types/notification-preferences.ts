export type NotificationPreferences = {
  securityAlerts: {
    email: boolean
    inApp: boolean
    web: boolean
  }
  productUpdates: {
    email: boolean
    inApp: boolean
    web: boolean
  }
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  securityAlerts: { email: true, inApp: true, web: false },
  productUpdates: { email: false, inApp: true, web: false },
}
