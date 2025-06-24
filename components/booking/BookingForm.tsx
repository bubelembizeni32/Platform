"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DateTimePicker } from "./DateTimePicker"
import { LocationInput } from "./LocationInput"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface BookingFormProps {
  serviceId?: string
  serviceName?: string
}

export function BookingForm({ serviceId, serviceName }: BookingFormProps) {
  const [step, setStep] = React.useState(1)
  const [date, setDate] = React.useState<Date>()
  const [address, setAddress] = React.useState("")
  const [notes, setNotes] = React.useState("")

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({
      serviceId,
      serviceName,
      date,
      address,
      notes,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Book a Service</CardTitle>
          <CardDescription>
            {serviceName ? `Booking ${serviceName}` : "Select your service details"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {step === 1 && (
              <DateTimePicker
                date={date}
                setDate={setDate}
                className="w-full"
              />
            )}

            {step === 2 && (
              <LocationInput
                address={address}
                setAddress={setAddress}
                className="w-full"
              />
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions or requirements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="rounded-lg border p-4 space-y-2">
                  <h4 className="font-medium">Booking Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    Service: {serviceName || "Not selected"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Date: {date?.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Time: {date?.toLocaleTimeString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Location: {address}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button
              type="button"
              className="bg-[#00A3E0] hover:bg-[#0089BD] ml-auto"
              onClick={handleNext}
              disabled={
                (step === 1 && !date) ||
                (step === 2 && !address)
              }
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-[#00A3E0] hover:bg-[#0089BD] ml-auto"
            >
              Confirm Booking
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  )
} 