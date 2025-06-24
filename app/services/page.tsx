"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/service-card"
import { ServiceFilter } from "@/components/service-filter"
import { TrustBadge } from "@/components/trust-badge"
import { HelpWidget } from "@/components/help-widget"
import {
  Wrench,
  Zap,
  SprayCanIcon as Spray,
  Hammer,
  Paintbrush,
  Bug,
  Scissors,
  Shield,
  Laptop,
  Car,
  Truck,
  Home,
  CheckCircle,
  Lock,
  Clock,
  DollarSign,
  ChevronRight,
  Flower,
} from "lucide-react"

export default function ServicesPage() {
  // Service data
  const services = [
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Plumbing",
      description: "Professional plumbing services for your home or business.",
      subcategories: ["Leaks", "Pipe repairs", "Geyser installations", "Drainage", "Toilet repairs"],
      category: "Home Repairs",
      slug: "plumbing",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Electrical Services",
      description: "Licensed electricians for all your electrical needs.",
      subcategories: ["Fault finding", "Wiring", "Light fittings", "Compliance certificates", "Power outages"],
      category: "Home Repairs",
      slug: "electrical",
    },
    {
      icon: <Spray className="h-6 w-6" />,
      title: "Home Cleaning",
      description: "Professional cleaning services to keep your space spotless.",
      subcategories: ["Deep cleaning", "Move-in/move-out", "Recurring services", "Window cleaning"],
      category: "Cleaning",
      slug: "home-cleaning",
    },
    {
      icon: <Hammer className="h-6 w-6" />,
      title: "Appliance Repairs",
      description: "Expert repair services for all household appliances.",
      subcategories: ["Fridges", "Ovens", "Washing machines", "Dishwashers", "Microwaves"],
      category: "Home Repairs",
      slug: "appliance-repairs",
    },
    {
      icon: <Paintbrush className="h-6 w-6" />,
      title: "Painting & Renovations",
      description: "Transform your space with professional painting and renovation services.",
      subcategories: ["Interior painting", "Exterior painting", "Plastering", "Touch-ups", "Wallpaper"],
      category: "Home Improvement",
      slug: "painting-renovations",
    },
    {
      icon: <Bug className="h-6 w-6" />,
      title: "Pest Control",
      description: "Effective pest control solutions for your home or business.",
      subcategories: ["Ants", "Rodents", "Cockroach treatments", "Termites", "Bed bugs"],
      category: "Home Maintenance",
      slug: "pest-control",
    },
    {
      icon: <Scissors className="h-6 w-6" />,
      title: "Gardening & Landscaping",
      description: "Professional gardening and landscaping services.",
      subcategories: ["Lawn care", "Garden maintenance", "Landscaping", "Tree trimming", "Irrigation"],
      category: "Outdoor",
      slug: "gardening-landscaping",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security System Installation",
      description: "Protect your property with professional security system installation.",
      subcategories: ["Cameras", "Alarms", "Smart systems", "Access control", "Intercom systems"],
      category: "Home Improvement",
      slug: "security-systems",
    },
    {
      icon: <Laptop className="h-6 w-6" />,
      title: "Computer & IT Support",
      description: "Technical support for all your computer and IT needs.",
      subcategories: ["PC repairs", "Virus removal", "Network setup", "Data recovery", "Software installation"],
      category: "Tech",
      slug: "computer-it-support",
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: "Car Maintenance",
      description: "Professional car maintenance and repair services.",
      subcategories: ["Oil changes", "Tire replacement", "Battery service", "Brake repairs", "Engine diagnostics"],
      category: "Automotive",
      slug: "car-maintenance",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Moving & Delivery",
      description: "Reliable moving and delivery services for your convenience.",
      subcategories: ["Home moving", "Furniture delivery", "Office relocation", "Packing services", "Storage"],
      category: "Transport",
      slug: "moving-delivery",
    },
    {
      icon: <Home className="h-6 w-6" />,
      title: "Home Maintenance",
      description: "General home maintenance services to keep your property in top condition.",
      subcategories: ["Handyman services", "Gutter cleaning", "Roof repairs", "Door & window repairs"],
      category: "Home Maintenance",
      slug: "home-maintenance",
    },
    {
      icon: <Hammer className="h-6 w-6" />,
      title: "Carpentry",
      description: "Expert carpentry services for custom furniture, repairs, and installations.",
      subcategories: ["Custom furniture", "Cabinet making", "Wood repairs", "Decking", "Shelving"],
      category: "Home Improvement",
      slug: "carpentry",
    },
    {
      icon: <Scissors className="h-6 w-6" />,
      title: "Hairdresser",
      description: "Professional hairdressing services for men, women, and children.",
      subcategories: ["Haircuts", "Styling", "Coloring", "Braiding", "Treatments"],
      category: "Personal Care",
      slug: "hairdresser",
    },
    {
      icon: <Flower className="h-6 w-6" />,
      title: "Spa Treatments",
      description: "Relax and rejuvenate with our range of spa treatments.",
      subcategories: ["Massages", "Facials", "Manicures", "Pedicures", "Body treatments"],
      category: "Personal Care",
      slug: "spa-treatments",
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: "Mobile Car Wash",
      description: "Convenient mobile car wash services at your doorstep.",
      subcategories: ["Exterior wash", "Interior cleaning", "Waxing", "Detailing", "Eco-friendly options"],
      category: "Automotive",
      slug: "mobile-car-wash",
    },
  ]

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(services.map((service) => service.category)))]

  // State for filtered services
  const [filteredServices, setFilteredServices] = useState(services)

  // Filter function
  const handleFilterChange = (category: string, searchTerm: string) => {
    let filtered = services

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter((service) => service.category === category)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(term) ||
          service.description.toLowerCase().includes(term) ||
          service.subcategories.some((sub) => sub.toLowerCase().includes(term)),
      )
    }

    setFilteredServices(filtered)
  }

  // Reset filters on initial load
  useEffect(() => {
    setFilteredServices(services)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold leading-tight">
              <span className="flex flex-col">
                <span>
                  ProL<span className="text-blue-600">ii</span>nk
                </span>
                <span>
                  Co<span className="text-blue-600">nn</span>ect
                </span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:inline-flex" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-r from-[#f8fafc] to-[#e0f2fe] dark:from-gray-900 dark:to-gray-800">
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Find the Right Service for Your Needs
                </h1>
                <p className="text-xl text-muted-foreground">
                  From plumbing emergencies to electrical installations, ProLiink Connect has you covered.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-[#00A3E0] hover:bg-[#0089BD]">
                    Book a Service
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <img
                        src="/images/Cleaner%202.jpg"
                        alt="Cleaner working in a home"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <img
                        src="/images/Plumber%202.jpg"
                        alt="Plumber fixing a sink"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <img
                        src="/images/electrician.png"
                        alt="Electrician installing lights"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <img
                        src="/images/spa%202.jpg"
                        alt="Spa treatment in progress"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filter and Services Section */}
        <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="mb-12">
              <ServiceFilter categories={categories} onFilterChange={handleFilterChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.length > 0 ? (
                filteredServices.map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    subcategories={service.subcategories}
                    index={index}
                    slug={service.slug}
                    backgroundImage={
                      service.title === "Plumbing"
                        ? "/images/plumber%2033.jpg"
                      : service.title === "Electrical Services"
                        ? "/images/electrician.png"
                      : service.title === "Home Cleaning"
                        ? "/images/cleaning%203.jpg"
                      : service.title === "Appliance Repairs"
                        ? "/images/applinces%20r3.jpg"
                      : service.title === "Painting & Renovations"
                        ? "/images/painter%203.jpg"
                      : service.title === "Pest Control"
                          ? "/images/pest%203.jpg"
                          : service.title === "Gardening & Landscaping"
                            ? "/images/gardner%203.jpg"
                            : service.title === "Security System Installation"
                              ? "/images/security%203.jpg"
                              : service.title === "Computer & IT Support"
                                ? "/images/IT%203.jpg"
                                : service.title === "Car Maintenance"
                                  ? "/images/car%20m3.jpg"
                                  : service.title === "Mobile Car Wash"
                                    ? "/images/mobile%20carwash%206.jpg"
                                    : service.title === "Moving & Delivery"
                                      ? "/images/moving%203.jpg"
                                      : service.title === "Carpentry"
                                        ? "/images/carpentry%206.jpg"
                                        : service.title === "Hairdresser"
                                          ? "/images/hair%206.jpg"
                                          : service.title === "Spa Treatments"
                                            ? "/images/spa%203.jpg"
                                            : service.title === "Home Maintenance"
                                              ? "/images/roof%206.jpg"
                                              : undefined
                    }
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No services found matching your criteria.</p>
                  <Button variant="link" onClick={() => handleFilterChange("All", "")} className="mt-2 text-[#00A3E0]">
                    Reset filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Book with ProLiink Connect?</h2>
                <p className="max-w-[700px] text-muted-foreground">
                  We're committed to providing reliable, high-quality services through our trusted platform.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TrustBadge
                icon={<CheckCircle className="h-6 w-6" />}
                title="Vetted Professionals"
                description="All service providers are thoroughly vetted and verified for your safety and peace of mind."
                index={0}
              />
              <TrustBadge
                icon={<Lock className="h-6 w-6" />}
                title="Secure Payments"
                description="Pay securely through our platform with transparent pricing and no hidden fees."
                index={1}
              />
              <TrustBadge
                icon={<Clock className="h-6 w-6" />}
                title="Quick Turnaround"
                description="Get matched with available professionals quickly, even for urgent service needs."
                index={2}
              />
              <TrustBadge
                icon={<DollarSign className="h-6 w-6" />}
                title="Transparent Pricing"
                description="Clear pricing information upfront so you know exactly what to expect."
                index={3}
              />
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-[#00A3E0] to-[#4A4A4A] text-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Book a Reliable Pro?
                </h2>
                <p className="text-xl">Get started today and connect with skilled professionals in your area.</p>
                <img
                  src="/images/handshake.png"
                  alt="Handshake"
                  className="w-64 h-auto rounded-xl shadow-lg mx-auto"
                  style={{ maxWidth: '320px' }}
                />
                <Button size="lg" className="bg-white text-[#00A3E0] hover:bg-gray-100 mt-4">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div
                className="relative hidden md:block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative overflow-hidden rounded-xl shadow-xl">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Happy client with service professional"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00A3E0]/20 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Help Widget */}
        <HelpWidget />
      </main>

      <footer className="w-full border-t py-6 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2024 ProLiink Connect. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
