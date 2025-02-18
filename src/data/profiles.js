import { format } from 'date-fns';

// Host Profiles
export const hostProfiles = {
  h1: {
    id: "h1",
    name: "The Rustic Tap",
    businessType: "Pub & Grill",
    location: "321 Brewery Lane, Downtown",
    profileImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
    coverImage: "https://images.unsplash.com/photo-1538488881038-e252a119ace7",
    rating: 4.5,
    reviews: 284,
    description: "A cozy neighborhood pub featuring local craft beers, live music, and weekly trivia nights. Our warm atmosphere and friendly staff make every visit memorable.",
    shortDescription: "Your neighborhood craft beer destination",
    established: "2018",
    amenities: ["Live Music", "Outdoor Seating", "Full Bar", "Food Service", "WiFi", "Parking"],
    businessHours: {
      mon: "4:00 PM - 12:00 AM",
      tue: "4:00 PM - 12:00 AM",
      wed: "4:00 PM - 12:00 AM",
      thu: "4:00 PM - 2:00 AM",
      fri: "4:00 PM - 2:00 AM",
      sat: "12:00 PM - 2:00 AM",
      sun: "12:00 PM - 10:00 PM"
    },
    socialMedia: {
      instagram: "@therusticktap",
      facebook: "TheRusticTap",
      twitter: "@rusticktap"
    },
    popularTimes: {
      mon: [20, 35, 60, 80, 65, 40, 20, 10],
      tue: [25, 40, 70, 90, 75, 45, 25, 15],
      wed: [30, 45, 75, 85, 70, 50, 30, 20],
      thu: [35, 50, 80, 95, 85, 60, 40, 25],
      fri: [40, 60, 85, 100, 90, 70, 50, 35],
      sat: [45, 65, 90, 100, 95, 80, 60, 40],
      sun: [30, 50, 70, 75, 60, 40, 20, 10]
    },
    features: [
      "Craft Beer Selection",
      "Live Entertainment",
      "Weekly Events",
      "Happy Hour Specials",
      "Private Event Space"
    ],
    cuisine: ["American", "Pub Food", "Bar Snacks"],
    priceRange: "$$",
    paymentMethods: ["Credit Card", "Cash", "Mobile Payment"],
    policies: {
      reservations: "Recommended for groups of 6+",
      dress: "Casual",
      age: "21+ after 9 PM"
    }
  },
  h8: {
    id: "h8",
    name: "The Acoustic Corner",
    businessType: "Music Venue & Bar",
    location: "567 Music Ave",
    profileImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
    rating: 4.7,
    reviews: 156,
    description: "An intimate music venue showcasing local talent and touring artists. Known for our exceptional sound system and supportive music community.",
    amenities: ["Professional Sound System", "Stage", "Full Bar", "Small Plates"],
    businessHours: {
      mon: "Closed",
      tue: "5:00 PM - 12:00 AM",
      wed: "5:00 PM - 12:00 AM",
      thu: "5:00 PM - 1:00 AM",
      fri: "5:00 PM - 2:00 AM",
      sat: "5:00 PM - 2:00 AM",
      sun: "5:00 PM - 11:00 PM"
    }
  },
  h9: {
    id: "h9",
    name: "The Garden Brewery",
    businessType: "Brewery & Beer Garden",
    location: "789 Hops Lane",
    profileImage: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148",
    rating: 4.9,
    reviews: 342,
    description: "A craft brewery with an expansive outdoor beer garden. We brew our beers on-site and offer unique events like Beer Yoga and live music sessions.",
    amenities: ["Beer Garden", "On-site Brewery", "Food Trucks", "Pet Friendly"],
    businessHours: {
      mon: "Closed",
      tue: "3:00 PM - 10:00 PM",
      wed: "3:00 PM - 10:00 PM",
      thu: "3:00 PM - 11:00 PM",
      fri: "12:00 PM - 12:00 AM",
      sat: "12:00 PM - 12:00 AM",
      sun: "12:00 PM - 8:00 PM"
    }
  }
};

