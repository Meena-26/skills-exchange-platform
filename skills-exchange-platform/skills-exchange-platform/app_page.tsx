import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StartingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl w-full max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
          Welcome to Skills Exchange Platform{" "}
        </h1>
        <p className="text-xl text-white text-center mb-8">
          Connect, learn, and grow with our AI-powered skills matching platform
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-white bg-opacity-20 text-white hover:bg-white hover:text-black"
          >
            <Link href="/login">Log In</Link>
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="🚀"
            title="Skill Matching"
            description="Our AI matches you with the perfect learning partners based on your skills and goals."
          />
          <FeatureCard
            icon="🤝"
            title="Peer Learning"
            description="Exchange knowledge and learn from others in a collaborative environment."
          />
          <FeatureCard
            icon="📈"
            title="Track Progress"
            description="Monitor your skill development and set achievable learning milestones."
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white bg-opacity-20 rounded-lg p-6 text-white">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}
