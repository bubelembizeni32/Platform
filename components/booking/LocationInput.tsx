"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface LocationInputProps {
  address: string
  setAddress: (address: string) => void
  className?: string
}

export function LocationInput({ address, setAddress, className }: LocationInputProps) {
  const [isLocating, setIsLocating] = React.useState(false)

  const handleGetCurrentLocation = () => {
    setIsLocating(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=YOUR_API_KEY`
            )
            const data = await response.json()
            if (data.results?.[0]?.formatted) {
              setAddress(data.results[0].formatted)
            }
          } catch (error) {
            console.error("Error getting address:", error)
          } finally {
            setIsLocating(false)
          }
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLocating(false)
        }
      )
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor="address">Service Location</Label>
      <div className="flex gap-2">
        <Input
          id="address"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleGetCurrentLocation}
          disabled={isLocating}
          className="shrink-0"
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Enter your full address or use current location
      </p>
    </div>
  )
} 