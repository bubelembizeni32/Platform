"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle, XCircle, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ServiceProviderCardProps {
  provider: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    completedJobs: number;
    specializations: string[];
    averagePrice: number;
    isOnline: boolean;
    bio: string;
  };
  onViewDetails: () => void;
}

export function ServiceProviderCard({ provider, onViewDetails }: ServiceProviderCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Header with Avatar and Online Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={provider.avatar} alt={provider.name} />
              <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1">
              {provider.isOnline ? (
                <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Available
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-gray-500 hover:bg-gray-600">
                  <XCircle className="h-3 w-3 mr-1" />
                  Offline
                </Badge>
              )}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{provider.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{provider.rating.toFixed(1)}</span>
              <span>({provider.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Completed Jobs */}
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Briefcase className="h-4 w-4" />
        <span>{provider.completedJobs} jobs completed</span>
      </div>

      {/* Specializations */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {provider.specializations.map((spec, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {spec}
            </Badge>
          ))}
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {provider.bio}
      </p>

      {/* Price and Action */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-lg font-semibold">
          From <span className="text-2xl font-bold text-green-500">R{provider.averagePrice}</span>
          <span className="text-sm text-muted-foreground">/job</span>
        </div>
        <Button onClick={onViewDetails} className="bg-blue-500 hover:bg-blue-600">
          View Details
        </Button>
      </div>
    </motion.div>
  );
} 