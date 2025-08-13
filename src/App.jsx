import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Events from './components/Events';
import EventListings from './components/EventListings';
import WhatsHappening from './components/WhatsHappening';
import Singers from './components/Singers';
import Gallery from './components/Gallery';
import Speakers from './components/Speakers';
import About from './components/About';
import BookingSection from './components/BookingSection';
import EventDetails from './components/EventDetails';
import Booking from './components/Booking';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Hero />
                <Events />
                <EventListings />
                <WhatsHappening />
                <Singers />
                <Gallery />
                <Speakers />
                <About />
                <BookingSection />
              </motion.div>
            } />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/booking/:id" element={<Booking />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
