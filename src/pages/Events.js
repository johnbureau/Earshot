import { useState, useMemo } from 'react';
import { format, isToday, isThisWeek, isBefore, parseISO, addDays, isSameDay } from 'date-fns';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';
import HorizontalGallery from '../components/HorizontalGallery';

function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'multi'
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Example categories
  const categories = [
    { id: 'all', name: 'All Activities' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'music', name: 'Music' },
    { id: 'food', name: 'Food & Drink' },
    { id: 'arts', name: 'Arts & Culture' }
  ];

  // Example events with activities
  const events = [
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
        profileImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b", // Cozy pub interior
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
          imageUrl: "https://images.unsplash.com/photo-1516478177764-9ae67fbe3f84",
          description: "Join us for our popular weekly trivia night! Form teams of up to 6 people. Winning team gets a $50 bar tab. Happy hour prices all night for participants!",
          creator: {
            id: "c6",
            name: "Quiz Masters Events",
            profileImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
            rating: 4.7,
            specialties: ["Trivia", "Game Nights"]
          }
        }
      ]
    },
    {
      eventId: 2,
      eventName: "Morning Sessions",
      venue: "Craft Coffee House",
      date: format(new Date(), 'yyyy-MM-dd'),
      host: {
        id: "h2",
        name: "Craft Coffee House",
        businessType: "Coffee Shop & Café",
        location: "456 Bean Street, Downtown",
        profileImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb", // Artsy coffee shop interior
        rating: 4.8,
        reviews: 342
      },
      activities: [
        {
          id: 201,
          title: "Jazz Quartet Performance",
          startTime: "7:00 PM",
          endTime: "9:00 PM",
          category: "music",
          subcategory: "jazz",
          price: "$30",
          imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
          description: "Experience an evening of smooth jazz featuring the acclaimed Blue Note Quartet. Enjoy classic jazz standards and original compositions.",
          creator: {
            id: "c3",
            name: "The Blue Note Quartet",
            profileImage: "https://images.unsplash.com/photo-1511192336575-5a79af67a629",
            rating: 4.9,
            specialties: ["Jazz", "Live Music"]
          }
        },
        {
          id: 202,
          title: "Wine Tasting Experience",
          startTime: "6:00 PM",
          endTime: "8:00 PM",
          category: "food",
          subcategory: "wine",
          price: "$45",
          imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3",
          description: "Sample a curated selection of premium wines from around the world, paired with artisanal cheeses and chocolates.",
          creator: {
            id: "c4",
            name: "Emma Sullivan",
            profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
            rating: 4.8,
            specialties: ["Wine", "Food Pairing"]
          }
        }
      ]
    },
    {
      eventId: 3,
      eventName: "Jazz Night",
      venue: "Blue Note Lounge",
      date: format(new Date(), 'yyyy-MM-dd'),
      host: {
        id: "h3",
        name: "Blue Note Lounge",
        businessType: "Jazz Bar & Restaurant",
        location: "789 Music Row, Arts District",
        profileImage: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34", // Intimate jazz club setting
        rating: 4.7,
        reviews: 156
      },
      activities: [
        {
          id: 301,
          title: "Watercolor Basics Workshop",
          startTime: "10:00 AM",
          endTime: "1:00 PM",
          category: "arts",
          subcategory: "painting",
          price: "$65",
          imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
          description: "Learn the fundamentals of watercolor painting in this hands-on workshop. All materials provided. Perfect for beginners!",
          creator: {
            id: "c5",
            name: "David Kim",
            profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            rating: 4.9,
            specialties: ["Watercolor", "Art Education"]
          }
        }
      ]
    },
    {
      eventId: 4,
      eventName: "Weekend Wellness",
      venue: "Urban Yoga Studio",
      date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      host: {
        id: "h4",
        name: "Urban Yoga Studio",
        businessType: "Yoga Studio & Wellness Center",
        location: "101 Zen Way, Wellness District",
        profileImage: "https://images.unsplash.com/photo-1545205597-3d9d02c29597", // Peaceful yoga studio
        rating: 4.9,
        reviews: 203
      },
      activities: [
        {
          id: 101,
          title: "Morning Yoga Flow",
          startTime: "7:00 AM",
          endTime: "8:15 AM",
          category: "fitness",
          subcategory: "yoga",
          price: "$20",
          imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
          description: "Start your day with an energizing yoga flow suitable for all levels. Focus on breath work, flexibility, and strength building.",
          creator: {
            id: "c1",
            name: "Sarah Chen",
            profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            rating: 4.9,
            specialties: ["Yoga", "Meditation"]
          }
        },
        {
          id: 102,
          title: "Meditation & Mindfulness",
          startTime: "9:00 AM",
          endTime: "10:00 AM",
          category: "wellness",
          subcategory: "meditation",
          price: "$15",
          imageUrl: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d",
          description: "A guided meditation session focusing on stress relief and mental clarity. Perfect for beginners and experienced practitioners alike.",
          creator: {
            id: "c2",
            name: "Michael Brooks",
            profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            rating: 4.7,
            specialties: ["Meditation", "Mindfulness"]
          }
        }
      ]
    },
    {
      eventId: 5,
      eventName: "Craft Beer Tasting",
      venue: "Hopworks Brewery",
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      host: {
        id: "h5",
        name: "Hopworks Brewery",
        businessType: "Craft Brewery & Taproom",
        location: "555 Hops Street, Brewery District",
        profileImage: "https://images.unsplash.com/photo-1559526324-593bc073d938", // Brewery tanks and equipment
        rating: 4.6,
        reviews: 312
      },
      activities: [
        {
          id: 501,
          title: "Acoustic Open Mic Night",
          startTime: "6:00 PM",
          endTime: "9:00 PM",
          category: "music",
          subcategory: "acoustic",
          price: "Free",
          imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
          description: "Our weekly open mic night featuring local musicians. Sign up starts at 5:30 PM. Free coffee for performers!",
          creator: {
            id: "c7",
            name: "Local Arts Collective",
            profileImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
            rating: 4.6,
            specialties: ["Live Music", "Community Events"]
          }
        }
      ]
    },
    {
      eventId: 6,
      eventName: "Art After Hours",
      venue: "Gallery Modern",
      date: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
      host: {
        id: "h6",
        name: "Gallery Modern",
        businessType: "Art Gallery & Event Space",
        location: "234 Canvas Lane, Arts District",
        profileImage: "https://images.unsplash.com/photo-1577720580479-7d839d829c73", // Modern gallery space
        rating: 4.8,
        reviews: 167
      },
      activities: [
        {
          id: 601,
          title: "Sunday Farmers Market",
          startTime: "9:00 AM",
          endTime: "2:00 PM",
          category: "community",
          subcategory: "market",
          price: "Free Entry",
          imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9",
          description: "Weekly farmers market featuring local produce, crafts, and food vendors. Live music and family-friendly activities!",
          creator: {
            id: "c8",
            name: "Local Farmers Coalition",
            profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            rating: 4.8,
            specialties: ["Community Markets", "Local Food"]
          }
        },
        {
          id: 602,
          title: "Community Yoga in the Park",
          startTime: "10:00 AM",
          endTime: "11:00 AM",
          category: "fitness",
          subcategory: "yoga",
          price: "Free",
          imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
          description: "Free community yoga session suitable for all levels. Bring your own mat and water. Donations welcome!",
          creator: {
            id: "c9",
            name: "Community Wellness Group",
            profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            rating: 4.7,
            specialties: ["Outdoor Yoga", "Community Fitness"]
          }
        }
      ]
    },
    {
      eventId: 7,
      eventName: "Local Bites Night",
      venue: "Food Hall Central",
      date: format(new Date(), 'yyyy-MM-dd'),
      host: {
        id: "h7",
        name: "Food Hall Central",
        businessType: "Food Hall & Event Space",
        location: "890 Foodie Ave, Downtown",
        profileImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5", // Vibrant food hall interior
        rating: 4.7,
        reviews: 428
      },
      activities: [
        {
          id: 701,
          title: "Brewery Tour & Tasting",
          startTime: "5:00 PM",
          endTime: "6:30 PM",
          category: "food",
          subcategory: "beer",
          price: "$10",
          imageUrl: "https://images.unsplash.com/photo-1559526324-593bc073d938",
          description: "Tour our brewery and learn about the craft beer making process. Includes 4 tasting tokens and a souvenir glass!",
          creator: {
            id: "c10",
            name: "Craft Beer Society",
            profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            rating: 4.9,
            specialties: ["Beer Education", "Brewery Tours"]
          }
        },
        {
          id: 702,
          title: "Live Local Band",
          startTime: "7:00 PM",
          endTime: "10:00 PM",
          category: "music",
          subcategory: "rock",
          price: "Free",
          imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
          description: "Enjoy live music from local rock band 'The Hop Heads' while sampling our craft beers. No cover charge!",
          creator: {
            id: "c11",
            name: "The Hop Heads",
            profileImage: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
            rating: 4.7,
            specialties: ["Live Music", "Rock"]
          }
        }
      ]
    },
    {
      eventId: 8,
      eventName: "Saturday Night Live Music",
      venue: "The Acoustic Corner",
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd'), // Tomorrow
      host: {
        id: "h8",
        name: "The Acoustic Corner",
        businessType: "Music Venue & Bar",
        location: "567 Music Ave",
        profileImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
        rating: 4.7
      },
      activities: [
        {
          id: 801,
          title: "Local Band Showcase",
          startTime: "8:00 PM",
          endTime: "11:00 PM",
          category: "music",
          subcategory: "live music",
          price: "Free",
          description: "Join us for a night of local talent featuring three up-and-coming bands.",
          creator: {
            id: "c12",
            name: "The Melody Makers",
            profileImage: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
            rating: 4.8,
            specialties: ["Live Music", "Rock", "Indie"]
          }
        }
      ]
    },
    {
      eventId: 9,
      eventName: "Sunday Funday",
      venue: "The Garden Brewery",
      date: format(addDays(new Date(), 2), 'yyyy-MM-dd'), // Day after tomorrow
      host: {
        id: "h9",
        name: "The Garden Brewery",
        businessType: "Brewery & Beer Garden",
        location: "789 Hops Lane",
        profileImage: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148",
        rating: 4.9
      },
      activities: [
        {
          id: 901,
          title: "Sunday Beer Yoga",
          startTime: "11:00 AM",
          endTime: "12:00 PM",
          category: "fitness",
          subcategory: "yoga",
          price: "$15",
          description: "Start your Sunday with a relaxing yoga session in our beer garden. Includes one craft beer!",
          creator: {
            id: "c13",
            name: "Sarah's Yoga Collective",
            profileImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b",
            rating: 4.9,
            specialties: ["Beer Yoga", "Wellness"]
          }
        },
        {
          id: 902,
          title: "Live Jazz Brunch",
          startTime: "12:00 PM",
          endTime: "3:00 PM",
          category: "music",
          subcategory: "jazz",
          price: "Free",
          description: "Enjoy smooth jazz with your Sunday brunch. Food and drinks available for purchase.",
          creator: {
            id: "c14",
            name: "Jazz Trio Plus",
            profileImage: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f",
            rating: 4.7,
            specialties: ["Jazz", "Live Music"]
          }
        }
      ]
    },
    {
      eventId: 10,
      eventName: "Late February Art Walk",
      venue: "Downtown Art District",
      date: format(new Date(2024, 1, 24), 'yyyy-MM-dd'),
      host: {
        id: "h10",
        name: "Art District Association",
        businessType: "Cultural District",
        location: "Downtown Art District",
        profileImage: "https://images.unsplash.com/photo-1577720580479-7d839d829c73",
        rating: 4.8
      },
      activities: [
        {
          id: 1001,
          title: "Gallery Night",
          startTime: "6:00 PM",
          endTime: "9:00 PM",
          category: "arts",
          subcategory: "gallery",
          price: "Free",
          description: "Visit multiple galleries featuring local artists. Complimentary wine and appetizers.",
          creator: {
            id: "c15",
            name: "Downtown Arts Collective",
            profileImage: "https://images.unsplash.com/photo-1551847452-9d02e70681cb",
            rating: 4.9,
            specialties: ["Art Curation", "Community Events"]
          }
        }
      ]
    },
    {
      eventId: 11,
      eventName: "February Food Festival",
      venue: "Central Market Square",
      date: "2024-02-25",
      host: {
        id: "h11",
        name: "City Market",
        businessType: "Public Market",
        location: "123 Market Street",
        profileImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
        rating: 4.7
      },
      activities: [
        {
          id: 1101,
          title: "Food Truck Rally",
          startTime: "11:00 AM",
          endTime: "8:00 PM",
          category: "food",
          subcategory: "festival",
          price: "Free Entry",
          description: "Over 20 local food trucks, live music, and family activities.",
          creator: {
            id: "c16",
            name: "Food Truck Alliance",
            profileImage: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb",
            rating: 4.6,
            specialties: ["Food Events", "Community Festivals"]
          }
        }
      ]
    },
    {
      eventId: 12,
      eventName: "Jazz Night",
      venue: "Blue Note Lounge",
      date: format(new Date(2024, 2, 12), 'yyyy-MM-dd'),
      host: {
        id: "h21",
        name: "Blue Note Lounge",
        businessType: "Jazz Bar & Restaurant",
        location: "789 Music Row, Arts District",
        profileImage: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34",
        rating: 4.7
      },
      activities: [
        {
          id: 2001,
          title: "Jazz Quartet Performance",
          startTime: "7:00 PM",
          endTime: "10:00 PM",
          category: "music",
          subcategory: "jazz",
          price: "$20",
          description: "Experience an evening of smooth jazz featuring the acclaimed Blue Note Quartet. Enjoy classic jazz standards and original compositions.",
          creator: {
            id: "c21",
            name: "The Blue Note Quartet",
            profileImage: "https://images.unsplash.com/photo-1511192336575-5a79af67a629",
            rating: 4.9,
            specialties: ["Jazz", "Live Music"]
          }
        }
      ]
    },
    {
      eventId: 13,
      eventName: "Wine Tasting",
      venue: "Wine & Co",
      date: format(new Date(2024, 2, 13), 'yyyy-MM-dd'),
      host: {
        id: "h22",
        name: "Wine & Co",
        businessType: "Wine Bar",
        location: "123 Wine Street",
        profileImage: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3",
        rating: 4.8
      },
      activities: [
        {
          id: 2002,
          title: "Wine Tasting Experience",
          startTime: "6:00 PM",
          endTime: "8:00 PM",
          category: "food",
          subcategory: "wine",
          price: "$30",
          description: "Sample a curated selection of premium wines from around the world, paired with artisanal cheeses and chocolates.",
          creator: {
            id: "c22",
            name: "Emma Sullivan",
            profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
            rating: 4.8,
            specialties: ["Wine", "Food Pairing"]
          }
        }
      ]
    },
    {
      eventId: 14,
      eventName: "Poetry Slam",
      venue: "The Poetry Cafe",
      date: format(new Date(2024, 2, 14), 'yyyy-MM-dd'),
      host: {
        id: "h23",
        name: "The Poetry Cafe",
        businessType: "Cafe",
        location: "456 Poem Street",
        profileImage: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f",
        rating: 4.7
      },
      activities: [
        {
          id: 2003,
          title: "Poetry Open Mic",
          startTime: "7:00 PM",
          endTime: "10:00 PM",
          category: "arts",
          subcategory: "poetry",
          price: "Free",
          description: "Join us for an evening of poetry open mic. Share your poems and listen to others!",
          creator: {
            id: "c23",
            name: "Poetry Slam Organizer",
            profileImage: "https://images.unsplash.com/photo-1536743939714-23ec5ac2dbae",
            rating: 4.9,
            specialties: ["Poetry", "Community Events"]
          }
        }
      ]
    },
    {
      eventId: 15,
      eventName: "Trivia Night",
      venue: "Pub Quiz",
      date: format(new Date(2024, 2, 15), 'yyyy-MM-dd'),
      host: {
        id: "h24",
        name: "Pub Quiz",
        businessType: "Pub",
        location: "567 Quiz Avenue",
        profileImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
        rating: 4.5
      },
      activities: [
        {
          id: 2004,
          title: "Pub Trivia Championship",
          startTime: "7:00 PM",
          endTime: "10:00 PM",
          category: "entertainment",
          subcategory: "trivia",
          price: "$10",
          description: "Test your knowledge with our pub trivia championship. Win prizes and have fun!",
          creator: {
            id: "c24",
            name: "Trivia Master",
            profileImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
            rating: 4.9,
            specialties: ["Trivia", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 16,
      eventName: "Live Music",
      venue: "Sound Stage",
      date: format(new Date(2024, 2, 16), 'yyyy-MM-dd'),
      host: {
        id: "h25",
        name: "Sound Stage",
        businessType: "Music Venue",
        location: "678 Music Avenue",
        profileImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
        rating: 4.7
      },
      activities: [
        {
          id: 2005,
          title: "Local Band Showcase",
          startTime: "8:00 PM",
          endTime: "11:00 PM",
          category: "music",
          subcategory: "live music",
          price: "Free",
          description: "Join us for a night of local talent featuring three up-and-coming bands.",
          creator: {
            id: "c25",
            name: "The Melody Makers",
            profileImage: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
            rating: 4.8,
            specialties: ["Live Music", "Rock", "Indie"]
          }
        }
      ]
    },
    {
      eventId: 17,
      eventName: "Art Workshop",
      venue: "Art Studio",
      date: format(new Date(2024, 2, 17), 'yyyy-MM-dd'),
      host: {
        id: "h26",
        name: "Art Studio",
        businessType: "Art Studio",
        location: "789 Art Lane",
        profileImage: "https://images.unsplash.com/photo-1577720580479-7d839d829c73",
        rating: 4.9
      },
      activities: [
        {
          id: 2006,
          title: "Painting Workshop",
          startTime: "10:00 AM",
          endTime: "1:00 PM",
          category: "arts",
          subcategory: "painting",
          price: "$30",
          description: "Learn the fundamentals of watercolor painting in this hands-on workshop. All materials provided. Perfect for beginners!",
          creator: {
            id: "c26",
            name: "David Kim",
            profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            rating: 4.9,
            specialties: ["Watercolor", "Art Education"]
          }
        }
      ]
    },
    {
      eventId: 18,
      eventName: "Craft Beer Tasting",
      venue: "Craft Beer Co",
      date: format(new Date(2024, 2, 18), 'yyyy-MM-dd'),
      host: {
        id: "h27",
        name: "Craft Beer Co",
        businessType: "Brewery",
        location: "890 Beer Street",
        profileImage: "https://images.unsplash.com/photo-1559526324-593bc073d938",
        rating: 4.6
      },
      activities: [
        {
          id: 2007,
          title: "Craft Beer Tasting",
          startTime: "5:00 PM",
          endTime: "8:00 PM",
          category: "food",
          subcategory: "beer",
          price: "$10",
          description: "Sample a variety of craft beers and learn about the brewing process.",
          creator: {
            id: "c27",
            name: "Craft Beer Society",
            profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            rating: 4.9,
            specialties: ["Beer Education", "Brewery Tours"]
          }
        }
      ]
    },
    {
      eventId: 19,
      eventName: "Open Mic Night",
      venue: "The Open Mic",
      date: format(new Date(2024, 2, 19), 'yyyy-MM-dd'),
      host: {
        id: "h28",
        name: "The Open Mic",
        businessType: "Performance Venue",
        location: "901 Mic Avenue",
        profileImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
        rating: 4.7
      },
      activities: [
        {
          id: 2008,
          title: "Talent Showcase",
          startTime: "7:00 PM",
          endTime: "10:00 PM",
          category: "entertainment",
          subcategory: "live music",
          price: "Free",
          description: "Join us for an open mic night featuring local talent. Sign up starts at 6:30 PM.",
          creator: {
            id: "c28",
            name: "Open Mic Organizer",
            profileImage: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
            rating: 4.9,
            specialties: ["Live Music", "Community Events"]
          }
        }
      ]
    },
    {
      eventId: 20,
      eventName: "Dance Party",
      venue: "Dance Club",
      date: format(new Date(2024, 2, 20), 'yyyy-MM-dd'),
      host: {
        id: "h29",
        name: "Dance Club",
        businessType: "Nightclub",
        location: "101 Dance Avenue",
        profileImage: "https://images.unsplash.com/photo-1545128485-c400e7702796",
        rating: 4.7
      },
      activities: [
        {
          id: 2009,
          title: "DJ Night",
          startTime: "9:00 PM",
          endTime: "12:00 AM",
          category: "music",
          subcategory: "live music",
          price: "$10",
          description: "Dance the night away with our DJ spinning the best hits!",
          creator: {
            id: "c29",
            name: "DJ Dance",
            profileImage: "https://images.unsplash.com/photo-1536743939714-23ec5ac2dbae",
            rating: 4.9,
            specialties: ["Live Music", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 21,
      eventName: "Board Game Night",
      venue: "Game Room",
      date: format(new Date(2024, 2, 21), 'yyyy-MM-dd'),
      host: {
        id: "h30",
        name: "Game Room",
        businessType: "Game Cafe",
        location: "111 Game Lane",
        profileImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
        rating: 4.8
      },
      activities: [
        {
          id: 2010,
          title: "Board Game Tournament",
          startTime: "7:00 PM",
          endTime: "10:00 PM",
          category: "entertainment",
          subcategory: "board games",
          price: "$10",
          description: "Test your skills in our board game tournament. Prizes for the winners!",
          creator: {
            id: "c30",
            name: "Board Game Enthusiast",
            profileImage: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
            rating: 4.9,
            specialties: ["Board Games", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 22,
      eventName: "Karaoke Night",
      venue: "Sing It!",
      date: format(new Date(2024, 2, 22), 'yyyy-MM-dd'),
      host: {
        id: "h31",
        name: "Sing It!",
        businessType: "Karaoke Bar",
        location: "123 Sing Lane",
        profileImage: "https://images.unsplash.com/photo-1545128485-c400e7702796",
        rating: 4.7
      },
      activities: [
        {
          id: 2011,
          title: "Karaoke Contest",
          startTime: "8:00 PM",
          endTime: "11:00 PM",
          category: "entertainment",
          subcategory: "karaoke",
          price: "$10",
          description: "Show off your singing talents in our karaoke contest. Sign up starts at 7:30 PM.",
          creator: {
            id: "c31",
            name: "Karaoke Host",
            profileImage: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
            rating: 4.9,
            specialties: ["Karaoke", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 23,
      eventName: "Spring Event 1",
      venue: "Venue 1",
      date: format(new Date(2024, 3, 1), 'yyyy-MM-dd'),
      host: {
        id: "h41",
        name: "Spring Venue 1",
        businessType: "Bar",
        location: "101 Spring Street",
        profileImage: "https://images.unsplash.com/photo-1500000000",
        rating: 4.5
      },
      activities: [
        {
          id: 4001,
          title: "Spring Activity 1",
          startTime: "6:00 PM",
          endTime: "9:00 PM",
          category: "music",
          price: "Free",
          description: "Celebrate spring with this exciting event!",
          creator: {
            id: "c41",
            name: "Spring Creator 1",
            profileImage: "https://images.unsplash.com/photo-1600000000",
            rating: 4.5,
            specialties: ["Spring Events", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 24,
      eventName: "Spring Event 2",
      venue: "Venue 2",
      date: format(new Date(2024, 3, 2), 'yyyy-MM-dd'),
      host: {
        id: "h42",
        name: "Spring Venue 2",
        businessType: "Cafe",
        location: "201 Spring Street",
        profileImage: "https://images.unsplash.com/photo-1500000001",
        rating: 4.5
      },
      activities: [
        {
          id: 4002,
          title: "Spring Activity 2",
          startTime: "6:00 PM",
          endTime: "9:00 PM",
          category: "food",
          price: "$10",
          description: "Celebrate spring with this exciting event!",
          creator: {
            id: "c42",
            name: "Spring Creator 2",
            profileImage: "https://images.unsplash.com/photo-1600000001",
            rating: 4.5,
            specialties: ["Spring Events", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 25,
      eventName: "Spring Event 3",
      venue: "Venue 3",
      date: format(new Date(2024, 3, 3), 'yyyy-MM-dd'),
      host: {
        id: "h43",
        name: "Spring Venue 3",
        businessType: "Restaurant",
        location: "301 Spring Street",
        profileImage: "https://images.unsplash.com/photo-1500000002",
        rating: 4.5
      },
      activities: [
        {
          id: 4003,
          title: "Spring Activity 3",
          startTime: "6:00 PM",
          endTime: "9:00 PM",
          category: "fitness",
          price: "$15",
          description: "Celebrate spring with this exciting event!",
          creator: {
            id: "c43",
            name: "Spring Creator 3",
            profileImage: "https://images.unsplash.com/photo-1600000002",
            rating: 4.5,
            specialties: ["Spring Events", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 26,
      eventName: "Spring Event 4",
      venue: "Venue 4",
      date: format(new Date(2024, 3, 4), 'yyyy-MM-dd'),
      host: {
        id: "h44",
        name: "Spring Venue 4",
        businessType: "Gallery",
        location: "401 Spring Street",
        profileImage: "https://images.unsplash.com/photo-1500000003",
        rating: 4.5
      },
      activities: [
        {
          id: 4004,
          title: "Spring Activity 4",
          startTime: "6:00 PM",
          endTime: "9:00 PM",
          category: "arts",
          price: "Free",
          description: "Celebrate spring with this exciting event!",
          creator: {
            id: "c44",
            name: "Spring Creator 4",
            profileImage: "https://images.unsplash.com/photo-1600000003",
            rating: 4.5,
            specialties: ["Spring Events", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 27,
      eventName: "Spring Event 5",
      venue: "Venue 5",
      date: format(new Date(2024, 3, 5), 'yyyy-MM-dd'),
      host: {
        id: "h45",
        name: "Spring Venue 5",
        businessType: "Studio",
        location: "501 Spring Street",
        profileImage: "https://images.unsplash.com/photo-1500000004",
        rating: 4.5
      },
      activities: [
        {
          id: 4005,
          title: "Spring Activity 5",
          startTime: "6:00 PM",
          endTime: "9:00 PM",
          category: "entertainment",
          price: "$20",
          description: "Celebrate spring with this exciting event!",
          creator: {
            id: "c45",
            name: "Spring Creator 5",
            profileImage: "https://images.unsplash.com/photo-1600000004",
            rating: 4.5,
            specialties: ["Spring Events", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 28,
      eventName: "Spring Event 6",
      venue: "Venue 6",
      date: format(new Date(2024, 3, 6), 'yyyy-MM-dd'),
      host: {
        id: "h46",
        name: "Spring Venue 6",
        businessType: "Bar",
        location: "601 Spring Street",
        profileImage: "https://images.unsplash.com/photo-1500000005",
        rating: 4.5
      },
      activities: [
        {
          id: 4006,
          title: "Spring Activity 6",
          startTime: "6:00 PM",
          endTime: "9:00 PM",
          category: "fitness",
          price: "$25",
          description: "Celebrate spring with this exciting event!",
          creator: {
            id: "c46",
            name: "Spring Creator 6",
            profileImage: "https://images.unsplash.com/photo-1600000005",
            rating: 4.5,
            specialties: ["Spring Events", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 29,
      eventName: "Spring Event 7",
      venue: "Venue 7",
      date: format(new Date(2024, 3, 7), 'yyyy-MM-dd'),
      host: {
        id: "h47",
        name: "Spring Venue 7",
        businessType: "Cafe",
        location: "701 Spring Street",
        profileImage: "https://images.unsplash.com/photo-1500000006",
        rating: 4.5
      },
      activities: [
        {
          id: 4007,
          title: "Spring Activity 7",
          startTime: "6:00 PM",
          endTime: "9:00 PM",
          category: "food",
          price: "$10",
          description: "Celebrate spring with this exciting event!",
          creator: {
            id: "c47",
            name: "Spring Creator 7",
            profileImage: "https://images.unsplash.com/photo-1600000006",
            rating: 4.5,
            specialties: ["Spring Events", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 30,
      eventName: "Spring Event 8",
      venue: "Venue 8",
      date: format(new Date(2024, 3, 8), 'yyyy-MM-dd'),
      host: {
        id: "h48",
        name: "Spring Venue 8",
        businessType: "Restaurant",
        location: "801 Spring Street",
        profileImage: "https://images.unsplash.com/photo-1500000007",
        rating: 4.5
      },
      activities: [
        {
          id: 4008,
          title: "Spring Activity 8",
          startTime: "6:00 PM",
          endTime: "9:00 PM",
          category: "entertainment",
          price: "Free",
          description: "Celebrate spring with this exciting event!",
          creator: {
            id: "c48",
            name: "Spring Creator 8",
            profileImage: "https://images.unsplash.com/photo-1600000007",
            rating: 4.5,
            specialties: ["Spring Events", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 31,
      eventName: "Spring Event 9",
      venue: "Venue 9",
      date: format(new Date(2024, 3, 9), 'yyyy-MM-dd'),
      host: {
        id: "h49",
        name: "Spring Venue 9",
        businessType: "Gallery",
        location: "901 Spring Street",
        profileImage: "https://images.unsplash.com/photo-1500000008",
        rating: 4.5
      },
      activities: [
        {
          id: 4009,
          title: "Spring Activity 9",
          startTime: "6:00 PM",
          endTime: "9:00 PM",
          category: "fitness",
          price: "$15",
          description: "Celebrate spring with this exciting event!",
          creator: {
            id: "c49",
            name: "Spring Creator 9",
            profileImage: "https://images.unsplash.com/photo-1600000008",
            rating: 4.5,
            specialties: ["Spring Events", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 32,
      eventName: "Spring Event 10",
      venue: "Venue 10",
      date: format(new Date(2024, 3, 10), 'yyyy-MM-dd'),
      host: {
        id: "h50",
        name: "Spring Venue 10",
        businessType: "Studio",
        location: "1001 Spring Street",
        profileImage: "https://images.unsplash.com/photo-1500000009",
        rating: 4.5
      },
      activities: [
        {
          id: 4010,
          title: "Spring Activity 10",
          startTime: "6:00 PM",
          endTime: "9:00 PM",
          category: "food",
          price: "$20",
          description: "Celebrate spring with this exciting event!",
          creator: {
            id: "c50",
            name: "Spring Creator 10",
            profileImage: "https://images.unsplash.com/photo-1600000009",
            rating: 4.5,
            specialties: ["Spring Events", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 33,
      eventName: "Spring Event 11",
      venue: "Venue 11",
      date: format(new Date(2024, 3, 11), 'yyyy-MM-dd'),
      host: {
        id: "h51",
        name: "Spring Venue 11",
        businessType: "Bar",
        location: "1101 Spring Street",
        profileImage: "https://images.unsplash.com/photo-1500000010",
        rating: 4.5
      },
      activities: [
        {
          id: 4011,
          title: "Spring Activity 11",
          startTime: "6:00 PM",
          endTime: "9:00 PM",
          category: "entertainment",
          price: "$25",
          description: "Celebrate spring with this exciting event!",
          creator: {
            id: "c51",
            name: "Spring Creator 11",
            profileImage: "https://images.unsplash.com/photo-1600000010",
            rating: 4.5,
            specialties: ["Spring Events", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 34,
      eventName: "Spring Event 12",
      venue: "Venue 12",
      date: format(new Date(2024, 3, 12), 'yyyy-MM-dd'),
      host: {
        id: "h52",
        name: "Spring Venue 12",
        businessType: "Cafe",
        location: "1201 Spring Street",
        profileImage: "https://images.unsplash.com/photo-1500000011",
        rating: 4.5
      },
      activities: [
        {
          id: 4012,
          title: "Spring Activity 12",
          startTime: "6:00 PM",
          endTime: "9:00 PM",
          category: "fitness",
          price: "$30",
          description: "Celebrate spring with this exciting event!",
          creator: {
            id: "c52",
            name: "Spring Creator 12",
            profileImage: "https://images.unsplash.com/photo-1600000011",
            rating: 4.5,
            specialties: ["Spring Events", "Entertainment"]
          }
        }
      ]
    },
    {
      eventId: 102,
      eventName: "St. Patrick's Day Festival",
      venue: "O'Malley's Pub",
      date: format(new Date(2024, 2, 17), 'yyyy-MM-dd'),
      host: {
        id: "h11",
        name: "O'Malley's Pub",
        businessType: "Irish Pub",
        location: "123 Green Street",
        profileImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
        rating: 4.7
      },
      activities: [{
        id: 1002,
        title: "Live Irish Music",
        startTime: "4:00 PM",
        endTime: "11:00 PM",
        category: "music",
        price: "Free",
        description: "Traditional Irish music, green beer, and authentic Irish food specials all day!",
        recurring: {
          frequency: "weekly",
          day: "thursday",
          time: "7:00 PM",
          description: "Every Thursday"
        },
        creator: {
          id: "c16",
          name: "The Dublin Ramblers",
          profileImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
          rating: 4.8,
          specialties: ["Irish Music", "Live Performance"],
        }
      }]
    },
    {
      eventId: 103,
      eventName: "Spring Beer Festival",
      venue: "Riverside Brewing",
      date: format(new Date(2024, 3, 13), 'yyyy-MM-dd'),
      host: {
        id: "h12",
        name: "Riverside Brewing Company",
        businessType: "Brewery",
        location: "456 River Road",
        profileImage: "https://images.unsplash.com/photo-1559526324-593bc073d938",
        rating: 4.9
      },
      activities: [{
        id: 1003,
        title: "Craft Beer Tasting",
        startTime: "1:00 PM",
        endTime: "6:00 PM",
        category: "food",
        price: "$35",
        description: "Sample over 50 craft beers from local breweries. Includes commemorative tasting glass.",
        recurring: {
          frequency: "weekly",
          day: "friday",
          time: "1:00 PM",
          description: "Every Friday"
        },
        creator: {
          id: "c17",
          name: "Craft Beer Guild",
          profileImage: "https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb",
          rating: 4.7,
          specialties: ["Beer Events", "Festivals"]
        }
      }]
    },
    {
      eventId: 104,
      eventName: "Spring Art Fair",
      venue: "Community Park",
      date: format(new Date(2024, 3, 20), 'yyyy-MM-dd'),
      host: {
        id: "h13",
        name: "City Parks Department",
        businessType: "Public Space",
        location: "789 Park Avenue",
        profileImage: "https://images.unsplash.com/photo-1492185244344-91fde303149e",
        rating: 4.6
      },
      activities: [{
        id: 1004,
        title: "Outdoor Art Market",
        startTime: "10:00 AM",
        endTime: "5:00 PM",
        category: "arts",
        price: "Free",
        description: "Local artists showcase their work in our beautiful community park. Food trucks and live music!",
        recurring: {
          frequency: "weekly",
          day: "saturday",
          time: "10:00 AM",
          description: "Every Saturday"
        },
        creator: {
          id: "c18",
          name: "Local Artists Coalition",
          profileImage: "https://images.unsplash.com/photo-1560421683-6856ea585c78",
          rating: 4.8,
          specialties: ["Art Events", "Community Engagement"]
        }
      }]
    },
    {
      eventId: 105,
      eventName: "Trivia Night",
      venue: "The Rustic Tap",
      date: format(new Date(2024, 2, 7), 'yyyy-MM-dd'),
      host: {
        id: "h14",
        name: "The Rustic Tap",
        businessType: "Pub & Grill",
        location: "321 Brewery Lane",
        profileImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
        rating: 4.6
      },
      activities: [{
        id: 1005,
        title: "Weekly Pub Trivia",
        startTime: "7:00 PM",
        endTime: "9:00 PM",
        category: "entertainment",
        price: "Free",
        description: "Test your knowledge at our weekly trivia night! Winners get bar tabs and prizes.",
        recurring: {
          frequency: "weekly",
          day: "wednesday",
          time: "7:00 PM",
          description: "Every Wednesday"
        },
        creator: {
          id: "c19",
          name: "Quiz Masters",
          profileImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
          rating: 4.8,
          specialties: ["Trivia", "Game Nights"]
        }
      }]
    }
  ];

  // Process events based on view mode
  const processedEvents = useMemo(() => {
    if (viewMode === 'single') {
      // Flatten all activities from all events
      const allActivities = events.flatMap(event => 
        event.activities.map(activity => ({
          ...activity,
          eventId: event.eventId,
          eventName: event.eventName,
          venue: event.venue,
          date: event.date,
          host: event.host
        }))
      );

      return allActivities.filter(activity => {
        const matchesSearch = 
          activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
    } else {
      // Filter whole events
      return events.filter(event => {
        const matchesSearch = 
          event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.activities.some(activity => 
            activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        const matchesCategory = selectedCategory === 'all' || 
          event.activities.some(activity => activity.category === selectedCategory);
        return matchesSearch && matchesCategory;
      });
    }
  }, [events, viewMode, searchQuery, selectedCategory]);

  // Organize events/activities by time period
  const organizedItems = useMemo(() => {
    if (viewMode === 'single') {
      // Organize individual activities
      return organizeByTimePeriod(processedEvents);
    } else {
      // Organize multi-activity events
      return organizeByTimePeriod(processedEvents);
    }
  }, [processedEvents, viewMode]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* View Mode Toggle and Filters */}
      <div className="mb-8 sticky top-0 bg-white z-10 p-4 shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* View Mode Toggle */}
          <div className="flex rounded-lg overflow-hidden border border-primary">
            <button
              onClick={() => setViewMode('single')}
              className={`px-4 py-2 ${
                viewMode === 'single' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-primary hover:bg-gray-100'
              }`}
            >
              Single Activities
            </button>
            <button
              onClick={() => setViewMode('multi')}
              className={`px-4 py-2 ${
                viewMode === 'multi' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-primary hover:bg-gray-100'
              }`}
            >
              Multi-Activity Events
            </button>
          </div>

          {/* Search and Category Filters */}
          <input
            type="text"
            placeholder={viewMode === 'single' ? "Search activities..." : "Search events..."}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Sections */}
      {viewMode === 'single' ? (
        <SingleActivitiesView items={organizedItems} />
      ) : (
        <MultiActivityEventsView items={organizedItems} />
      )}

      {/* Modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

      {/* No Results Message */}
      {processedEvents.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-600">No events found matching your criteria</h3>
        </div>
      )}
    </div>
  );
}

// Helper Components
function SingleActivitiesView({ items }) {
  const weekByDay = organizeByDay(items.thisWeek);

  return (
    <>
      {/* Today's Activities */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Happening Today</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.today.map(activity => (
            <EventCard 
              key={activity.id} 
              event={activity}
              otherActivities={items.today.filter(a => 
                a.id !== activity.id && a.host?.id === activity.host?.id
              )}
            />
          ))}
        </div>
      </section>

      {/* This Week's Activities - Grouped by Day */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">This Week</h2>
        {Array.from(weekByDay.entries()).map(([day, activities]) => (
          activities.length > 0 && (
            <div key={day} className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{day}</h3>
              <HorizontalGallery events={activities} />
            </div>
          )
        ))}
      </section>

      {/* Future Activities */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Upcoming</h2>
        {Array.from(items.future.entries()).map(([month, activities]) => (
          <div key={month} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{month}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map(activity => (
                <EventCard 
                  key={activity.id} 
                  event={activity}
                  otherActivities={activities.filter(a => 
                    a.id !== activity.id && a.host?.id === activity.host?.id
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

function MultiActivityEventsView({ items }) {
  return (
    <>
      {/* Today's Events */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Happening Today</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.today.map(event => (
            <EventCard 
              key={event.eventId} 
              event={{
                ...event,
                title: event.eventName,
                description: event.activities.map(a => a.title).join(' • ')
              }}
              otherActivities={event.activities}
            />
          ))}
        </div>
      </section>

      {/* This Week's Events */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">This Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.thisWeek.map(event => (
            <EventCard 
              key={event.eventId} 
              event={{
                ...event,
                title: event.eventName,
                description: event.activities.map(a => a.title).join(' • ')
              }}
              otherActivities={event.activities}
            />
          ))}
        </div>
      </section>

      {/* Future Events */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Upcoming</h2>
        {Array.from(items.future.entries()).map(([month, events]) => (
          <div key={month} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{month}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <EventCard 
                  key={event.eventId} 
                  event={{
                    ...event,
                    title: event.eventName,
                    description: event.activities.map(a => a.title).join(' • ')
                  }}
                  otherActivities={event.activities}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

// Helper function to organize items by time period
function organizeByTimePeriod(items) {
  const today = [];
  const thisWeek = [];
  const future = new Map();

  const currentDate = new Date();
  const oneWeekFromNow = addDays(currentDate, 7);

  items.forEach(item => {
    const itemDate = parseISO(item.date);

    if (isToday(itemDate)) {
      today.push(item);
    } else if (isThisWeek(itemDate)) {
      thisWeek.push(item);
    } else if (isBefore(oneWeekFromNow, itemDate)) {
      const monthKey = format(itemDate, 'MMMM yyyy');
      if (!future.has(monthKey)) {
        future.set(monthKey, []);
      }
      future.get(monthKey).push(item);
    }
  });

  // Sort future events by date within each month
  future.forEach((events, month) => {
    events.sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
  });

  return { today, thisWeek, future };
}

// Helper function to organize week's activities by day
function organizeByDay(activities) {
  const byDay = new Map();
  
  // Get next 7 days
  for (let i = 0; i < 7; i++) {
    const date = addDays(new Date(), i);
    if (!isToday(date)) { // Skip today as it has its own section
      const dayKey = format(date, 'EEEE, MMM d'); // e.g., "Saturday, Mar 23"
      byDay.set(dayKey, []);
    }
  }

  // Organize activities by day
  activities.forEach(activity => {
    const activityDate = parseISO(activity.date);
    if (!isToday(activityDate)) {
      const dayKey = format(activityDate, 'EEEE, MMM d');
      if (byDay.has(dayKey)) {
        byDay.get(dayKey).push(activity);
      }
    }
  });

  return byDay;
}

export default Events; 