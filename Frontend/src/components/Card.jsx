
import { motion } from "framer-motion";

const Card = ({ title, img, className = "" }) => {
  return (
    <motion.div 
      className={`relative rounded-3xl overflow-hidden shadow-xl cursor-pointer group ${className}`}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
      }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: "1000px" }}
    >
      <motion.img 
        src={img} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        loading="lazy"
      />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
        initial={{ opacity: 0.6 }}
        whileHover={{ opacity: 0.8 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      
      {/* Floating particles around the card */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
          />
        ))}
      </div>
      
      {/* Title with smooth animation */}
      <motion.h2 
        className="absolute bottom-6 left-6 text-3xl font-bold text-white drop-shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileHover={{ 
          y: -2,
          transition: { duration: 0.2 }
        }}
      >
        {title}
      </motion.h2>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Card;