"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { use } from "react"

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = use(params)

  // Format the slug for display
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold leading-tight">
              <span className="flex flex-col">
                <span>
                  ProL<span className="text-blue-600">ii</span>nk
                </span>
                <span>
                  Co<span className="text-blue-600">nn</span>ect
                </span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:inline-flex" asChild>
              <Link href="/services">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-12 md:py-24">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{formattedTitle} Service</h1>
            <p className="text-muted-foreground mb-8">
              This is a placeholder page for the {formattedTitle.toLowerCase()} service. In a complete implementation,
              this page would contain a booking form, detailed service information, pricing, and more.
            </p>
            <Button className="bg-[#00A3E0] hover:bg-[#0089BD]" asChild>
              <Link href="/services">Return to Services</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="w-full border-t py-6 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2024 ProLiink Connect. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
