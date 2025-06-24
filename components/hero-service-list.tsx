"use client"

import { useState } from "react"
import { MotionDiv } from "@/components/animations/motion-div"
import { ServiceCard } from "./service-card"
import { Input } from "@/components/ui/input"
import {
  Paintbrush,
  Wrench,
  Scissors,
  Sparkles,
  Leaf,
  Zap,
  Home,
  Car,
  Search,
} from "lucide-react"

const services = [
  {
    icon: <Home className="h-6 w-6" />,
    title: "Home Cleaning",
    description: "Professional home cleaning services for a spotless living space",
    subcategories: ["Regular Cleaning", "Deep Cleaning", "Move-in/Move-out", "Window Cleaning"],
    slug: "home-cleaning",
    category: "Cleaning"
  },
  {
    icon: <Paintbrush className="h-6 w-6" />,
    title: "Painting",
    description: "Expert painting services for interior and exterior spaces",
    subcategories: ["Interior Painting", "Exterior Painting", "Wall Repair", "Wallpaper Installation"],
    slug: "painting",
    category: "Home Improvement"
  },
  {
    icon: <Wrench className="h-6 w-6" />,
    title: "Plumbing",
    description: "Reliable plumbing services for all your needs",
    subcategories: ["Repairs", "Installation", "Maintenance", "Emergency Services"],
    slug: "plumbing",
    category: "Home Repairs"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Electrical",
    description: "Professional electrical services for your home and business",
    subcategories: ["Installations", "Repairs", "Upgrades", "Safety Inspections"],
    slug: "electrical",
    category: "Home Repairs"
  },
  {
    icon: <Scissors className="h-6 w-6" />,
    title: "Hair & Beauty",
    description: "Professional hair and beauty services at your convenience",
    subcategories: ["Haircuts", "Styling", "Color", "Beauty Treatments"],
    slug: "hair-beauty",
    category: "Personal Care"
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Spa & Wellness",
    description: "Relaxing spa services in the comfort of your home",
    subcategories: ["Massage", "Facials", "Nail Care", "Wellness Treatments"],
    slug: "spa-wellness",
    category: "Personal Care"
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Gardening",
    description: "Professional gardening and landscaping services",
    subcategories: ["Maintenance", "Landscaping", "Tree Service", "Lawn Care"],
    slug: "gardening",
    category: "Outdoor"
  },
  {
    icon: <Car className="h-6 w-6" />,
    title: "Car Services",
    description: "Mobile car washing and detailing services",
    subcategories: ["Car Wash", "Detailing", "Interior Cleaning", "Polishing"],
    slug: "car-services",
    category: "Automotive"
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const searchBarVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
}

export function HeroServiceList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.subcategories.some(sub => 
        sub.toLowerCase().includes(searchTerm.toLowerCase())
      )
    return matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <MotionDiv
        variants={searchBarVariants}
        initial="hidden"
        animate="show"
        className="relative max-w-2xl mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for services..."
            className="pl-10 h-12 text-lg bg-white/50 backdrop-blur-sm border-2 focus:border-blue-500 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-lg pointer-events-none" />
        </div>
      </MotionDiv>

      {/* Services Grid */}
      <MotionDiv
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {filteredServices.map((service, index) => (
          <MotionDiv
            key={service.slug}
            variants={item}
            className={`
              transform transition-all duration-300 ease-in-out p-2 sm:p-3
              ${hoveredCategory === service.category ? 'scale-105 z-10' : 'scale-100 z-0'}
              ${hoveredCategory && hoveredCategory !== service.category ? 'opacity-75' : 'opacity-100'}
            `}
            onHoverStart={() => setHoveredCategory(service.category)}
            onHoverEnd={() => setHoveredCategory(null)}
          >
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
              subcategories={service.subcategories}
              index={index}
              slug={service.slug}
            />
          </MotionDiv>
        ))}
      </MotionDiv>
    </div>
  )
} 