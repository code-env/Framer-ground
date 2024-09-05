"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const Github = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full w-full center">
      <button
        className="bg-primary hover:bg-primary/85 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="mr-2">Learn More</span>
        <motion.svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M5 12H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            transition={{ duration: 0.2 }}
          />
          <motion.path
            d="M12 5L19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ x: 0 }}
            animate={{ x: isHovered ? 0 : -7 }}
            transition={{ duration: 0.2 }}
          />
        </motion.svg>
      </button>
    </div>
  );
};

export default Github;
