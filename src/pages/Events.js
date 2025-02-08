import { useState, useMemo } from 'react';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';

function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: "Summer Music Festival",
      date: "July 15, 2024",
      description: "Join us for a day of amazing live music performances featuring top artists from around the world!",
      imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Music",
      location: "Central Park, NY",
      price: "$49.99"
    },
    {
      id: 2,
      title: "Tech Conference 2024",
      date: "August 20, 2024",
      description: "Explore the latest in technology trends, AI, and digital transformation with industry experts.",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Tech",
      location: "Convention Center, SF",
      price: "$299.99"
    },
    {
      id: 3,
      title: "Food & Wine Festival",
      date: "September 5, 2024",
      description: "Taste exquisite dishes and premium wines from renowned chefs and wineries.",
      imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Food",
      location: "Downtown Plaza, LA",
      price: "$75.00"
    }
  ];

  const categories = ['all', 'Music', 'Tech', 'Food', 'Art', 'Sports'];
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $50', value: 'under50' },
    { label: '$50 - $100', value: '50-100' },
    { label: 'Over $100', value: 'over100' }
  ];

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const price = parseFloat(event.price.replace('$', ''));
      const matchesPrice = priceRange === 'all' ||
        (priceRange === 'under50' && price < 50) ||
        (priceRange === '50-100' && price >= 50 && price <= 100) ||
        (priceRange === 'over100' && price > 100);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [events, searchTerm, selectedCategory, priceRange]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full px-4 py-2 rounded-lg border border-neutral focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 rounded-lg border border-neutral bg-white hover:border-primary focus:border-primary focus:ring-primary"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <select
              className="px-4 py-2 rounded-lg border border-neutral bg-white hover:border-primary focus:border-primary focus:ring-primary"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-dark">
          {filteredEvents.length} Events Found
        </h2>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            onViewDetails={setSelectedEvent}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

      {/* No Results Message */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-600">No events found matching your criteria</h3>
        </div>
      )}
    </div>
  );
}

export default Events; 