"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  name: string
  skills: { name: string; level: string }[]
}

export default function RequestSkill() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setCurrentUser(currentUserData)

    const allUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const filteredUsers = allUsers.filter((user: User) => user.id !== currentUserData.id)
    setUsers(filteredUsers)
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleRequest = async (userId: string, skillName: string, skillLevel: string) => {
    if (!currentUser) return

    const newRequest = {
      id: Date.now().toString(),
      from: {
        id: currentUser.id,
        name: currentUser.name,
      },
      to: {
        id: userId,
        name: users.find((u) => u.id === userId)?.name || "",
      },
      skill: skillName,
      level: skillLevel,
      status: "pending",
      timestamp: Date.now(),
    }

    const requests = JSON.parse(localStorage.getItem("skillRequests") || "[]")
    const updatedRequests = [...requests, newRequest]
    localStorage.setItem("skillRequests", JSON.stringify(updatedRequests))

    router.push("/skill-requests")
  }

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Request a Skill</h1>
        <p className="text-gray-500">Find a skill you want to learn</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Available Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  className="pl-10"
                  placeholder="Search skills or users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-6">
              {filteredUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{user.name}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {user.skills.map((skill) => (
                        <div key={skill.name} className="flex items-center justify-between">
                          <span>{skill.name}</span>
                          <Badge className={getSkillLevelColor(skill.level)}>{skill.level}</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      {user.skills.map((skill) => (
                        <Button
                          key={skill.name}
                          variant="outline"
                          className="mr-2 mt-2"
                          onClick={() => handleRequest(user.id, skill.name, skill.level)}
                        >
                          Request {skill.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
