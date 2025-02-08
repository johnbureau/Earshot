import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Discover Local Events</h1>
        <p className="text-xl text-gray-600 mb-8">Find the best events happening in your area</p>
        <Link 
          to="/events" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Browse Events
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Music Events</h3>
          <p className="text-gray-600">Discover local concerts and performances</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Food Festivals</h3>
          <p className="text-gray-600">Explore culinary experiences</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Art Exhibitions</h3>
          <p className="text-gray-600">Browse local art galleries and shows</p>
        </div>
      </div>
    </div>
  );
}

export default Home; 