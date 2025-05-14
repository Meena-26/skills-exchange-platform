"use client"

import { usePathname } from "next/navigation"
import { Navigation } from "@/components/navigation"
import type React from "react"

const authenticatedRoutes = ["/dashboard", "/profile", "/skill-requests", "/messages", "/settings", "/browse-profiles"]

export default function AuthenticatedLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthenticatedRoute = authenticatedRoutes.includes(pathname)

  if (!isAuthenticatedRoute) {
    return children
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navigation />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">{children}</main>
    </div>
  )
}
