"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Upload, MapPin, Calendar as CalendarIcon, Clock, HelpCircle, Loader2, Search, Edit2, CheckCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/components/auth/AuthContext";
import { AuthenticatedView } from "@/components/auth/AuthenticatedView";
// @ts-ignore
import debounce from "lodash.debounce";

// Sample categories and services with common problems
const categories = [
  { 
    label: "Electrical", 
    value: "electrical", 
    services: [
      {
        name: "Wiring",
        problems: [
          "Frequent power outages",
          "Flickering lights",
          "Circuit overload",
          "Burning smell from outlets",
          "Other"
        ]
      },
      {
        name: "Lighting",
        problems: [
          "Light fixtures not working",
          "Dimmer switch issues",
          "LED compatibility problems",
          "Motion sensor malfunction",
          "Other"
        ]
      },
      {
        name: "Repairs",
        problems: [
          "Faulty outlets",
          "Broken switches",
          "Electrical panel issues",
          "Short circuits",
          "Other"
        ]
      }
    ]
  },
  { 
    label: "Plumbing", 
    value: "plumbing", 
    services: [
      {
        name: "Leak Fix",
        problems: [
          "Dripping faucet",
          "Pipe leak under sink",
          "Toilet leaking at base",
          "Water heater leakage",
          "Other"
        ]
      },
      {
        name: "Installations",
        problems: [
          "New faucet installation",
          "Toilet installation",
          "Water heater installation",
          "Shower/bathtub installation",
          "Other"
        ]
      },
      {
        name: "Unclogging",
        problems: [
          "Blocked sink drain",
          "Clogged toilet",
          "Slow draining bathtub",
          "Main line blockage",
          "Other"
        ]
      }
    ]
  },
  { 
    label: "Home cleaning", 
    value: "cleaning", 
    services: [
      {
        name: "Deep Clean",
        problems: [
          "Full house deep cleaning",
          "Move-in/move-out cleaning",
          "Post-construction cleanup",
          "Spring cleaning",
          "Other"
        ]
      },
      {
        name: "Regular Clean",
        problems: [
          "Weekly house cleaning",
          "Bi-weekly cleaning",
          "Monthly maintenance",
          "Specific room cleaning",
          "Other"
        ]
      },
      {
        name: "Move-out Clean",
        problems: [
          "End of lease cleaning",
          "Bond cleaning",
          "Carpet deep cleaning",
          "Window cleaning",
          "Other"
        ]
      }
    ]
  },
  { 
    label: "Painting", 
    value: "painting", 
    services: [
      {
        name: "Interior",
        problems: [
          "Full house painting",
          "Single room painting",
          "Wall repairs and painting",
          "Ceiling painting",
          "Other"
        ]
      },
      {
        name: "Exterior",
        problems: [
          "House exterior painting",
          "Fence/gate painting",
          "Deck/patio painting",
          "Weather damage repair",
          "Other"
        ]
      },
      {
        name: "Touch-up",
        problems: [
          "Small area touch-ups",
          "Scratch/dent repairs",
          "Color matching",
          "Spot fixes",
          "Other"
        ]
      }
    ]
  },
  { 
    label: "Gardening", 
    value: "gardening", 
    services: [
      {
        name: "Lawn Care",
        problems: [
          "Regular lawn mowing",
          "Grass fertilization",
          "Weed control",
          "Lawn disease treatment",
          "Other"
        ]
      },
      {
        name: "Landscaping",
        problems: [
          "Garden design",
          "Plant installation",
          "Mulching service",
          "Hardscape installation",
          "Other"
        ]
      },
      {
        name: "Tree Service",
        problems: [
          "Tree trimming",
          "Tree removal",
          "Stump grinding",
          "Disease treatment",
          "Other"
        ]
      }
    ]
  },
  { 
    label: "Hair", 
    value: "hair", 
    services: [
      {
        name: "Cut",
        problems: [
          "Regular haircut",
          "Style change",
          "Split ends trim",
          "Kids haircut",
          "Other"
        ]
      },
      {
        name: "Style",
        problems: [
          "Special occasion styling",
          "Blowout",
          "Hair treatment",
          "Extensions",
          "Other"
        ]
      },
      {
        name: "Color",
        problems: [
          "Full color",
          "Highlights/lowlights",
          "Balayage",
          "Color correction",
          "Other"
        ]
      }
    ]
  },
  { 
    label: "Spa", 
    value: "spa", 
    services: [
      {
        name: "Massage",
        problems: [
          "Full body massage",
          "Deep tissue massage",
          "Sports massage",
          "Relaxation massage",
          "Other"
        ]
      },
      {
        name: "Facial",
        problems: [
          "Deep cleansing facial",
          "Anti-aging treatment",
          "Acne treatment",
          "Hydrating facial",
          "Other"
        ]
      },
      {
        name: "Manicure",
        problems: [
          "Basic manicure",
          "Gel manicure",
          "Nail repair",
          "Nail art",
          "Other"
        ]
      }
    ]
  }
];

