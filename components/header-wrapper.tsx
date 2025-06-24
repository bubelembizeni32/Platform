"use client"

import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"

export function HeaderWrapper() {
  const pathname = usePathname()
  const isServiceProvidersPage = pathname === '/service-providers'
  
  if (isServiceProvidersPage) {
    return null
  }
  
  return <SiteHeader />
} 