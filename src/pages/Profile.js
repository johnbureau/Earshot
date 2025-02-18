import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import EventCard from '../components/EventCard';
import Calendar from '../components/Calendar'; // We'll create this next
import { hostProfiles, creatorProfiles, getProfileEvents } from '../data/profiles';
import { events } from '../data/events';

function Profile() {
  const { userId, userType } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let userData;
        switch (userType) {
          case 'host':
            userData = hostProfiles[userId];
            break;
          case 'creator':
            userData = creatorProfiles[userId];
            break;
          case 'user':
            // Add regular user data fetching
            break;
          default:
            console.error('Invalid user type');
        }
        
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, userType]);

  // Get relevant events for the profile
  const profileEvents = getProfileEvents(userId, userType, events);

  // Add past events filter
  const pastEvents = profileEvents.filter(event => new Date(event.date) < new Date());
  const upcomingEvents = profileEvents.filter(event => new Date(event.date) >= new Date());

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
          <button 
            onClick={() => navigate(-1)}
            className="text-primary hover:text-primary-dark"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <div className="max-w-6xl mx-auto px-4 py-8 pt-16">
        {/* Profile Header/Banner Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="relative h-48 bg-primary">
            <img 
              src={user.profileImage} 
              alt={user.name}
              className="w-32 h-32 rounded-full absolute -bottom-16 left-8 border-4 border-white shadow-lg object-cover"
            />
          </div>
          <div className="pt-20 pb-6 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-neutral-dark">{user.name}</h1>
                {userType === 'host' && (
                  <>
                    <p className="text-gray-600">{user.businessType}</p>
                    <p className="text-gray-600 mt-1">{user.location}</p>
                  </>
                )}
                {user.specialties && (
                  <div className="flex gap-2 mt-2">
                    {user.specialties.map((specialty, index) => (
                      <span 
                        key={index}
                        className="text-sm bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-start gap-3">
                {user.rating && (
                  <div className="flex items-center bg-primary bg-opacity-10 px-4 py-2 rounded-lg">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-2 font-semibold text-primary">{user.rating}</span>
                  </div>
                )}
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isFollowing 
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Following
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Follow
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* About Section */}
            {userType === 'host' && (
              <div className="mt-6">
                <button
                  onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                  className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                >
                  <span className="font-medium">About</span>
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${isAboutExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isAboutExpanded && (
                  <div className="mt-4 space-y-4 text-gray-600 animate-fadeIn">
                    <p>{user.description}</p>
                    {user.amenities && (
                      <div>
                        <h3 className="font-medium text-neutral-dark mb-2">Amenities</h3>
                        <div className="flex flex-wrap gap-2">
                          {user.amenities.map((amenity, index) => (
                            <span 
                              key={index}
                              className="text-sm bg-gray-100 px-3 py-1 rounded-full"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {user.businessHours && (
                      <div>
                        <h3 className="font-medium text-neutral-dark mb-2">Business Hours</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(user.businessHours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between">
                              <span className="capitalize">{day}</span>
                              <span>{hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <Calendar userEvents={profileEvents} />
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'upcoming' 
                ? 'bg-primary text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Events
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'history' 
                ? 'bg-primary text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('history')}
          >
            Previous Events
          </button>
        </div>

        {/* Content Sections */}
        {activeTab === 'upcoming' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => (
                <EventCard 
                  key={event.eventId} 
                  event={event}
                  otherActivities={[]}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8 bg-white rounded-xl shadow-lg">
                <p className="text-gray-600">No upcoming events scheduled</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.length > 0 ? (
              pastEvents.map(event => (
                <EventCard 
                  key={event.eventId} 
                  event={event}
                  otherActivities={[]}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8 bg-white rounded-xl shadow-lg">
                <p className="text-gray-600">No past events found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile; 