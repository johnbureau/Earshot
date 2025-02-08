function EventCard({ event, onViewDetails }) {
  const { title, date, description, imageUrl, category, location, price } = event;
  const fallbackImage = "https://via.placeholder.com/400x300?text=Event+Image";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative">
        <img 
          src={imageUrl || fallbackImage} 
          alt={title} 
          className="w-full h-48 object-cover"
          onError={(e) => { e.target.src = fallbackImage; }}
        />
        <span className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          {category}
        </span>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-neutral-dark">{title}</h3>
          <span className="text-primary font-bold">{price}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {date}
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <button 
          onClick={() => onViewDetails(event)}
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default EventCard; 