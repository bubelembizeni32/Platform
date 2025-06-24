"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  Truck,
  Smartphone,
  MessageSquare,
  CreditCard,
  Globe,
  Search,
  MessageCircle,
  Calendar,
  Clock,
  Shield,
  Star,
  ChevronRight,
  ArrowLeftRight,
  Wrench,
  Zap,
  SprayCanIcon as Spray,
  Hammer,
  Paintbrush,
  Sparkles,
} from "lucide-react"
import { HorizontalScrollBackground } from "@/components/horizontal-scroll-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "@/components/mobile-menu"
import { FadeInSection } from "@/components/fade-in-section"
import { ContactForm } from "@/components/contact-form"
import { MultiStepForm } from "@/components/MultiStepForm"
import { FAQAccordion } from "@/components/faq-accordion"
import { ServiceCard } from "@/components/service-card"
import { GodRays } from "@/components/god-rays"
import { useRef, useState } from "react"
import { motion } from "framer-motion"

export default function LandingPage() {
  // Navigation links
  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#about-us", label: "About Us" },
    { href: "#partners", label: "Partners" },
    { href: "#why-choose-us", label: "Why Choose Us" },
  ]

  // Images for the hero background
  const heroBackgroundImages = [
    "/images/Plumber.jpg%205.webp",
    "/images/painter%205.jpg",
    "/images/haidresser%205.webp",
    "/images/spa%20treatment%205.jpg",
    "/images/electrician%205.jpg",
  ]

  // Ref for horizontal scroll
  const servicesRowRef = useRef<HTMLDivElement>(null)
  const scrollByAmount = 320
  const scrollLeft = () => {
    if (servicesRowRef.current) {
      servicesRowRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" })
    }
  }
  const scrollRight = () => {
    if (servicesRowRef.current) {
      servicesRowRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" })
    }
  }

  // Service data for featured cards
  const featuredServices = [
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Plumbing",
      description: "Professional plumbing services for your home or business.",
      subcategories: ["Leaks", "Pipe repairs", "Geyser installations", "Drainage", "Toilet repairs"],
      slug: "plumbing",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Electrical Services",
      description: "Licensed electricians for all your electrical needs.",
      subcategories: ["Fault finding", "Wiring", "Light fittings", "Compliance certificates", "Power outages"],
      slug: "electrical",
    },
    {
      icon: <Spray className="h-6 w-6" />,
      title: "Home Cleaning",
      description: "Professional cleaning services to keep your space spotless.",
      subcategories: ["Deep cleaning", "Move-in/move-out", "Recurring services", "Window cleaning"],
      slug: "home-cleaning",
    },
    {
      icon: <Hammer className="h-6 w-6" />,
      title: "Appliance Repairs",
      description: "Expert repair services for all household appliances.",
      subcategories: ["Fridges", "Ovens", "Washing machines", "Dishwashers", "Microwaves"],
      slug: "appliance-repairs",
    },
    {
      icon: <Paintbrush className="h-6 w-6" />,
      title: "Painting & Renovations",
      description: "Transform your space with professional painting and renovation services.",
      subcategories: ["Interior painting", "Exterior painting", "Plastering", "Touch-ups", "Wallpaper"],
      slug: "painting-renovations",
    },
  ];

  // Animation variants for floating elements
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const serviceIcons = [
    { icon: <Wrench className="w-8 h-8" />, delay: 0 },
    { icon: <Zap className="w-8 h-8" />, delay: 0.2 },
    { icon: <Spray className="w-8 h-8" />, delay: 0.4 },
    { icon: <Hammer className="w-8 h-8" />, delay: 0.6 },
    { icon: <Paintbrush className="w-8 h-8" />, delay: 0.8 }
  ]

  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")

  const handleBookService = (category: string) => {
    setSelectedCategory(category)
    setShowBookingForm(true)
    // Scroll to the booking form
    const bookingForm = document.getElementById('booking-form')
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <GodRays />
      <main className="flex-1">
        {/* Hero Section with Enhanced Background */}
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#f8fafc] to-[#e0f2fe] dark:from-gray-900 dark:to-gray-800">
          {/* Geometric Overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full">
              {/* Geometric patterns */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-[#00A3E0]/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
            </div>
          </div>

          {/* Enhanced Background Scroll */}
          <div className="absolute inset-0 z-0">
            <HorizontalScrollBackground 
              images={[
                "/images/Plumber.jpg%205.webp",
                "/images/painter%205.jpg",
                "/images/haidresser%205.webp",
                "/images/spa%20treatment%205.jpg",
                "/images/electrician%205.jpg",
                // Add more service images here
              ]} 
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          </div>

          {/* Floating Service Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {serviceIcons.map((service, index) => (
              <motion.div
                key={index}
                className="absolute text-white/80"
                style={{
                  left: `${15 + index * 20}%`,
                  top: `${20 + (index % 3) * 20}%`
                }}
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                transition={{ delay: service.delay }}
              >
                {service.icon}
              </motion.div>
            ))}
        </div>

          <div className="container relative z-10 px-4 md:px-6 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center text-white space-y-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={textAnimation}
                className="space-y-4"
              >
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  The smart way to{" "}
                  <span className="text-[#00A3E0]">link</span>
                  {" "}professionals and clients
              </h1>
                <p className="max-w-[600px] mx-auto text-gray-200 text-lg md:text-xl">
                  Connect with trusted experts in your area, all in one place.
                </p>
              </motion.div>

              {/* Enhanced Booking Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20"
                id="booking-form"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#00A3E0] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Book a Service
                </div>
                <MultiStepForm initialCategory={selectedCategory} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Popular Services Row */}
        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Popular Services</h2>
            <div className="relative">
              {/* Left Arrow */}
              <button type="button" onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur rounded-full p-2 shadow-lg border border-white/30 hover:bg-white/40 transition hidden sm:block">
                <ChevronRight className="h-6 w-6 text-white rotate-180" />
              </button>
              <div ref={servicesRowRef} className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                {featuredServices.map((service, idx) => (
                  <div key={service.title} className="min-w-[280px] max-w-xs flex-shrink-0">
                    <ServiceCard
                      icon={service.icon}
                      title={service.title}
                      description={service.description}
                      subcategories={service.subcategories}
                      index={idx}
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
                        : undefined
                      }
                      onBookService={handleBookService}
                    />
                  </div>
                ))}
                {/* View All Services Button after last card */}
                <div className="min-w-[220px] flex items-center justify-center">
                  <Link href="/services">
                    <Button className="bg-[#00A3E0] hover:bg-[#0089BD] text-white px-8 py-2 rounded-full shadow-md whitespace-nowrap">
                      View All Services
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Right Arrow */}
              <button type="button" onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur rounded-full p-2 shadow-lg border border-white/30 hover:bg-white/40 transition hidden sm:block">
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#f8fafc] to-[#e0f2fe] dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4A4A4A]">
                  What We Bring to the Table
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers everything you need to find and book reliable services with confidence.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  icon: <CheckCircle className="h-12 w-12 text-blue-600" />,
                  title: "Verified Providers",
                  description: "All service providers are thoroughly vetted and verified for your safety and peace of mind."
                },
                {
                  icon: <Truck className="h-12 w-12 text-blue-600" />,
                  title: "Fast & Flexible",
                  description: "Book services for when you need them, with flexible scheduling and quick response times."
                },
                {
                  icon: <Smartphone className="h-12 w-12 text-blue-600" />,
                  title: "Easy-to-Use Platform",
                  description: "Our intuitive web and mobile interfaces make finding and booking services a breeze."
                },
                {
                  icon: <MessageSquare className="h-12 w-12 text-blue-600" />,
                  title: "Transparent Communication",
                  description: "Direct messaging with service providers ensures clear communication throughout the process."
                },
                {
                  icon: <Globe className="h-12 w-12 text-blue-600" />,
                  title: "Wide Coverage",
                  description: "Available across multiple regions with a growing network of qualified professionals."
                },
              ].map((feature, idx) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center space-y-2 rounded-2xl border border-white/20 bg-white/20 dark:bg-white/10 backdrop-blur-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer group"
                >
                  {feature.icon}
                  <h3 className="text-xl font-bold text-white drop-shadow-lg group-hover:text-blue-200 transition">{feature.title}</h3>
                  <p className="text-center text-white/80 group-hover:text-white transition">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#f8fafc] to-[#e0f2fe] dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Finding and booking services has never been easier. Just follow these simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Search className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Browse</h3>
                <p className="text-center text-muted-foreground">
                  Find the right service or contractor for your specific needs from our extensive network.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <MessageCircle className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Connect</h3>
                <p className="text-center text-muted-foreground">
                  Send a request and chat directly with providers to discuss your requirements.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Calendar className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Book</h3>
                <p className="text-center text-muted-foreground">
                  Confirm your booking, get the job done, and enjoy hassle-free service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#f8fafc] to-[#e0f2fe] dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why People Trust Our Platform
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied customers who rely on our platform for their service needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 mt-12">
              <div className="flex items-start space-x-4">
                <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold">Save Time</h3>
                  <p className="text-muted-foreground">
                    We make finding reliable services effortless, saving you hours of research and phone calls.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold">Guaranteed Quality</h3>
                  <p className="text-muted-foreground">
                    Avoid scams and poor service with our vetted professionals and quality guarantee.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold">Dedicated Support</h3>
                  <p className="text-muted-foreground">
                    Our customer service team is always ready to help with any questions or issues.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Star className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold">Real Reviews</h3>
                  <p className="text-muted-foreground">
                    Make informed decisions based on authentic reviews from real users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#f8fafc] to-[#e0f2fe] dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4A4A4A]">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our platform and services.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-2xl mt-12">
              <FAQAccordion faqs={[
                { question: "How do I book a service?", answer: "Simply use the booking form at the top of the page, select your category and service, and follow the steps." },
                { question: "Do I need an account to book?", answer: "Yes, you need to be logged in to complete a booking. You can register or log in during the booking process." },
                { question: "How are service providers vetted?", answer: "All providers go through a verification process to ensure quality and safety for our users." },
                { question: "Can I reschedule or cancel a booking?", answer: "Yes, you can manage your bookings from your account dashboard after logging in." },
              ]} />
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="w-full py-12 md:py-20 bg-gradient-to-r from-[#f8fafc] to-[#e0f2fe] dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#4A4A4A] dark:text-white">
                Our Trusted Partners
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Proudly supported by industry leaders who share our vision
              </p>
            </div>

            <div className="overflow-hidden">
              <div className="flex animate-scroll-x">
                {[...Array(2)].map((_, trackIndex) => (
                  <div key={trackIndex} className="flex items-center flex-nowrap">
                    {[
                      {
                        name: "Deviare",
                        logo: "/images/partners/deviare.png",
                        width: 180,
                      },
                      {
                        name: "Liquid Intelligent Technologies",
                        logo: "/images/partners/liquid_intelligent_technologies_logo.jpg",
                        width: 220,
                      },
                      {
                        name: "King Sabata Dalindyebo TVET College",
                        logo: "/images/partners/king_sabata_dalindyebo_tvet_college.jpg",
                        width: 200,
                      },
                      {
                        name: "King Sabata Dalindyebo Municipality",
                        logo: "/images/partners/king_sabata_dalindyebo_municipality.png",
                        width: 180,
                      },
                      {
                        name: "BUCO",
                        logo: "/images/partners/buco.jpeg",
                        width: 180,
                      },
                    ].map((partner, index) => (
                      <div key={`${trackIndex}-${index}`} className="flex items-center justify-center mx-8">
                        <img
                          src={partner.logo || "/placeholder.svg"}
                          alt={`${partner.name} logo`}
                          className="h-20 w-auto object-contain"
                          style={{ maxWidth: partner.width + "px" }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center">
              <Button variant="outline" className="gap-2 border-[#00A3E0] text-[#00A3E0] hover:bg-[#00A3E0]/10" asChild>
                <Link href="/partner-with-us">
                  <ArrowLeftRight className="h-4 w-4" />
                  Become a Partner
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#f8fafc] to-[#e0f2fe] dark:from-gray-900 dark:to-gray-800 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Fill out the form below to be part of the community.
                </p>
              </div>
              <div className="w-full max-w-md mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-8 sm:py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-lg font-bold">
                ProL<span className="text-blue-600">ii</span>nk Co<span className="text-blue-600">nn</span>ect
              </h3>
              <p className="text-sm text-muted-foreground">
                The smart way to link professionals and clients.
              </p>
              <img
                src="/images/handshake.png"
                alt="Handshake"
                className="w-24 sm:w-32 h-auto mx-auto mt-4 rounded-xl shadow-md"
                style={{ maxWidth: '140px' }}
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold">Quick Links</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Services</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="/services#plumbing" className="text-sm text-muted-foreground hover:text-foreground">
                    Plumbing
                  </Link>
                </li>
                <li>
                  <Link href="/services#electrical" className="text-sm text-muted-foreground hover:text-foreground">
                    Electrical
                  </Link>
                </li>
                <li>
                  <Link href="/services#gardening-landscaping" className="text-sm text-muted-foreground hover:text-foreground">
                    Gardening
                  </Link>
                </li>
                <li>
                  <Link href="/services#hair-styling" className="text-sm text-muted-foreground hover:text-foreground">
                    Hair Styling
                  </Link>
                </li>
                <li>
                  <Link href="/services#painting-renovations" className="text-sm text-muted-foreground hover:text-foreground">
                    Painting
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Contact Us</h3>
              <address className="mt-2 not-italic text-sm text-muted-foreground">
                <p>49 Leeds Street</p>
                <p>Cnr Leeds & Creister street</p>
                <p>Mthatha, Eastern Cape</p>
                <p>5099</p>
                <p className="mt-2">
                  <span className="block">Email: support@proliinkconnect.co.za</span>
                  <span className="block">Phone: +27 78 128 3697</span>
                </p>
              </address>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
            <p className="text-sm text-muted-foreground">© 2024 ProLiink Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
