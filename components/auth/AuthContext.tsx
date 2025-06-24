"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  isServiceProvider?: boolean
  profileImage?: string
  fullName?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: { email?: string; phone?: string; password: string }) => Promise<void>
  logout: () => void
  signup: (userData: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    // TODO: Implement session check
    const checkSession = async () => {
      try {
        // Call your auth API here
        // const session = await getSession()
        // setUser(session.user)
        // setIsAuthenticated(true)
      } catch (error) {
        setUser(null)
        setIsAuthenticated(false)
      }
    }
    
    checkSession()
  }, [])

  const login = async (credentials: { email?: string; phone?: string; password: string }) => {
    try {
      // TODO: Implement actual login logic
      // const response = await loginAPI(credentials)
      // setUser(response.user)
      setIsAuthenticated(true)
    } catch (error) {
      throw new Error('Login failed')
    }
  }

  const logout = () => {
    // TODO: Implement actual logout logic
    setUser(null)
    setIsAuthenticated(false)
  }

  const signup = async (userData: any) => {
    try {
      // TODO: Implement actual signup logic
      // const response = await signupAPI(userData)
      // Do NOT set user or isAuthenticated here
      // User needs to login separately after signup
      return
    } catch (error) {
      throw new Error('Signup failed')
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 