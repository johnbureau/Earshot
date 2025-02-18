import { Link } from 'react-router-dom';
import Login from '../components/Login';

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Earshot</h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect with local businesses and discover events in your area
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Discover Events</h3>
          <p className="text-gray-600">Find and attend local events that interest you.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Connect</h3>
          <p className="text-gray-600">Network with other businesses and event organizers.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Grow</h3>
          <p className="text-gray-600">Expand your reach and grow your business.</p>
        </div>
      </div>

      {/* Login Section */}
      <div className="border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-bold text-center mb-8">Business Login</h2>
        <Login />
      </div>
    </div>
  );
}

export default Home; 