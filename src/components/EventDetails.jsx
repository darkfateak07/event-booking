import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Star, Share2, Heart, ArrowLeft, Ticket, CheckCircle } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  // Mock event data
  const eventData = {
    id: 1,
    title: "Tech Conference 2024",
    category: "Technology",
    location: "San Francisco, CA",
    venue: "Moscone Center",
    address: "747 Howard St, San Francisco, CA 94103",
    date: "2024-12-15",
    time: "09:00 AM - 06:00 PM",
    price: "$299",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    attendees: 2500,
    rating: 4.8,
    reviews: 1247,
    description: "Join the biggest tech conference of the year with industry leaders and innovators. This three-day event brings together the brightest minds in technology to share insights, network, and explore the future of innovation.",
    longDescription: "The Tech Conference 2024 is the premier gathering for technology professionals, entrepreneurs, and enthusiasts. Over three exciting days, you'll experience keynote speeches from industry leaders, hands-on workshops, networking sessions, and exclusive product demonstrations. Whether you're a seasoned professional or just starting your tech journey, this conference offers something for everyone.",
    speakers: [
      { name: "Sarah Johnson", title: "CEO, TechCorp", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
      { name: "Michael Chen", title: "CTO, InnovateLab", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
      { name: "Emily Rodriguez", title: "VP Engineering, FutureTech", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
    ],
    schedule: [
      { time: "09:00 AM", title: "Registration & Welcome Coffee", description: "Check-in and networking" },
      { time: "10:00 AM", title: "Opening Keynote", description: "The Future of Technology" },
      { time: "11:30 AM", title: "Panel Discussion", description: "AI and Machine Learning Trends" },
      { time: "01:00 PM", title: "Lunch & Networking", description: "Catered lunch and networking" },
      { time: "02:30 PM", title: "Workshop Sessions", description: "Hands-on technical workshops" },
      { time: "04:30 PM", title: "Closing Keynote", description: "Innovation in 2025" },
      { time: "06:00 PM", title: "Networking Reception", description: "Drinks and networking" }
    ],
    tickets: [
      {
        id: 1,
        name: "Early Bird",
        price: 199,
        originalPrice: 299,
        description: "Limited time offer",
        features: ["Full conference access", "Lunch included", "Networking reception", "Digital materials"],
        available: 50
      },
      {
        id: 2,
        name: "Regular",
        price: 299,
        description: "Standard conference ticket",
        features: ["Full conference access", "Lunch included", "Networking reception", "Digital materials", "Workshop access"],
        available: 200
      },
      {
        id: 3,
        name: "VIP",
        price: 499,
        description: "Premium experience",
        features: ["Full conference access", "Lunch included", "Networking reception", "Digital materials", "Workshop access", "VIP seating", "Exclusive dinner", "Meet & greet with speakers"],
        available: 25
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvent(eventData);
    }, 500);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <Link to="/" className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-4">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Events</span>
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>{event.attendees.toLocaleString()} attendees</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-full">
                    {event.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{event.rating}</span>
                    <span className="text-sm text-gray-500">({event.reviews} reviews)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-lg transition-colors ${
                      isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Share2 className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-600 mb-6">{event.longDescription}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium">{new Date(event.date).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{event.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium">{event.venue}</div>
                        <div className="text-sm text-gray-500">{event.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{event.attendees.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Attendees</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{event.speakers.length}</div>
                      <div className="text-sm text-gray-600">Speakers</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Speakers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Speakers</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {event.speakers.map((speaker, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="text-center"
                  >
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-gray-900">{speaker.name}</h3>
                    <p className="text-sm text-gray-600">{speaker.title}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Schedule</h2>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="text-sm font-medium text-purple-600 min-w-[80px]">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Ticket Selection */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Select Tickets</h2>
              
              <div className="space-y-4 mb-6">
                {event.tickets.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    whileHover={{ scale: 1.02 }}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedTicket?.id === ticket.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{ticket.name}</h3>
                      <div className="text-right">
                        <div className="text-xl font-bold text-purple-600">${ticket.price}</div>
                        {ticket.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">${ticket.originalPrice}</div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                    <div className="space-y-1">
                      {ticket.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-gray-500">
                      {ticket.available} tickets left
                    </div>
                  </motion.div>
                ))}
              </div>

              {selectedTicket && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Quantity:</label>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                      >
                        -
                      </motion.button>
                      <span className="w-8 text-center font-medium">{quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                      >
                        +
                      </motion.button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Total:</span>
                      <span className="text-2xl font-bold text-purple-600">${totalPrice}</span>
                    </div>
                  </div>

                  <Link to={`/booking/${event.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Ticket className="h-5 w-5" />
                      <span>Book Now</span>
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 