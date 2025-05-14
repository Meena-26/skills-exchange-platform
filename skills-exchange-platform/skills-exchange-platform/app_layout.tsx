import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AuthenticatedLayoutWrapper from "./authenticated-layout-wrapper"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Skills Exchange Platform",
  description: "Connect and learn with skilled professionals",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthenticatedLayoutWrapper>{children}</AuthenticatedLayoutWrapper>
      </body>
    </html>
  )
}
