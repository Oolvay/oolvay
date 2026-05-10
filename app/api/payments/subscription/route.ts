export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { getServerSession } from "@/lib/auth/get-server-session"
import { getUserAccessLevel } from "@/lib/payments/subscription-state"

export async function GET() {
  const session = await getServerSession()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const access = await getUserAccessLevel(session.user.id)
  return NextResponse.json(access)
}
