'use client'

import { useState, useRef, useEffect } from 'react'

export function ContactForm() {
  const [showServiceField, setShowServiceField] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  // Add effect to clear success message after 5 seconds
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (submitStatus === 'success') {
      timeoutId = setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000) // 5 seconds
    }

    // Cleanup timeout on unmount or when status changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [submitStatus])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      surname: formData.get('surname'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      location: formData.get('location'),
      postalCode: formData.get('postalCode'),
      province: formData.get('province'),
      userType: formData.get('userType'),
      service: formData.get('service'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitStatus('success')
      if (formRef.current) {
        formRef.current.reset()
      }
      setShowServiceField(false)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-gray-900 dark:text-gray-100">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="surname"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left"
          >
            Surname
          </label>
          <input
            id="surname"
            name="surname"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter your surname"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left"
        >
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label
            htmlFor="location"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left"
          >
            Location
          </label>
          <input
            id="location"
            name="location"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="City/Town"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="postalCode"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left"
          >
            Postal Code
          </label>
          <input
            id="postalCode"
            name="postalCode"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Postal Code"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="province"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left"
          >
            Province
          </label>
          <select
            id="province"
            name="province"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="">Select Province</option>
            <option value="Eastern Cape">Eastern Cape</option>
            <option value="Free State">Free State</option>
            <option value="Gauteng">Gauteng</option>
            <option value="KwaZulu-Natal">KwaZulu-Natal</option>
            <option value="Limpopo">Limpopo</option>
            <option value="Mpumalanga">Mpumalanga</option>
            <option value="Northern Cape">Northern Cape</option>
            <option value="North West">North West</option>
            <option value="Western Cape">Western Cape</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="userType"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left"
        >
          I am a
        </label>
        <select
          id="userType"
          name="userType"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
          onChange={(e) => setShowServiceField(e.target.value === 'professional')}
        >
          <option value="">Select Type</option>
          <option value="client">Client</option>
          <option value="professional">Professional</option>
        </select>
      </div>
      {showServiceField && (
        <div className="space-y-2">
          <label
            htmlFor="service"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left"
          >
            Service Offered
          </label>
          <input
            id="service"
            name="service"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter the service you offer"
          />
        </div>
      )}

      {submitStatus === 'success' && (
        <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg">
          Thank you for your submission! We'll get back to you soon.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
          There was an error submitting your form. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
} 