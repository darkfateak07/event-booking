import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, MapPin, Users, Star, Clock, Tag, Sparkles, Heart, Share2, Eye, Crown, Award, ChevronRight, ChevronLeft } from 'lucide-react';

const Events = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [likedEvents, setLikedEvents] = useState(new Set());
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const categories = ['All', 'Technology', 'Design', 'Music', 'Business', 'Education', 'Sports'];
  const locations = ['All', 'San Francisco', 'New York', 'Los Angeles', 'Chicago', 'Miami', 'Austin'];

  const events = [
    {
      id: 1,
      title: "Tech Conference 2024",
      category: "Technology",
      location: "San Francisco, CA",
      date: "2024-12-15",
      time: "09:00 AM",
      price: "$299",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      attendees: 2500,
      rating: 4.8,
      description: "Join the biggest tech conference of the year with industry leaders and innovators.",
      gradient: "from-blue-500 to-purple-600",
      premium: true
    },
    {
      id: 2,
      title: "Design Summit",
      category: "Design",
      location: "New York, NY",
      date: "2025-01-20",
      time: "10:00 AM",
      price: "$199",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      attendees: 1800,
      rating: 4.9,
      description: "Explore the latest design trends and connect with creative professionals.",
      gradient: "from-pink-500 to-orange-500",
      premium: false
    },
    {
      id: 3,
      title: "Music Festival",
      category: "Music",
      location: "Los Angeles, CA",
      date: "2025-02-10",
      time: "06:00 PM",
      price: "$150",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      attendees: 5000,
      rating: 4.7,
      description: "Experience the ultimate music festival with top artists and amazing performances.",
      gradient: "from-green-500 to-teal-500",
      premium: true
    },
    {
      id: 4,
      title: "Business Innovation Summit",
      category: "Business",
      location: "Chicago, IL",
      date: "2025-03-05",
      time: "08:30 AM",
      price: "$399",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      attendees: 1200,
      rating: 4.6,
      description: "Learn from business leaders and discover innovative strategies for growth.",
      gradient: "from-indigo-500 to-blue-600",
      premium: false
    },
    {
      id: 5,
      title: "Sports Championship",
      category: "Sports",
      location: "Miami, FL",
      date: "2025-04-12",
      time: "02:00 PM",
      price: "$89",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      attendees: 8000,
      rating: 4.5,
      description: "Witness the most exciting sports championship with top athletes.",
      gradient: "from-red-500 to-orange-500",
      premium: false
    },
    {
      id: 6,
      title: "Education Workshop",
      category: "Education",
      location: "Austin, TX",
      date: "2025-05-08",
      time: "11:00 AM",
      price: "$79",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      attendees: 500,
      rating: 4.4,
      description: "Enhance your skills with hands-on workshops and expert guidance.",
      gradient: "from-yellow-500 to-orange-500",
      premium: false
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || event.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date) - new Date(b.date);
      case 'price':
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case 'rating':
        return b.rating - a.rating;
      case 'attendees':
        return b.attendees - a.attendees;
      default:
        return 0;
    }
  });

  const handleLike = (eventId) => {
    setLikedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const handleShare = (event) => {
    console.log(`Sharing: ${event.title}`);
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -15,
      scale: 1.03,
      rotateY: 5,
      rotateX: -3,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
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
            <Crown className="h-12 w-12 text-purple-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Premium Events
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            Discover and book tickets for the most exclusive events with premium services
          </p>
        </motion.div>

        {/* Premium Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          {/* Premium Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4">
            <motion.div 
              className="relative flex-1"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <motion.input
                type="text"
                placeholder="Search premium events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-gray-400 ${
                  isSearchFocused ? 'border-purple-500 shadow-lg' : 'border-white/20'
                }`}
                animate={{
                  scale: isSearchFocused ? 1.01 : 1,
                  boxShadow: isSearchFocused ? "0 10px 25px -5px rgba(168, 85, 247, 0.15)" : "0 0 0 0"
                }}
              />
            </motion.div>
            <motion.select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/10 backdrop-blur-md text-white"
              whileHover={{ scale: 1.01 }}
              whileFocus={{ scale: 1.01 }}
            >
              <option value="date" className="bg-gray-800">Sort by Date</option>
              <option value="price" className="bg-gray-800">Sort by Price</option>
              <option value="rating" className="bg-gray-800">Sort by Rating</option>
              <option value="attendees" className="bg-gray-800">Sort by Attendees</option>
            </motion.select>
          </div>

          {/* Premium Category and Location Filters */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                      : 'bg-white/10 backdrop-blur-md text-gray-300 hover:text-white border border-white/20 hover:border-purple-300'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {locations.map((location, index) => (
                <motion.button
                  key={location}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedLocation(location)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedLocation === location
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                      : 'bg-white/10 backdrop-blur-md text-gray-300 hover:text-white border border-white/20 hover:border-purple-300'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {location}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Premium Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${searchTerm}-${selectedCategory}-${selectedLocation}-${sortBy}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sortedEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={cardVariants}
                whileHover="hover"
                layout
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-500 transform-gpu"
                onHoverStart={() => setHoveredEvent(event.id)}
                onHoverEnd={() => setHoveredEvent(null)}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Premium 3D Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  animate={{
                    scale: hoveredEvent === event.id ? 1.05 : 1,
                    rotate: hoveredEvent === event.id ? 2 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />

                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredEvent === event.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Premium Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLike(event.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                        likedEvents.has(event.id)
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'bg-white/20 text-white hover:bg-red-500 hover:text-white shadow-md'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${likedEvents.has(event.id) ? 'fill-current' : ''}`} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare(event)}
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-purple-500 hover:text-white transition-colors shadow-md"
                    >
                      <Share2 className="h-4 w-4" />
                    </motion.button>
                  </div>

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <motion.span 
                      className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      {event.category}
                    </motion.span>
                    {event.premium && (
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium rounded-full"
                      >
                        <Crown className="h-3 w-3" />
                        <span>Premium</span>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-16 flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full shadow-md">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium text-white">{event.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-semibold text-white mb-2 line-clamp-2"
                    whileHover={{ color: "#c084fc" }}
                  >
                    {event.title}
                  </motion.h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <motion.div 
                      className="flex items-center space-x-2 text-sm text-gray-300"
                      whileHover={{ x: 3, color: "#c084fc" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-2 text-sm text-gray-300"
                      whileHover={{ x: 3, color: "#c084fc" }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-2 text-sm text-gray-300"
                      whileHover={{ x: 3, color: "#c084fc" }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                    >
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-2 text-sm text-gray-300"
                      whileHover={{ x: 3, color: "#c084fc" }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      <Users className="h-4 w-4" />
                      <span>{event.attendees.toLocaleString()} attendees</span>
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-purple-400" />
                      <span className="text-2xl font-bold text-purple-400">{event.price}</span>
                    </div>
                    <Link to={`/event/${event.id}`}>
                      <motion.button
                        whileHover={{ 
                          scale: 1.03,
                          boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.3)"
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="group flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                      >
                        <span>View Details</span>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Eye className="h-4 w-4" />
                        </motion.div>
                      </motion.button>
                    </Link>
                  </div>
                </div>

                {/* Premium Hover Border */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent rounded-2xl"
                  animate={{
                    borderColor: hoveredEvent === event.id ? "#c084fc" : "transparent",
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Premium No Results */}
        {sortedEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-gray-400 text-lg mb-6"
            >
              <Award className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              No premium events found matching your criteria.
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLocation('All');
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Events; 