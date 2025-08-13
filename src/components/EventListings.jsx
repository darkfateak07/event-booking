import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Clock, ArrowRight, Star, Users, Heart, Share2 } from 'lucide-react';

const EventListings = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [likedEvents, setLikedEvents] = useState(new Set());

  const events = [
    {
      id: 1,
      title: "Impression",
      description: "A personal portfolio is a curated collection of an individual's professional work",
      time: "10 Am To 10 Pm",
      date: "20 April 2024",
      location: "Mirpur 01 Road N 12 Dhaka Bangladesh",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$299",
      rating: 4.8,
      attendees: "2,500+"
    },
    {
      id: 2,
      title: "Sparkle & Shine on Celebrations",
      description: "A personal portfolio is a curated collection of an individual's professional work",
      time: "11 Am To 11 Pm",
      date: "25 April 2024",
      location: "Gulshan 02 Road N 15 Dhaka Bangladesh",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$199",
      rating: 4.9,
      attendees: "1,800+"
    },
    {
      id: 3,
      title: "Sparkle & Shine Events",
      description: "A personal portfolio is a curated collection of an individual's professional work",
      time: "09 Am To 09 Pm",
      date: "30 April 2024",
      location: "Banani 03 Road N 18 Dhaka Bangladesh",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$150",
      rating: 4.7,
      attendees: "3,200+"
    },
    {
      id: 4,
      title: "Tech Innovation Summit",
      description: "A personal portfolio is a curated collection of an individual's professional work",
      time: "08 Am To 08 Pm",
      date: "05 May 2024",
      location: "Dhanmondi 27 Road N 22 Dhaka Bangladesh",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$399",
      rating: 4.6,
      attendees: "1,500+"
    },
    {
      id: 5,
      title: "Design Excellence Conference",
      description: "A personal portfolio is a curated collection of an individual's professional work",
      time: "10 Am To 10 Pm",
      date: "10 May 2024",
      location: "Uttara 11 Road N 25 Dhaka Bangladesh",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$249",
      rating: 4.8,
      attendees: "2,100+"
    },
    {
      id: 6,
      title: "Music Festival 2024",
      description: "A personal portfolio is a curated collection of an individual's professional work",
      time: "06 Pm To 02 Am",
      date: "15 May 2024",
      location: "Motijheel 01 Road N 30 Dhaka Bangladesh",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$120",
      rating: 4.9,
      attendees: "5,000+"
    },
    {
      id: 7,
      title: "Business Leadership Forum",
      description: "A personal portfolio is a curated collection of an individual's professional work",
      time: "09 Am To 09 Pm",
      date: "20 May 2024",
      location: "Baridhara 12 Road N 35 Dhaka Bangladesh",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$450",
      rating: 4.7,
      attendees: "1,200+"
    },
    {
      id: 8,
      title: "Art & Culture Exhibition",
      description: "A personal portfolio is a curated collection of an individual's professional work",
      time: "11 Am To 11 Pm",
      date: "25 May 2024",
      location: "Lalmatia 14 Road N 40 Dhaka Bangladesh",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$89",
      rating: 4.5,
      attendees: "800+"
    },
    {
      id: 9,
      title: "Sports Championship",
      description: "A personal portfolio is a curated collection of an individual's professional work",
      time: "02 Pm To 10 Pm",
      date: "30 May 2024",
      location: "Mohammadpur 15 Road N 45 Dhaka Bangladesh",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$75",
      rating: 4.4,
      attendees: "3,500+"
    },
    {
      id: 10,
      title: "Food & Wine Festival",
      description: "A personal portfolio is a curated collection of an individual's professional work",
      time: "12 Pm To 12 Am",
      date: "05 June 2024",
      location: "Gulshan 01 Road N 50 Dhaka Bangladesh",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$180",
      rating: 4.8,
      attendees: "1,800+"
    }
  ];

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section id="event-listings" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -50, 0],
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
            x: [0, -30, 0],
            y: [0, 50, 0],
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
            <Calendar className="h-12 w-12 text-purple-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Event Listings
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            Discover and book tickets for the most exclusive events
          </p>
        </motion.div>

        {/* Event Listings */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-6"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-500 transform-gpu"
              onHoverStart={() => setHoveredEvent(event.id)}
              onHoverEnd={() => setHoveredEvent(null)}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Premium 3D Background Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                animate={{
                  scale: hoveredEvent === event.id ? 1.05 : 1,
                  rotate: hoveredEvent === event.id ? 2 : 0,
                }}
                transition={{ duration: 0.4 }}
              />

              <div className="flex flex-col lg:flex-row">
                {/* Content Side */}
                <div className="flex-1 p-8">
                  <div className="space-y-4">
                    {/* Event Title */}
                    <motion.h3 
                      className="text-3xl font-bold text-white mb-2"
                      whileHover={{ color: "#c084fc" }}
                    >
                      {event.title}
                    </motion.h3>
                    
                    {/* Event Description */}
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-3">
                      <motion.div 
                        className="flex items-center space-x-3 text-gray-300"
                        whileHover={{ x: 5, color: "white" }}
                        transition={{ duration: 0.2 }}
                      >
                        <Clock className="h-5 w-5 text-purple-400" />
                        <span className="text-lg">{event.time}</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center space-x-3 text-gray-300"
                        whileHover={{ x: 5, color: "white" }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <Calendar className="h-5 w-5 text-purple-400" />
                        <span className="text-lg">{event.date}</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center space-x-3 text-gray-300"
                        whileHover={{ x: 5, color: "white" }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                        <MapPin className="h-5 w-5 text-purple-400" />
                        <span className="text-lg">{event.location}</span>
                      </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4 mt-6">
                      <motion.button
                        whileHover={{ 
                          scale: 1.03,
                          boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.3)"
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-bold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                      >
                        <span>Buy Ticket</span>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLike(event.id)}
                        className={`p-3 rounded-full backdrop-blur-sm transition-colors ${
                          likedEvents.has(event.id)
                            ? 'bg-red-500 text-white shadow-lg'
                            : 'bg-white/20 text-white hover:bg-red-500 hover:text-white shadow-md'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${likedEvents.has(event.id) ? 'fill-current' : ''}`} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleShare(event)}
                        className="p-3 rounded-full bg-white/20 text-white hover:bg-purple-500 hover:text-white transition-colors shadow-md"
                      >
                        <Share2 className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className="lg:w-80 h-64 lg:h-auto relative">
                  <motion.img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredEvent === event.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Event Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white font-medium">{event.rating}</span>
                      </div>
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        <span className="text-white text-sm font-medium">{event.price}</span>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="flex items-center space-x-2 mt-2"
                    >
                      <Users className="h-4 w-4 text-purple-400" />
                      <span className="text-white text-sm font-medium">{event.attendees}</span>
                    </motion.div>
                  </div>
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
      </div>
    </section>
  );
};

export default EventListings; 