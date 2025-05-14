"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Skill {
  name: string
  level: string
}

interface User {
  id: string
  name: string
  jobTitle: string
  skills: Skill[]
}

export default function BrowseProfiles() {
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [requestedSkills, setRequestedSkills] = useState<Set<string>>(new Set())

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const currentUserData = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setCurrentUser(currentUserData)
    setUsers(allUsers.filter((user: User) => user.id !== currentUserData.id))
  }, [])

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

    setRequestedSkills(new Set(requestedSkills.add(`${userId}-${skillName}`)))

    toast({
      title: "Skill Request Sent",
      description: `You've requested to learn ${skillName} from ${newRequest.to.name}.`,
    })
  }

  const getSkillLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "Advanced":
        return "default"
      case "Intermediate":
        return "secondary"
      default:
        return "outline"
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Browse Profiles</h1>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          className="pl-10"
          placeholder="Search users, job titles, or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} />
                  <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <p className="text-sm text-gray-500">{user.jobTitle}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full mt-4">
                    View Skills <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{user.name}'s Skills</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {user.skills.map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">{skill.name}</p>
                          <Badge variant={getSkillLevelBadgeVariant(skill.level)}>{skill.level}</Badge>
                        </div>
                        <Button
                          onClick={() => handleRequest(user.id, skill.name, skill.level)}
                          variant={requestedSkills.has(`${user.id}-${skill.name}`) ? "secondary" : "default"}
                          size="sm"
                          disabled={requestedSkills.has(`${user.id}-${skill.name}`)}
                        >
                          {requestedSkills.has(`${user.id}-${skill.name}`) ? "Requested" : "Request"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
