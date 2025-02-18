import { format } from 'date-fns';

// Export the events array
export const events = [
  {
    eventId: 1,
    eventName: "Trivia Tuesday",
    venue: "The Rustic Tap",
    date: format(new Date(), 'yyyy-MM-dd'),
    host: {
      id: "h1",
      name: "The Rustic Tap",
      businessType: "Pub & Grill",
      location: "321 Brewery Lane, Downtown",
      profileImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
      rating: 4.5,
      reviews: 284
    },
    activities: [
      {
        id: 401,
        title: "Weekly Pub Trivia Night",
        startTime: "7:00 PM",
        endTime: "9:00 PM",
        category: "entertainment",
        subcategory: "trivia",
        price: "Free",
        description: "Join us for our popular weekly trivia night! Form teams of up to 6 people. Winning team gets a $50 bar tab.",
        creator: {
          id: "c1",
          name: "Quiz Masters",
          profileImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
          rating: 4.8,
          specialties: ["Trivia", "Game Nights"]
        }
      }
    ]
  },
  // ... rest of your events
]; 