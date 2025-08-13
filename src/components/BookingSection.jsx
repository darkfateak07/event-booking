import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Ticket, Calendar, MapPin, Users, Star, ArrowRight, Play, CheckCircle, Phone, Mail, Clock } from 'lucide-react';

const BookingSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event: '',
    attendees: '',
    message: ''
  });

  const marqueeItems = [
    "🎉 Premium Events • Exclusive Experiences • VIP Access",
    "🌟 World-Class Entertainment • Live Performances • Amazing Shows",
    "🎵 Music Festivals • Tech Conferences • Design Summits",
    "💫 Business Events • Networking • Professional Growth",
    "🎭 Art Exhibitions • Cultural Events • Creative Workshops"
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "Dec 15-17, 2024",
      location: "San Francisco, CA",
      price: "$299",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      attendees: "2,500+",
      rating: 4.8
    },
    {
      id: 2,
      title: "Design Summit",
      date: "Jan 20-22, 2025",
      location: "New York, NY",
      price: "$199",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      attendees: "1,800+",
      rating: 4.9
    },
    {
      id: 3,
      title: "Music Festival",
      date: "Feb 10-12, 2025",
      location: "Los Angeles, CA",
      price: "$150",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      attendees: "5,000+",
      rating: 4.7
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking form submitted:', formData);
    // Handle form submission
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-pink-600/10 to-purple-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      {/* Marquee Section */}
      <div className="relative overflow-hidden bg-white/5 backdrop-blur-md border-y border-white/10 py-4 mb-16">
        <motion.div
          className="flex space-x-8 whitespace-nowrap"
          animate={{
            x: [0, -50 * marqueeItems.length],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} className="flex items-center space-x-4 text-white font-medium">
              <span>{item}</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-6"
          >
            <Ticket className="h-12 w-12 text-purple-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Book Your Event
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            Secure your spot at the most exclusive events with our premium booking service
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Booking Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Get Your Tickets
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Join thousands of attendees at our premium events. Book your tickets now and get exclusive access to world-class entertainment, networking opportunities, and unforgettable experiences.
              </p>
            </motion.div>

            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-white font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                    required
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-white font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-white font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-white font-medium mb-2">Event</label>
                  <select
                    name="event"
                    value={formData.event}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="" className="bg-gray-800">Select an event</option>
                    <option value="tech-conference" className="bg-gray-800">Tech Conference 2024</option>
                    <option value="design-summit" className="bg-gray-800">Design Summit</option>
                    <option value="music-festival" className="bg-gray-800">Music Festival</option>
                    <option value="business-summit" className="bg-gray-800">Business Innovation Summit</option>
                  </select>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-white font-medium mb-2">Number of Attendees</label>
                <input
                  type="number"
                  name="attendees"
                  value={formData.attendees}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Number of tickets"
                  required
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-white font-medium mb-2">Special Requirements</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Any special requirements or requests..."
                />
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.3)"
                }}
                whileTap={{ scale: 0.97 }}
                className="w-full group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-bold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
              >
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
                <span>Book Now</span>
              </motion.button>
            </motion.form>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <h4 className="text-white font-semibold mb-4">Need Help?</h4>
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center space-x-3 text-gray-300"
                  whileHover={{ x: 5, color: "white" }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="h-4 w-4 text-purple-400" />
                  <span>+1 (555) 123-4567</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 text-gray-300"
                  whileHover={{ x: 5, color: "white" }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <Mail className="h-4 w-4 text-purple-400" />
                  <span>booking@eventflow.com</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 text-gray-300"
                  whileHover={{ x: 5, color: "white" }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span>24/7 Support Available</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Upcoming Events Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-6">Upcoming Events</h3>
            </motion.div>

            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <h4 className="text-white font-semibold mb-1">{event.title}</h4>
                      <div className="space-y-1 text-sm text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="h-3 w-3" />
                            <span>{event.attendees}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs">{event.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-purple-400 font-bold">{event.price}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                        >
                          Book Now
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection; 