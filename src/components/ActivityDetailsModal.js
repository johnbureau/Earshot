import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { getActivityEmoji } from '../utils/activityEmojis';
import { useState } from 'react';

function ActivityDetailsModal({ isOpen, onClose, activity }) {
  const [showCopied, setShowCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLocation = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(activity.venue);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000); // Hide after 2 seconds
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getActivityEmoji(activity)}</span>
              <h2 className="text-2xl font-bold text-neutral-dark">{activity.title}</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Date and Time */}
          <div className="flex items-center text-gray-600 gap-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{format(new Date(activity.date), 'MMMM d, yyyy')}</span>
            </div>
            {activity.startTime && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{activity.startTime}{activity.endTime && ` - ${activity.endTime}`}</span>
              </div>
            )}
          </div>

          {/* Venue with Copy Feature */}
          {activity.venue && (
            <div className="group relative flex items-start gap-2 text-gray-600">
              <button
                onClick={handleCopyLocation}
                className="flex items-start gap-2 hover:text-primary transition-colors"
                title="Click to copy address"
              >
                <svg className="w-5 h-5 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="group-hover:text-primary transition-colors">
                  {activity.venue}
                </span>
              </button>
              
              {/* Copy Feedback Tooltip */}
              {showCopied && (
                <div className="absolute -top-8 left-0 bg-neutral-dark text-white px-2 py-1 rounded text-sm">
                  Copied to clipboard!
                  <div className="absolute -bottom-1 left-4 w-2 h-2 bg-neutral-dark transform rotate-45"></div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 mt-4">{activity.description}</p>

          {/* Price */}
          {activity.price && (
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{activity.price}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetailsModal; 