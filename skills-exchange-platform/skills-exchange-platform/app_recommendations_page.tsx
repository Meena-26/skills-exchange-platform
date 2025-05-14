"use client"

import { useEffect, useState } from "react"

interface Recommendation {
  id: number
  skill: string
  description: string
}

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  useEffect(() => {
    // In a real application, we would fetch recommendations from our API
    // For now, we'll use mock data
    const mockRecommendations: Recommendation[] = [
      {
        id: 1,
        skill: "Machine Learning",
        description: "Based on your profile, you might be interested in learning Machine Learning.",
      },
      { id: 2, skill: "Web Development", description: "Many users with similar skills are learning Web Development." },
      {
        id: 3,
        skill: "Data Visualization",
        description: "Data Visualization could complement your current skill set.",
      },
    ]
    setRecommendations(mockRecommendations)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Recommended Skills</h1>
            {recommendations.map((rec) => (
              <div key={rec.id} className="mb-4 p-4 border rounded">
                <h2 className="text-xl font-semibold">{rec.skill}</h2>
                <p>{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
