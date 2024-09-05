"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const PianoVisualization: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-end h-60">
        {[...Array(30)].map((_, index) => (
          <motion.div
            key={index}
            className={`bg-gray-400 w-4 mx-0.5 h-20 transition-all duration-300 rounded-2xl ${
              activeIndex === index
                ? "h-40 bg-blue-500"
                : `h-[${activeIndex === null ? 100 : 120}px] ${
                    activeIndex !== null && Math.abs(activeIndex - index) <= 3
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  }`
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </div>
  );
};

export default PianoVisualization;
