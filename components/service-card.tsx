"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  subcategories: string[]
  index: number
  slug: string
  backgroundImage?: string
  onBookService?: (category: string) => void
}

export function ServiceCard({ 
  icon, 
  title, 
  description, 
  subcategories, 
  index, 
  slug, 
  backgroundImage,
  onBookService 
}: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleBookService = () => {
    // Map the service title to the corresponding category value
    const categoryMap: { [key: string]: string } = {
      "Plumbing": "plumbing",
      "Electrical Services": "electrical",
      "Home Cleaning": "cleaning",
      "Appliance Repairs": "appliance-repairs",
      "Painting & Renovations": "painting"
    }

    const category = categoryMap[title]
    if (category && onBookService) {
      onBookService(category)
    }
  }

  return (
    <>
      <motion.div
        className="flex flex-col h-full rounded-lg border bg-card shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {backgroundImage && (
          <>
            <img
              src={backgroundImage}
              alt="Service background"
              className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
            />
            <div className="absolute inset-0 bg-black/60 z-0" />
          </>
        )}
        <div className="flex flex-col h-full p-6 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00A3E0]/10 flex items-center justify-center text-[#00A3E0]">
              {icon}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="mt-auto flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={() => setIsOpen(true)}>
              Learn More
            </Button>
            <Button className="bg-[#00A3E0] hover:bg-[#0089BD]" onClick={handleBookService}>
              Book Now
            </Button>
          </div>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3">
              <span className="text-[#00A3E0]">{icon}</span> {title}
            </DialogTitle>
            <DialogDescription className="text-base">{description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Services Include:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {subcategories.map((subcategory, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[#00A3E0]" />
                    <span>{subcategory}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Pricing:</h4>
              <p className="text-muted-foreground">
                Pricing varies based on the specific service and scope of work. Get a quote by booking a service.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">What to Expect:</h4>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. Book your service and describe your needs</li>
                <li>2. Get matched with a qualified professional</li>
                <li>3. Confirm appointment details</li>
                <li>4. Service is completed to your satisfaction</li>
                <li>5. Pay securely through our platform</li>
              </ol>
            </div>
            <div className="pt-4">
              <Button className="w-full bg-[#00A3E0] hover:bg-[#0089BD]" onClick={handleBookService}>
                Book This Service
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
