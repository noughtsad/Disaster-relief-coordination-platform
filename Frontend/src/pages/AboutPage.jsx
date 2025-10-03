import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";

const AboutPage = () => {
  const { theme } = useContext(ThemeContext);

  const teamMembers = [
    {
      id: 1,
      name: "Saad Nawaz",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      
    },
    {
      id: 2,
      name: "Sambhav Tripathi", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      
    },
    {
      id: 3,
      name: "Rudra Laheri",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=crop&w=300&q=80",
    
    }
  ];

  return (
    <motion.div 
      className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      
      <motion.div 
        className="max-w-6xl mx-auto px-6 py-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.h1 
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            About CrisisConnect
          </motion.h1>
        </motion.div>

        {/* Our Mission */}
        <motion.section 
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div 
            className={`bg-white rounded-2xl p-8 shadow-lg border ${
              theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
            }`}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Our Mission
            </h2>
            <p className={`text-lg leading-relaxed ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              CrisisConnect is dedicated to providing immediate and effective disaster relief by connecting those affected with essential 
              resources and support. Our mission is to minimize suffering and facilitate recovery in communities impacted by natural 
              disasters.
            </p>
          </motion.div>
        </motion.section>

        {/* Our Values */}
        <motion.section 
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <motion.div 
            className={`bg-white rounded-2xl p-8 shadow-lg border ${
              theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
            }`}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Our Values
            </h2>
            <p className={`text-lg leading-relaxed ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              We operate with transparency, accountability, and a deep commitment to the communities we serve. Our core values include 
              empathy, integrity, and a focus on sustainable solutions that empower individuals and families to rebuild their lives.
            </p>
          </motion.div>
        </motion.section>

        {/* How It Works */}
        <motion.section 
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.div 
            className={`bg-white rounded-2xl p-8 shadow-lg border ${
              theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
            }`}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              How It Works
            </h2>
            <p className={`text-lg leading-relaxed ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Our platform streamlines the process of disaster relief by offering a centralized hub for information, resources, and 
              assistance. Users can easily access real-time updates, request aid, and connect with volunteers and organizations providing 
              support. We ensure that help reaches those who need it most, efficiently and effectively.
            </p>
          </motion.div>
        </motion.section>

        {/* Our Impact */}
        <motion.section 
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <motion.div 
            className={`bg-white rounded-2xl p-8 shadow-lg border ${
              theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
            }`}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Our Impact
            </h2>
            <p className={`text-lg leading-relaxed ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Since our inception, CrisisConnect has played a crucial role in numerous disaster relief efforts, from hurricanes to wildfires. 
              We've helped thousands of families begin their journey to recovery by providing immediate relief but also long-term support to 
              foster resilience and recovery. Our impact is measured not just in numbers, but in the stories of hope and recovery we've 
              helped create.
            </p>
          </motion.div>
        </motion.section>

        {/* Meet the Team */}
        <motion.section 
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <motion.div 
            className={`bg-white rounded-2xl p-8 shadow-lg border ${
              theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
            }`}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Meet the Team
            </h2>
            <p className={`text-lg leading-relaxed mb-8 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Our team is composed of dedicated professionals with diverse backgrounds in disaster management, technology, and 
              community outreach. We are united by a shared passion for making a difference and a commitment to leveraging innovation 
              to improve disaster relief outcomes.
            </p>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={member.id} 
                  className="text-center"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 rounded-lg object-cover mx-auto shadow-md"
                    />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {member.name}
                  </h3>
                  <p className={`text-sm ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Footer Links */}
        <footer className="border-t border-gray-200 pt-12">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
            <a
              href="/privacy"
              className={`text-blue-600 hover:text-blue-800 transition-colors ${
                theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : ''
              }`}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className={`text-blue-600 hover:text-blue-800 transition-colors ${
                theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : ''
              }`}
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className={`text-blue-600 hover:text-blue-800 transition-colors ${
                theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : ''
              }`}
            >
              Contact Us
            </a>
          </div>
          
          <div className="text-center">
            <p className={`text-sm ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              ©2025 CrisisConnect. All rights reserved.
            </p>
          </div>
        </footer>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
