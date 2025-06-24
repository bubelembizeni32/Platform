"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, X, MessageCircle, Calendar, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface ServiceProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: any; // Replace with proper type when mock data is created
  onAccept?: () => void;
  onDecline?: () => void;
  onConfirm?: () => void;
  bookingDetails?: {
    category?: string;
    service?: string;
    problem?: string;
    date?: string;
    time?: string;
    address?: string;
  };
}

export function ServiceProviderModal({ isOpen, onClose, provider, onAccept, onDecline, onConfirm, bookingDetails }: ServiceProviderModalProps) {
  const [showSummary, setShowSummary] = useState(false);
  if (!provider) return null;

  const handleAccept = () => {
    if (onAccept) onAccept();
    setShowSummary(true);
  };
  const handleDecline = () => {
    setShowSummary(false);
    if (onDecline) onDecline();
    onClose();
  };
  const handleConfirm = () => {
    setShowSummary(false);
    if (onConfirm) onConfirm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={provider.avatar} alt={provider.name} />
                <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl mb-2">{provider.name}</DialogTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-semibold">{provider.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-muted-foreground">
                    ({provider.reviewCount} reviews)
                  </span>
                  <Badge variant="secondary" className="ml-2">
                    {provider.completedJobs} jobs completed
                  </Badge>
                </div>
                <div className="mt-2 text-lg font-semibold">
                  From <span className="text-2xl font-bold text-green-500">R{provider.averagePrice}</span>/job
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        {showSummary && bookingDetails ? (
          <div className="flex flex-col lg:flex-row h-[80vh]">
            {/* Left Section - Payment Summary (60%) */}
            <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-800 justify-center items-center">
              {/* Payment Summary */}
              {provider && (
                (() => {
                  const baseAmount = provider.averagePrice || 0;
                  const transactionFee = baseAmount * 0.05;
                  const calloutFee = 25;
                  const totalAmount = baseAmount + transactionFee + calloutFee;
                  return (
                    <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 mx-auto">
                      <h3 className="text-xl font-semibold mb-6 text-left">Payment Summary</h3>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                        <span className="flex flex-col items-end text-right">
                          <span className="">Base Service Fee</span>
                          <span className="text-xs text-muted-foreground">Standard service charge</span>
                        </span>
                        <span className="font-semibold text-left flex items-center">R{baseAmount.toFixed(2)}</span>
                        <span className="flex flex-col items-end text-right">
                          <span className="">Transaction Fee</span>
                          <span className="text-xs text-muted-foreground">5% processing fee</span>
                        </span>
                        <span className="font-semibold text-left flex items-center">R{transactionFee.toFixed(2)}</span>
                        <span className="flex flex-col items-end text-right">
                          <span className="">Callout Fee</span>
                          <span className="text-xs text-muted-foreground">Travel and setup costs</span>
                        </span>
                        <span className="font-semibold text-left flex items-center">R{calloutFee.toFixed(2)}</span>
                        <span className="text-muted-foreground text-right">&nbsp;</span>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground mb-1">Including all fees</span>
                          <span className="text-2xl font-bold text-green-600">R{totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>

            {/* Right Section - Booking Summary (40%) */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center items-center">
              {/* Booking Summary */}
              <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 mx-auto">
                <h3 className="text-xl font-semibold mb-6 text-left">Booking Summary</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  <span className="text-muted-foreground text-right">Category</span>
                  <span className="font-semibold text-left">{bookingDetails.category}</span>
                  <span className="text-muted-foreground text-right">Service</span>
                  <span className="font-semibold text-left">{bookingDetails.service}</span>
                  <span className="text-muted-foreground text-right">Issue</span>
                  <span className="font-semibold text-left">{bookingDetails.problem}</span>
                  <span className="text-muted-foreground text-right">Date & Time</span>
                  <span className="font-semibold text-left">{bookingDetails.date}, {bookingDetails.time}</span>
                  <span className="text-muted-foreground text-right">Location</span>
                  <span className="font-semibold text-left">{bookingDetails.address}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Tabs defaultValue="about" className="mt-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Bio</h3>
                  <p className="text-muted-foreground">{provider.bio}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.specializations.map((spec: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.certifications?.map((cert: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-blue-500" />
                        <span>{cert.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="portfolio" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {provider.portfolio?.map((work: any, index: number) => (
                    <div key={index} className="space-y-4">
                      <h3 className="font-semibold">{work.title}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Before</p>
                          <img
                            src={work.beforeImage}
                            alt="Before"
                            className="rounded-lg w-full h-48 object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">After</p>
                          <img
                            src={work.afterImage}
                            alt="After"
                            className="rounded-lg w-full h-48 object-cover"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{work.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {provider.reviews?.map((review: any, index: number) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.avatar} alt={review.name} />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{review.name}</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                      <p className="text-sm text-muted-foreground mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="availability" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {provider.workingHours?.map((day: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{day.day}</span>
                          <span className="text-muted-foreground">{day.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Service Area</h3>
                    <p className="text-muted-foreground">{provider.serviceArea}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-6 flex items-center justify-end gap-4">
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
          </>
        )}

        {/* Confirm Button - Bottom spanning both columns (only for booking summary) */}
        {showSummary && bookingDetails && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <Button
              onClick={handleConfirm}
              className="w-full h-12 text-lg font-semibold bg-green-500 hover:bg-green-600"
            >
              Confirm & Book This Provider
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 