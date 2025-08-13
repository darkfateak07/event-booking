import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Menu, X, Calendar, User, Ticket, Sparkles, Bell, Search, ChevronDown, ChevronUp, Home, Users as UsersIcon, Info, Mail, Phone, MapPin } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Events', 
      path: '/#events',
      dropdown: [
        { name: 'All Events', path: '/#events', icon: Calendar },
        { name: 'Tech Events', path: '/#tech', icon: Calendar },
        { name: 'Design Events', path: '/#design', icon: Calendar },
        { name: 'Music Events', path: '/#music', icon: Calendar },
        { name: 'Business Events', path: '/#business', icon: Calendar }
      ]
    },
    { 
      name: 'About', 
      path: '/#about',
      dropdown: [
        { name: 'Our Story', path: '/#story', icon: Info },
        { name: 'Team', path: '/#team', icon: UsersIcon },
        { name: 'Mission', path: '/#mission', icon: Info },
        { name: 'Values', path: '/#values', icon: Info }
      ]
    },
    { 
      name: 'Contact', 
      path: '/#contact',
      dropdown: [
        { name: 'Get in Touch', path: '/#contact', icon: Mail },
        { name: 'Phone', path: '/#phone', icon: Phone },
        { name: 'Office', path: '/#office', icon: MapPin },
        { name: 'Support', path: '/#support', icon: UsersIcon }
      ]
    },
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-gray-200/20' 
          : 'bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div
              animate={{
                rotate: isHovering ? [0, 360] : 0,
                scale: isHovering ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <Calendar className="h-8 w-8 text-purple-600" />
            </motion.div>
            <motion.span 
              className={`text-xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}
              animate={{
                color: isHovering ? "#9333ea" : scrolled ? "#111827" : "#ffffff",
              }}
              transition={{ duration: 0.3 }}
            >
              EventFlow
            </motion.span>
            <motion.div
              animate={{ 
                opacity: isHovering ? 1 : 0,
                scale: isHovering ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
              className="text-purple-400"
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  onClick={() => item.dropdown ? handleDropdownToggle(index) : null}
                  className={`text-sm font-medium transition-colors duration-200 relative ${
                    location.pathname === item.path
                      ? scrolled ? 'text-purple-600' : 'text-purple-400'
                      : scrolled ? 'text-gray-700 hover:text-purple-600' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <motion.div
                        animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-3 w-3" />
                      </motion.div>
                    )}
                  </div>
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${scrolled ? 'bg-purple-600' : 'bg-purple-400'}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200/20 backdrop-blur-md overflow-hidden"
                      >
                        <div className="py-2">
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <motion.div
                              key={dropdownItem.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: dropdownIndex * 0.05 }}
                            >
                              <Link
                                to={dropdownItem.path}
                                className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
                              >
                                <dropdownItem.icon className="h-4 w-4" />
                                <span>{dropdownItem.name}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
                scrolled 
                  ? 'text-purple-600 hover:text-purple-700' 
                  : 'text-gray-200 hover:text-white'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </motion.button>

            {/* Notification Bell */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
              whileTap={{ scale: 0.9 }}
              className={`relative p-2 transition-colors ${
                scrolled ? 'text-gray-600 hover:text-purple-600' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                >
                  {notifications}
                </motion.div>
              )}
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Ticket className="h-4 w-4" />
              <span>Book Now</span>
            </motion.button>
          </div>

          {/* Enhanced Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled 
                ? 'hover:bg-gray-100 text-gray-700' 
                : 'hover:bg-white/10 text-white'
            }`}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/20 overflow-hidden"
          >
            <motion.div 
              className="px-4 py-6 space-y-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="space-y-2">
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block text-base font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'text-purple-600'
                          : 'text-gray-700 hover:text-purple-600'
                      }`}
                    >
                      {item.name}
                    </Link>
                    
                    {/* Mobile Dropdown */}
                    {item.dropdown && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 space-y-1"
                      >
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <motion.div
                            key={dropdownItem.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.1) + (dropdownIndex * 0.05) }}
                          >
                            <Link
                              to={dropdownItem.path}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            >
                              <dropdownItem.icon className="h-4 w-4" />
                              <span>{dropdownItem.name}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                >
                  <Ticket className="h-4 w-4" />
                  <span>Book Now</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 