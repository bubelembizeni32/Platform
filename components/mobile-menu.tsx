"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface MobileMenuProps {
  links: {
    href: string
    label: string
  }[]
  providerLink?: string
}

export function MobileMenu({ links, providerLink }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
        <Menu className="h-6 w-6" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-all duration-300 ease-in-out"
          onClick={closeMenu}
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] max-w-sm bg-background/95 backdrop-blur-md z-50 shadow-xl transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        aria-modal="true"
        role="dialog"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="text-xl font-bold leading-tight text-white">
              <span className="flex flex-col">
                <span>
                  ProL<span className="text-blue-600">ii</span>nk
                </span>
                <span>
                  Co<span className="text-blue-600">nn</span>ect
                </span>
              </span>
            </span>
            <Button variant="ghost" size="icon" onClick={closeMenu} aria-label="Close menu">
              <X className="h-6 w-6 text-white" />
            </Button>
          </div>

          <nav className="flex flex-col p-4 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-blue-400 py-2 text-lg font-semibold tracking-wide transition-colors"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}

            {providerLink && (
              <Link
                href={providerLink}
                className="text-[#00A3E0] hover:text-[#0089BD] py-2 text-lg font-semibold tracking-wide transition-colors"
                onClick={closeMenu}
              >
                Become a Service Provider
              </Link>
            )}
          </nav>

          <div className="mt-auto p-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Switch theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
