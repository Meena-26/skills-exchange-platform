"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const languages = {
  en: "English",
  hi: "हिन्दी",
  te: "తెలుగు",
  ta: "தமிழ்",
  bn: "বাংলা",
  mr: "मराठी",
  gu: "ગુજરાતી",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
}

export default function Settings() {
  const [user, setUser] = useState<any>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [notifications, setNotifications] = useState(true)
  const [theme, setTheme] = useState("light")
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setUser(currentUser)
    setName(currentUser.name || "")
    setEmail(currentUser.email || "")
    setNotifications(currentUser.notifications !== false)
    setTheme(currentUser.theme || "light")
    setLanguage(currentUser.language || "en")
  }, [])

  useEffect(() => {
    // Apply theme when component mounts or theme changes
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  useEffect(() => {
    // Apply language when component mounts or language changes
    document.documentElement.lang = language
    document.title = `Skills Exchange - ${languages[language as keyof typeof languages]}`
  }, [language])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const updatedUser = { ...user, name, email, notifications, theme, language }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))

    // Update user in the users array
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u: any) => (u.id === user.id ? updatedUser : u))
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    // Apply theme immediately
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    alert("Settings updated successfully!")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{languages[language as keyof typeof languages]} - Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Enable Notifications</Label>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languages).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Save Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
