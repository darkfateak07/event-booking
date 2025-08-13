import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mic2, Star, Instagram, Twitter, Linkedin, Heart, Play, Award, Users, Calendar, MapPin, ArrowRight } from 'lucide-react';

const Speakers = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredSpeaker, setHoveredSpeaker] = useState(null);
  const [likedSpeakers, setLikedSpeakers] = useState(new Set());

  const speakers = [
    {
      id: 1,
      name: "David Beckham",
      role: "Speaker",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      experience: "15+ years",
      events: 45,
      description: "Leading expert in sports and entertainment with groundbreaking contributions to the industry.",
      bio: "David Beckham is a renowned speaker and former professional footballer who has transitioned into a successful career in sports management and entertainment. With over 15 years of experience in public speaking, he has addressed audiences at major international conferences and events.",
      topics: ["Sports Management", "Leadership", "Entertainment Industry"],
      social: {
        instagram: "davidbeckham",
        twitter: "davidbeckham",
        linkedin: "davidbeckham"
      },
      upcomingEvents: [
        { name: "Sports Leadership Summit", date: "Dec 15, 2024", location: "London" },
        { name: "Entertainment Conference", date: "Jan 20, 2025", location: "Los Angeles" }
      ]
    },
    {
      id: 2,
      name: "David Betman",
      role: "Singer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      experience: "12+ years",
      events: 38,
      description: "Award-winning singer known for powerful vocals and emotional performances.",
      bio: "David Betman is a celebrated singer and performer with a unique voice that has captivated audiences worldwide. His performances blend classical training with contemporary styles, creating unforgettable musical experiences.",
      topics: ["Vocal Performance", "Music Production", "Stage Presence"],
      social: {
        instagram: "davidbetman",
        twitter: "davidbetman",
        linkedin: "davidbetman"
      },
      upcomingEvents: [
        { name: "Music Festival 2024", date: "Jan 25, 2025", location: "New York" },
        { name: "Classical Concert", date: "Feb 10, 2025", location: "Vienna" }
      ]
    },
    {
      id: 3,
      name: "Jessica Brown",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      experience: "8+ years",
      events: 32,
      description: "Innovative content creator helping brands connect with their audiences.",
      bio: "Jessica Brown is a dynamic content creator who has revolutionized digital storytelling. Her work spans across multiple platforms, helping brands and individuals create compelling narratives that resonate with global audiences.",
      topics: ["Digital Marketing", "Content Strategy", "Social Media"],
      social: {
        instagram: "jessicabrown",
        twitter: "jessicabrown",
        linkedin: "jessicabrown"
      },
      upcomingEvents: [
        { name: "Digital Marketing Summit", date: "Mar 15, 2025", location: "San Francisco" },
        { name: "Content Creator Workshop", date: "Apr 5, 2025", location: "Austin" }
      ]
    }
  ];

  const handleLike = (speakerId) => {
    setLikedSpeakers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(speakerId)) {
        newSet.delete(speakerId);
      } else {
        newSet.add(speakerId);
      }
      return newSet;
    });
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
      y: -10,
      scale: 1.02,
      rotateY: 3,
      rotateX: -2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section id="speakers" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-pink-600/10 to-orange-600/10 rounded-full blur-3xl"
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
            <Mic2 className="h-12 w-12 text-purple-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Learned Event Speakers
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            Meet the industry experts and thought leaders who will inspire and educate
          </p>
        </motion.div>

        {/* Speakers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {speakers.map((speaker) => (
            <motion.div
              key={speaker.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-500 transform-gpu cursor-pointer"
              onHoverStart={() => setHoveredSpeaker(speaker.id)}
              onHoverEnd={() => setHoveredSpeaker(null)}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Premium 3D Background Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                animate={{
                  scale: hoveredSpeaker === speaker.id ? 1.05 : 1,
                  rotate: hoveredSpeaker === speaker.id ? 2 : 0,
                }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative h-80 overflow-hidden">
                <motion.img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredSpeaker === speaker.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Speaker Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-1"
                    whileHover={{ color: "#c084fc" }}
                  >
                    {speaker.name}
                  </motion.h3>
                  <p className="text-purple-400 text-lg mb-4">{speaker.role}</p>
                </div>

                {/* Hover Details - for all speakers */}
                <AnimatePresence>
                  {hoveredSpeaker === speaker.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black/90 backdrop-blur-sm p-6 flex flex-col justify-center"
                    >
                      <div className="text-center space-y-4">
                        <h3 className="text-2xl font-bold text-white">{speaker.name}</h3>
                        <p className="text-purple-400 text-lg">{speaker.role}</p>
                        <p className="text-gray-300 text-sm leading-relaxed">{speaker.bio}</p>
                        
                        <div className="flex justify-center space-x-4 mt-4">
                          <motion.a
                            href={`https://instagram.com/${speaker.social.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="p-2 bg-white/10 rounded-full text-white hover:bg-pink-500 transition-colors"
                          >
                            <Instagram className="h-4 w-4" />
                          </motion.a>
                          <motion.a
                            href={`https://twitter.com/${speaker.social.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="bg-white/10 rounded-full text-white hover:bg-blue-500 transition-colors p-2"
                          >
                            <Twitter className="h-4 w-4" />
                          </motion.a>
                          <motion.a
                            href={`https://linkedin.com/in/${speaker.social.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="p-2 bg-white/10 rounded-full text-white hover:bg-blue-600 transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                          </motion.a>
                        </div>
                        
                        <motion.button
                          whileHover={{ 
                            scale: 1.03,
                            boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.3)"
                          }}
                          whileTap={{ scale: 0.97 }}
                          className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                        >
                          View Profile
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Premium Hover Border */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-2xl"
                animate={{
                  borderColor: hoveredSpeaker === speaker.id ? "#c084fc" : "transparent",
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

export default Speakers; 