type FormDataType = {
  category: string;
  service: string;
  problem: string;
  additionalDetails: string;
  address: string;
  date: Date | null;
  time: string;
  image: File | null;
};

const defaultValues: FormDataType = {
  category: "",
  service: "",
  problem: "",
  additionalDetails: "",
  address: "",
  date: null,
  time: "",
  image: null,
};

function isAuthenticated() {
  // Placeholder: Replace with your actual auth logic
  return false;
}

const steps = [
  { title: "Service", description: "Choose your service" },
  { title: "Details", description: "Describe your needs" },
  { title: "Schedule", description: "Pick date & location" },
  { title: "Photos", description: "Add photos (optional)" },
  { title: "Book", description: "Complete booking" },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0
  })
};

// Add this mock data for South African locations
const mockSouthAfricanLocations = [
  {
    display_name: "Johannesburg, Gauteng, South Africa",
    place_id: "1",
    osm_id: "1",
    lat: "-26.2041",
    lon: "28.0473"
  },
  {
    display_name: "Cape Town, Western Cape, South Africa",
    place_id: "2",
    osm_id: "2",
    lat: "-33.9249",
    lon: "18.4241"
  },
  {
    display_name: "Durban, KwaZulu-Natal, South Africa",
    place_id: "3",
    osm_id: "3",
    lat: "-29.8587",
    lon: "31.0218"
  },
  {
    display_name: "Pretoria, Gauteng, South Africa",
    place_id: "4",
    osm_id: "4",
    lat: "-25.7479",
    lon: "28.2293"
  },
  {
    display_name: "Port Elizabeth, Eastern Cape, South Africa",
    place_id: "5",
    osm_id: "5",
    lat: "-33.7139",
    lon: "25.5207"
  },
  {
    display_name: "Bloemfontein, Free State, South Africa",
    place_id: "6",
    osm_id: "6",
    lat: "-29.0852",
    lon: "26.1596"
  },
  {
    display_name: "Nelspruit, Mpumalanga, South Africa",
    place_id: "7",
    osm_id: "7",
    lat: "-25.4753",
    lon: "30.9694"
  },
  {
    display_name: "Kimberley, Northern Cape, South Africa",
    place_id: "8",
    osm_id: "8",
    lat: "-28.7282",
    lon: "24.7499"
  },
  {
    display_name: "Polokwane, Limpopo, South Africa",
    place_id: "9",
    osm_id: "9",
    lat: "-23.9045",
    lon: "29.4698"
  },
  {
    display_name: "Mthatha, Eastern Cape, South Africa",
    place_id: "11",
    osm_id: "11",
    lat: "-31.5886",
    lon: "28.7900"
  },
  {
    display_name: "East London, Eastern Cape, South Africa",
    place_id: "10",
    osm_id: "10",
    lat: "-33.0292",
    lon: "27.8546"
  }
];

interface MultiStepFormProps {
  initialCategory?: string;
}

