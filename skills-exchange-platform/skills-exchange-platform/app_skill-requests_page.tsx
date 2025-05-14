"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface SkillRequest {
  id: string
  from: {
    id: string
    name: string
  }
  to: {
    id: string
    name: string
  }
  skill: string
  status: "pending" | "accepted" | "rejected"
  timestamp: number
}

export default function SkillRequests() {
  const [user, setUser] = useState<any>(null)
  const [incomingRequests, setIncomingRequests] = useState<SkillRequest[]>([])
  const [outgoingRequests, setOutgoingRequests] = useState<SkillRequest[]>([])

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setUser(currentUser)

    // Fetch all requests
    const allRequests = JSON.parse(localStorage.getItem("skillRequests") || "[]")

    // Filter incoming requests
    const incoming = allRequests.filter((req: SkillRequest) => req.to.id === currentUser.id)
    setIncomingRequests(incoming)

    // Filter outgoing requests
    const outgoing = allRequests.filter((req: SkillRequest) => req.from.id === currentUser.id)
    setOutgoingRequests(outgoing)
  }, [])

  const handleRequestAction = (requestId: string, action: "accepted" | "rejected") => {
    const updatedRequests = JSON.parse(localStorage.getItem("skillRequests") || "[]")
    const updatedRequestsList = updatedRequests.map((req: SkillRequest) =>
      req.id === requestId ? { ...req, status: action } : req,
    )
    localStorage.setItem("skillRequests", JSON.stringify(updatedRequestsList))

    // Update state
    setIncomingRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: action } : req)))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Skill Requests</h1>

      <Tabs defaultValue="incoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="incoming">Incoming Requests ({incomingRequests.length})</TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing Requests ({outgoingRequests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="incoming">
          <div className="grid gap-4">
            {incomingRequests.length > 0 ? (
              incomingRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-medium">{request.from.name}</h3>
                        <p className="text-sm text-gray-500">
                          Wants to learn: <span className="font-medium text-gray-900">{request.skill}</span>
                        </p>
                        <p className="text-xs text-gray-400">
                          Requested {new Date(request.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {request.status === "pending" ? (
                          <>
                            <Button
                              onClick={() => handleRequestAction(request.id, "accepted")}
                              variant="default"
                              size="sm"
                            >
                              Accept
                            </Button>
                            <Button
                              onClick={() => handleRequestAction(request.id, "rejected")}
                              variant="outline"
                              size="sm"
                            >
                              Decline
                            </Button>
                          </>
                        ) : (
                          <Badge variant={request.status === "accepted" ? "default" : "destructive"}>
                            {request.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  No incoming requests at the moment. When someone requests to learn from you, it will appear here.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="outgoing">
          <div className="grid gap-4">
            {outgoingRequests.length > 0 ? (
              outgoingRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-medium">Request to {request.to.name}</h3>
                        <p className="text-sm text-gray-500">
                          Skill requested: <span className="font-medium text-gray-900">{request.skill}</span>
                        </p>
                        <p className="text-xs text-gray-400">
                          Requested {new Date(request.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        variant={
                          request.status === "accepted"
                            ? "default"
                            : request.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  You haven't made any skill requests yet
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
