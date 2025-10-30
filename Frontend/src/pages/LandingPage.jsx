import { Plus, Minus, Search, ZoomIn, ZoomOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Card from "../components/Card";

// Main Landing Page Component
const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.app);

  const handleCardClick = (userType) => {
    if (userType === 'volunteer') {
      // Always navigate to volunteer page regardless of authentication
      navigate('/volunteer');
    } else if (isAuthenticated) {
      // If already authenticated, redirect to appropriate dashboard
      const currentUserType = localStorage.getItem('userType');
      if (currentUserType === 'ngo') {
        navigate('/ngoDashboard');
      } else {
        navigate('/survivorDashboard');
      }
    } else {
      // If not authenticated, go to signup and store the intended user type
      navigate('/signup', { state: { defaultUserType: userType } });
    }
  };

  const handleInlineButtonClick = (userType) => {
    if (userType === 'volunteer') {
      // Always navigate to volunteer page regardless of authentication
      navigate('/volunteer');
    } else if (isAuthenticated) {
      // If already authenticated, redirect to appropriate dashboard
      const currentUserType = localStorage.getItem('userType');
      if (currentUserType === 'ngo') {
        navigate('/ngoDashboard');
      } else {
        navigate('/survivorDashboard');
      }
    } else {
      // If not authenticated, go to signup with the selected user type
      navigate('/signup', { state: { defaultUserType: userType } });
    }
  };

  return (
      <motion.div 
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        
        <main className="px-4 sm:px-6 md:px-8 py-6 md:py-12">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row gap-6 md:gap-12 items-start">
              <motion.div 
                className="flex-1"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2
                      }
                    }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                   <motion.div 
                    onClick={() => handleCardClick('survivor')}
                    className="cursor-pointer"
                    variants={{
                      hidden: { y: 50, opacity: 0 },
                      visible: { y: 0, opacity: 1 }
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      title="Survivor" 
                      img="https://www.shutterstock.com/image-photo/survivors-hatay-turkey-stories-miracles-600nw-2265953343.jpg"
                      className="h-64 sm:h-80"
                    />
                  </motion.div>

                  <motion.div 
                    onClick={() => handleCardClick('survivor')}
                    className="cursor-pointer"
                    variants={{
                      hidden: { y: 50, opacity: 0 },
                      visible: { y: 0, opacity: 1 }
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      title="Supplier" 
                      img="https://www.manutan.com/blog/medias/files/thumbsSource/A00233P2_1110x555.jpeg"
                      className="h-64 sm:h-80"
                    />
                  </motion.div>
                 
                  <motion.div 
                    onClick={() => handleCardClick('volunteer')}
                    className="cursor-pointer"
                    variants={{
                      hidden: { y: 50, opacity: 0 },
                      visible: { y: 0, opacity: 1 }
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      title="Volunteers" 
                      img="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80"
                      className="h-56 sm:h-64"
                    />
                  </motion.div>
                  
                  <motion.div 
                    onClick={() => handleCardClick('ngo')}
                    className="cursor-pointer"
                    variants={{
                      hidden: { y: 50, opacity: 0 },
                      visible: { y: 0, opacity: 1 }
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      title="NGOs" 
                      img="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
                      className="h-56 sm:h-64"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-96 bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.h2 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Need Help?
                </motion.h2>
                
                <motion.p 
                  className="text-base sm:text-lg font-semibold text-gray-700 mb-4 md:mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  If you are:
                </motion.p>
                
                <motion.div 
                  className="space-y-3 sm:space-y-4 mb-6 md:mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    In need of help click on{" "}
                    <button 
                      onClick={() => handleInlineButtonClick('survivor')}
                      className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors"
                    >
                      survivor
                    </button>
                  </p>
                  
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    An individual wishing to help out, click on{" "}
                    <button 
                      onClick={() => handleInlineButtonClick('volunteer')}
                      className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors"
                    >
                      volunteering
                    </button>
                  </p>
                  
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Registering as an NGO, click{" "}
                    <button 
                      onClick={() => handleInlineButtonClick('ngo')}
                      className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors"
                    >
                      NGOs
                    </button>
                  </p>
                </motion.div>
                
                {/* Contact Section */}
                <motion.div 
                  className="border-t border-gray-200 pt-4 md:pt-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 md:mb-4">
                    We are available 24/7 reach out at:
                  </h3>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl flex-shrink-0">📞</span>
                      <div className="text-gray-700 flex flex-col sm:flex-row text-sm sm:text-base">
                        <span className="font-medium">+91 1234567890</span>
                        <span className="hidden sm:inline mx-2 text-gray-400">|</span>
                        <span className="font-medium">+91 0987654321</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl">✉️</span>
                      <span className="font-medium text-gray-700 text-sm sm:text-base break-all">crisis@connect.org</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </motion.div>
  );
};

export default LandingPage;