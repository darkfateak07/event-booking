import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Music, Mic, Star, Instagram, Twitter, Youtube, Heart, Play } from 'lucide-react';

const Singers = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredSinger, setHoveredSinger] = useState(null);
  const [likedSingers, setLikedSingers] = useState(new Set());

  const singers = [
    {
      id: 1,
      name: "Sarah Johnson",
      genre: "Pop",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      followers: "2.5M",
      description: "Award-winning pop sensation with chart-topping hits and electrifying performances.",
      social: {
        instagram: "sarahjohnson",
        twitter: "sarahjohnson",
        youtube: "sarahjohnson"
      }
    },
    {
      id: 2,
      name: "Marcus Chen",
      genre: "R&B",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      followers: "1.8M",
      description: "Soulful R&B artist known for powerful vocals and emotional ballads.",
      social: {
        instagram: "marcuschen",
        twitter: "marcuschen",
        youtube: "marcuschen"
      }
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      genre: "Latin",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      followers: "3.2M",
      description: "Latin music superstar bringing passion and rhythm to every performance.",
      social: {
        instagram: "elenarodriguez",
        twitter: "elenarodriguez",
        youtube: "elenarodriguez"
      }
    },
    {
      id: 4,
      name: "David Kim",
      genre: "Rock",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      followers: "1.5M",
      description: "Rock legend with powerful guitar riffs and unforgettable stage presence.",
      social: {
        instagram: "davidkim",
        twitter: "davidkim",
        youtube: "davidkim"
      }
    },
    {
      id: 5,
      name: "Aisha Patel",
      genre: "Electronic",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      followers: "2.1M",
      description: "Electronic music pioneer creating innovative soundscapes and beats.",
      social: {
        instagram: "aishapatel",
        twitter: "aishapatel",
        youtube: "aishapatel"
      }
    },
    {
      id: 6,
      name: "James Wilson",
      genre: "Country",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
      followers: "1.2M",
      description: "Country music star with authentic storytelling and heartfelt melodies.",
      social: {
        instagram: "jameswilson",
        twitter: "jameswilson",
        youtube: "jameswilson"
      }
    }
  ];

  const handleLike = (singerId) => {
    setLikedSingers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(singerId)) {
        newSet.delete(singerId);
      } else {
        newSet.add(singerId);
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
    <section id="singers" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden" ref={ref}>
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
            <Music className="h-12 w-12 text-purple-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Featured Artists
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            Experience the world's most talented performers and musical sensations
          </p>
        </motion.div>

        {/* Singers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {singers.map((singer) => (
            <motion.div
              key={singer.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-500 transform-gpu"
              onHoverStart={() => setHoveredSinger(singer.id)}
              onHoverEnd={() => setHoveredSinger(null)}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Premium 3D Background Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                animate={{
                  scale: hoveredSinger === singer.id ? 1.05 : 1,
                  rotate: hoveredSinger === singer.id ? 2 : 0,
                }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={singer.image}
                  alt={singer.name}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredSinger === singer.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Premium Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike(singer.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      likedSingers.has(singer.id)
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-white/20 text-white hover:bg-red-500 hover:text-white shadow-md'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${likedSingers.has(singer.id) ? 'fill-current' : ''}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-purple-500 hover:text-white transition-colors shadow-md"
                  >
                    <Play className="h-4 w-4" />
                  </motion.button>
                </div>

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <motion.span 
                    className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    {singer.genre}
                  </motion.span>
                </div>
                
                <div className="absolute top-4 right-16 flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full shadow-md">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium text-white">{singer.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <motion.h3 
                  className="text-xl font-semibold text-white mb-2"
                  whileHover={{ color: "#c084fc" }}
                >
                  {singer.name}
                </motion.h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {singer.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Mic className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-300">{singer.followers} followers</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <motion.a
                      href={`https://instagram.com/${singer.social.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="p-2 bg-white/10 rounded-full text-white hover:bg-pink-500 transition-colors"
                    >
                      <Instagram className="h-4 w-4" />
                    </motion.a>
                    <motion.a
                      href={`https://twitter.com/${singer.social.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="p-2 bg-white/10 rounded-full text-white hover:bg-blue-500 transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </motion.a>
                    <motion.a
                      href={`https://youtube.com/${singer.social.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="p-2 bg-white/10 rounded-full text-white hover:bg-red-500 transition-colors"
                    >
                      <Youtube className="h-4 w-4" />
                    </motion.a>
                  </div>
                  <motion.button
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.3)"
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                  >
                    View Profile
                  </motion.button>
                </div>
              </div>

              {/* Premium Hover Border */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-2xl"
                animate={{
                  borderColor: hoveredSinger === singer.id ? "#c084fc" : "transparent",
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

export default Singers; 