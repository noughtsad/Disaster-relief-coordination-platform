import { Plus, Minus, Search, ZoomIn, ZoomOut } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { FadeInSection, StaggerContainer, StaggerItem, MorphingBackground } from "../components/FluidAnimations";

// Main Landing Page Component
const LandingPage = () => {
  return (
    <MorphingBackground>
      <div className={`min-h-screen ${theme === "light" ? "bg-gradient-to-br from-gray-50/80 to-blue-50/80" : "bg-gradient-to-br from-gray-900/80 to-blue-900/80"}`}>
        <Navbar />
        
        <motion.main 
          className="px-8 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <FadeInSection delay={0.3}>
                <StaggerContainer>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <StaggerItem>
                      <Link to="/register">
                        <Card 
                          title="Survivor" 
                          img="https://www.shutterstock.com/image-photo/survivors-hatay-turkey-stories-miracles-600nw-2265953343.jpg"
                          className="md:col-span-2 h-80"
                        />
                      </Link>
                    </StaggerItem>
                    
                    <StaggerItem>
                      <Link to="/register">
                        <Card 
                          title="Volunteers" 
                          img="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80"
                          className="h-64"
                        />
                      </Link>
                    </StaggerItem>
                    
                    <StaggerItem>
                      <Link to="/register">
                        <Card 
                          title="NGOs" 
                          img="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
                          className="h-64"
                        />
                      </Link>
                    </StaggerItem>
                  </div>
                </StaggerContainer>
              </FadeInSection>
              
                            
              <FadeInSection delay={0.5} direction="right">
                <motion.div 
                  className="lg:w-96 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h2 
                    className="text-4xl font-bold text-gray-800 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    Need Help?
                  </motion.h2>
                  
                  <motion.p 
                    className="text-lg font-semibold text-gray-700 mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    If you are:
                  </motion.p>
                  
                  <motion.div 
                    className="space-y-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <motion.p 
                      className="text-gray-600 leading-relaxed"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      In need of help click on{" "}
                      <Link 
                        to="/register" 
                        className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors relative group"
                      >
                        <span className="relative z-10">survivor</span>
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </motion.p>
                    
                    <motion.p 
                      className="text-gray-600 leading-relaxed"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      An individual wishing to help out, click on{" "}
                      <Link 
                        to="/register" 
                        className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors relative group"
                      >
                        <span className="relative z-10">volunteering</span>
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </motion.p>
                    
                    <motion.p 
                      className="text-gray-600 leading-relaxed"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Registering as an NGO, click{" "}
                      <Link 
                        to="/register" 
                        className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors relative group"
                      >
                        <span className="relative z-10">NGOs</span>
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </motion.p>
                  </motion.div>
                  
                  {/* Contact Section with Fluid Animations */}
                  <motion.div 
                    className="border-t border-gray-200 pt-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <motion.div 
                      className="space-y-4"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } }
                      }}
                      initial="hidden"
                      whileInView="visible"
                    >
                      <motion.div 
                        className="flex items-center gap-3"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        whileHover={{ scale: 1.05, x: 5 }}
                      >
                        <motion.span 
                          className="text-2xl"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          🚨
                        </motion.span>
                        <div>
                          <div className="text-sm text-gray-600">Emergency</div>
                          <span className="font-medium">+91 0987654321</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center gap-3"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        whileHover={{ scale: 1.05, x: 5 }}
                      >
                        <motion.span 
                          className="text-2xl"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: 1
                          }}
                        >
                          ✉️
                        </motion.span>
                        <span className="font-medium text-gray-700">crisis@connect.org</span>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </motion.main>
      </div>
    </MorphingBackground>" "}
                    <Link 
                      to="/register" 
                      className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors"
                    >
                      survivor
                    </Link>
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed">
                    An individual wishing to help out, click on{" "}
                    <Link 
                      to="/register" 
                      className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors"
                    >
                      volunteering
                    </Link>
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed">
                    Registering as an NGO, click{" "}
                    <Link 
                      to="/register" 
                      className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors"
                    >
                      NGOs
                    </Link>
                  </p>
                </div>
                
                {/* Contact Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    We are available 24/7 reach out at:
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📞</span>
                      <div className="text-gray-700">
                        <span className="font-medium">+91 1234567890</span>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="font-medium">+91 0987654321</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✉️</span>
                      <span className="font-medium text-gray-700">crisis@connect.org</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
};

export default LandingPage;