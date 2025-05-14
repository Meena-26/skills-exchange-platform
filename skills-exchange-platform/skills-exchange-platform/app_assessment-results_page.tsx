"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AssessmentResults() {
  const [results, setResults] = useState({ score: 0, totalQuestions: 0, skillLevel: "" })
  const router = useRouter()

  useEffect(() => {
    // In a real application, we would fetch the results from the backend
    // For now, we'll use mock data
    const mockResults = {
      score: 15,
      totalQuestions: 20,
      skillLevel: "Intermediate",
    }
    setResults(mockResults)
  }, [])

  const handleContinue = () => {
    // Navigate to recommendations or dashboard
    router.push("/recommendations")
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Assessment Results</h1>
            <div className="mb-4">
              <p>
                Score: {results.score}/{results.totalQuestions}
              </p>
              <p>Skill Level: {results.skillLevel}</p>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleContinue}
            >
              Continue to Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
