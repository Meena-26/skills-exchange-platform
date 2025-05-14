"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { User, Mail, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SkillRequest {
  id: string
  from: {
    id: string
    name: string
  }
  to: {
    id: string
    name: string
  }
  skill: string
  status: "pending" | "accepted" | "rejected"
}

interface Message {
  id: string
  from: {
    id: string
    name: string
  }
  content: string
  timestamp: number
}

export function DashboardSummary() {
  const [user, setUser] = useState<any>(null)
  const [requests, setRequests] = useState<SkillRequest[]>([])
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setUser(currentUser)

    // Mock data - in a real app, this would come from an API
    setRequests([
      {
        id: "1",
        from: { id: "user2", name: "Jane Doe" },
        to: { id: currentUser.id, name: currentUser.name },
        skill: "JavaScript",
        status: "pending",
      },
      {
        id: "2",
        from: { id: currentUser.id, name: currentUser.name },
        to: { id: "user3", name: "Bob Smith" },
        skill: "Python",
        status: "pending",
      },
    ])

    setMessages([
      {
        id: "1",
        from: { id: "user2", name: "Jane Doe" },
        content: "Hi! I saw you know JavaScript. Can you help me with a problem?",
        timestamp: Date.now() - 3600000,
      },
      {
        id: "2",
        from: { id: "user3", name: "Bob Smith" },
        content: "Hello! I'd like to learn more about your Python skills.",
        timestamp: Date.now() - 86400000,
      },
    ])
  }, [])

  if (!user) return null

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Profile Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>{user.skills?.length || 0} skills</span>
          </div>
          <Button asChild className="w-full">
            <Link href="/profile">View Full Profile</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Skill Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{request.from.name}</p>
                <p className="text-sm text-gray-500">{request.skill}</p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">{request.status}</span>
            </div>
          ))}
          <Button asChild variant="outline" className="w-full">
            <Link href="/skill-requests">View All Requests</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="space-y-1">
              <div className="flex justify-between">
                <p className="font-medium">{message.from.name}</p>
                <span className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{message.content}</p>
            </div>
          ))}
          <Button asChild variant="outline" className="w-full">
            <Link href="/messages">View All Messages</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
