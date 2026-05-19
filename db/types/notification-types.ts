export const NOTIFICATION_CHANNELS = {
  EMAIL: "email",
  IN_APP: "inApp",
  WEB: "web",
} as const

export type NotificationChannel =
  (typeof NOTIFICATION_CHANNELS)[keyof typeof NOTIFICATION_CHANNELS]

export const NOTIFICATION_TYPES = {
  SECURITY_ALERTS: "security_alerts",
  PRODUCT_UPDATES: "product_updates",
  MARKETING: "marketing",
  DEVLOG: "devlog",
  ANNOUNCEMENTS: "announcements",
} as const

export const NOTIFICATION_TYPE_VALUES = [
  NOTIFICATION_TYPES.SECURITY_ALERTS,
  NOTIFICATION_TYPES.PRODUCT_UPDATES,
  NOTIFICATION_TYPES.MARKETING,
  NOTIFICATION_TYPES.DEVLOG,
  NOTIFICATION_TYPES.ANNOUNCEMENTS,
] as const

export type NotificationType =
  (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES]

export const NOTIFICATION_TYPE_META = {
  [NOTIFICATION_TYPES.SECURITY_ALERTS]: {
    label: "Security Alerts",
    description: "Important account and security notifications",
    lockedChannels: [NOTIFICATION_CHANNELS.EMAIL] as NotificationChannel[],
    defaults: {
      email: true,
      inApp: true,
      web: true,
    },
  },

  [NOTIFICATION_TYPES.PRODUCT_UPDATES]: {
    label: "Product Updates",
    description: "Product announcements, releases, and improvements",
    lockedChannels: [] as NotificationChannel[],
    defaults: {
      email: false,
      inApp: true,
      web: false,
    },
  },

  [NOTIFICATION_TYPES.MARKETING]: {
    label: "Marketing",
    description: "Promotions, campaigns, and marketing emails",
    lockedChannels: [] as NotificationChannel[],
    defaults: {
      email: false,
      inApp: false,
      web: false,
    },
  },

  [NOTIFICATION_TYPES.DEVLOG]: {
    label: "Devlog",
    description: "Engineering notes and technical posts",
    lockedChannels: [] as NotificationChannel[],
    defaults: {
      email: false,
      inApp: false,
      web: false,
    },
  },

  [NOTIFICATION_TYPES.ANNOUNCEMENTS]: {
    label: "Announcements",
    description: "General announcements and important notices",
    lockedChannels: [] as NotificationChannel[],
    defaults: {
      email: false,
      inApp: true,
      web: false,
    },
  },
} as const

export type NotificationPreferences = {
  [K in NotificationType]: {
    [C in NotificationChannel]: boolean
  }
}

export const DEFAULT_NOTIFICATION_PREFERENCES = Object.fromEntries(
  Object.entries(NOTIFICATION_TYPE_META).map(([type, meta]) => [
    type,
    meta.defaults,
  ])
) as NotificationPreferences
