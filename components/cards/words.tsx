"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Creative", "Create", "Continue", "Confirm"];

const Words = () => {
  const [activeWord, setActiveWord] = useState("Creative");

  const animateWord = (word: string) => {
    return (
      <div className="flex">
        {word.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, delay: index * 0.05 }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen center w-full bg-white">
      <div className="flex flex-col items-center">
        <div className="w-[400px] h-[150px] border border-gray-300 flex items-center justify-center mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWord}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {animateWord(activeWord)}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex space-x-2">
          {words.map((word) => (
            <button
              key={word}
              onClick={() => setActiveWord(word)}
              className={`px-3 py-1 rounded ${
                activeWord === word ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Words;
