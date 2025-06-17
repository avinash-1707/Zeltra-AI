"use client";
import { motion } from "motion/react";

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-60 blur-sm"
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 right-20 w-32 h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-40 blur-sm"
      />

      <motion.div
        animate={{
          y: [0, -25, 0],
          x: [0, 20, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-50 blur-sm"
      />

      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -25, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-30 blur-sm"
      />
    </div>
  );
};

export default FloatingElements;
