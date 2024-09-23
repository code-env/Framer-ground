"use client";

import { motion } from "framer-motion";

interface ArrowProps {
  isHovered: boolean;
  angle?: number;
}

const Arrow = ({ isHovered, angle }: ArrowProps) => {
  return (
    <span style={{ transform: `rotate(${angle}deg)` }}>
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
    </span>
  );
};

export default Arrow;
