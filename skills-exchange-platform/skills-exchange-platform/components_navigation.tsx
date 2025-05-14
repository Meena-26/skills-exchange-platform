"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { User, MessageSquare, BookOpen, Settings, Search, LogOut, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Skill Requests", href: "/skill-requests", icon: BookOpen },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Browse Profiles", href: "/browse-profiles", icon: Search },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setCurrentUser(user)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/login")
  }

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <div className={cn("relative h-full transition-all duration-300 ease-in-out", isOpen ? "w-64" : "w-16")}>
      <Button variant="ghost" size="icon" className="absolute right-2 top-2 z-50" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
      </Button>
      <ScrollArea className="flex h-full flex-col border-r bg-gradient-to-b from-purple-600 to-indigo-700 text-white">
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Skills Exchange</h2>
          <p className="text-sm opacity-75">Connect, Learn, Grow</p>
        </div>
        <div className="flex-1 space-y-1 p-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/10 hover:text-white",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span>{item.name}</span>}
              </Link>
            )
          })}
        </div>
        {currentUser && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3 mb-2">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${currentUser.name}`} />
                <AvatarFallback>{currentUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {isOpen && (
                <div>
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-xs text-white/75">{currentUser.email}</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-white/75 hover:text-white hover:bg-white/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              {isOpen && <span>Logout</span>}
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