// Creator Profiles
export const creatorProfiles = {
  c1: {
    id: "c1",
    name: "Quiz Masters",
    profileImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    coverImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
    rating: 4.8,
    reviews: 156,
    specialties: ["Trivia", "Game Nights", "Corporate Events"],
    description: "Professional trivia hosts bringing fun and engaging quiz nights to venues across the city. Specializing in themed trivia and custom corporate events.",
    shortDescription: "Making trivia night the best night of your week",
    experience: "5+ years",
    eventTypes: ["Weekly Trivia", "Special Events", "Private Parties", "Corporate Team Building"],
    achievements: [
      "Best Trivia Host 2023",
      "Over 500 Events Hosted",
      "Corporate Event Excellence Award"
    ],
    languages: ["English", "Spanish"],
    availability: {
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: false,
      sat: true,
      sun: false
    },
    pricing: {
      hourlyRate: "$150",
      packageRates: {
        "2-Hour Standard": "$250",
        "3-Hour Premium": "$350",
        "Corporate Package": "Custom"
      }
    },
    equipment: [
      "Professional Sound System",
      "Wireless Microphones",
      "Digital Scoring System",
      "HD Displays"
    ],
    testimonials: [
      {
        text: "Best trivia night in the city! The questions are challenging but fair.",
        author: "Local Pub Owner",
        rating: 5
      },
      {
        text: "Our corporate event was a huge success thanks to Quiz Masters!",
        author: "Tech Company CEO",
        rating: 5
      }
    ],
    socialMedia: {
      instagram: "@quizmasters",
      facebook: "QuizMastersPro",
      twitter: "@quizmasters"
    },
    certifications: [
      "Certified Event Planner",
      "Professional Host Certification",
      "Team Building Specialist"
    ],
    serviceArea: ["Downtown", "Greater Metropolitan Area", "Surrounding Counties"],
    cancellationPolicy: "48-hour notice required for full refund",
    insurance: "Full liability coverage for all events",
    preferredVenues: ["The Rustic Tap", "Garden Brewery", "Downtown Pubs"]
  },
  c12: {
    id: "c12",
    name: "The Melody Makers",
    profileImage: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
    rating: 4.8,
    specialties: ["Live Music", "Rock", "Indie"],
    description: "A dynamic band bringing fresh energy to the local music scene. We blend classic rock with modern indie influences for an unforgettable live experience.",
    experience: "8+ years",
    eventTypes: ["Live Performances", "Private Events", "Music Festivals"],
    achievements: ["Local Band of the Year 2022", "Released 2 Original Albums"]
  },
  c13: {
    id: "c13",
    name: "Sarah's Yoga Collective",
    profileImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b",
    rating: 4.9,
    specialties: ["Beer Yoga", "Wellness", "Community Events"],
    description: "Bringing yoga to unique spaces and making wellness accessible to everyone. Specializing in Beer Yoga and community-focused events.",
    experience: "7+ years",
    certifications: ["RYT-500", "Beer Yoga Certified", "Wellness Coach"],
    eventTypes: ["Beer Yoga", "Corporate Wellness", "Community Classes"]
  },
  c14: {
    id: "c14",
    name: "Jazz Trio Plus",
    profileImage: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f",
    rating: 4.7,
    specialties: ["Jazz", "Live Music", "Private Events"],
    description: "Professional jazz ensemble bringing sophisticated sounds to events and venues. Perfect for brunches, cocktail hours, and special occasions.",
    experience: "10+ years",
    eventTypes: ["Jazz Brunch", "Evening Performances", "Private Events"],
    achievements: ["Featured at Jazz Festival 2023", "Regular performers at top venues"]
  },
  c15: {
    id: "c15",
    name: "Downtown Arts Collective",
    profileImage: "https://images.unsplash.com/photo-1551847452-9d02e70681cb",
    rating: 4.9,
    specialties: ["Art Curation", "Community Events", "Exhibitions"],
    description: "A collective of local artists organizing engaging art events and exhibitions. We focus on making art accessible and supporting emerging artists.",
    experience: "6+ years",
    eventTypes: ["Art Walks", "Gallery Nights", "Artist Workshops"],
    achievements: ["Best Community Arts Organization 2023"]
  }
};

// Helper function to get relevant events for a profile
export const getProfileEvents = (profileId, profileType, events) => {
  if (profileType === 'host') {
    return events.filter(event => event.host.id === profileId);
  } else if (profileType === 'creator') {
    return events.flatMap(event => 
      event.activities.filter(activity => 
        activity.creator.id === profileId
      ).map(activity => ({
        ...event,
        activity
      }))
    );
  }
  return [];
}; 