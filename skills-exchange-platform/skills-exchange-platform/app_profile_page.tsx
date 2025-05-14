"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface Skill {
  name: string
  level: string
}

interface UserProfile {
  name: string
  email: string
  jobTitle: string
  company: string
  about: string
  skills: Skill[]
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setUser(currentUser)
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">User Profile</h2>
              <p className="text-gray-500">Personal details and skills</p>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-4">
                <div className="flex items-center">
                  <span className="w-32 text-gray-500">Full name</span>
                  <span>{user.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-32 text-gray-500">Email address</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-32 text-gray-500">Job Title</span>
                  <span>{user.jobTitle}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-32 text-gray-500">Company</span>
                  <span>{user.company}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p>{user.about}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Skills</h3>
                <div className="space-y-2">
                  {user.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between border-b pb-2">
                      <span>{skill.name}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          skill.level === "Advanced"
                            ? "bg-blue-100 text-blue-800"
                            : skill.level === "Intermediate"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
