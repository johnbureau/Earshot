import { Link } from 'react-router-dom';
import SettingsDropdown from './SettingsDropdown';
import ProfileDropdown from './ProfileDropdown';

function Navbar() {
  return (
    <nav className="bg-primary text-white shadow-lg fixed w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-end items-center h-16">
          {/* Icons on the right */}
          <div className="flex items-center space-x-4">
            <ProfileDropdown />
            <SettingsDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 