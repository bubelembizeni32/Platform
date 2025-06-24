"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ParallaxHero } from "@/components/parallax-hero"
import { ValueCard } from "@/components/value-card"
import { TeamCard } from "@/components/team-card"
import { GodRays } from "@/components/god-rays"
import { ArrowLeft, Eye, Award, Users, ChevronRight } from "lucide-react"

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      name: "Bubele Mbizeni",
      role: "Chief Financial Officer",
      quote: "Numbers tell a story—my job is to make sure it's a successful one.",
    },
    {
      name: "Qhawe Mlengana",
      role: "Project Manager",
      quote: "Great things are never done alone—they're done with great teams.",
    },
    {
      name: "Molemo Nakin",
      role: "Operations Manager & Lead Developer",
      quote: "Clean code. Clear process. Connected people.",
    },
    {
      name: "Nontlahla Adonis",
      role: "Communications & Marketing Manager",
      quote: "A strong message turns interest into trust—and trust into loyalty.",
    },
    {
      name: "Aphiwe Gaya",
      role: "Business Analyst",
      quote: "Analysis is the bridge between questions and answers that matter.",
    },
  ]

  // Values data
  const values = [
    {
      title: "Transparency",
      description:
        "We believe in clear communication and honest business practices that build trust with our clients and service providers.",
      icon: <Eye />,
    },
    {
      title: "Quality",
      description:
        "We're committed to excellence in every aspect of our platform, from the professionals we verify to the user experience we deliver.",
      icon: <Award />,
    },
    {
      title: "Community",
      description:
        "We're building more than a platform—we're creating a community that connects people and strengthens local economies.",
      icon: <Users />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <GodRays />
      {/* Hero Section */}
      <ParallaxHero
        title="About ProLiink Connect"
        subtitle="Connecting skilled professionals with clients across Africa since 2024"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </ParallaxHero>

      {/* Our Story Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Story</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  ProLiink Connect was founded in 2024 with a simple yet powerful vision: to revolutionize how people
                  connect with service professionals. What began as a solution to the frustration of finding reliable
                  contractors has grown into a comprehensive platform that serves communities across Eastern Cape and
                  beyond.
                </p>
                <p className="text-muted-foreground">
                  We recognized two critical problems in the service industry: clients struggled to find trustworthy,
                  skilled professionals, while talented service providers lacked effective ways to market themselves and
                  grow their businesses. ProLiink Connect bridges this gap, creating a marketplace where quality,
                  reliability, and transparency are paramount.
                </p>
                <p className="text-muted-foreground">
                  Today, we're proud to be a leading platform in our market, with thousands of successful service
                  connections made through our platform. As we continue to grow, we remain committed to our core
                  mission: empowering both service providers and customers through technology that makes finding and
                  booking services simpler, safer, and more efficient than ever before.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Gradient border and shadow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00A3E0] to-[#4A4A4A] rounded-xl opacity-30 blur-xl"></div>

              {/* Image */}
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250519_0959_Professional%20Home%20Services_simple_compose_01jvkrr8ctf4ft0z41ss9dvhby-ZuJkIHvwUUNvAcrOmG0Whja0KV5RIg.png"
                  alt="ProLiink service professionals greeting a customer"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4A4A4A]">Our Mission & Values</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                At ProLiink Connect, we're guided by a set of core values that shape everything we do.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard
                key={value.title}
                title={value.title}
                description={value.description}
                icon={value.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Leadership Team Section */}
      <section className="relative w-full py-16 md:py-24 lg:py-32 bg-black text-white overflow-hidden">
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Leadership Team</h2>
              <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The passionate individuals driving ProLiink Connect's mission forward.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.name} name={member.name} role={member.role} quote={member.quote} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Team</h2>
              <p className="max-w-[700px] mx-auto md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're always looking for talented individuals who share our passion for connecting people and building
                innovative solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button size="lg" className="bg-white text-[#00A3E0] hover:bg-white/90">
                View Open Positions <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-6 bg-black text-white">
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

export const dbConfig = {
  // Database name used across the application
  dbName: 'proliink',
  
  // Collection names
  collections: {
    contacts: 'contacts',
  },
  
  // Connection options for both local and Atlas
  options: {
    connectTimeoutMS: 10000,
    retryWrites: true,
    maxPoolSize: 10
  }
}

// Function to get the correct MongoDB URI based on environment
export function getMongoURI(): string {
  // If MONGODB_URI is provided (like in production or when using Atlas), use it
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI
  }

  // For local development, construct the local URI
  const localURI = `mongodb://localhost:27017/${dbConfig.dbName}`
  return localURI
}

// Function to determine if we're using local or Atlas connection
export function isLocalConnection(uri: string): boolean {
  return uri.includes('localhost') || uri.includes('127.0.0.1')
}
