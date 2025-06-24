"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock } from "lucide-react"

interface DateTimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
}

export function DateTimePicker({ date, setDate, className }: DateTimePickerProps) {
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00",
    "16:00", "17:00"
  ]

  const [selectedTime, setSelectedTime] = React.useState<string>()

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    if (date) {
      const [hours, minutes] = time.split(":").map(Number)
      const newDate = new Date(date)
      newDate.setHours(hours, minutes)
      setDate(newDate)
    }
  }

  return (
    <div className={cn("grid gap-4", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal w-full",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={(date) => date < new Date()}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal w-full",
              !selectedTime && "text-muted-foreground"
            )}
            disabled={!date}
          >
            <Clock className="mr-2 h-4 w-4" />
            {selectedTime ? selectedTime : <span>Pick a time</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48" align="start">
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                className={cn(
                  "w-full",
                  selectedTime === time && "bg-[#00A3E0] hover:bg-[#0089BD]"
                )}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
} 