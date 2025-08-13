import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, Calendar, ArrowRight, Plus } from 'lucide-react';

const WhatsHappening = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredCard, setHoveredCard] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "Join the Festivi Celebrate Special Moments",
      author: "admin",
      date: "October 19, 2022",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Experience the ultimate celebration with live music, amazing performances, and unforgettable moments."
    },
    {
      id: 2,
      title: "Embrace the Joyful Spirit Discover a World",
      author: "admin",
      date: "October 19, 2022",
      image: null, // This will be the plus card
      description: "Discover new horizons and embrace the spirit of joy in our upcoming events."
    },
    {
      id: 3,
      title: "Where Moments Come Alive an Celebrate",
      author: "admin",
      date: "October 19, 2022",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Create lasting memories where every moment becomes a celebration of life and joy."
    }
  ];

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
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section id="whats-happening" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden" ref={ref}>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-4 md:mb-0" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Whats Happening Near
          </motion.h2>
          
          <motion.button
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.3)"
            }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-bold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
          >
            <span>View More Blog</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Blog Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-500 transform-gpu cursor-pointer"
              onHoverStart={() => setHoveredCard(post.id)}
              onHoverEnd={() => setHoveredCard(null)}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Premium 3D Background Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                animate={{
                  scale: hoveredCard === post.id ? 1.05 : 1,
                  rotate: hoveredCard === post.id ? 2 : 0,
                }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative h-64 overflow-hidden">
                {post.image ? (
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredCard === post.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                ) : (
                  <motion.div
                    className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center"
                    animate={{
                      scale: hoveredCard === post.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Plus className="h-16 w-16 text-white" />
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                {/* Author and Date */}
                <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
                  <motion.div 
                    className="flex items-center space-x-2"
                    whileHover={{ x: 3, color: "white" }}
                    transition={{ duration: 0.2 }}
                  >
                    <User className="h-4 w-4 text-purple-400" />
                    <span>By {post.author}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-2"
                    whileHover={{ x: 3, color: "white" }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <Calendar className="h-4 w-4 text-purple-400" />
                    <span>{post.date}</span>
                  </motion.div>
                </div>

                {/* Title */}
                <motion.h3 
                  className="text-xl font-bold text-white mb-4 line-clamp-2"
                  whileHover={{ color: "#c084fc" }}
                >
                  {post.title}
                </motion.h3>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                  {post.description}
                </p>

                {/* Read More Button */}
                <motion.button
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.3)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-bold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                >
                  <span>Read More</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </motion.button>
              </div>

              {/* Premium Hover Border */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-2xl"
                animate={{
                  borderColor: hoveredCard === post.id ? "#c084fc" : "transparent",
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

export default WhatsHappening; 