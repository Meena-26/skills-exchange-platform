import Link from "next/link"

export default function AssessmentFailed() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Assessment Not Passed</h1>
            <p className="mb-4">
              Unfortunately, you didn't pass the skill assessment this time. Don't worry, you can try again in 12 hours!
            </p>
            <p className="mb-6">Use this time to review and practice your skills. You've got this!</p>
            <Link
              href="/"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
