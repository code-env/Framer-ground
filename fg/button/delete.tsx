"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Delete = () => {
  const [isActive, setIsActive] = useState(true);

  const handleDeleteClick = () => {
    setIsActive(false);
  };

  const handleCancelClick = () => {
    setIsActive(true);
  };

  return (
    <div className="center text-white h-full w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="absolute"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div
        className="flex items-center justify-center gap-3 relative"
        style={{
          filter: "url(#goo)",
        }}
      >
        <motion.button
          whileHover={{ scale: 0.9 }}
          className={cn(
            "h-10 rounded-md px-10 transition-all z-10 flex center absolute bg-black duration-500",
            !isActive && "bg-black"
          )}
          onClick={handleDeleteClick}
        >
          Delete
        </motion.button>

        <AnimatePresence>
          {!isActive && (
            <motion.button
              whileHover={{ scale: 0.9 }}
              initial={{
                x: 0,
                scale: 0.7,
                borderRadius: "50%",
              }}
              animate={{
                x: 100,
                scale: 1,
              }}
              exit={{
                x: 0,
                scale: 0.7,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className={cn("h-10 w-10 rounded-full bg-black center")}
              onClick={handleCancelClick}
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Delete;
