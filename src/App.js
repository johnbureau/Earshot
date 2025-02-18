import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';  
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import Home from './pages/Home';
import Events from './pages/Events';
import Places from './pages/Places';
import Profiles from './pages/Profiles';
import About from './pages/About';
import Business from './pages/Business';
import { AuthProvider, useAuth } from './context/AuthContext';
import HostProfile from './pages/HostProfile';
import CreatorProfile from './pages/CreatorProfile';
import Profile from './pages/Profile';

function DefaultRoute() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/business" replace /> : <Home />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-neutral-lightest">
          <Navbar />
          <SideNav />
          <div className="ml-64 pt-16"> {/* Add margin for sidenav and padding for navbar */}
            <div className="p-8">
              <Routes>
                <Route path="/" element={<DefaultRoute />} />
                <Route path="/events" element={<Events />} />
                <Route path="/places" element={<Places />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="/about" element={<About />} />
                <Route path="/business" element={<Business />} />
                <Route path="/hosts/:hostId" element={<HostProfile />} />
                <Route path="/creators/:creatorId" element={<CreatorProfile />} />
                <Route path="/profile/:userType/:userId" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
