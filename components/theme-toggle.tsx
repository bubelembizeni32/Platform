"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  // Determine the next theme
  const nextTheme = theme === "dark" ? "light" : "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      className="border-0"
      aria-label="Toggle theme"
      onClick={() => setTheme(nextTheme)}
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === "dark" ? "scale-0" : "scale-100"}`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === "dark" ? "scale-100" : "scale-0"}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
