"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

const skillLevels = ["Beginner", "Intermediate", "Advanced"]

export default function AddSkill() {
  const [skillName, setSkillName] = useState("")
  const [skillLevel, setSkillLevel] = useState("Beginner")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here we would typically send a request to our backend to add the skill
    console.log("Adding skill:", { name: skillName, level: skillLevel })
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Add a New Skill</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="skillName" className="block text-sm font-medium text-gray-700">
                  Skill Name
                </label>
                <input
                  type="text"
                  id="skillName"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700">
                  Skill Level
                </label>
                <select
                  id="skillLevel"
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {skillLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Skill
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
