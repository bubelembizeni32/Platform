"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Lightbulb, Users, Award, Sparkles, User, LogOut } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { LoginModal } from "@/components/auth/LoginModal"
import { useAuth } from "@/components/auth/AuthContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MobileMenu } from "@/components/mobile-menu"

interface SiteHeaderProps {
  variant?: 'default' | 'simple'
}

export function SiteHeader({ variant = 'default' }: SiteHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, logout, user } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // For hash links, smoothly scroll to the section
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // For regular links, use the router
      router.push(href)
    }
  }

  const isServiceProvidersPage = pathname === '/service-providers'

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between py-4 mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold leading-tight flex items-center gap-3" style={{height: '3.125rem'}}>
            <img
              src="/images/handshake.png"
              alt="Handshake"
              className="rounded"
              style={{ height: '3.125rem', width: 'auto', maxHeight: '50px' }}
            />
            <span className="flex flex-col leading-tight justify-center" style={{lineHeight: '1.2'}}>
              <span>
                ProL<span className="text-blue-600">ii</span>nk
              </span>
              <span>
                Co<span className="text-blue-600">nn</span>ect
              </span>
            </span>
          </Link>
          {variant === 'default' && (
            <div className="ml-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-md hover:bg-[#00A3E0]/10 text-[#00A3E0] border border-[#00A3E0] focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/20">
                  Explore
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem className="flex items-center gap-2 py-3 cursor-pointer" onSelect={() => handleNavigation('#features')}>
                    <Sparkles className="w-4 h-4 text-[#00A3E0]" />
                    <span>Features</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 py-3 cursor-pointer" onSelect={() => handleNavigation('#how-it-works')}>
                    <Lightbulb className="w-4 h-4 text-[#00A3E0]" />
                    <span>How It Works</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 py-3 cursor-pointer" onSelect={() => handleNavigation('#partners')}>
                    <Users className="w-4 h-4 text-[#00A3E0]" />
                    <span>Partners</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 py-3 cursor-pointer" onSelect={() => handleNavigation('#why-choose-us')}>
                    <Award className="w-4 h-4 text-[#00A3E0]" />
                    <span>Why Choose Us</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {variant === 'default' && (
                  <Link 
                    href="/service-providers" 
                    className="border border-[#00A3E0] text-[#00A3E0] hover:bg-[#00A3E0]/10 rounded px-4 py-2 text-sm font-medium transition"
                  >
                    Become a Service Provider
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.profileImage || ""} alt={user?.fullName || user?.name || "User"} />
                        <AvatarFallback className="bg-[#00A3E0]/10">
                          <User className="h-5 w-5 text-[#00A3E0]" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {(user?.fullName || user?.name) && (
                          <p className="font-medium">{user.fullName || user.name}</p>
                        )}
                        {user?.email && (
                          <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600 cursor-pointer"
                      onClick={logout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowLoginModal(true)}
                  className="text-[#00A3E0] hover:text-[#00A3E0]/80"
                >
                  Login
                </Button>
                {variant === 'default' && (
                  <Link 
                    href="/service-providers" 
                    className="border border-[#00A3E0] text-[#00A3E0] hover:bg-[#00A3E0]/10 rounded px-4 py-2 text-sm font-medium transition"
                  >
                    Become a Service Provider
                  </Link>
                )}
              </>
            )}
          </div>
          {/* Mobile actions: always show Login button, and pass onLoginClick to MobileMenu */}
          <div className="flex md:hidden items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={() => setShowLoginModal(true)}
              className="text-[#00A3E0] hover:text-[#00A3E0]/80"
            >
              Login
            </Button>
            <MobileMenu 
              links={[
                { href: '#features', label: 'Features' },
                { href: '#how-it-works', label: 'How It Works' },
                { href: '#partners', label: 'Partners' },
                { href: '#why-choose-us', label: 'Why Choose Us' },
              ]}
              providerLink="/service-providers"
              onLoginClick={() => setShowLoginModal(true)}
            />
          </div>
        </div>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </header>
  )
} 