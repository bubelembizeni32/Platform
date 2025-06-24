"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, X, Phone } from "lucide-react"

export function HelpWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCallbackForm, setIsCallbackForm] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-[350px] shadow-lg">
          <CardHeader className="bg-[#00A3E0] text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Need Help?</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-[#0089BD]"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {isCallbackForm ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    How can we help?
                  </label>
                  <Textarea id="message" placeholder="Briefly describe what you need help with" rows={3} />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Not sure what service you need? We're here to help you find the right professional for your job.
                </p>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="justify-start" onClick={() => setIsCallbackForm(true)}>
                    <Phone className="mr-2 h-4 w-4" /> Request a callback
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" /> Chat with support
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800 rounded-b-lg">
            {isCallbackForm ? (
              <div className="flex w-full gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setIsCallbackForm(false)}>
                  Back
                </Button>
                <Button size="sm" className="flex-1 bg-[#00A3E0] hover:bg-[#0089BD]">
                  Request Callback
                </Button>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Our team is available Monday-Friday, 8am-6pm</p>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Button
          className="rounded-full h-14 w-14 bg-[#00A3E0] hover:bg-[#0089BD] shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
