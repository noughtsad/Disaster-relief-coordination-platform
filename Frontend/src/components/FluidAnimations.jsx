import React from "react";
import { motion } from "framer-motion";

// Page transition wrapper
export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.6, -0.05, 0.01, 0.99] 
      }}
    >
      {children}
    </motion.div>
  );
};

// Fade in animation for sections
export const FadeInSection = ({ children, delay = 0, direction = "up" }) => {
  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.6, -0.05, 0.01, 0.99] 
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

// Stagger animation for lists/grids
export const StaggerContainer = ({ children, staggerDelay = 0.1 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, direction = "up" }) => {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...directions[direction] },
        visible: { 
          opacity: 1, 
          x: 0, 
          y: 0,
          transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Hover scale animation
export const HoverScale = ({ children, scale = 1.05, duration = 0.3 }) => {
  return (
    <motion.div
      whileHover={{ 
        scale,
        transition: { duration, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};

// Floating animation
export const FloatingElement = ({ children, intensity = 10, duration = 3 }) => {
  return (
    <motion.div
      animate={{
        y: [-intensity, intensity, -intensity],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Button with fluid animations
export const FluidButton = ({ children, className, onClick, variant = "primary" }) => {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all relative overflow-hidden";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.div
        className="relative z-10"
        initial={false}
        animate={{ x: 0 }}
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
      
      {/* Ripple effect background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

// Loading spinner
export const FluidLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

// Enhanced morphing background with animated shapes
export const MorphingBackground = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        animate={{
          background: [
            "linear-gradient(45deg, #f0f9ff, #ffffff, #eef2ff)",
            "linear-gradient(90deg, #dbeafe, #f8fafc, #e0e7ff)",
            "linear-gradient(135deg, #f0f9ff, #ffffff, #eef2ff)",
            "linear-gradient(180deg, #e0f2fe, #ffffff, #fef3c7)",
            "linear-gradient(225deg, #f0f9ff, #f8fafc, #eef2ff)"
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-20 w-24 h-24 bg-indigo-200/30 rounded-full blur-lg"
        animate={{
          x: [0, -60, 80, 0],
          y: [0, 100, -60, 0],
          scale: [0.8, 1.3, 0.9, 0.8]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-1/3 w-20 h-20 bg-cyan-200/25 rounded-full blur-md"
        animate={{
          x: [0, -40, 60, 0],
          y: [0, -70, 30, 0],
          scale: [1, 0.7, 1.4, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Interactive particles that follow mouse movement
export const InteractiveParticles = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
          animate={{
            x: mousePosition.x + Math.sin(Date.now() * 0.001 + i) * 50,
            y: mousePosition.y + Math.cos(Date.now() * 0.001 + i) * 50,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  );
};

// Ambient floating elements
export const AmbientFloating = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-sm ${
            i % 4 === 0 ? 'bg-blue-300/10 w-8 h-8' :
            i % 4 === 1 ? 'bg-indigo-300/15 w-6 h-6' :
            i % 4 === 2 ? 'bg-cyan-300/12 w-4 h-4' :
            'bg-purple-300/8 w-3 h-3'
          }`}
          animate={{
            x: [
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)
            ],
            y: [
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
            ],
            scale: [0.5, 1.5, 0.8, 1.2, 0.5],
            opacity: [0.3, 0.8, 0.4, 0.9, 0.3]
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
};

// Dynamic wave background
export const WaveBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,300 C300,200 600,400 1200,300 L1200,600 L0,600 Z"
          fill="url(#waveGradient)"
          animate={{
            d: [
              "M0,300 C300,200 600,400 1200,300 L1200,600 L0,600 Z",
              "M0,350 C300,250 600,450 1200,350 L1200,600 L0,600 Z",
              "M0,320 C300,180 600,420 1200,320 L1200,600 L0,600 Z",
              "M0,300 C300,200 600,400 1200,300 L1200,600 L0,600 Z"
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.05)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};