import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Image, ZoomIn, Heart, Share2, Download, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredImage, setHoveredImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedImages, setLikedImages] = useState(new Set());

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Tech Conference Stage",
      category: "Technology",
      likes: 1240,
      description: "Amazing tech conference with cutting-edge presentations"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Design Workshop",
      category: "Design",
      likes: 892,
      description: "Creative design workshop with talented artists"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Music Festival Crowd",
      category: "Music",
      likes: 2156,
      description: "Epic music festival with thousands of fans"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Business Summit",
      category: "Business",
      likes: 743,
      description: "Professional business summit with industry leaders"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Sports Championship",
      category: "Sports",
      likes: 1567,
      description: "Thrilling sports championship with top athletes"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Art Exhibition",
      category: "Art",
      likes: 634,
      description: "Stunning art exhibition showcasing local talent"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Food Festival",
      category: "Food",
      likes: 987,
      description: "Delicious food festival with amazing cuisines"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Fashion Show",
      category: "Fashion",
      likes: 1123,
      description: "Elegant fashion show with stunning designs"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Comedy Night",
      category: "Comedy",
      likes: 756,
      description: "Hilarious comedy night with top comedians"
    }
  ];

  const handleLike = (imageId) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const handleShare = (image) => {
    console.log(`Sharing: ${image.alt}`);
  };

  const handleDownload = (image) => {
    console.log(`Downloading: ${image.alt}`);
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

  const imageVariants = {
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
      scale: 1.05,
      rotateY: 3,
      rotateX: -2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-600/10 to-purple-600/10 rounded-full blur-3xl"
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
            <Image className="h-12 w-12 text-purple-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Event Gallery
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            Capturing the most memorable moments from our premium events
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              variants={imageVariants}
              whileHover="hover"
              className="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-500 transform-gpu cursor-pointer"
              onHoverStart={() => setHoveredImage(image.id)}
              onHoverEnd={() => setHoveredImage(null)}
              onClick={() => setSelectedImage(image)}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Premium 3D Background Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                animate={{
                  scale: hoveredImage === image.id ? 1.05 : 1,
                  rotate: hoveredImage === image.id ? 2 : 0,
                }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredImage === image.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                {/* Action Buttons */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(image.id);
                      }}
                      className={`p-3 rounded-full backdrop-blur-sm transition-colors ${
                        likedImages.has(image.id)
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'bg-white/20 text-white hover:bg-red-500 hover:text-white shadow-md'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${likedImages.has(image.id) ? 'fill-current' : ''}`} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(image);
                      }}
                      className="p-3 rounded-full bg-white/20 text-white hover:bg-purple-500 hover:text-white transition-colors shadow-md"
                    >
                      <Share2 className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(image);
                      }}
                      className="p-3 rounded-full bg-white/20 text-white hover:bg-green-500 hover:text-white transition-colors shadow-md"
                    >
                      <Download className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Image Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3"
                  >
                    <h3 className="text-white font-semibold text-sm mb-1">{image.alt}</h3>
                    <p className="text-gray-300 text-xs line-clamp-2">{image.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-purple-400 font-medium">{image.category}</span>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3 text-red-400" />
                        <span className="text-xs text-white">{image.likes}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Premium Hover Border */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-2xl"
                animate={{
                  borderColor: hoveredImage === image.id ? "#c084fc" : "transparent",
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal for Full Image View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-w-4xl max-h-[90vh] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <motion.img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[70vh] object-cover"
                />
                
                {/* Modal Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedImage(null)}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-red-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Image Info in Modal */}
                <div className="p-6">
                  <h3 className="text-white font-semibold text-xl mb-2">{selectedImage.alt}</h3>
                  <p className="text-gray-300 mb-4">{selectedImage.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-medium">{selectedImage.category}</span>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-red-400" />
                      <span className="text-white">{selectedImage.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery; 