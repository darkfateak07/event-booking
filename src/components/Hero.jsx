import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Play, Calendar, MapPin, Users, ArrowRight, Clock, Star, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);
  const containerRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [2, -2]);
  const rotateY = useTransform(mouseX, [-300, 300], [-2, 2]);
  
  const events = [
    {
      id: 1,
      title: "Tech Conference 2024",
      subtitle: "Innovation & Future",
      description: "Join the most prestigious tech conference of the year, featuring industry leaders, breakthrough innovations, and networking opportunities that will shape the future of technology. Experience three days of inspiring talks, hands-on workshops, and exclusive networking sessions.",
      fromDate: "December 15, 2024",
      toDate: "December 17, 2024",
      time: "09:00 AM - 06:00 PM",
      location: "San Francisco, CA",
      attendees: "2,500+",
      price: "$299",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradient: "from-blue-600 via-purple-600 to-pink-600",
      color: "#3B82F6"
    },
    {
      id: 2,
      title: "Design Summit",
      subtitle: "Creative Excellence",
      description: "Immerse yourself in the world of design excellence at our premier design summit. Discover the latest trends, techniques, and tools that are revolutionizing the creative industry. Connect with top designers and creative professionals.",
      fromDate: "January 20, 2025",
      toDate: "January 22, 2025",
      time: "10:00 AM - 05:00 PM",
      location: "New York, NY",
      attendees: "1,800+",
      price: "$199",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradient: "from-pink-600 via-red-600 to-orange-600",
      color: "#EC4899"
    },
    {
      id: 3,
      title: "Music Festival",
      subtitle: "Sound & Rhythm",
      description: "Experience the ultimate music festival with world-class artists, stunning performances, and unforgettable moments. Three nights of pure musical magic under the stars, featuring the best in contemporary and classical music.",
      fromDate: "February 10, 2025",
      toDate: "February 12, 2025",
      time: "06:00 PM - 02:00 AM",
      location: "Los Angeles, CA",
      attendees: "5,000+",
      price: "$150",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradient: "from-green-600 via-teal-600 to-cyan-600",
      color: "#10B981"
    },
    {
      id: 4,
      title: "Business Innovation",
      subtitle: "Growth & Strategy",
      description: "Join business leaders and innovators for three days of strategic insights, growth strategies, and networking opportunities. Learn from successful entrepreneurs and discover the latest business trends and technologies.",
      fromDate: "March 15, 2025",
      toDate: "March 17, 2025",
      time: "08:30 AM - 06:30 PM",
      location: "Chicago, IL",
      attendees: "1,200+",
      price: "$399",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradient: "from-indigo-600 via-purple-600 to-blue-600",
      color: "#6366F1"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
      setAnimationStep(0);
    }, 8000); // 8 seconds per event
    return () => clearInterval(interval);
  }, [events.length]);

  // Sequential animation steps
  useEffect(() => {
    if (animationStep < 4) {
      const timer = setTimeout(() => {
        setAnimationStep(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [animationStep, currentEvent]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
    >
      {/* Fluid Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
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
          className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
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
        <motion.div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-600/20 to-orange-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />
      </div>

      {/* Scribble Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border-2 border-purple-400 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-40 w-24 h-24 border-2 border-pink-400 rounded-full"
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/3 w-20 h-20 border-2 border-blue-400 rounded-full"
          animate={{
            rotate: [0, -360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="space-y-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEvent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Step 1: Event Title */}
                <motion.div
                  initial={{ opacity: 0, y: -50, x: -50 }}
                  animate={{ 
                    opacity: animationStep >= 0 ? 1 : 0, 
                    y: animationStep >= 0 ? 0 : -50, 
                    x: animationStep >= 0 ? 0 : -50 
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-2"
                >
                  <motion.h1 
                    className="text-5xl md:text-7xl font-black text-white leading-tight"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {events[currentEvent].title}
                  </motion.h1>
                  <motion.h2 
                    className="text-2xl md:text-3xl font-light text-gray-300"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {events[currentEvent].subtitle}
                  </motion.h2>
                </motion.div>

                {/* Step 2: Event Description */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: animationStep >= 1 ? 1 : 0, 
                    y: animationStep >= 1 ? 0 : 30 
                  }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                    {events[currentEvent].description}
                  </p>
                </motion.div>

                {/* Step 3: Event Details */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: animationStep >= 2 ? 1 : 0, 
                    y: animationStep >= 2 ? 0 : 30 
                  }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div 
                      className="flex items-center space-x-3 text-gray-300"
                      whileHover={{ x: 5, color: "white" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Calendar className="h-5 w-5 text-purple-400" />
                      <div>
                        <div className="text-sm text-gray-400">From</div>
                        <div className="font-medium">{events[currentEvent].fromDate}</div>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-3 text-gray-300"
                      whileHover={{ x: 5, color: "white" }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <Calendar className="h-5 w-5 text-purple-400" />
                      <div>
                        <div className="text-sm text-gray-400">To</div>
                        <div className="font-medium">{events[currentEvent].toDate}</div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="flex items-center space-x-3 text-gray-300"
                    whileHover={{ x: 5, color: "white" }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                  >
                    <Clock className="h-5 w-5 text-purple-400" />
                    <div>
                      <div className="text-sm text-gray-400">Time</div>
                      <div className="font-medium">{events[currentEvent].time}</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center space-x-3 text-gray-300"
                    whileHover={{ x: 5, color: "white" }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                  >
                    <MapPin className="h-5 w-5 text-purple-400" />
                    <div>
                      <div className="text-sm text-gray-400">Location</div>
                      <div className="font-medium">{events[currentEvent].location}</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center space-x-3 text-gray-300"
                    whileHover={{ x: 5, color: "white" }}
                    transition={{ duration: 0.2, delay: 0.4 }}
                  >
                    <Users className="h-5 w-5 text-purple-400" />
                    <div>
                      <div className="text-sm text-gray-400">Attendees</div>
                      <div className="font-medium">{events[currentEvent].attendees}</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Step 4: CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: animationStep >= 3 ? 1 : 0, 
                    y: animationStep >= 3 ? 0 : 30 
                  }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-bold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <BookOpen className="h-5 w-5" />
                    <span>Book Now - {events[currentEvent].price}</span>
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-bold rounded-full border border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Play className="h-5 w-5" />
                    </motion.div>
                    <span>Watch Trailer</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Image Side */}
          <motion.div
            style={{
              rotateX: rotateX.get() * -0.5,
              rotateY: rotateY.get() * -0.5,
              transformStyle: "preserve-3d",
            }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEvent}
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ 
                  opacity: animationStep >= 4 ? 1 : 0, 
                  x: animationStep >= 4 ? 0 : 100, 
                  scale: animationStep >= 4 ? 1 : 0.8 
                }}
                exit={{ opacity: 0, x: -100, scale: 0.8 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <motion.img
                    src={events[currentEvent].image}
                    alt={events[currentEvent].title}
                    className="w-full h-96 md:h-[500px] object-cover"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Event Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.5 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white font-medium">4.8</span>
                      </div>
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        <span className="text-white text-sm font-medium">{events[currentEvent].price}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-white/30 rounded-full flex justify-center cursor-pointer"
          whileHover={{ scale: 1.1, borderColor: "rgba(168, 85, 247, 0.6)" }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 