import { useRef } from 'react';
import EventCard from './EventCard';

function HorizontalGallery({ events }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = direction === 'left' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {events.length > 0 && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="flex-none w-80"
            style={{ scrollSnapAlign: 'start' }}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HorizontalGallery; 