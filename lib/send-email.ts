import { siteConfig } from "@/config/site"
import { sendWithResend } from "@/lib/email/providers/resend"
import { sendWithSes } from "@/lib/email/providers/ses"

interface SendEmailValues {
  to: string
  from?: string
  subject: string
  body: string
}

export async function sendEmail({
  to,
  from = `${siteConfig.emails.magicLink.sender} <${siteConfig.emails.magicLink.fromEmail}>`,
  subject,
  body,
}: SendEmailValues) {
  switch (siteConfig.emails.provider) {
    case "resend":
      return sendWithResend({
        to,
        from,
        subject,
        body,
      })

    case "ses":
      return sendWithSes({
        to,
        from,
        subject,
        body,
      })

    default:
      throw new Error(
        `Unsupported email provider: ${siteConfig.emails.provider}`
      )
  }
}
