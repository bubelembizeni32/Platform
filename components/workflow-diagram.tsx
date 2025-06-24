"use client"

import { motion } from "framer-motion"
import { User, Building, Wrench, ArrowRight } from "lucide-react"

export function WorkflowDiagram() {
  return (
    <div className="relative py-8">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="w-[80%] h-[80%] border-2 border-dashed border-[#00A3E0]/30 rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <User className="h-8 w-8 text-[#00A3E0]" />
          </div>
          <h3 className="text-xl font-bold mb-2">Client</h3>
          <p className="text-muted-foreground">
            Posts job requests, communicates requirements, and pays securely through the platform.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <Building className="h-8 w-8 text-[#00A3E0]" />
          </div>
          <h3 className="text-xl font-bold mb-2">ProLiink Connect</h3>
          <p className="text-muted-foreground">
            Matches clients with providers, handles payments, and ensures quality service delivery.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <Wrench className="h-8 w-8 text-[#00A3E0]" />
          </div>
          <h3 className="text-xl font-bold mb-2">Service Provider</h3>
          <p className="text-muted-foreground">
            Receives job requests, delivers quality service, and builds reputation through reviews.
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[85%] h-[85%] flex items-center justify-center"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <ArrowRight className="absolute text-[#00A3E0]/30 h-8 w-8" style={{ right: "5%", top: "50%" }} />
          <ArrowRight className="absolute text-[#00A3E0]/30 h-8 w-8" style={{ left: "30%", bottom: "10%" }} />
          <ArrowRight className="absolute text-[#00A3E0]/30 h-8 w-8" style={{ left: "30%", top: "10%" }} />
        </motion.div>
      </div>
    </div>
  )
}
