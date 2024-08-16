"use client";

import { motion } from "framer-motion";

import React from "react";

const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center text-white gap-2">
      {["Nothing", "Nothing", "Nothing"].map((item, index) => (
        <motion.div
          whileHover={{
            width: 100,
          }}
          className="border h-10 overflow-hidden flex items-center justify-center text-xs"
          animate={{
            width: 3,
          }}
          transition={{
            ease: "linear",
          }}
          key={index}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;
