"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface ServiceFilterProps {
  categories: string[]
  onFilterChange: (category: string, searchTerm: string) => void
}

export function ServiceFilter({ categories, onFilterChange }: ServiceFilterProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    onFilterChange(category, searchTerm)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    onFilterChange(activeCategory, e.target.value)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search services..."
          className="pl-10"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategory === "All" ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange("All")}
          className={activeCategory === "All" ? "bg-[#00A3E0] hover:bg-[#0089BD]" : ""}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(category)}
            className={activeCategory === category ? "bg-[#00A3E0] hover:bg-[#0089BD]" : ""}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  )
}
