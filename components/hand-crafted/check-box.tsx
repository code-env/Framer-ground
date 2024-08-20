import React, { useState } from "react";
import { motion } from "framer-motion";

interface CheckboxProps {
  isChecked: boolean;
  setIsChecked: (prev: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked, setIsChecked }) => {
  const checkboxVariants = {
    checked: {
      backgroundColor: "black",
      borderColor: "black",
      transition: {
        duration: 0.5,
      },
    },
    unchecked: {
      backgroundColor: "#ccc",
      borderColor: "#ccc",
      transition: {
        duration: 0.5,
      },
    },
  };

  const checkmarkVariants = {
    checked: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    unchecked: {
      pathLength: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const spring = {};

  return (
    <motion.div
      className="w-6 h-6 border-2 rounded-md flex items-center justify-center cursor-pointer"
      variants={checkboxVariants}
      animate={isChecked ? "checked" : "unchecked"}
      onClick={() => setIsChecked(!isChecked)}
      whileTap={{
        scale: 0.8,
      }}
    >
      <svg width="12" height="10" viewBox="0 0 12 10" className="stroke-white">
        <motion.path
          fill="none"
          strokeWidth="2"
          stroke="white"
          d="M1 5.5L4 8.5L11 1.5"
          variants={checkmarkVariants}
          initial="unchecked"
          transition={spring}
          animate={isChecked ? "checked" : "unchecked"}
        />
      </svg>
    </motion.div>
  );
};

export default Checkbox;
