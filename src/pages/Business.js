import { useState, useMemo, useRef, useEffect } from 'react';
import AddEventModal from '../components/AddEventModal';
import { format, parseISO, formatDistanceToNow } from 'date-fns';
import EventDetailsModal from '../components/EventDetailsModal';
import SocialPreview from '../components/SocialPreview';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { startOfMonth, endOfMonth, isWithinInterval } from '../utils/dateUtils';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { mockEvents } from '../data/mockEvents';
import BackgroundGallery from '../components/BackgroundGallery';

function Business() {
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [analyticsPeriod, setAnalyticsPeriod] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState('list');
  const [selectedEvents, setSelectedEvents] = useState([mockEvents[0]]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [customization, setCustomization] = useState({
    platform: 'instagram',
    colors: {
      background: '#000000',
      text: '#ffffff',
      accent: '#843bfb',
      textBackground: 'rgba(0,0,0,0.5)'
    },
    font: 'Inter',
    layout: 'centered',
    textPosition: 'center',
    textBackgroundEnabled: true
  });
  const [generatedImage, setGeneratedImage] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date())
  });
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [eventDateRange, setEventDateRange] = useState({
    start: null,
    end: null
  });
  const [imageDimensions, setImageDimensions] = useState(null);
  const [gigFilter, setGigFilter] = useState({
    dateRange: { start: null, end: null },
    activityType: 'all',
    payRange: 'all'
  });
  const [gigView, setGigView] = useState('available'); // 'available', 'requested', 'offered'
  const [seenOffers, setSeenOffers] = useState(() => {
    // Load seen offers from localStorage
    const saved = localStorage.getItem('seenOffers');
    return saved ? JSON.parse(saved) : [];
  });

  // Mock analytics data
  const analyticsData = {
    month: {
      events: 12,
      attendance: 450,
      revenue: 3200
    },
    year: {
      events: 156,
      attendance: 5840,
      revenue: 42600
    },
    all: {
      events: 342,
      attendance: 12450,
      revenue: 89400
    }
  };

  const currentData = analyticsData[analyticsPeriod];

  // Mock booked events data
  const bookedEvents = [
    {
      id: 1,
      title: "Weekly Trivia Night",
      date: "2024-04-15",
      time: "19:00",
      venue: "The Rustic Tap",
      role: "Host",
      status: "Confirmed",
      attendance: 45,
      revenue: 450
    },
    {
      id: 2,
      title: "Live Music Saturday",
      date: "2024-04-20",
      time: "20:00",
      venue: "Downtown Bar",
      role: "Creator",
      status: "Pending",
      attendance: null,
      revenue: null
    }
    // ... more events
  ];

  // Filter and sort booked events
  const filteredEvents = useMemo(() => {
    return bookedEvents
      .filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            event.venue.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || 
                            event.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'date':
            return new Date(a.date) - new Date(b.date);
          case 'title':
            return a.title.localeCompare(b.title);
          case 'status':
            return a.status.localeCompare(b.status);
          default:
            return 0;
        }
      });
  }, [bookedEvents, searchQuery, sortBy, filterStatus]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Create an image element to get dimensions
        const img = new Image();
        img.onload = () => {
          const dimensions = `${img.width}x${img.height}`;
          setImageDimensions(dimensions);
          
          // Save to gallery
          const savedImages = JSON.parse(localStorage.getItem('backgroundGallery') || '[]');
          const newImage = {
            url: reader.result,
            dimensions,
            timestamp: Date.now()
          };
          
          // Add to gallery if not already present
          if (!savedImages.some(image => image.url === reader.result)) {
            const updatedImages = [newImage, ...savedImages].slice(0, 12); // Keep last 12 images
            localStorage.setItem('backgroundGallery', JSON.stringify(updatedImages));
          }
          
          setUploadedImage(reader.result);
          localStorage.setItem('socialPreviewImage', reader.result);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const savedImage = localStorage.getItem('socialPreviewImage');
    if (savedImage) {
      setUploadedImage(savedImage);
    }
  }, []);

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `social-post-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Add this function to filter analytics data by date range
  const getAnalyticsForDateRange = () => {
    // Mock data generation based on date range
    const daysInRange = Math.ceil((dateRange.end - dateRange.start) / (1000 * 60 * 60 * 24));
    
    return {
      events: Math.round(daysInRange * 0.4), // Average 0.4 events per day
      attendance: Math.round(daysInRange * 35), // Average 35 attendees per day
      revenue: Math.round(daysInRange * 250) // Average $250 revenue per day
    };
  };

  const generateDailyData = () => {
    const data = [];
    let currentDate = new Date(dateRange.start);
    
    while (currentDate <= dateRange.end) {
      data.push({
        date: format(currentDate, 'MMM d'),
        revenue: Math.floor(Math.random() * 500) + 200,
        attendance: Math.floor(Math.random() * 50) + 20,
        events: Math.floor(Math.random() * 3)
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return data;
  };

  const PreviewPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Preview Post</h3>
          <button 
            onClick={() => setShowPreviewPopup(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="max-w-2xl mx-auto">
            <SocialPreview
              template={selectedTemplate}
              events={selectedEvents}
              image={uploadedImage}
              customization={customization}
              onImageGenerated={setGeneratedImage}
              imageDimensions={imageDimensions}
            />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setShowPreviewPopup(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              disabled={!generatedImage}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Add filtered events computation
  const filteredEventsForPosts = useMemo(() => {
    return mockEvents.filter(event => {
      if (!eventDateRange.start || !eventDateRange.end) return true;
      
      const eventDate = parseISO(event.date);
      return isWithinInterval(eventDate, {
        start: eventDateRange.start,
        end: eventDateRange.end
      });
    });
  }, [mockEvents, eventDateRange]);

  // Add function to handle gallery image selection
  const handleGalleryImageSelect = (imageUrl, dimensions) => {
    setUploadedImage(imageUrl);
    setImageDimensions(dimensions);
    localStorage.setItem('socialPreviewImage', imageUrl);
    
    // Also store the dimensions with the current image
    const currentImageData = {
      url: imageUrl,
      dimensions,
      timestamp: Date.now()
    };
    localStorage.setItem('currentSocialImage', JSON.stringify(currentImageData));
  };

  // Add this useEffect to load saved image with dimensions
  useEffect(() => {
    const savedImageData = localStorage.getItem('currentSocialImage');
    if (savedImageData) {
      const { url, dimensions } = JSON.parse(savedImageData);
      setUploadedImage(url);
      setImageDimensions(dimensions);
    }
  }, []);

  // Update the mock offered gigs
  const mockGigs = {
    available: [
      {
        id: 1,
        title: "Trivia Host Needed",
        venue: "The Rustic Tap",
        date: "2024-02-25",
        time: "7:00 PM",
        activityType: "trivia",
        pay: 150,
        description: "Looking for an energetic trivia host for our weekly event",
        status: "open",
        postedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        expiresAt: new Date(Date.now() + 172800000).toISOString(), // expires in 2 days
      },
      {
        id: 2,
        title: "Live Music - Acoustic",
        venue: "Coffee House",
        date: "2024-02-26",
        time: "6:00 PM",
        activityType: "music",
        pay: 200,
        description: "2-hour acoustic set, original music preferred",
        status: "open",
        postedAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        expiresAt: new Date(Date.now() + 259200000).toISOString(), // expires in 3 days
      }
    ],
    requested: [
      {
        id: 3,
        title: "Comedy Night Host",
        venue: "Laugh Factory",
        date: "2024-02-28",
        time: "8:00 PM",
        activityType: "comedy",
        pay: 175,
        description: "MC needed for our weekly comedy showcase",
        status: "pending",
        postedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        requestedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        expiresAt: new Date(Date.now() + 86400000).toISOString(), // expires in 1 day
      }
    ],
    offered: [
      {
        id: 4,
        title: "DJ Set",
        venue: "The Underground",
        date: "2024-03-01",
        time: "9:00 PM",
        activityType: "music",
        pay: 300,
        description: "3-hour DJ set, electronic/dance music",
        status: "offered",
        postedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        requestedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        offeredAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 43200000).toISOString(), // offer expires in 12 hours
      }
    ]
  };

  // Add these helper functions
  const filterGigs = (gigs) => {
    return gigs.filter(gig => {
      const matchesDate = !gigFilter.dateRange.start || !gigFilter.dateRange.end || 
        isWithinInterval(parseISO(gig.date), {
          start: gigFilter.dateRange.start,
          end: gigFilter.dateRange.end
        });
      
      const matchesType = gigFilter.activityType === 'all' || 
        gig.activityType === gigFilter.activityType;
      
      const matchesPay = gigFilter.payRange === 'all' || 
        (gigFilter.payRange === 'under200' && gig.pay < 200) ||
        (gigFilter.payRange === '200to500' && gig.pay >= 200 && gig.pay <= 500) ||
        (gigFilter.payRange === 'over500' && gig.pay > 500);
      
      return matchesDate && matchesType && matchesPay;
    });
  };

  // Add this function to check for new offers
  const getUnseenOffersCount = () => {
    return mockGigs.offered.filter(gig => !seenOffers.includes(gig.id)).length;
  };

  // Add this function to mark offers as seen when viewing the offered tab
  useEffect(() => {
    if (gigView === 'offered' && getUnseenOffersCount() > 0) {
      const newSeenOffers = [
        ...seenOffers,
        ...mockGigs.offered.map(gig => gig.id)
      ];
      setSeenOffers(newSeenOffers);
      localStorage.setItem('seenOffers', JSON.stringify(newSeenOffers));
    }
  }, [gigView]);

  // Add this helper function for expiration status
  const getExpirationStatus = (expiresAt) => {
    const now = new Date();
    const expiration = new Date(expiresAt);
    const hoursLeft = Math.round((expiration - now) / (1000 * 60 * 60));
    
    if (hoursLeft <= 0) return { text: 'Expired', color: 'text-red-600' };
    if (hoursLeft <= 12) return { text: `Expires in ${hoursLeft} hours`, color: 'text-red-600' };
    if (hoursLeft <= 24) return { text: `Expires in ${hoursLeft} hours`, color: 'text-yellow-600' };
    return { text: `Expires in ${Math.round(hoursLeft/24)} days`, color: 'text-gray-600' };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowAddEventModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Event
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'posts'
              ? 'text-primary border-primary'
              : 'text-gray-600 border-transparent hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'booked'
              ? 'text-primary border-primary'
              : 'text-gray-600 border-transparent hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('booked')}
        >
          Booked
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'social'
              ? 'text-primary border-primary'
              : 'text-gray-600 border-transparent hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('social')}
        >
          Social
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'analytics'
              ? 'text-primary border-primary'
              : 'text-gray-600 border-transparent hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'posts' && (
        <div className="space-y-6">
          {/* Inner Navigation - Updated Style */}
          <div className="bg-white rounded-lg shadow p-1">
            <div className="flex gap-1">
              <button
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                  gigView === 'available'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setGigView('available')}
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg mb-1">🎯</span>
                  <span>Available Gigs</span>
                  {gigView === 'available' && (
                    <span className="text-xs mt-1 text-white">
                      {filterGigs(mockGigs.available).length} gigs
                    </span>
                  )}
                </div>
              </button>
              <button
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                  gigView === 'requested'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setGigView('requested')}
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg mb-1">⏳</span>
                  <span>Requested</span>
                  {gigView === 'requested' && (
                    <span className="text-xs mt-1 text-white">
                      {mockGigs.requested.length} gigs
                    </span>
                  )}
                </div>
              </button>
              <button
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all relative ${
                  gigView === 'offered'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setGigView('offered')}
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg mb-1">🎁</span>
                  <span>Offered</span>
                  {gigView === 'offered' && (
                    <span className="text-xs mt-1 text-white">
                      {mockGigs.offered.length} gigs
                    </span>
                  )}
                  {/* Notification Badge */}
                  {getUnseenOffersCount() > 0 && (
                    <div className="absolute -top-1 -right-1 flex items-center justify-center">
                      <span className="relative flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
                          {getUnseenOffersCount()}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Filters (only show for available gigs) */}
          {gigView === 'available' && (
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <div className="flex gap-2">
                    <DatePicker
                      selected={gigFilter.dateRange.start}
                      onChange={(date) => setGigFilter(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, start: date }
                      }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholderText="Start"
                      dateFormat="MMM d"
                    />
                    <DatePicker
                      selected={gigFilter.dateRange.end}
                      onChange={(date) => setGigFilter(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, end: date }
                      }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholderText="End"
                      dateFormat="MMM d"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Activity Type
                  </label>
                  <select
                    value={gigFilter.activityType}
                    onChange={(e) => setGigFilter(prev => ({
                      ...prev,
                      activityType: e.target.value
                    }))}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="all">All Types</option>
                    <option value="trivia">Trivia</option>
                    <option value="music">Music</option>
                    <option value="comedy">Comedy</option>
                    <option value="dj">DJ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pay Range
                  </label>
                  <select
                    value={gigFilter.payRange}
                    onChange={(e) => setGigFilter(prev => ({
                      ...prev,
                      payRange: e.target.value
                    }))}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="all">All Ranges</option>
                    <option value="under200">Under $200</option>
                    <option value="200to500">$200 - $500</option>
                    <option value="over500">Over $500</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => setGigFilter({
                      dateRange: { start: null, end: null },
                      activityType: 'all',
                      payRange: 'all'
                    })}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Gig Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterGigs(mockGigs[gigView]).map(gig => (
              <div key={gig.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{gig.title}</h3>
                      <p className="text-gray-600">{gig.venue}</p>
                    </div>
                    <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm">
                      ${gig.pay}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {format(parseISO(gig.date), 'MMM d, yyyy')} at {gig.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {gig.activityType.charAt(0).toUpperCase() + gig.activityType.slice(1)}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{gig.description}</p>

                  <div className="flex justify-end">
                    {gigView === 'available' && (
                      <button
                        onClick={() => {/* Handle request */}}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        Request Gig
                      </button>
                    )}
                    {gigView === 'requested' && (
                      <span className="text-yellow-600 font-medium">Request Pending</span>
                    )}
                    {gigView === 'offered' && (
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                          Accept
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          Decline
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Add timestamp info */}
                  <div className="mb-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Posted {formatDistanceToNow(parseISO(gig.postedAt))} ago
                    </div>
                    
                    {gig.requestedAt && (
                      <div className="flex items-center text-gray-500 mt-1">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        Requested {formatDistanceToNow(parseISO(gig.requestedAt))} ago
                      </div>
                    )}
                    
                    {/* Expiration warning */}
                    <div className={`flex items-center mt-1 ${getExpirationStatus(gig.expiresAt).color}`}>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {getExpirationStatus(gig.expiresAt).text}
                    </div>
                  </div>

                  {/* Update offered timestamp display */}
                  {gigView === 'offered' && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        Offered {formatDistanceToNow(parseISO(gig.offeredAt))} ago
                      </div>
                      <div className={`text-sm mt-1 ${getExpirationStatus(gig.expiresAt).color} font-medium`}>
                        Offer {getExpirationStatus(gig.expiresAt).text.toLowerCase()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'booked' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold mb-4">Booked Events</h2>
            
            {/* Search and Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <svg 
                    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="status">Sort by Status</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="divide-y">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="w-full px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-medium">
                        {format(new Date(event.date), 'MMM d')}
                      </span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-neutral-dark group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {format(new Date(`${event.date} ${event.time}`), 'h:mm a')} • {event.venue}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      event.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {event.role}
                    </span>
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                No events found matching your criteria
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'social' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold mb-4">Social Media Content</h2>
            
            {/* Template Selection */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSelectedTemplate('single')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTemplate === 'single'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Single Event
              </button>
              <button
                onClick={() => setSelectedTemplate('grid')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTemplate === 'grid'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Event Grid
              </button>
              <button
                onClick={() => setSelectedTemplate('list')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTemplate === 'list'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Event List
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Left Column: Event Selection */}
              <div>
                <h3 className="text-lg font-medium mb-3">Select Events</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {bookedEvents.map(event => (
                    <label
                      key={event.id}
                      className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEvents([...selectedEvents, event.id]);
                          } else {
                            setSelectedEvents(selectedEvents.filter(id => id !== event.id));
                          }
                        }}
                        className="mr-3"
                      />
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-600">
                          {format(new Date(event.date), 'MMM d, yyyy')} • {event.venue}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Right Column: Preview and Image Upload */}
              <div>
                <h3 className="text-lg font-medium mb-3">Customize Design</h3>
                
                {/* Image Upload */}
                <div className="mb-4">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors"
                  >
                    {uploadedImage ? 'Change Background Image' : 'Upload Background Image'}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                {/* Preview Area */}
                <div className="mb-4">
                  <SocialPreview
                    template={selectedTemplate}
                    events={bookedEvents.filter(event => selectedEvents.includes(event.id))}
                    image={uploadedImage}
                    customization={customization}
                    onImageGenerated={setGeneratedImage}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    disabled={!generatedImage}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Download Image
                  </button>
                  <button className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Analytics Overview</h2>
            
            {/* Date Range Selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <DatePicker
                  selected={dateRange.start}
                  onChange={(date) => setDateRange(prev => ({ ...prev, start: date }))}
                  selectsStart
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  className="px-3 py-2 border rounded-lg text-sm"
                  placeholderText="Start Date"
                  dateFormat="MMM d, yyyy"
                />
                <span className="text-gray-500">to</span>
                <DatePicker
                  selected={dateRange.end}
                  onChange={(date) => setDateRange(prev => ({ ...prev, end: date }))}
                  selectsEnd
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  minDate={dateRange.start}
                  className="px-3 py-2 border rounded-lg text-sm"
                  placeholderText="End Date"
                  dateFormat="MMM d, yyyy"
                />
              </div>
              
              {/* Quick Select Buttons */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setDateRange({
                    start: startOfMonth(new Date()),
                    end: endOfMonth(new Date())
                  })}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    analyticsPeriod === 'month'
                      ? 'bg-white text-primary shadow'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  This Month
                </button>
                <button
                  onClick={() => setDateRange({
                    start: startOfMonth(new Date(new Date().setMonth(new Date().getMonth() - 1))),
                    end: endOfMonth(new Date(new Date().setMonth(new Date().getMonth() - 1)))
                  })}
                  className="px-3 py-1 rounded-md text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  Last Month
                </button>
                <button
                  onClick={() => setDateRange({
                    start: new Date(new Date().setMonth(new Date().getMonth() - 3)),
                    end: new Date()
                  })}
                  className="px-3 py-1 rounded-md text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  Last 3 Months
                </button>
              </div>
            </div>
          </div>

          {/* Analytics Data */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Events</h3>
              <p className="text-2xl font-bold text-neutral-dark">
                {getAnalyticsForDateRange().events}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {format(dateRange.start, 'MMM d')} - {format(dateRange.end, 'MMM d, yyyy')}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Attendance</h3>
              <p className="text-2xl font-bold text-neutral-dark">
                {getAnalyticsForDateRange().attendance}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {format(dateRange.start, 'MMM d')} - {format(dateRange.end, 'MMM d, yyyy')}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Revenue</h3>
              <p className="text-2xl font-bold text-neutral-dark">
                ${getAnalyticsForDateRange().revenue}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {format(dateRange.start, 'MMM d')} - {format(dateRange.end, 'MMM d, yyyy')}
              </p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="mt-8 space-y-6">
            {/* Revenue Chart */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={generateDailyData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#843bfb" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Attendance and Events Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Daily Attendance</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={generateDailyData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="attendance" 
                      fill="#843bfb" 
                      opacity={0.8}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Events Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={generateDailyData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar 
                      dataKey="events" 
                      fill="#843bfb" 
                      opacity={0.8}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500">Average Revenue per Event</h4>
                <p className="text-2xl font-bold mt-2">
                  ${Math.round(getAnalyticsForDateRange().revenue / getAnalyticsForDateRange().events)}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500">Average Attendance per Event</h4>
                <p className="text-2xl font-bold mt-2">
                  {Math.round(getAnalyticsForDateRange().attendance / getAnalyticsForDateRange().events)}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500">Revenue Growth</h4>
                <p className="text-2xl font-bold mt-2 text-green-500">+12.5%</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500">Most Active Day</h4>
                <p className="text-2xl font-bold mt-2">Saturday</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <AddEventModal 
        isOpen={showAddEventModal} 
        onClose={() => setShowAddEventModal(false)} 
      />

      <EventDetailsModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {showPreviewPopup && <PreviewPopup />}
    </div>
  );
}

export default Business; 