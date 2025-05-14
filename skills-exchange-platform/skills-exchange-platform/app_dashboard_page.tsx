"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, MessageSquare } from "lucide-react"

interface Skill {
  name: string
  level: string
}

interface User {
  id: string
  name: string
  skills: Skill[]
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [availableSkills, setAvailableSkills] = useState<{ user: User; skill: Skill }[]>([])
  const [recentRequests, setRecentRequests] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setUser(currentUser)

    // Get all users and their skills
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const availableSkills = allUsers
      .filter((u: User) => u.id !== currentUser.id)
      .flatMap((u: User) =>
        u.skills.map((skill) => ({
          user: u,
          skill: skill,
        })),
      )
    setAvailableSkills(availableSkills)

    // Get recent skill requests
    const allRequests = JSON.parse(localStorage.getItem("skillRequests") || "[]")
    const recent = allRequests
      .filter((req: any) => req.to.id === currentUser.id || req.from.id === currentUser.id)
      .slice(0, 3)
    setRecentRequests(recent)
  }, [])

  const filteredSkills = availableSkills.filter(
    (item) =>
      item.skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <Button asChild>
          <Link href="/skill-assessment">Take Skill Assessment</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Your Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {user.skills.map((skill: Skill) => (
                <div key={skill.name} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>{skill.name}</span>
                  <Badge
                    variant={
                      skill.level === "Advanced" ? "default" : skill.level === "Intermediate" ? "secondary" : "outline"
                    }
                  >
                    {skill.level}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">New message from John Doe</p>
                <p className="text-sm">I'd like to learn Python from you. Are you available for teaching?</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">New message from Sarah Smith</p>
                <p className="text-sm">Thanks for accepting my JavaScript learning request!</p>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link href="/messages">View All Messages</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Recent Skill Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{request.from.id === user.id ? request.to.name : request.from.name}</p>
                    <p className="text-sm text-gray-500">{request.skill}</p>
                  </div>
                  <Badge>{request.status}</Badge>
                </div>
              ))}
              <Button asChild variant="outline" className="w-full">
                <Link href="/skill-requests">View All Requests</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Skills to Learn</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search skills or users..."
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.skill.name}</h3>
                      <p className="text-sm text-gray-500">Offered by {item.user.name}</p>
                      <Badge
                        className="mt-2"
                        variant={
                          item.skill.level === "Advanced"
                            ? "default"
                            : item.skill.level === "Intermediate"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {item.skill.level}
                      </Badge>
                    </div>
                    <Button asChild size="sm">
                      <Link href={`/request-skill?skill=${item.skill.name}&userId=${item.user.id}`}>Request</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
