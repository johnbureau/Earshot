function EventModal({ event, onClose }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}
        <div className="flex justify-between items-start p-6 border-b">
          <h2 className="text-2xl font-bold text-neutral-dark">{event.title}</h2>
          <button 
            onClick={onClose}
            className="text-neutral hover:text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          <div className="relative h-64 mb-6">
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <span className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              {event.category}
            </span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-neutral-dark">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{event.date}</span>
            </div>
            <div className="flex items-center text-neutral-dark">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-primary font-bold">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{event.price}</span>
            </div>
          </div>

          {/* Description */}
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-2 text-neutral-dark">About this event</h3>
            <p className="text-neutral-dark">{event.description}</p>
          </div>

          {/* Action Button */}
          <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200 mt-6">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventModal; 