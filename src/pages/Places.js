import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, isWithinInterval } from '../utils/dateUtils';

// Fallback map component in case Google Maps fails to load
const FallbackMap = () => (
  <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
    <p className="text-gray-500">Map loading...</p>
  </div>
);

function Places() {
  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  const navigate = useNavigate();

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '0.5rem'
  };

  const defaultCenter = {
    lat: 30.2672,
    lng: -97.7431
  };

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);

  // Fallback data in case we can't load the map
  const places = [
    {
      id: 1,
      name: "The Rustic Tap",
      location: { lat: 30.2672, lng: -97.7431 },
      address: "123 Main St, Austin, TX",
      rating: 4.5,
      events: [
        { date: "2024-01-15", title: "Live Music Night" },
        { date: "2024-01-22", title: "Trivia Night" }
      ]
    },
    // ... more places
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Places</h1>
        <div className="flex gap-4">
          <DatePicker
            selected={selectedDates.start}
            onChange={(date) => setSelectedDates(prev => ({ ...prev, start: date }))}
            placeholderText="Start Date"
            className="px-3 py-2 border rounded-lg"
          />
          <DatePicker
            selected={selectedDates.end}
            onChange={(date) => setSelectedDates(prev => ({ ...prev, end: date }))}
            placeholderText="End Date"
            className="px-3 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="mb-8">
        <LoadScript 
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          loadingElement={<FallbackMap />}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={13}
            onLoad={onMapLoad}
          >
            {mapLoaded && places.map(place => (
              <Marker
                key={place.id}
                position={place.location}
                onClick={() => navigate(`/places/${place.id}`)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map(place => (
          <div 
            key={place.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/places/${place.id}`)}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
              <p className="text-gray-600 mb-4">{place.address}</p>
              <div className="flex items-center text-yellow-500 mb-4">
                <span className="mr-1">{place.rating}</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              {place.events.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Upcoming Events</h3>
                  <ul className="space-y-1">
                    {place.events.map((event, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {format(new Date(event.date), 'MMM d')} - {event.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Places; 