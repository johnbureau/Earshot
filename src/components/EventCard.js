import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import ActivityDetailsModal from './ActivityDetailsModal';

function EventCard({ event, otherActivities }) {
  const { title, date, startTime, endTime, description, category, price, host, creator, recurring } = event;
  const fallbackImage = "https://via.placeholder.com/400x300?text=Event+Image";
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const formattedDate = format(parseISO(date), 'MM-dd-yyyy');

  const handleHostClick = (e) => {
    e.stopPropagation(); // Prevent event card click
    navigate(`/hosts/${host.id}`);
  };

  const handleCreatorClick = (e) => {
    e.stopPropagation(); // Prevent event card click
    navigate(`/creators/${creator.id}`);
  };

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="relative">
          <img 
            src={host.profileImage || fallbackImage} 
            alt={host.name} 
            className="w-full h-48 object-cover"
            onError={(e) => { e.target.src = fallbackImage; }}
          />
          <span className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            {category}
          </span>
          
          {recurring && (
            <span className="absolute top-4 right-24 bg-white bg-opacity-90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Recurring
            </span>
          )}
          
          <div className="absolute bottom-0 left-0 p-4">
            <div 
              className="bg-white bg-opacity-90 backdrop-blur-sm rounded px-3 py-2 shadow-sm cursor-pointer hover:bg-opacity-100 transition-all duration-200"
              onClick={handleHostClick}
            >
              <div className="flex items-center">
                <span className="font-medium text-neutral-dark">{host.name}</span>
                {host.rating && (
                  <div className="flex items-center ml-2">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1">{host.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-neutral-dark">{title}</h3>
            <span className="text-primary font-bold">{price}</span>
          </div>

          {/* Date and Time */}
          <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </div>
            {startTime && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{startTime}{endTime && ` - ${endTime}`}</span>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-500 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {host.location}
          </div>

          {/* Creator Information (if exists) */}
          {creator && (
            <div 
              className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100 hover:border-primary transition-colors duration-200 cursor-pointer"
              onClick={handleCreatorClick}
            >
              <div className="flex items-center space-x-4">
                <img 
                  src={creator.profileImage}
                  alt={creator.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-300 ring-offset-2"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/48?text=C";
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-neutral-dark">{creator.name}</span>
                    {creator.rating && (
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 font-medium">{creator.rating}</span>
                      </div>
                    )}
                  </div>
                  {creator.specialties && (
                    <div className="flex gap-2 mt-1">
                      {creator.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          <button 
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div>

      {showDetails && (
        <ActivityDetailsModal
          activity={event}
          otherActivities={otherActivities}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}

export default EventCard; 