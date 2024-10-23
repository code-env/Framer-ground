"use client";

import React, { useState, ChangeEvent } from "react";
import { motion, Variants } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GoogleInputProps {
  id?: string;
  label: string;
  type?: string;
}

const GoogleInput: React.FC<GoogleInputProps> = ({
  id = "googleInput",
  label = "Email Address",
  type = "email",
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
    <div className="size-full center w-full">
      <div className="relative w-full  max-w-xl mx-auto">
        <Input
          type={type}
          id={id}
          className="w-full p-3  text-base border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors h-12"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Label asChild>
          <motion.label
            htmlFor={id}
            className="absolute left-3 bg-background p-1 pointer-events-none"
            initial="default"
            animate={isFocused || inputValue ? "active" : "default"}
            variants={labelVariants}
            transition={{ duration: 0.1 }}
          >
            {label}
          </motion.label>
        </Label>
      </div>
    </div>
  );
};

export default GoogleInput;
