import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageTransition, FluidButton } from "../components/FluidAnimations";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = () => {
    console.log("Login attempt with:", formData);
    // TODO: Add login logic here
    alert("Login functionality to be implemented");
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in");
    // TODO: Add Google OAuth logic here
    alert("Google sign in functionality to be implemented");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 w-full max-w-md"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
          whileHover={{ 
            boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
            scale: 1.02
          }}
        >
          {/* Header */}
          <motion.div 
            className="px-6 pt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.h1 
              className="text-2xl font-bold text-gray-900 mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Crisis<span className="text-blue-600">Connect</span>
            </motion.h1>
            <motion.p 
              className="text-sm text-gray-600 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Welcome back! Sign in to your account
            </motion.p>
          </motion.div>

          {/* Login Form */}
          <motion.div 
            className="px-6 pb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="max-w-sm mx-auto w-full">
              <motion.h2 
                className="text-xl font-semibold text-gray-900 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Sign In
              </motion.h2>

              {/* Email Field */}
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all"
                  whileFocus={{ 
                    scale: 1.02,
                    borderColor: "#3b82f6",
                    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              {/* Password Field */}
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <motion.input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all"
                  whileFocus={{ 
                    scale: 1.02,
                    borderColor: "#3b82f6",
                    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              {/* Forgot Password Link */}
              <motion.div 
                className="mb-6 text-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Link 
                  to="/forgot-password" 
                  className="text-xs text-blue-600 hover:text-blue-700 transition-colors relative group"
                >
                  <span className="relative z-10">Forgot password?</span>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>

              {/* Login Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <FluidButton
                  onClick={handleLogin}
                  className="w-full mb-3"
                  variant="primary"
                >
                  Sign In
                </FluidButton>
              </motion.div>

              {/* OR Divider */}
              <motion.div 
                className="relative text-center my-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <span className="text-xs font-medium text-gray-500 bg-white px-2">OR</span>
                <motion.div 
                  className="absolute inset-0 flex items-center"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="w-full border-t border-gray-200"></div>
                </motion.div>
              </motion.div>

              {/* Google Sign In Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <FluidButton
                  onClick={handleGoogleSignIn}
                  className="w-full mb-4"
                  variant="outline"
                >
                  Sign in with Google
                </FluidButton>
              </motion.div>

              {/* Register Link */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <span className="text-xs text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors relative group"
                  >
                    <span className="relative z-10">Create account</span>
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}