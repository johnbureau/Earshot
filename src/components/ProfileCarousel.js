import { useRef } from 'react';
import ProfileCard from './ProfileCard';

function ProfileCarousel({ title, profiles }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = direction === 'left' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-neutral-dark">{title}</h2>
        <div className="space-x-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {profiles.map((profile) => (
          <div key={profile.id} style={{ scrollSnapAlign: 'start' }}>
            <ProfileCard profile={profile} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileCarousel; 