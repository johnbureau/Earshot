import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold hover:text-neutral-lightest">
            LocalEvents
          </Link>
          <div className="space-x-6">
            <Link to="/" className="hover:text-neutral-lightest transition-colors">
              Home
            </Link>
            <Link to="/events" className="hover:text-neutral-lightest transition-colors">
              Events
            </Link>
            <Link to="/about" className="hover:text-neutral-lightest transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 