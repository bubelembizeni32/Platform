import { BookingForm } from "@/components/booking/BookingForm"

interface BookingPageProps {
  searchParams: {
    serviceId?: string
    serviceName?: string
  }
}

export default function BookingPage({ searchParams }: BookingPageProps) {
  return (
    <div className="container py-10 min-h-screen">
      <BookingForm
        serviceId={searchParams.serviceId}
        serviceName={searchParams.serviceName}
      />
    </div>
  )
} 