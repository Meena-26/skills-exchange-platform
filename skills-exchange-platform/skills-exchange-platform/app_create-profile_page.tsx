"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const skillCategories = [
  {
    name: "Programming Languages",
    skills: ["JavaScript", "Python", "Java", "C++", "C", "Ruby", "Go", "Swift"],
  },
  {
    name: "Web Development",
    skills: ["HTML", "CSS", "React", "Angular", "Vue.js", "Node.js", "Express.js"],
  },
  {
    name: "Data Science",
    skills: ["Machine Learning", "Data Analysis", "Statistics", "R", "SQL", "Tableau", "Power BI"],
  },
  {
    name: "Design",
    skills: ["UI/UX Design", "Graphic Design", "Adobe Photoshop", "Adobe Illustrator", "Figma", "Sketch"],
  },
]

export default function CreateProfile() {
  const [user, setUser] = useState<any>(null)
  const [bio, setBio] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setUser(currentUser)
  }, [])

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill) ? prevSkills.filter((s) => s !== skill) : [...prevSkills, skill],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const updatedUser = { ...user, bio, jobTitle, skills: selectedSkills }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u: any) => (u.id === user.id ? updatedUser : u))
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    router.push("/skill-assessment")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
              />
            </div>
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Software Developer"
              />
            </div>
            <div>
              <Label>Select your skills</Label>
              <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                {skillCategories.map((category) => (
                  <div key={category.name} className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Button
                          key={skill}
                          type="button"
                          variant={selectedSkills.includes(skill) ? "default" : "outline"}
                          onClick={() => toggleSkill(skill)}
                          className="text-sm"
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Create Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
