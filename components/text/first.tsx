"use client";

import React from "react";
import { motion } from "framer-motion";

const FirstTextNimation = () => {
  return (
    <div className="center h-screen ">
      <div className="space-y-10">
        <Text text="2{BKM}" />
        <Text text="Therapist" />
        <Text text="Skaleway" />
      </div>
    </div>
  );
};

const Text = ({ text }: { text: string }) => {
  return (
    <motion.p
      initial="initial"
      whileHover="hovering"
      className="relative  block overflow-hidden whitespace-nowrap text-4xl font-bold uppercase sm:text-7xl md:text-8xl lg:text-9xl cursor-pointer"
    >
      <div>
        {text.split("").map((letter, index) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovering: { y: "-100%" },
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
              delay: 0.03 * index, //this delay could be change to suite your needs,
            }}
            className="inline-block"
            key={index}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {text.split("").map((letter, index) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovering: { y: 0 },
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
              delay: 0.03 * index, //this delay could be change to suite your needs
            }}
            key={index}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.p>
  );
};

export default FirstTextNimation;
