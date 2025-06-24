"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQ[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="border rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <button
            className="flex items-center justify-between w-full p-4 text-left bg-card hover:bg-muted/50 transition-colors"
            onClick={() => toggleFAQ(index)}
            aria-expanded={openIndex === index}
          >
            <span className="font-medium">{faq.question}</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${openIndex === index ? "transform rotate-180" : ""}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 p-4" : "max-h-0"
            }`}
          >
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
