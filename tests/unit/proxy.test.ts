import { beforeEach, describe, expect, it, vi } from "vitest"

import { NextRequest } from "next/server"

const mockGetSession = vi.fn()

vi.mock("@/lib/auth/auth", () => ({
  auth: {
    api: {
      getSession: mockGetSession,
    },
  },
}))

import { proxy } from "@/proxy"

describe("proxy auth protection", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("allows public routes", async () => {
    mockGetSession.mockResolvedValue(null)
    const request = new NextRequest("http://localhost:3000/pricing")
    const response = await proxy(request)
    expect(response.status).toBe(200)
  })

  it("redirects anonymous users from protected routes", async () => {
    mockGetSession.mockResolvedValue(null)
    const request = new NextRequest("http://localhost:3000/dashboard/general")
    const response = await proxy(request)
    expect(response.status).toBe(307)
    expect(response.headers.get("location")).toContain(
      "/login?callbackUrl=%2Fdashboard"
    )
  })

  it("redirects logged-in users away from auth routes", async () => {
    mockGetSession.mockResolvedValue({
      user: {
        id: "user_123",
        role: "user",
      },
    })
    const request = new NextRequest("http://localhost:3000/login")
    const response = await proxy(request)
    expect(response.status).toBe(307)
    expect(response.headers.get("location")).toContain("/dashboard")
  })

  it("redirects non-admin users away from admin routes", async () => {
    mockGetSession.mockResolvedValue({
      user: {
        id: "user_123",
        role: "user",
      },
    })
    const request = new NextRequest("http://localhost:3000/admin/overview")
    const response = await proxy(request)
    expect(response.status).toBe(307)
    expect(response.headers.get("location")).toContain("/dashboard")
  })

  it("sanitizes unsafe callback URLs", async () => {
    mockGetSession.mockResolvedValue({
      user: {
        id: "user_123",
        role: "user",
      },
    })
    const request = new NextRequest(
      "http://localhost:3000/login?callbackUrl=https://evil.com"
    )
    const response = await proxy(request)
    expect(response.status).toBe(307)
    expect(response.headers.get("location")).not.toContain("evil.com")
    expect(response.headers.get("location")).toContain("/dashboard")
  })
})
