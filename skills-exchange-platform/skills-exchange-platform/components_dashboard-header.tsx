"use client"

import { useEffect, useState } from "react"

export function DashboardHeader() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
      setUser(currentUser)
    } catch (error) {
      console.error("Error parsing currentUser from localStorage:", error)
      setUser(null) // Or some default value
    }
  }, [])

  if (!user) return null

  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p className="text-gray-500">Here's what's happening with your skills exchange</p>
    </div>
  )
}
