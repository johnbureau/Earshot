import { format } from 'date-fns';

function EventDetailsModal({ event, onClose }) {
  if (!event) return null;

  const handleEdit = () => {
    // Implement edit functionality
    console.log('Edit event:', event.id);
  };

  const handleCancel = () => {
    // Implement cancel functionality
    console.log('Cancel event:', event.id);
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log('Delete event:', event.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="p-6 border-b flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-neutral-dark">{event.title}</h2>
            <p className="text-gray-600">
              {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Time</h3>
              <p className="text-neutral-dark">
                {format(new Date(`${event.date} ${event.time}`), 'h:mm a')}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Venue</h3>
              <p className="text-neutral-dark">{event.venue}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Role</h3>
              <p className="text-neutral-dark">{event.role}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                event.status === 'Confirmed' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {event.status}
              </span>
            </div>
          </div>

          {event.status === 'Confirmed' && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <h3 className="font-medium text-neutral-dark">Event Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Attendance</p>
                  <p className="font-medium text-neutral-dark">{event.attendance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="font-medium text-neutral-dark">
                    ${event.revenue}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
            
            <button
              onClick={handleEdit}
              className="px-4 py-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
            >
              Edit Event
            </button>

            {event.status === 'Pending' && (
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-yellow-600 hover:bg-yellow-600 hover:text-white rounded-lg transition-colors"
              >
                Cancel Event
              </button>
            )}

            <button
              onClick={handleDelete}
              className="px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsModal; 