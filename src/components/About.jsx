import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Award, Calendar, MapPin, Star, Heart, ArrowRight, Play, CheckCircle } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Attendees", color: "from-blue-500 to-purple-500" },
    { icon: Award, value: "200+", label: "Events Hosted", color: "from-purple-500 to-pink-500" },
    { icon: Calendar, value: "5+", label: "Years Experience", color: "from-pink-500 to-orange-500" },
    { icon: Star, value: "4.9", label: "Average Rating", color: "from-orange-500 to-yellow-500" }
  ];

  const features = [
    "Premium Event Management",
    "World-Class Speakers",
    "Interactive Experiences",
    "Networking Opportunities",
    "Live Entertainment",
    "Exclusive VIP Access",
    "Professional Photography",
    "24/7 Support"
  ];

  const tabs = [
    { id: 'mission', title: 'Our Mission', content: 'To create extraordinary events that inspire, connect, and transform lives through innovative experiences and world-class entertainment.' },
    { id: 'vision', title: 'Our Vision', content: 'To be the leading platform for premium events, setting new standards in event management and creating unforgettable moments for our attendees.' },
    { id: 'values', title: 'Our Values', content: 'Excellence, Innovation, Integrity, and Passion drive everything we do, ensuring every event exceeds expectations and creates lasting memories.' }
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
    <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden" ref={ref}>
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
            <Users className="h-12 w-12 text-purple-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            About EventFlow
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            Creating extraordinary experiences and unforgettable moments since 2019
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Your Premier Event Partner
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                EventFlow is more than just an event platform – we're your partners in creating extraordinary experiences. 
                With over 5 years of expertise, we've transformed thousands of events into unforgettable moments.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                From intimate gatherings to grand celebrations, our team of experts ensures every detail is perfect, 
                every moment is memorable, and every experience is exceptional.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {features.slice(0, 6).map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center space-x-3 text-gray-300"
                  whileHover={{ x: 5, color: "white" }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.3)"
                }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-bold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
              >
                <span>Learn More</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <motion.img
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="EventFlow Team"
                className="w-full h-96 object-cover"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Overlay with stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-400 fill-current" />
                    <span className="text-white font-medium">Passionate Team</span>
                  </div>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                    <span className="text-white text-sm font-medium">Since 2019</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-4`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8"
        >
          <div className="flex flex-wrap gap-4 mb-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:text-white border border-white/20 hover:border-purple-300'
                }`}
              >
                {tab.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-gray-300 text-lg leading-relaxed"
            >
              {tabs.find(tab => tab.id === activeTab)?.content}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 