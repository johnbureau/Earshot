import { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { hostProfiles, creatorProfiles } from '../data/profiles';

function Profiles() {
  const [activeTab, setActiveTab] = useState('hosts');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'hosts' 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('hosts')}
        >
          Venues & Hosts
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'creators' 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('creators')}
        >
          Creators
        </button>
      </div>

      {/* Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'hosts' && 
          Object.values(hostProfiles).map(profile => (
            <ProfileCard 
              key={profile.id} 
              profile={profile} 
              userType="host"
            />
          ))
        }
        {activeTab === 'creators' && 
          Object.values(creatorProfiles).map(profile => (
            <ProfileCard 
              key={profile.id} 
              profile={profile} 
              userType="creator"
            />
          ))
        }
      </div>
    </div>
  );
}

export default Profiles; 