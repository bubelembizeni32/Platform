"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProcessStep } from "@/components/process-step"
import { WorkflowDiagram } from "@/components/workflow-diagram"
import { QuoteCard } from "@/components/quote-card"
import { InfoBlock } from "@/components/info-block"
import { Briefcase, ShieldCheck, Calendar, Bell, Wrench, CreditCard, Star, ChevronRight, ArrowLeft } from "lucide-react"

export default function HowItWorksPage() {
  // Process steps data
  const processSteps = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      number: 1,
      title: "Create Your Free Profile",
      description: "Tell us about your skills, experience, and where you want to work.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      number: 2,
      title: "Get Verified",
      description: "We'll review your documents (ID, certifications, etc.) to make sure clients can trust you.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      number: 3,
      title: "Set Availability",
      description: "Choose the days and hours you're available — total flexibility.",
    },
    {
      icon: <Bell className="h-6 w-6" />,
      number: 4,
      title: "Receive Job Requests",
      description: "Get matched with real clients based on your location and services. Accept or decline with one tap.",
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      number: 5,
      title: "Do the Work",
      description: "Arrive on time, do your best work, and keep communication clear.",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      number: 6,
      title: "Get Paid",
      description: "Once the job is marked complete, payment is sent directly to your account — fast and secure.",
    },
    {
      icon: <Star className="h-6 w-6" />,
      number: 7,
      title: "Grow Your Reputation",
      description: "Happy clients leave reviews that boost your visibility and bookings.",
    },
  ]

  // Quotes data
  const quotes = [
    {
      quote: "The process was so easy. I signed up and had my first job in 3 days!",
      author: "Thando Nkosi",
      role: "Handyman",
    },
    {
      quote: "I like that I can choose when to work and how far I travel.",
      author: "Lebo Molefe",
      role: "Plumber",
    },
  ]

  // Info items
  const infoItems = [
    {
      text: "No subscription fees – we earn when you earn.",
    },
    {
      text: "Support team available if you need help.",
    },
    {
      text: "Easy calendar and job management in the app.",
    },
    {
      text: "Get paid within 48 hours of job completion.",
    },
  ]

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
              <Link href="/service-providers">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Service Providers
              </Link>
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
                  Here's How ProL<span className="text-[#00A3E0]">ii</span>nk Co
                  <span className="text-[#00A3E0]">nn</span>ect Works for You
                </h1>
                <p className="text-xl text-muted-foreground">
                  From sign-up to payday, everything is made simple so you can focus on what you do best.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-[#00A3E0] hover:bg-[#0089BD]">
                    Join Now
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative overflow-hidden rounded-xl shadow-xl">
                  <img
                    src="/images/service-provider-hero.png"
                    alt="Service provider receiving job notification"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00A3E0]/20 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Timeline Section */}
        <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Journey with ProLiink Connect</h2>
                <p className="max-w-[700px] text-muted-foreground">
                  A simple, straightforward process designed to get you earning quickly.
                </p>
              </motion.div>
            </div>

            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={step.title}
                  icon={step.icon}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Diagram Section */}
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How the Platform Works</h2>
                <p className="max-w-[700px] text-muted-foreground">
                  A seamless connection between clients, our platform, and you.
                </p>
              </motion.div>
            </div>

            <div className="max-w-4xl mx-auto">
              <WorkflowDiagram />
            </div>
          </div>
        </section>

        {/* Quotes Section */}
        <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Providers Say</h2>
                <p className="max-w-[700px] text-muted-foreground">
                  Real experiences from service professionals like you.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {quotes.map((quote, index) => (
                <QuoteCard
                  key={quote.author}
                  quote={quote.quote}
                  author={quote.author}
                  role={quote.role}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Info Block Section */}
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Transparent & Fair</h2>
                <p className="max-w-[700px] text-muted-foreground">
                  We believe in clear communication and straightforward policies.
                </p>
              </motion.div>
            </div>

            <div className="max-w-2xl mx-auto">
              <InfoBlock items={infoItems} />
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-[#00A3E0] to-[#4A4A4A] text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start Earning?</h2>
                <p className="max-w-[700px] mx-auto text-xl">
                  Join thousands of service providers who are building successful businesses with ProLiink Connect.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button size="lg" className="bg-white text-[#00A3E0] hover:bg-gray-100">
                  Become a Service Provider <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
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
