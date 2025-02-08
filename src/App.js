import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';  
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-lightest">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
