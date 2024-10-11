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
    <div className="center size-full">
      <div className="flex items-end h-60">
        {[...Array(30)].map((_, index) => {
          // Calculate the height based on proximity to the active index
          let baseHeight = 100; // Base height for bars in pixels
          const proximity =
            activeIndex !== null ? Math.abs(activeIndex - index) : 0;

          // Hovered bar has max height, with a decreasing ratio for its neighbors
          let height =
            activeIndex === null
              ? baseHeight // default height when nothing is hovered
              : proximity === 0
              ? 140 // Height of the hovered bar
              : proximity === 1
              ? 120 // First neighbors' height
              : proximity === 2
              ? 110 // Second neighbors' height
              : 100; // Default height for other bars

          return (
            <motion.div
              key={index}
              className="bg-gray-400 w-4 mx-0.5 rounded-2xl"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              animate={{
                height: `${height}px`, // Animate height dynamically
                backgroundColor:
                  activeIndex !== null && proximity <= 2
                    ? "#3B82F6" // Change color of hovered and adjacent bars
                    : "#6B7280", // Default color
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PianoVisualization;
