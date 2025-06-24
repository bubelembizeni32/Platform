"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Briefcase, Calendar, CreditCard, Star, ChevronRight, MessageCircle, Search, User, LogOut, Loader2, RefreshCw, CheckCircle, Smile, Phone, X, MapPin, HelpCircle, Mail, Lock, Filter, Check } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { generateMockServiceProviders } from "@/lib/mock-data"
import { ServiceProviderCard } from "@/components/service-provider-card"
import { ServiceProviderModal } from "@/components/service-provider-modal"
import { AuthenticatedView } from "@/components/auth/AuthenticatedView"
import { useAuth } from "@/components/auth/AuthContext"
import { LoginModal } from "@/components/auth/LoginModal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Add localStorage helpers
function getPersistedJourney() {
  try {
    return JSON.parse(localStorage.getItem('bookingJourney') || '{}');
  } catch { return {}; }
}
function setPersistedJourney(data: any) {
  localStorage.setItem('bookingJourney', JSON.stringify(data));
}

// Type definitions
type BookingDetails = {
  category?: string;
  service?: string;
  problem?: string;
  date?: string;
  time?: string;
  address?: string;
};

type PaymentForm = {
  method: 'card' | 'paypal' | 'apple' | 'google';
  useSaved: boolean;
  card: string;
  expiry: string;
  cvv: string;
  name: string;
};

type ServiceProgress = {
  status: 'in_progress' | 'completed';
  startedAt: string;
  completedAt: string | null;
};

type JourneyStep = 'waiting' | 'ongoing' | 'payment' | 'review' | 'done' | null;

// Update the User interface to match the auth context and include additional properties
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isServiceProvider?: boolean;
  profileImage?: string;
  fullName?: string; // Add fullName as an optional property
  [key: string]: any;
}

