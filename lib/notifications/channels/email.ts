import { sendEmail } from "@/lib/send-email"

interface SendPostNotificationEmailValues {
  to: string
  subject: string
  body: string
}

export async function sendPostNotificationEmail({
  to,
  subject,
  body,
}: SendPostNotificationEmailValues) {
  await sendEmail({
    to,
    subject,
    body,
  })
}