export function MultiStepForm({ initialCategory }: MultiStepFormProps) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "");
  const [selectedService, setSelectedService] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataType>({
    ...defaultValues,
    category: initialCategory || ""
  });
  const methods = useForm({ 
    defaultValues: {
      ...defaultValues,
      category: initialCategory || ""
    }
  });
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [editingField, setEditingField] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update form when initialCategory changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setFormData(prev => ({
        ...prev,
        category: initialCategory
      }));
      methods.setValue('category', initialCategory);
    }
  }, [initialCategory, methods]);

  // Auto-scroll to top of content and form on step change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Safe default for sticky header: offset by 72px
      setTimeout(() => {
        window.scrollBy({ top: -72, left: 0, behavior: 'smooth' });
      }, 350); // Wait for scrollIntoView to finish (timing may be adjusted)
    }
  }, [step]);

  // Loading messages sequence
  const loadingMessages = [
    "Finding the best professionals in your area...",
    "Checking service provider availability...",
    "Matching your requirements with experts...",
    "Verifying service provider ratings...",
    "Almost there! Preparing your matches..."
  ];

  const startSearch = async () => {
    setIsSearching(true);
    setProgress(0);
    
    // Simulate loading sequence
    for (let i = 0; i < loadingMessages.length; i++) {
      setLoadingMessage(loadingMessages[i]);
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5s per message
      setProgress((i + 1) * (100 / loadingMessages.length));
    }

    // After loading completes
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Pass date, time, and address as query params (date as ISO string)
    const params = new URLSearchParams({
      category: selectedCategory,
      service: selectedService,
      problem: selectedProblem,
      date: formData.date ? formData.date.toISOString() : '',
      time: formData.time || '',
      address: formData.address || '',
      fromSearch: 'true',
    });
    router.push(`/service-providers?${params.toString()}`);
  };

  // Function to format date
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Function to format time
  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(':');
    const ampm = Number(hours) >= 12 ? 'PM' : 'AM';
    const hour12 = Number(hours) % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Step navigation with validation
  const nextStep = () => {
    let isValid = true;
    
    switch (step) {
      case 1:
        isValid = selectedCategory !== "" && selectedService !== "";
        break;
      case 2:
        isValid = selectedProblem !== "";
        break;
      case 3:
        isValid = formData.address !== "" && formData.date !== null && formData.time !== "";
        break;
      case 4:
        // Step 4 is optional, always valid
        isValid = true;
        break;
    }

    if (isValid) {
      setStep((s) => Math.min(s + 1, 5));
    }
  };

  // Step navigation
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Handlers
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedService("");
    setFormData((prev) => ({ ...prev, category: e.target.value, service: "" }));
  };
  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value);
    setFormData((prev) => ({ ...prev, service: e.target.value }));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date ?? null);
    setFormData((prev) => ({ ...prev, date: date ?? null }));
  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, time: value }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      setFormData((prev) => ({ ...prev, image: file }));
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
    setSelectedImage(file);
    setFormData((prev) => ({ ...prev, image: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Replace the fetchAddressSuggestions function with this mock version
  const fetchAddressSuggestions = debounce(async (query: string) => {
    if (!query) {
      setAddressSuggestions([]);
      setIsAddressLoading(false);
      return;
    }
    setIsAddressLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Filter mock locations based on query
      const filteredLocations = mockSouthAfricanLocations.filter(location =>
        location.display_name.toLowerCase().includes(query.toLowerCase())
      );
      
      setAddressSuggestions(filteredLocations);
    } catch (e) {
      setAddressSuggestions([]);
    }
    setIsAddressLoading(false);
  }, 400);

  // Handle address input change
  const handleAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    setActiveSuggestion(-1);
    fetchAddressSuggestions(e.target.value);
  };

  // Handle suggestion selection
  const selectSuggestion = (suggestion: any) => {
    setFormData((prev) => ({ ...prev, address: suggestion.display_name }));
    setAddressSuggestions([]);
    setActiveSuggestion(-1);
  };

  // Keyboard navigation for suggestions
  const handleAddressKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!addressSuggestions.length) return;
    if (e.key === "ArrowDown") {
      setActiveSuggestion((prev) => Math.min(prev + 1, addressSuggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveSuggestion((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeSuggestion >= 0) {
      selectSuggestion(addressSuggestions[activeSuggestion]);
    } else if (e.key === "Escape") {
      setAddressSuggestions([]);
    }
  };

  // Click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        addressInputRef.current &&
        !addressInputRef.current.contains(event.target as Node)
      ) {
        setAddressSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Replace the handleUseMyLocation function with this improved version
  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Find the closest location from our mock data
            const closestLocation = mockSouthAfricanLocations.reduce((closest, current) => {
              const currentDistance = Math.sqrt(
                Math.pow(parseFloat(current.lat) - pos.coords.latitude, 2) +
                Math.pow(parseFloat(current.lon) - pos.coords.longitude, 2)
              );
              const closestDistance = Math.sqrt(
                Math.pow(parseFloat(closest.lat) - pos.coords.latitude, 2) +
                Math.pow(parseFloat(closest.lon) - pos.coords.longitude, 2)
              );
              return currentDistance < closestDistance ? current : closest;
            });
            
            setFormData((prev) => ({ ...prev, address: closestLocation.display_name }));
          } catch {
            // Fallback to a default location if something goes wrong
            setFormData((prev) => ({ ...prev, address: "Johannesburg, Gauteng, South Africa" }));
          }
        },
        () => {
          alert("Unable to retrieve your location. Please enter your address manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser. Please enter your address manually.");
    }
  };

  const renderStepIndicator = () => (
    <div className="w-full max-w-4xl mb-8">
      <div className="flex justify-between">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center relative">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              transition-all duration-300
              ${i + 1 === step 
                ? 'bg-blue-500 text-white' 
                : i + 1 < step 
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
            `}>
              {i + 1 < step ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <div className="text-sm mt-2 font-medium text-center">
              <div>{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.description}</div>
            </div>
            {i < steps.length - 1 && (
              <div className={`
                absolute top-5 -right-1/2 w-full h-[2px]
                ${i + 1 < step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}
              `} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    const commonInputClasses = "w-full rounded-lg border-2 px-4 py-3 bg-background transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";
    const commonLabelClasses = "block mb-2 font-medium text-base";
    
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 w-full max-w-md mx-auto flex flex-col items-center justify-center"
          >
            <TooltipProvider>
            <div className="w-full">
                <div className="flex items-center gap-2 mb-2">
                  <label className={commonLabelClasses}>Category</label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select the main category of service you need</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              <select
                  className={commonInputClasses}
                value={selectedCategory}
                onChange={handleCategoryChange}
                name="category"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div className="w-full">
                <div className="flex items-center gap-2 mb-2">
                  <label className={commonLabelClasses}>Service</label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choose the specific service you require</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              <select
                  className={`${commonInputClasses} ${!selectedCategory && 'opacity-50'}`}
                value={selectedService}
                onChange={handleServiceChange}
                name="service"
                required
                disabled={!selectedCategory}
              >
                <option value="">{selectedCategory ? "Select a service" : "Select category first"}</option>
                  {categories
                    .find((cat) => cat.value === selectedCategory)
                    ?.services.map((srv) => (
                      <option key={srv.name} value={srv.name}>{srv.name}</option>
                ))}
              </select>
            </div>
            </TooltipProvider>
          </motion.div>
        );
      case 2:
        const currentService = categories
          .find((cat) => cat.value === selectedCategory)
          ?.services.find((srv) => srv.name === selectedService);

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 w-full max-w-2xl mx-auto"
          >
            <TooltipProvider>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <label className={commonLabelClasses}>What's the problem?</label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select the issue that best describes your needs</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <RadioGroup
                  value={selectedProblem}
                  onValueChange={setSelectedProblem}
                  className="space-y-3"
                >
                  {currentService?.problems.map((problem) => (
                    <div key={problem} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={problem}
                        id={problem}
                        className="border-2 border-gray-200 text-blue-500"
                      />
                      <Label
                        htmlFor={problem}
                        className="text-base cursor-pointer"
                      >
                        {problem}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <label className={commonLabelClasses}>Additional Details</label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Provide any extra information about your needs</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="relative">
                  <Textarea
                    className={cn(
                      commonInputClasses,
                      "resize-none transition-all duration-300",
                      isExpanded ? "min-h-[200px]" : "min-h-[80px]"
                    )}
                    placeholder="Add any specific details or requirements..."
                    value={formData.additionalDetails}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalDetails: e.target.value }))}
                    onFocus={() => setIsExpanded(true)}
                    onBlur={() => setIsExpanded(false)}
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5" />
                </div>
          </div>
            </TooltipProvider>
          </motion.div>
        );
      case 3:
        // Modern, visually cohesive redesign for location, date, and time
        // Helper: generate time slots
        const generateTimeSlots = () => {
          const slots = [];
          let hour = 8, minute = 0;
          while (hour < 18 || (hour === 18 && minute === 0)) {
            const h = hour.toString().padStart(2, '0');
            const m = minute.toString().padStart(2, '0');
            const ampm = hour < 12 ? 'AM' : 'PM';
            const hour12 = hour % 12 === 0 ? 12 : hour % 12;
            slots.push(`${hour12}:${m} ${ampm}`);
            minute += 30;
            if (minute === 60) { hour++; minute = 0; }
          }
          return slots;
        };
        const timeSlots = generateTimeSlots();
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-8 border border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-blue-500" />
                Schedule Your Service
              </h2>
              {/* Location */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-base flex items-center gap-2 mb-1">
                  <MapPin className="w-5 h-5 text-blue-500" />
                    Service Location
                  </label>
                <div className="flex gap-2 w-full relative">
              <Input
                    ref={addressInputRef}
                    className="flex-1 rounded-lg border-2 px-4 py-3 bg-background transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                name="address"
                value={formData.address}
                    onChange={handleAddressInput}
                    onKeyDown={handleAddressKeyDown}
                    placeholder="Enter your address"
                    autoComplete="off"
                required
              />
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-2 border-blue-200 hover:border-blue-400 text-blue-500 hover:bg-blue-50 transition"
                    onClick={handleUseMyLocation}
                  >
                    <MapPin className="w-4 h-4" />
                    Use my location
                  </Button>
                  {/* Suggestions dropdown */}
                  {((addressSuggestions.length > 0) || isAddressLoading) && (
                    <div
                      ref={suggestionsRef}
                      className="absolute top-full left-0 w-full z-30 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg mt-2 max-h-60 overflow-y-auto animate-fade-in"
                    >
                      {isAddressLoading && (
                        <div className="px-4 py-3 text-sm text-muted-foreground">Searching...</div>
                      )}
                      {addressSuggestions.map((s, i) => (
                        <div
                          key={s.place_id || s.osm_id || i}
                          className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${i === activeSuggestion ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'} text-sm`}
                          onMouseDown={() => selectSuggestion(s)}
                          onMouseEnter={() => setActiveSuggestion(i)}
                        >
                          {s.display_name}
            </div>
                      ))}
                      {!isAddressLoading && addressSuggestions.length === 0 && (
                        <div className="px-4 py-3 text-sm text-muted-foreground">No results found.</div>
                      )}
              </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground mt-1 ml-1">We'll never share your address without your permission.</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-800 my-2" />
              {/* Date */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-base flex items-center gap-2 mb-1">
                  <CalendarIcon className="w-5 h-5 text-blue-500" />
                  Select Date
                </label>
                <div className="relative w-full max-w-xs">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex justify-between items-center px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                    onClick={() => setIsExpanded((v) => !v)}
                  >
                    <span>{selectedDate ? formatDate(selectedDate) : 'Choose a date'}</span>
                    <CalendarIcon className="w-5 h-5 text-blue-500" />
                  </Button>
                  {isExpanded && (
                    <div className="absolute z-20 mt-2 left-0 w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-4 animate-fade-in">
                    <Calendar
                      mode="single"
                      selected={selectedDate || undefined}
                        onSelect={(date: Date | undefined) => {
                          handleDateChange(date);
                          setIsExpanded(false);
                        }}
                        className="rounded-lg border shadow-sm w-full mx-auto"
                        disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                      initialFocus
                      classNames={{
                          months: 'w-full',
                          month: 'w-full',
                          table: 'w-full',
                          head_cell: 'w-9 h-9',
                          cell: 'w-9 h-9',
                          day: 'w-9 h-9',
                          nav_button: 'h-7 w-7',
                      }}
                    />
                  </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground mt-1 ml-1">Pick your preferred service date.</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-800 my-2" />
              {/* Time */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-base flex items-center gap-2 mb-1">
                  <Clock className="w-5 h-5 text-blue-500" />
                      Preferred Time
                    </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleTimeChange}
                  className="w-full rounded-lg border-2 px-4 py-3 bg-background transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm appearance-none"
                  required
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot.replace(/\s/g, '')}>{slot}</option>
                  ))}
                </select>
                <span className="text-xs text-muted-foreground mt-1 ml-1">Choose a time between 8:00 AM and 6:00 PM</span>
                    </div>
              </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 w-full max-w-md mx-auto flex flex-col items-center justify-center"
          >
            <TooltipProvider>
              <div
                className={cn(
                  "text-center p-8 border-2 border-dashed rounded-lg transition-colors duration-300 mx-auto",
                  "hover:border-blue-500 cursor-pointer"
                )}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                <div className="flex items-center gap-2 justify-center mb-2">
                  <label className={commonLabelClasses}>Upload Images</label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Drag and drop or click to upload images (optional)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
            <Input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
                  className="hidden"
                  id="file-upload"
                />
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your images here or click to browse
                </p>
                <Button
                  variant="outline"
                  className="mt-2"
                >
                  Choose Files
                </Button>
              </div>
              {imagePreview && (
                <div className="mt-4 flex flex-col items-center justify-center">
                  <img
                    src={imagePreview || ''}
                    alt="Preview"
                    className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                  />
                  <Button
                    variant="ghost"
                    className="mt-2 text-red-500 hover:text-red-600"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, image: null }));
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              )}
            </TooltipProvider>
          </motion.div>
        );
      case 5:
        const selectedCategoryData = categories.find(cat => cat.value === selectedCategory);
        const selectedServiceData = selectedCategoryData?.services.find(srv => srv.name === selectedService);

          return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 w-full max-w-2xl mx-auto"
          >
            {isSearching ? (
              <div className="space-y-8">
                {/* Loading Animation Container */}
                <div className="flex flex-col items-center space-y-8 pt-8">
                  {/* Spinner and Search Icon */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <Loader2 className="w-24 h-24 animate-spin text-blue-500" />
                    <Search className="w-12 h-12 absolute inset-0 m-auto text-blue-500" />
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full max-w-md space-y-2">
                    <Progress 
                      value={progress} 
                      className="h-2 w-full bg-gray-100 dark:bg-gray-800"
                    />
                    <div className="text-sm text-muted-foreground text-center">
                      {Math.round(progress)}% Complete
                    </div>
                  </div>

                  {/* Loading Message */}
                  <motion.div
                    key={loadingMessage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xl font-medium text-center text-gray-700 dark:text-gray-300 max-w-md"
                  >
                    {loadingMessage}
                  </motion.div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Service Request Summary</h2>
                    <div className="text-sm text-muted-foreground">Review your details</div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Category & Service */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Category & Service</div>
                          <div className="font-medium">{selectedCategoryData?.label} - {selectedService}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setStep(1)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>

                    {/* Problem & Details */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Problem</div>
                          <div className="font-medium">{selectedProblem}</div>
                          {formData.additionalDetails && (
                            <div className="text-sm text-muted-foreground mt-2">
                              Additional Details: {formData.additionalDetails}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setStep(2)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Schedule</div>
                          <div className="font-medium">
                            {formatDate(selectedDate)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatTime(formData.time)}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setStep(3)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Location</div>
                          <div className="font-medium">{formData.address}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setStep(3)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>

                    {/* Photos */}
                    {selectedImage && (
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-muted-foreground">Uploaded Photo</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setStep(4)}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                        <img
                          src={imagePreview || ''}
                          alt="Uploaded"
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>
                    )}
              </div>
            </div>

                <Button
                  onClick={startSearch}
                  className="w-full py-6 text-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find Service Professionals
                </Button>
          </div>
            )}
          </motion.div>
        );
    }
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center px-2 xs:px-4">
      {renderStepIndicator()}
      <div
        ref={contentRef}
        className="w-full flex flex-col items-center max-w-2xl mx-auto min-h-[60vh] overflow-y-auto max-h-[60vh] sm:max-h-[70vh]"
      >
        <div className="w-full">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
        </div>
        <div className="flex justify-between w-full gap-2 mt-8">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={prevStep}
              className="px-6"
            >
              Back
            </Button>
          )}
          <div className="flex-1" />
            {step < 5 && (
            <Button
              onClick={nextStep}
              className="px-6 bg-blue-500 hover:bg-blue-600"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
      </div>
    </div>
  );
} 