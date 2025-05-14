"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  from: {
    id: string
    name: string
  }
  to: {
    id: string
    name: string
  }
  content: string
  timestamp: number
}

interface Contact {
  id: string
  name: string
  skill: string
  lastMessageTime: number
}

export default function Messages() {
  const [user, setUser] = useState<any>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setUser(currentUser)

    // Get all skill requests
    const allRequests = JSON.parse(localStorage.getItem("skillRequests") || "[]")

    // Filter requests related to the current user's skills
    const relevantRequests = allRequests.filter(
      (req: any) =>
        (req.to.id === currentUser.id && currentUser.skills.some((skill: any) => skill.name === req.skill)) ||
        req.from.id === currentUser.id,
    )

    // Create contacts from relevant requests
    const contactsFromRequests = relevantRequests.map((req: any) => {
      const contact = req.from.id === currentUser.id ? req.to : req.from
      return {
        id: contact.id,
        name: contact.name,
        skill: req.skill,
        lastMessageTime: req.timestamp,
      }
    })

    // Remove duplicates and sort by last message time
    const uniqueContacts = Array.from(new Map(contactsFromRequests.map((item) => [item.id, item])).values()).sort(
      (a, b) => b.lastMessageTime - a.lastMessageTime,
    )

    setContacts(uniqueContacts)

    // Initialize or get existing messages
    const existingMessages = JSON.parse(localStorage.getItem("messages") || "[]")
    setMessages(existingMessages)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedContact || !newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      from: { id: user.id, name: user.name },
      to: { id: selectedContact.id, name: selectedContact.name },
      content: newMessage,
      timestamp: Date.now(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  className={`w-full text-left p-4 hover:bg-gray-100 rounded-lg ${
                    selectedContact?.id === contact.id ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback>{contact.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-sm text-gray-500 truncate">Skill: {contact.skill}</p>
                    </div>
                  </div>
                </button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>{selectedContact ? selectedContact.name : "Select a conversation"}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedContact ? (
              <>
                <ScrollArea className="h-[500px] mb-4">
                  <div className="space-y-4">
                    {messages
                      .filter(
                        (m) =>
                          (m.from.id === selectedContact.id && m.to.id === user.id) ||
                          (m.from.id === user.id && m.to.id === selectedContact.id),
                      )
                      .map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.from.id === user.id ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.from.id === user.id ? "bg-blue-500 text-white" : "bg-gray-100"
                            }`}
                          >
                            <p>{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">{new Date(message.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <Button type="submit">Send</Button>
                </form>
              </>
            ) : (
              <div className="h-[600px] flex items-center justify-center text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
