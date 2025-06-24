// Mock data generator for service providers

interface ServiceProvider {
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
  certifications: { name: string }[];
  portfolio: {
    title: string;
    beforeImage: string;
    afterImage: string;
    description: string;
  }[];
  reviews: {
    name: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  workingHours: {
    day: string;
    hours: string;
  }[];
  serviceArea: string;
}

const mockAvatars = [
  "https://ui-avatars.com/api/?name=John+Doe&background=random",
  "https://ui-avatars.com/api/?name=Jane+Smith&background=random",
  "https://ui-avatars.com/api/?name=Mike+Johnson&background=random",
  "https://ui-avatars.com/api/?name=Sarah+Williams&background=random",
  "https://ui-avatars.com/api/?name=David+Brown&background=random",
  "https://ui-avatars.com/api/?name=Lisa+Davis&background=random",
];

// Custom avatars for electrical providers
const electricalAvatars = [
  "/images/avatars/Sipho Ngcobo.jpg",
  "/images/avatars/Luvo Nongcula.jpg",
  "/images/avatars/Sinelizwi Mbolekwa.jpg",
  "/images/avatars/Sechaba Tau.jpg",
  "/images/avatars/Nombuso Mbatha.jpg",
  "/images/avatars/Mbali Mkhize.jpg",
];

const mockBeforeAfterImages = {
  electrical: {
    before: [
      "/images/portfolio/electrical/before/residential-before.jpg",
      "/images/portfolio/electrical/before/commercial-panel-before.jpg",
      "/images/portfolio/electrical/before/lighting-before.jpg",
      "/images/portfolio/electrical/before/circuit-breaker-before.jpg",
      "/images/portfolio/electrical/before/emergency-lighting-before.jpg",
      "/images/portfolio/electrical/before/maintence-before.jpg",
    ],
    after: [
      "/images/portfolio/electrical/after/residential-after.jpg",
      "/images/portfolio/electrical/after/commercial-panel-after.jpg",
      "/images/portfolio/electrical/after/lighting-after.jpg",
      "/images/portfolio/electrical/after/circuit-breaker-after.jpg",
      "/images/portfolio/electrical/after/emergency-lighting-after.jpg",
      "/images/portfolio/electrical/after/maintenance-after.jpg",
    ],
  },
  plumbing: {
    before: [
      "https://placehold.co/600x400/gray/white?text=Leaking+Pipe",
      "https://placehold.co/600x400/gray/white?text=Old+Faucet",
      "https://placehold.co/600x400/gray/white?text=Clogged+Drain",
    ],
    after: [
      "https://placehold.co/600x400/blue/white?text=Fixed+Pipe",
      "https://placehold.co/600x400/blue/white?text=New+Faucet",
      "https://placehold.co/600x400/blue/white?text=Clear+Drain",
    ],
  },
  cleaning: {
    before: [
      "https://placehold.co/600x400/gray/white?text=Dirty+Room",
      "https://placehold.co/600x400/gray/white?text=Messy+Kitchen",
      "https://placehold.co/600x400/gray/white?text=Stained+Carpet",
    ],
    after: [
      "https://placehold.co/600x400/blue/white?text=Clean+Room",
      "https://placehold.co/600x400/blue/white?text=Spotless+Kitchen",
      "https://placehold.co/600x400/blue/white?text=Fresh+Carpet",
    ],
  },
  painting: {
    before: [
      "https://placehold.co/600x400/gray/white?text=Old+Paint",
      "https://placehold.co/600x400/gray/white?text=Damaged+Wall",
      "https://placehold.co/600x400/gray/white?text=Peeling+Paint",
    ],
    after: [
      "https://placehold.co/600x400/blue/white?text=Fresh+Paint",
      "https://placehold.co/600x400/blue/white?text=Repaired+Wall",
      "https://placehold.co/600x400/blue/white?text=Smooth+Finish",
    ],
  },
  gardening: {
    before: [
      "https://placehold.co/600x400/gray/white?text=Overgrown+Garden",
      "https://placehold.co/600x400/gray/white?text=Dead+Lawn",
      "https://placehold.co/600x400/gray/white?text=Messy+Landscape",
    ],
    after: [
      "https://placehold.co/600x400/blue/white?text=Maintained+Garden",
      "https://placehold.co/600x400/blue/white?text=Green+Lawn",
      "https://placehold.co/600x400/blue/white?text=Beautiful+Landscape",
    ],
  },
  hair: {
    before: [
      "https://placehold.co/600x400/gray/white?text=Before+Haircut",
      "https://placehold.co/600x400/gray/white?text=Before+Color",
      "https://placehold.co/600x400/gray/white?text=Before+Style",
    ],
    after: [
      "https://placehold.co/600x400/blue/white?text=After+Haircut",
      "https://placehold.co/600x400/blue/white?text=After+Color",
      "https://placehold.co/600x400/blue/white?text=After+Style",
    ],
  },
  spa: {
    before: [
      "https://placehold.co/600x400/gray/white?text=Before+Treatment",
      "https://placehold.co/600x400/gray/white?text=Before+Facial",
      "https://placehold.co/600x400/gray/white?text=Before+Massage",
    ],
    after: [
      "https://placehold.co/600x400/blue/white?text=After+Treatment",
      "https://placehold.co/600x400/blue/white?text=After+Facial",
      "https://placehold.co/600x400/blue/white?text=After+Massage",
    ],
  },
};

const categorySpecializations = {
  electrical: [
    "Residential Wiring",
    "Commercial Electrical",
    "Emergency Repairs",
    "Lighting Installation",
    "Circuit Breaker Service",
    "Electrical Maintenance",
  ],
  plumbing: [
    "Pipe Repairs",
    "Drain Cleaning",
    "Water Heater Installation",
    "Bathroom Plumbing",
    "Emergency Services",
    "Leak Detection",
  ],
  cleaning: [
    "Deep Cleaning",
    "Move-in/Move-out",
    "Regular Maintenance",
    "Window Cleaning",
    "Carpet Cleaning",
    "Office Cleaning",
  ],
  painting: [
    "Interior Painting",
    "Exterior Painting",
    "Wall Repairs",
    "Wallpaper Installation",
    "Color Consultation",
    "Decorative Finishes",
  ],
  gardening: [
    "Lawn Maintenance",
    "Landscape Design",
    "Tree Service",
    "Garden Installation",
    "Irrigation Systems",
    "Pest Control",
  ],
  hair: [
    "Haircuts & Styling",
    "Color & Highlights",
    "Hair Treatments",
    "Extensions",
    "Bridal Services",
    "Men's Grooming",
  ],
  spa: [
    "Massage Therapy",
    "Facial Treatments",
    "Body Wraps",
    "Nail Care",
    "Waxing Services",
    "Aromatherapy",
  ],
};

const categoryCertifications = {
  electrical: [
    "Licensed Electrician",
    "Master Electrician",
    "Electrical Safety Certified",
    "Energy Efficiency Expert",
  ],
  plumbing: [
    "Licensed Plumber",
    "Master Plumber",
    "Gas Fitting Certified",
    "Backflow Prevention Certified",
  ],
  cleaning: [
    "IICRC Certified",
    "Green Cleaning Certified",
    "Health & Safety Certified",
    "Professional Cleaning Technician",
  ],
  painting: [
    "Professional Painters Certificate",
    "Lead Safety Certified",
    "Color Consultation Certified",
    "Wallcovering Certified",
  ],
  gardening: [
    "Certified Horticulturist",
    "Landscape Design Certified",
    "Pesticide Applicator License",
    "Irrigation Specialist",
  ],
  hair: [
    "Licensed Cosmetologist",
    "Color Specialist Certification",
    "Advanced Cutting Certified",
    "Extensions Specialist",
  ],
  spa: [
    "Licensed Massage Therapist",
    "Esthetician License",
    "Aromatherapy Certified",
    "Advanced Skincare Specialist",
  ],
};

function generateRandomReviews() {
  const reviews = [];
  const numberOfReviews = Math.floor(Math.random() * 5) + 3; // 3-7 reviews

  for (let i = 0; i < numberOfReviews; i++) {
    reviews.push({
      name: `Client ${i + 1}`,
      avatar: `https://ui-avatars.com/api/?name=Client+${i + 1}&background=random`,
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      comment: "Great service! Very professional and efficient. Would definitely recommend!",
      date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(), // Last 90 days
    });
  }

  return reviews;
}

function generateWorkingHours() {
  return [
    { day: "Monday", hours: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
    { day: "Friday", hours: "9:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 3:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];
}

export function generateMockServiceProviders(category: string | null): ServiceProvider[] {
  if (!category || !categorySpecializations[category as keyof typeof categorySpecializations]) {
    return [];
  }

  const providers: ServiceProvider[] = [];
  const numberOfProviders = 6; // Minimum number of providers per category

  // Custom names for electrical providers
  const electricalNames = [
    "Sipho Ngcobo",
    "Luvo Nongcula",
    "Sinelizwi Mbolekwa",
    "Sechaba Tau",
    "Nombuso Mbatha",
    "Mbali Mkhize"
  ];

  for (let i = 0; i < numberOfProviders; i++) {
    const specializations = categorySpecializations[category as keyof typeof categorySpecializations];
    const certifications = categoryCertifications[category as keyof typeof categoryCertifications];
    const beforeAfterImages = mockBeforeAfterImages[category as keyof typeof mockBeforeAfterImages];

    // Generate 3 portfolio items
    const portfolio = [];
    for (let j = 0; j < 3; j++) {
      const projectTitles = category === 'electrical' ? [
        "Residential Electrical Installation",
        "Commercial Panel Installation", 
        "Professional Lighting System",
        "Circuit Breaker Upgrade",
        "Emergency Lighting Setup",
        "Electrical Maintenance Service"
      ] : [`Project ${j + 1}`, `Project ${j + 1}`, `Project ${j + 1}`];
      
      portfolio.push({
        title: projectTitles[j],
        beforeImage: beforeAfterImages.before[j],
        afterImage: beforeAfterImages.after[j],
        description: category === 'electrical' ? 
          "Professional electrical installation completed with attention to detail and safety standards." :
          "Completed this project with attention to detail and client satisfaction in mind.",
      });
    }

    providers.push({
      id: `${category}-${i + 1}`,
      name: category === 'electrical' ? electricalNames[i] : `${category.charAt(0).toUpperCase() + category.slice(1)} Pro ${i + 1}`,
      avatar: category === 'electrical' ? electricalAvatars[i] : mockAvatars[i % mockAvatars.length],
      rating: 4 + Math.random(), // 4.0-5.0 rating
      reviewCount: Math.floor(Math.random() * 50) + 10, // 10-60 reviews
      completedJobs: Math.floor(Math.random() * 100) + 50, // 50-150 completed jobs
      specializations: specializations.slice(0, Math.floor(Math.random() * 3) + 2), // 2-4 specializations
      averagePrice: Math.floor(Math.random() * 500) + 200, // R200-R700 average price
      isOnline: true,
      bio: `Experienced ${category} professional with a passion for quality work and customer satisfaction. Specialized in ${specializations[0]} and ${specializations[1]}.`,
      certifications: certifications.slice(0, Math.floor(Math.random() * 2) + 2).map(name => ({ name })),
      portfolio,
      reviews: generateRandomReviews(),
      workingHours: generateWorkingHours(),
      serviceArea: "Within 20km of client location",
    });
  }

  return providers;
} 