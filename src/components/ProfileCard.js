import { useNavigate } from 'react-router-dom';

function ProfileCard({ profile, userType }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative h-48">
        <img 
          src={profile.coverImage || profile.profileImage} 
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <img 
          src={profile.profileImage} 
          alt={profile.name}
          className="absolute bottom-4 left-4 w-20 h-20 rounded-full border-2 border-white object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-neutral-dark">{profile.name}</h3>
            <p className="text-gray-600 text-sm">
              {userType === 'host' ? profile.businessType : profile.experience}
            </p>
          </div>
          {profile.rating && (
            <div className="flex items-center bg-primary bg-opacity-10 px-2 py-1 rounded">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm font-medium">{profile.rating}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {profile.shortDescription || profile.description}
        </p>

        {profile.specialties && (
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.specialties.slice(0, 3).map((specialty, index) => (
              <span 
                key={index}
                className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}

        <button 
          onClick={() => navigate(`/profile/${userType}/${profile.id}`)}
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileCard; 