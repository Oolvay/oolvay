import { BRANDNAME, BRANDDOMAIN, EMAILSENDERNAME } from "@/config/constants"

export const emails = {
  provider: "resend", // resend | ses

  support: {
    sender: `Team ${BRANDNAME}`,
    email: "onboarding@resend.dev",
  },

  contact: {
    sender: `Team ${BRANDNAME}`,
    fromEmail: "onboarding@resend.dev",
    toEmail: "amit@schandillia.com", // later change to `contact@${BRANDDOMAIN}`
  },

  welcome: {
    sender: `${EMAILSENDERNAME} from ${BRANDNAME}`,
    fromEmail: "onboarding@resend.dev",
  },

  subscriptions: {
    sender: `${BRANDNAME} Billing`,
    fromEmail: "onboarding@resend.dev",
  },

  magicLink: {
    sender: `${BRANDNAME} Accounts`,
    fromEmail: "onboarding@resend.dev",
    expiresInSeconds: 300, // 5 minutes
  },

  privacy: {
    sender: `${BRANDNAME} Privacy Officer`,
    toEmail: `privacy@${BRANDDOMAIN}`,
  },

  grievance: {
    sender: `${BRANDNAME} Grievance Officer`,
    toEmail: `grievance@${BRANDDOMAIN}`,
  },
}

export type EmailsConfig = typeof emails
