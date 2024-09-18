"use client";

import React, { useState, ChangeEvent } from "react";
import { motion, Variants } from "framer-motion";

interface GoogleInputProps {
  id?: string;
  label: string;
  type?: string;
}

const GoogleInput: React.FC<GoogleInputProps> = ({
  id = "googleInput",
  label,
  type = "text",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const labelVariants: Variants = {
    default: { top: "12px", fontSize: "16px", color: "#999" },
    active: { top: "-10px", fontSize: "12px", color: "#4285f4" },
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative h-screen center w-full border-t">
      <div className="relative bg-red-500 w-full  max-w-xl mx-auto ">
        <input
          type={type}
          id={id}
          className="w-full p-3  text-base border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
          placeholder=" "
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <motion.label
          htmlFor={id}
          className="absolute left-3 bg-white px-1 pointer-events-none"
          initial="default"
          animate={isFocused || inputValue ? "active" : "default"}
          variants={labelVariants}
          transition={{ duration: 0.1 }}
        >
          {label}
        </motion.label>
      </div>
    </div>
  );
};

export default GoogleInput;