export default function ServiceProvidersPage() {
  const { isAuthenticated, logout, user } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || undefined;
  const service = searchParams.get('service') || undefined;
  const problem = searchParams.get('problem') || undefined;
  const fromSearch = searchParams.get('fromSearch');
  const dateISO = searchParams.get('date');
  const time = searchParams.get('time') || undefined;
  const address = searchParams.get('address') || undefined;
  let formattedDate = '';
  if (dateISO) {
    const d = new Date(dateISO);
    formattedDate = d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  const [providers, setProviders] = useState<any[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCycling, setIsCycling] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [acceptedProvider, setAcceptedProvider] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [journeyStep, setJourneyStep] = useState<JourneyStep>(null);
  const [reviewStars, setReviewStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const paymentInputRef = useRef<HTMLInputElement>(null);
  // Add chat, call, and payment state
  const [showChat, setShowChat] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [chatHistory, setChatHistory] = useState<string[]>(() => getPersistedJourney().chatHistory || [
    "Hi, I'm on my way!",
    "Thank you, looking forward to your service.",
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [paymentForm, setPaymentForm] = useState<PaymentForm>(() => getPersistedJourney().paymentForm || {
    method: 'card',
    useSaved: true,
    card: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [isPaying, setIsPaying] = useState(false);

  // Add new state for active view
  const [activeView, setActiveView] = useState<'chat' | 'location' | 'help'>('chat');
  
  // Add service progress state
  const [serviceProgress, setServiceProgress] = useState<ServiceProgress>({
    status: 'in_progress',
    startedAt: new Date().toISOString(),
    completedAt: null
  });

  const router = useRouter();

  // Persist journey state
  useEffect(() => {
    setPersistedJourney({
      journeyStep,
      chatHistory,
      reviewStars,
      reviewText,
      paymentForm,
      serviceProgress,
    });
  }, [journeyStep, chatHistory, reviewStars, reviewText, paymentForm, serviceProgress]);
  useEffect(() => {
    const persisted = getPersistedJourney();
    if (persisted.journeyStep) setJourneyStep(persisted.journeyStep);
    if (persisted.chatHistory) setChatHistory(persisted.chatHistory);
    if (persisted.reviewStars) setReviewStars(persisted.reviewStars);
    if (persisted.reviewText) setReviewText(persisted.reviewText);
    if (persisted.paymentForm) setPaymentForm(persisted.paymentForm);
    if (persisted.serviceProgress) setServiceProgress(persisted.serviceProgress);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Reset journey state when category changes
    if (category) {
      localStorage.removeItem('bookingJourney');
    }
    if (category) {
      const filteredProviders = generateMockServiceProviders(category);
      setProviders(filteredProviders);
    }
  }, [category]);

  // Handler for Decline
  const handleDecline = () => {
    setIsCycling(true);
    setTimeout(() => {
      setIsCycling(false);
      setCurrentIndex((prev) => prev + 1);
    }, 1500);
  };

  // Handler for Accept
  const handleAccept = () => {
    setAcceptedProvider(providers[currentIndex]);
    setShowConfirmModal(true);
  };

  // Handler for Confirm
  const handleConfirm = () => {
    setShowConfirmModal(false);
    setTimeout(() => {
      setJourneyStep('waiting');
      setTimeout(() => {
        setJourneyStep(null);
        setShowSuccess(true);
      }, 5000);
    }, 0);
  };

  // Handler for Loop Back
  const handleLoopBack = () => {
    setCurrentIndex(0);
    setShowSuccess(false);
  };

  // After booking is confirmed, start the journey
  const handleBookingConfirmed = () => {
    setShowSuccess(false);
    setJourneyStep('ongoing');
  };

  // Move createBookingDetails inside component to access state variables
  const createBookingDetails = (): BookingDetails => ({
    category,
    service,
    problem,
    date: formattedDate,
    time,
    address,
  });

  // Booking summary (from search params)
  const bookingSummary = (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
      <h3 className="font-semibold mb-2 text-lg flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-500" /> Booking Summary
      </h3>
      <div className="text-sm text-muted-foreground">
        <div><span className="font-medium">Category:</span> {category}</div>
        <div><span className="font-medium">Service:</span> {service}</div>
        <div><span className="font-medium">Problem:</span> {problem}</div>
      </div>
    </div>
  );

  // Provider card/modal for single-provider flow
  const renderProvider = () => {
    if (isCycling) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-16 h-16 animate-spin text-blue-500 mb-6" />
          <div className="text-xl font-medium text-center mb-2">Searching for the next best provider...</div>
          <div className="text-muted-foreground">Matching your requirements with available professionals.</div>
        </div>
      );
    }
    if (currentIndex >= providers.length) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-3xl mb-4">😔</div>
          <div className="text-xl font-semibold mb-2">No more providers available</div>
          <div className="text-muted-foreground mb-6">You've seen all available providers for this request.</div>
          <Button onClick={handleLoopBack} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600">
            <RefreshCw className="w-4 h-4" /> Try Again
          </Button>
        </div>
      );
    }
    const provider = providers[currentIndex];
    return (
      <div className="max-w-2xl mx-auto">
        <ServiceProviderCard
          provider={provider}
          onViewDetails={() => setSelectedProvider(provider)}
        />
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={handleDecline}
            className="px-8 border-red-200 text-red-500 hover:bg-red-50"
          >
            Decline
          </Button>
          <Button
            onClick={handleAccept}
            className="px-8 bg-blue-500 hover:bg-blue-600"
          >
            Accept
          </Button>
        </div>
      </div>
    );
  };

  // Confirmation modal
  const renderConfirmModal = () => {
    if (!acceptedProvider) return null;
    return (
      <ServiceProviderModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        provider={acceptedProvider}
        onAccept={handleConfirm}
        onDecline={() => {
          setAcceptedProvider(null);
          setShowConfirmModal(false);
          setIsCycling(true);
          setTimeout(() => {
            setIsCycling(false);
            setCurrentIndex((prev) => prev + 1);
          }, 1500);
        }}
        onConfirm={handleConfirm}
        bookingDetails={createBookingDetails()}
      />
    );
  };

  // Stepper component
  const Stepper = ({ step }: { step: number }) => (
    <div className="flex items-center justify-center gap-4 mb-6">
      {["Ongoing", "Payment", "Review"].map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${step === i ? 'bg-blue-500 scale-110 shadow-lg' : step > i ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}>{i + 1}</div>
          <span className={`text-sm font-medium ${step === i ? 'text-blue-600' : 'text-muted-foreground'}`}>{label}</span>
          {i < 2 && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
        </div>
      ))}
    </div>
  );

  // Waiting Modal
  const renderWaitingModal = () => (
    <Dialog open={journeyStep === 'waiting'}>
      <DialogContent className="max-w-md text-center flex flex-col items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-blue-500 mb-6" />
        <DialogTitle className="mb-2">Waiting for Provider Confirmation</DialogTitle>
        <DialogDescription className="mb-4">Your booking has been sent. Please wait while the provider accepts your request.</DialogDescription>
        <div className="text-muted-foreground text-sm">This usually takes a few seconds...</div>
      </DialogContent>
    </Dialog>
  );

  // Ongoing Modal (with Message/Call)
  const renderOngoingModal = () => (
    <Dialog open={journeyStep === 'ongoing'}>
      <DialogContent className="max-w-6xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">Service in Progress</DialogTitle>
        {/* Step Tracker */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <Stepper step={0} />
        </div>

        <div className="flex flex-col lg:flex-row h-[80vh]">
          {/* Left Section - Dynamic Content (60%) */}
          <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-800">
            {/* Provider Status Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={acceptedProvider?.avatar} alt={acceptedProvider?.name} />
                    <AvatarFallback>{acceptedProvider?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{acceptedProvider?.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                        <span>On the way</span>
                      </div>
                      <span>•</span>
                      <span>ETA: 15 mins</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowCall(true)}
                    className="rounded-full"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setActiveView('chat')}
                    className="rounded-full"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Dynamic Content Area */}
            <div className="flex-1 overflow-y-auto">
              {activeView === 'chat' && (
                <div className="p-4 space-y-4">
                  {chatHistory.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          index % 2 === 0
                            ? 'bg-gray-100 dark:bg-gray-800'
                            : 'bg-blue-500 text-white'
                        }`}
                      >
                        {message}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeView === 'location' && (
                <div className="h-full flex flex-col">
                  <div className="relative h-[300px] bg-gray-100 dark:bg-gray-800">
                    <img
                      src="/images/map-placeholder.jpg"
                      alt="Location Map"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg">
                        <h3 className="font-semibold mb-2">Current Location</h3>
                        <p className="text-sm text-muted-foreground">{address}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold mb-2">Provider's Location</h3>
                      <p className="text-sm text-muted-foreground">Provider is currently 2.5 km away</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">Moving towards your location</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold mb-2">Estimated Arrival</h3>
                      <p className="text-sm text-muted-foreground">15 minutes</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm">On schedule</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeView === 'help' && (
                <div className="p-4 space-y-4">
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold mb-4">How can we help you?</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" onClick={() => setShowChat(true)}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat with Support
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Support
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Support
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-3">
                      {[
                        "What if the provider is late?",
                        "How do I cancel my booking?",
                        "What if I need to change the service?",
                        "How do I report an issue?"
                      ].map((question, index) => (
                        <div key={index} className="border-b border-gray-200 dark:border-gray-800 last:border-0 pb-3 last:pb-0">
                          <button
                            className="w-full text-left text-sm hover:text-blue-500 transition-colors"
                            onClick={() => setShowChat(true)}
                          >
                            {question}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input (only show in chat view) */}
            {activeView === 'chat' && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      if (chatInput.trim()) {
                        setChatHistory([...chatHistory, chatInput]);
                        setChatInput('');
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Send
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Booking Details & Actions (40%) */}
          <div className="w-full lg:w-[40%] flex flex-col">
            {/* Booking Summary */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold mb-3">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium">{service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date & Time</span>
                  <span className="font-medium">{formattedDate}, {time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{address}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setShowCall(true)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Provider
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setActiveView('chat')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveView('location')}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  View Location
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveView('help')}
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Get Help
                </Button>
              </div>
            </div>

            {/* Job Completion Button */}
            <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800">
              <Button 
                className="w-full h-12 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white"
                onClick={() => {
                  setServiceProgress({
                    ...serviceProgress,
                    status: 'completed',
                    completedAt: new Date().toISOString()
                  });
                  setTimeout(() => setJourneyStep('payment'), 1000);
                }}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Job Completed
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Call Modal
  const renderCallModal = () => (
    <Dialog open={showCall} onOpenChange={setShowCall}>
      <DialogContent className="max-w-xs flex flex-col items-center justify-center text-center">
        <Avatar className="h-20 w-20 mb-4">
          <AvatarImage src={providers[currentIndex]?.avatar} alt={providers[currentIndex]?.name} />
          <AvatarFallback>{providers[currentIndex]?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <DialogTitle className="mb-2">Calling {providers[currentIndex]?.name}...</DialogTitle>
        <div className="mb-4 text-muted-foreground">Connecting<span className="animate-pulse">...</span></div>
        <Button variant="destructive" className="w-full" onClick={() => { setShowCall(false); setIsCalling(false); }}>Hang Up</Button>
      </DialogContent>
    </Dialog>
  );

  // Payment Modal
  const renderPaymentModal = () => {
    const baseAmount = providers[currentIndex]?.averagePrice || 0;
    const transactionFee = baseAmount * 0.05; // 5% transaction fee
    const calloutFee = 25; // Example callout fee
    const totalAmount = baseAmount + transactionFee + calloutFee;

    const handlePayment = (e: React.FormEvent) => {
      e.preventDefault();
      setIsPaying(true);
      // Simulate payment processing
      setTimeout(() => {
        setIsPaying(false);
        setJourneyStep('review');
      }, 2000);
    };

    return (
      <Dialog open={journeyStep === 'payment'}>
        <DialogContent className="max-w-6xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">Complete Payment</DialogTitle>
          {/* Step Tracker */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <Stepper step={1} />
          </div>

          <div className="flex flex-col lg:flex-row h-[80vh]">
            {/* Left Section - Payment Summary (60%) */}
            <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-800">
              {/* Provider Info Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={acceptedProvider?.avatar} alt={acceptedProvider?.name} />
                      <AvatarFallback>{acceptedProvider?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{acceptedProvider?.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                          <span>Service Completed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Ready for Payment
                  </Badge>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                    <h3 className="text-xl font-semibold mb-4">Payment Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
                        <div>
                          <p className="font-medium">Base Service Fee</p>
                          <p className="text-sm text-muted-foreground">Standard service charge</p>
                        </div>
                        <span className="font-semibold">R{baseAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
                        <div>
                          <p className="font-medium">Transaction Fee</p>
                          <p className="text-sm text-muted-foreground">5% processing fee</p>
                        </div>
                        <span className="font-semibold">R{transactionFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
                        <div>
                          <p className="font-medium">Callout Fee</p>
                          <p className="text-sm text-muted-foreground">Travel and setup costs</p>
                        </div>
                        <span className="font-semibold">R{calloutFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <div>
                          <p className="font-medium">Total Amount</p>
                          <p className="text-sm text-muted-foreground">Including all fees</p>
                        </div>
                        <span className="text-xl font-bold text-green-600">R{totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                    <h3 className="text-xl font-semibold mb-4">Service Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service Type</span>
                        <span className="font-medium">{service}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date & Time</span>
                        <span className="font-medium">{formattedDate}, {time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location</span>
                        <span className="font-medium">{address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Payment Methods (40%) */}
            <div className="w-full lg:w-[40%] flex flex-col">
              {/* Payment Methods */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={paymentForm.method === 'card' ? 'default' : 'outline'}
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => handlePaymentFormChange('method', 'card')}
                  >
                    <CreditCard className="h-6 w-6" />
                    <span>Credit Card</span>
                  </Button>
                  <Button
                    variant={paymentForm.method === 'paypal' ? 'default' : 'outline'}
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => handlePaymentFormChange('method', 'paypal')}
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.067 8.478c.492.315.844.825.844 1.522 0 1.845-1.534 3.373-3.373 3.373h-.674c-.315 0-.674.315-.674.674v1.348c0 .315-.315.674-.674.674h-1.348c-.315 0-.674-.315-.674-.674v-1.348c0-.315-.315-.674-.674-.674h-.674c-1.839 0-3.373-1.528-3.373-3.373 0-.697.352-1.207.844-1.522.315-.315.844-.315 1.159 0 .315.315.844.315 1.159 0 .315-.315.844-.315 1.159 0 .315.315.844.315 1.159 0z"/>
                    </svg>
                    <span>PayPal</span>
                  </Button>
                  <Button
                    variant={paymentForm.method === 'apple' ? 'default' : 'outline'}
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => handlePaymentFormChange('method', 'apple')}
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.07 2.7.61 3.44 1.57-3.14 1.88-2.29 5.13.22 6.41-.65 1.29-1.51 2.58-2.25 4.05zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <span>Apple Pay</span>
                  </Button>
                  <Button
                    variant={paymentForm.method === 'google' ? 'default' : 'outline'}
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => handlePaymentFormChange('method', 'google')}
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
                    </svg>
                    <span>Google Pay</span>
                  </Button>
                </div>
              </div>

              {/* Payment Form */}
              <div className="flex-1 overflow-y-auto p-6">
                {paymentForm.method === 'card' ? (
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <input 
                        type="checkbox" 
                        id="useSaved" 
                        checked={paymentForm.useSaved} 
                        onChange={e => handlePaymentFormChange('useSaved', e.target.checked)} 
                      />
                      <label htmlFor="useSaved" className="text-sm">Use saved card (**** 1234)</label>
                    </div>
                    
                    {!paymentForm.useSaved && (
                      <div className="space-y-4">
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input 
                            className="w-full rounded-lg border-2 pl-10 pr-4 py-3 bg-background focus:border-blue-500" 
                            placeholder="Card Number" 
                            maxLength={19} 
                            value={paymentForm.card} 
                            onChange={e => handlePaymentFormChange('card', e.target.value)} 
                            required 
                          />
                        </div>
                        <div className="flex gap-3">
                          <input 
                            className="rounded-lg border-2 px-4 py-3 bg-background focus:border-blue-500 flex-1" 
                            placeholder="MM/YY" 
                            maxLength={5} 
                            value={paymentForm.expiry} 
                            onChange={e => handlePaymentFormChange('expiry', e.target.value)} 
                            required 
                          />
                          <div className="relative flex-1">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <input 
                              className="w-full rounded-lg border-2 pl-10 pr-4 py-3 bg-background focus:border-blue-500" 
                              placeholder="CVV" 
                              maxLength={4} 
                              value={paymentForm.cvv} 
                              onChange={e => handlePaymentFormChange('cvv', e.target.value)} 
                              required 
                            />
                          </div>
                        </div>
                        <input 
                          className="w-full rounded-lg border-2 px-4 py-3 bg-background focus:border-blue-500" 
                          placeholder="Name on Card" 
                          value={paymentForm.name} 
                          onChange={e => handlePaymentFormChange('name', e.target.value)} 
                          required 
                        />
                      </div>
                    )}

                    {/* Security Notice */}
                    <div className="flex items-start gap-2 text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                      <Lock className="h-4 w-4 mt-0.5" />
                      <p>Your payment information is encrypted and secure. We never store your full card details.</p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-semibold bg-blue-500 hover:bg-blue-600" 
                      disabled={isPaying}
                    >
                      {isPaying ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          Pay R{totalAmount.toFixed(2)}
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-6">
                      You will be redirected to {paymentForm.method === 'paypal' ? 'PayPal' : 
                        paymentForm.method === 'apple' ? 'Apple Pay' : 'Google Pay'} to complete your payment.
                    </p>
                    <Button 
                      className="w-full h-12 text-lg font-semibold bg-blue-500 hover:bg-blue-600"
                      onClick={() => {
                        setIsPaying(true);
                        setTimeout(() => {
                          setIsPaying(false);
                          setJourneyStep('review');
                        }, 2000);
                      }}
                      disabled={isPaying}
                    >
                      {isPaying ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          {paymentForm.method === 'paypal' ? <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M20.067 8.478c.492.315.844.825.844 1.522 0 1.845-1.534 3.373-3.373 3.373h-.674c-.315 0-.674.315-.674.674v1.348c0 .315-.315.674-.674.674h-1.348c-.315 0-.674-.315-.674-.674v-1.348c0-.315-.315-.674-.674-.674h-.674c-1.839 0-3.373-1.528-3.373-3.373 0-.697.352-1.207.844-1.522.315-.315.844-.315 1.159 0 .315.315.844.315 1.159 0 .315-.315.844-.315 1.159 0 .315.315.844.315 1.159 0z"/></svg> :
                          paymentForm.method === 'apple' ? <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.07 2.7.61 3.44 1.57-3.14 1.88-2.29 5.13.22 6.41-.65 1.29-1.51 2.58-2.25 4.05zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg> :
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/></svg>}
                          Pay R{totalAmount.toFixed(2)} with {paymentForm.method === 'paypal' ? 'PayPal' : 
                            paymentForm.method === 'apple' ? 'Apple Pay' : 'Google Pay'}
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // Review Modal
  const renderReviewModal = () => (
    <Dialog open={journeyStep === 'review'}>
      <DialogContent className="max-w-md">
        <Stepper step={2} />
        <DialogTitle className="mb-2 flex items-center gap-2"><Smile className="w-6 h-6 text-yellow-400" /> Rate Your Provider</DialogTitle>
        <DialogDescription className="mb-4">How was your experience with {providers[currentIndex]?.name}?</DialogDescription>
        <div className="flex items-center justify-center gap-1 mb-4">
          {[1,2,3,4,5].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 cursor-pointer transition-all ${reviewStars >= star ? 'fill-yellow-400 text-yellow-400 scale-110' : 'fill-gray-200 text-gray-300'}`}
              onClick={() => setReviewStars(star)}
            />
          ))}
        </div>
        <textarea
          className="w-full rounded-lg border-2 px-4 py-3 bg-background transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 mb-4"
          rows={3}
          placeholder="Leave a review (optional)"
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
        />
        <Button className="w-full mt-2 bg-blue-500 hover:bg-blue-600" onClick={() => setJourneyStep('done')} disabled={reviewStars === 0}>Submit Review</Button>
      </DialogContent>
    </Dialog>
  );

  // Done Modal
  const renderDoneModal = () => {
    const handleClose = () => {
      setJourneyStep(null);
      router.push('/');
    };

    return (
      <Dialog open={journeyStep === 'done'}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">Booking Complete</DialogTitle>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your review has been submitted successfully. We appreciate your feedback!
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // Success message
  const renderSuccess = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
      <div className="text-2xl font-semibold mb-2">Booking Confirmed!</div>
      <div className="text-muted-foreground mb-6 text-center">
        You have successfully booked <span className="font-bold">{acceptedProvider?.name}</span>.<br />
        They will be notified and will contact you soon.
      </div>
      <Button onClick={handleBookingConfirmed} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600">
        Track My Booking
      </Button>
    </div>
  );

  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating'>('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Sort providers based on selected option
  const sortedProviders = [...providers].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.averagePrice - b.averagePrice;
      case 'price_desc':
        return b.averagePrice - a.averagePrice;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Fix the handleClose function
  const handleClose = () => {
    setJourneyStep(null);
    router.push('/');
  };

  // Fix the payment form handlers
  const handlePaymentFormChange = (field: keyof PaymentForm, value: any) => {
    setPaymentForm(prev => ({ ...prev, [field]: value }));
  };

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
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.profileImage || ""} alt={user?.fullName || user?.name || "User"} />
                      <AvatarFallback className="bg-[#00A3E0]/10">
                        <User className="h-5 w-5 text-[#00A3E0]" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {(user?.fullName || user?.name) && (
                        <p className="font-medium">{user.fullName || user.name}</p>
                      )}
                      {user?.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-600 cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost"
                onClick={() => setShowLoginModal(true)}
                className="text-[#00A3E0] hover:text-[#00A3E0]/80"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {fromSearch ? (
          <div className="container py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Service Providers</h1>
              {category && service && problem && (
                <p className="text-muted-foreground">
                  Showing results for {service} services in {category} category - {problem}
                </p>
              )}
            </div>
            <AuthenticatedView providerCount={providers.length}>
              {showSuccess
                ? renderSuccess()
                : renderProvider()}
              {renderConfirmModal()}
              {renderWaitingModal()}
              {renderOngoingModal()}
              {renderCallModal()}
              {renderPaymentModal()}
              {renderReviewModal()}
              {renderDoneModal()}
              {/* Details modal for provider profile */}
              {selectedProvider && (
                <ServiceProviderModal
                  isOpen={!!selectedProvider}
                  onClose={() => setSelectedProvider(null)}
                  provider={selectedProvider}
                  onAccept={undefined}
                  onDecline={() => {
                    setSelectedProvider(null);
                    setIsCycling(true);
                    setTimeout(() => {
                      setIsCycling(false);
                      setCurrentIndex((prev) => prev + 1);
                    }, 1500);
                  }}
                  onConfirm={() => {
                    setSelectedProvider(null);
                    setShowSuccess(true);
                  }}
                  bookingDetails={{
                    category,
                    service,
                    problem,
                    date: formattedDate,
                    time,
                    address,
                  }}
                />
              )}
            </AuthenticatedView>
          </div>
        ) : (
          <>
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
                      Grow Your Business with ProL<span className="text-[#00A3E0]">ii</span>nk Co
                      <span className="text-[#00A3E0]">nn</span>ect
                    </h1>
                    <p className="text-xl text-muted-foreground">
                      Join a trusted network of service professionals and get matched with real clients near you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      
                      <Button size="lg" variant="outline" className="bg-white text-[#00A3E0] hover:bg-[#0089BD] text-black" asChild>
                        <Link href="/how-it-works">Learn How It Works</Link>
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
                        src="/images/proliink%20meet.png"
                        alt="Service provider receiving job notification"
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#00A3E0]/20 to-transparent"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
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
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Join ProLiink Connect?</h2>
                    <p className="max-w-[700px] text-muted-foreground">
                      Our platform is designed to help service providers like you grow their business and increase income.
                    </p>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      icon: <Briefcase className="h-12 w-12 text-[#00A3E0]" />,
                      title: "Steady Work Opportunities",
                      description: "Get job requests from real clients in your area—no cold calling needed.",
                    },
                    {
                      icon: <CreditCard className="h-12 w-12 text-[#00A3E0]" />,
                      title: "Verified Payments",
                      description: "Get paid quickly and securely through our platform.",
                    },
                    {
                      icon: <Star className="h-12 w-12 text-[#00A3E0]" />,
                      title: "Build Your Reputation",
                      description: "Earn reviews, boost your profile, and attract more clients.",
                    },
                    {
                      icon: <Calendar className="h-12 w-12 text-[#00A3E0]" />,
                      title: "Work on Your Terms",
                      description: "Choose the jobs you want, when you want them.",
                    },
                  ].map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="mb-4">{benefit.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
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
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Providers Say</h2>
                    <p className="max-w-[700px] text-muted-foreground">
                      Hear from service professionals who have grown their business with ProLiink Connect.
                    </p>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      quote:
                        "ProLiink helped me double my monthly bookings. Clients are easier to deal with and payments come through fast.",
                      name: "Sipho Ndlovu",
                      role: "Electrician",
                    },
                    {
                      quote:
                        "I've been able to grow my plumbing business without spending on advertising. The platform brings me quality clients.",
                      name: "Thabo Molefe",
                      role: "Plumber",
                    },
                    {
                      quote:
                        "As a handyman, I love the flexibility. I can choose jobs that fit my schedule and skills, and the payment process is seamless.",
                      name: "John Smith",
                      role: "Handyman",
                    },
                  ].map((testimonial, index) => (
                    <motion.div
                      key={testimonial.name}
                      className="flex flex-col space-y-4 rounded-lg border p-6 shadow-sm bg-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 fill-current text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground">"{testimonial.quote}"</p>
                      <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div>
                          <p className="text-sm font-medium">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
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
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Ready to take control of your schedule and grow your income?
                    </h2>
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
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Talk to Our Team <MessageCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      
      {selectedProvider && (
        <ServiceProviderModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          provider={selectedProvider}
          onAccept={undefined}
          onDecline={() => {
            setSelectedProvider(null);
            setIsCycling(true);
            setTimeout(() => {
              setIsCycling(false);
              setCurrentIndex((prev) => prev + 1);
            }, 1500);
          }}
          onConfirm={() => {
            setSelectedProvider(null);
            setShowSuccess(true);
          }}
          bookingDetails={{
            category,
            service,
            problem,
            date: formattedDate,
            time,
            address,
          }}
        />
      )}

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
