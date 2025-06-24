"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import { LoginModal } from "./LoginModal"

interface AuthenticatedViewProps {
  children: React.ReactNode
  providerCount?: number
}

export function AuthenticatedView({ children, providerCount }: AuthenticatedViewProps) {
  const { isAuthenticated } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLogin(true)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="relative">
        {/* Blurred Content */}
        <div className="filter blur-lg pointer-events-none">
          {children}
        </div>

        {/* Overlay with Provider Count */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
          {providerCount && (
            <div className="text-center mb-4">
              <p className="text-2xl font-bold">{providerCount}</p>
              <p className="text-lg">Service Providers Available</p>
            </div>
          )}
          <p className="text-lg">Login to view service provider details</p>
        </div>

        {/* Login Modal */}
        <LoginModal 
          isOpen={showLogin} 
          onClose={() => setShowLogin(false)} 
        />
      </div>
    )
  }

  return <>{children}</>
} 