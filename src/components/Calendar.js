import { useState } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  format, 
  isSameDay 
} from 'date-fns/esm';
import { getActivityEmoji } from '../utils/activityEmojis';
import ActivityDetailsModal from './ActivityDetailsModal';

function Calendar({ userEvents }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleActivityClick = (event, activity) => {
    event.stopPropagation();
    setSelectedActivity({
      ...activity,
      event: event // Include the parent event data
    });
    setShowModal(true);
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium py-2">
              {day}
            </div>
          ))}
          {days.map(day => {
            const eventsOnDay = userEvents.filter(event => 
              isSameDay(new Date(event.date), day)
            );
            
            return (
              <div
                key={day.toString()}
                className={`p-2 border rounded-lg ${
                  eventsOnDay.length > 0 ? 'bg-primary bg-opacity-10' : ''
                }`}
              >
                <div className="text-sm">{format(day, 'd')}</div>
                {eventsOnDay.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {eventsOnDay.map((event, index) => {
                      const activity = event.activity || event.activities[0];
                      return (
                        <span 
                          key={index}
                          className="text-xs cursor-pointer hover:scale-125 transition-transform"
                          title={activity.title}
                          onClick={(e) => handleActivityClick(e, {
                            ...activity,
                            date: event.date,
                            venue: event.venue
                          })}
                        >
                          {getActivityEmoji(activity)}
                        </span>
                      );
                    }).slice(0, 3)}
                    {eventsOnDay.length > 3 && (
                      <span className="text-xs text-primary font-medium">
                        +{eventsOnDay.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Details Modal */}
      {showModal && selectedActivity && (
        <ActivityDetailsModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedActivity(null);
          }}
          activity={selectedActivity}
          otherActivities={[]} // You can populate this if needed
        />
      )}
    </>
  );
}

export default Calendar; 