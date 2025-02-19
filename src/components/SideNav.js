import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HomeIcon,
  CalendarIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  BookOpenIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

export default function SideNav() {
  const { isLoggedIn } = useAuth();

  const navigation = [
    ...(isLoggedIn ? [
      { name: 'Business', href: '/business', icon: BriefcaseIcon }
    ] : []),
    { name: 'Home', href: '/home', icon: HomeIcon },
    { name: 'Events', href: '/events', icon: CalendarIcon },
    { name: 'Places', href: '/places', icon: BuildingStorefrontIcon },
    { name: 'Profiles', href: '/profiles', icon: UsersIcon },
    { name: 'Resources', href: '/resources', icon: BookOpenIcon }
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg pt-16">
      <nav className="mt-5 px-2 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <item.icon
              className={`mr-3 h-5 w-5 flex-shrink-0`}
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
} 