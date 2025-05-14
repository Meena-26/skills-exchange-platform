"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const skillLevels = ["Beginner", "Intermediate", "Advanced"]

const generateRandomSkills = () => {
  const allSkills = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "React",
    "Node.js",
    "Angular",
    "Vue.js",
    "Machine Learning",
    "Data Analysis",
    "UI/UX Design",
    "Graphic Design",
    "Digital Marketing",
    "Content Writing",
    "Project Management",
    "Agile Methodologies",
    "Cloud Computing",
    "DevOps",
    "Cybersecurity",
    "Blockchain",
  ]

  const numSkills = Math.floor(Math.random() * 3) + 1 // 1 to 3 skills
  const skills = []
  for (let i = 0; i < numSkills; i++) {
    const randomSkill = allSkills[Math.floor(Math.random() * allSkills.length)]
    const randomLevel = skillLevels[Math.floor(Math.random() * skillLevels.length)]
    skills.push({ name: randomSkill, level: randomLevel })
  }
  return skills
}

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const generateSampleUsers = useCallback(() => {
    const sampleUsers = [
      { name: "Rama Patel", jobTitle: "Software Engineer", skills: generateRandomSkills() },
      { name: "Diya Sharma", jobTitle: "Data Scientist", skills: generateRandomSkills() },
      { name: "Arjun Singh", jobTitle: "UX Designer", skills: generateRandomSkills() },
      { name: "Ananya Reddy", jobTitle: "Product Manager", skills: generateRandomSkills() },
      { name: "Rohan Gupta", jobTitle: "Full Stack Developer", skills: generateRandomSkills() },
      { name: "Priya Desai", jobTitle: "Digital Marketing Specialist", skills: generateRandomSkills() },
      { name: "Vikram Choudhury", jobTitle: "DevOps Engineer", skills: generateRandomSkills() },
      { name: "Neha Kapoor", jobTitle: "AI Researcher", skills: generateRandomSkills() },
      { name: "Rahul Mehta", jobTitle: "Cybersecurity Analyst", skills: generateRandomSkills() },
      { name: "Kavya Nair", jobTitle: "Content Strategist", skills: generateRandomSkills() },
      { name: "Swetha Reddy", jobTitle: "Cloud Architect", skills: generateRandomSkills() },
      { name: "Vishwa Patel", jobTitle: "Blockchain Developer", skills: generateRandomSkills() },
    ]

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
    if (existingUsers.length === 0) {
      const usersWithIds = sampleUsers.map((user, index) => ({
        id: `sample${index + 1}`,
        email: `${user.name.toLowerCase().replace(" ", ".")}@example.com`,
        password: "password123",
        ...user,
      }))
      localStorage.setItem("users", JSON.stringify(usersWithIds))
    }
  }, [])

  useEffect(() => {
    generateSampleUsers()
  }, [generateSampleUsers])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    if (users.some((user: any) => user.email === email)) {
      setError("This email is already registered. Please use a different email or log in.")
      return
    }

    const newUser = { id: Date.now().toString(), name, email, password, jobTitle: "", skills: [] }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("currentUser", JSON.stringify(newUser))

    router.push("/create-profile")
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
