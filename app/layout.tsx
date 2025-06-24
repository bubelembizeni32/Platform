import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/components/auth/AuthContext"
import { HeaderWrapper } from "@/components/header-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ProLiink - Connect with Trusted Service Providers",
  description: "Find, hire, and connect with vetted service providers near you—on-demand.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <HeaderWrapper />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
