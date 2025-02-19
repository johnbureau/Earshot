import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';  
import Layout from './components/Layout';
import Home from './pages/Home';
import Events from './pages/Events';
import Places from './pages/Places';
import Profiles from './pages/Profiles';
import Resources from './pages/Resources';
import Business from './pages/Business';
import { AuthProvider } from './context/AuthContext';
import HostProfile from './pages/HostProfile';
import CreatorProfile from './pages/CreatorProfile';
import Profile from './pages/Profile';
import { UserProvider } from './context/UserContext';
import Admin from './pages/Admin';

function DefaultRoute() {
  return <Navigate to="/home" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<DefaultRoute />} />
              <Route path="/home" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/places" element={<Places />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/business" element={<Business />} />
              <Route path="/hosts/:hostId" element={<HostProfile />} />
              <Route path="/creators/:creatorId" element={<CreatorProfile />} />
              <Route path="/profile/:userType/:userId" element={<Profile />} />
              <Route path="/admin/*" element={<Admin />} />
            </Route>
          </Routes>
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
