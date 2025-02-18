import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { events } from '../data/events';

function HostProfile() {
  const { hostId } = useParams();
  const navigate = useNavigate();
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Temporary: Find host in events data
    // In a real app, this would be an API call
    const findHost = async () => {
      try {
        setLoading(true);
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find the host in your events data
        const foundHost = events.find(event => event.host.id === hostId)?.host;
        
        if (foundHost) {
          setHost(foundHost);
        } else {
          // Handle not found
          console.error('Host not found');
        }
      } catch (error) {
        console.error('Error fetching host:', error);
      } finally {
        setLoading(false);
      }
    };

    findHost();
  }, [hostId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!host) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Host Not Found</h2>
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

      {/* Host Profile Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 pt-16">
        {/* Host Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="relative h-48 bg-primary">
            <img 
              src={host.profileImage} 
              alt={host.name}
              className="w-32 h-32 rounded-full absolute -bottom-16 left-8 border-4 border-white shadow-lg object-cover"
            />
          </div>
          <div className="pt-20 pb-6 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-neutral-dark">{host.name}</h1>
                <p className="text-gray-600">{host.businessType}</p>
                <p className="text-gray-600 mt-1">{host.location}</p>
              </div>
              {host.rating && (
                <div className="flex items-center bg-primary bg-opacity-10 px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-2 font-semibold text-primary">{host.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Host's Upcoming Events */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Event cards would go here */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HostProfile; 