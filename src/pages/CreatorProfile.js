import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { events } from '../data/events';

function CreatorProfile() {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Temporary: Find creator in events data
    // In a real app, this would be an API call
    const findCreator = async () => {
      try {
        setLoading(true);
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find the creator in your events data
        const foundCreator = events.flatMap(event => 
          event.activities.map(activity => activity.creator)
        ).find(creator => creator.id === creatorId);
        
        if (foundCreator) {
          setCreator(foundCreator);
        } else {
          // Handle not found
          console.error('Creator not found');
        }
      } catch (error) {
        console.error('Error fetching creator:', error);
      } finally {
        setLoading(false);
      }
    };

    findCreator();
  }, [creatorId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Creator Not Found</h2>
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

      {/* Creator Profile Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 pt-16">
        {/* Creator Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-8 flex items-start gap-6">
            <img 
              src={creator.profileImage} 
              alt={creator.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-neutral-dark">{creator.name}</h1>
                  {creator.specialties && (
                    <div className="flex gap-2 mt-2">
                      {creator.specialties.map((specialty, index) => (
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
                {creator.rating && (
                  <div className="flex items-center bg-primary bg-opacity-10 px-4 py-2 rounded-lg">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-2 font-semibold text-primary">{creator.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Creator's Activities */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Activity cards would go here */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CreatorProfile; 