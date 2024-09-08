"use client";

import { Check } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const content = [
  {
    name: "Bad",
    height: 100,
    width: 100,
    background: "#EF626C",
    rotate: 0,
  },
  {
    name: "Not Bad",
    height: 30,
    width: 100,
    background: "#FFE381",
    rotate: 0,
  },
  {
    name: "Good",
    height: 150,
    width: 150,
    background: "#3DA35D",
    rotate: 180,
  },
];

const Experience = () => {
  const [index, setIndex] = useState(0);
  const activeContent = content[index];

  const textVariants = {
    enter: { x: "-100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  const tickVariants = {
    enter: { scale: 0, opacity: 0, x: "-50%" },
    center: { scale: 1, opacity: 1, x: 0 },
    exit: { scale: 0, opacity: 0, x: "50%" },
  };

  return (
    <div className="h-screen w-full center">
      <div
        className="w-full h-full flex flex-col items-center justify-center"
        style={{
          background: activeContent.background,
        }}
      >
        <div className="h-[600px] w-full flex items-center flex-col  gap-20">
          <h1 className="font-semibold text-3xl">
            How was your shopping experience?
          </h1>
          <div className=" flex items-center flex-col">
            <div className="flex gap-5">
              <motion.div
                animate={{
                  height: activeContent.height,
                  width: activeContent.width,
                }}
                className="transition duration-300 bg-black rounded-full"
              />
              <motion.div
                animate={{
                  height: activeContent.height,
                  width: activeContent.width,
                }}
                className="transition duration-300 bg-black rounded-full"
              />
            </div>
            <Icon rotate={activeContent.rotate} />
          </div>
          <motion.h2
            key={index}
            initial="enter"
            animate="center"
            exit="exit"
            variants={textVariants}
            transition={{ duration: 0 }}
            className="font-bold text-7xl transition duration-300 delay-300"
          >
            {activeContent.name}
          </motion.h2>
        </div>
        <div className="w-1/2 h-10 gap-10 items-center justify-between flex relative">
          {Array.from({ length: 3 }).map((_, i) => {
            return (
              <motion.button
                onClick={() => setIndex(i)}
                key={i}
                className="rounded-full bg-black z-50 text-white flex items-center justify-center"
                animate={{
                  height: index === i ? 60 : 40,
                  width: index === i ? 60 : 40,
                }}
              >
                <AnimatePresence>
                  {i === index && (
                    <motion.div
                      key={i}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      variants={tickVariants}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
          <div className="absolute h-2 w-full top-0 bottom-0 left-0 bg-black z-10 my-auto" />
        </div>
      </div>
    </div>
  );
};

function Icon({ rotate }: { rotate: number }) {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate }}
      transition={{ duration: 0.5 }}
    >
      <g clipPath="url(#clip0_20_2)">
        <path
          d="M7.35705 17.6052C7.90257 15.8627 8.34037 14.312 9.80858 13.2265C11.2768 12.141 13.0533 11.5489 14.8834 11.535C16.7135 11.5211 18.5033 12.0862 19.9963 13.1493C21.4893 14.2123 22.2714 15.8713 22.8571 17.6052"
          stroke="black"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_20_2">
          <rect
            width="22.4789"
            height="23.144"
            fill="white"
            transform="translate(31.8913 13.4238) rotate(125.452)"
          />
        </clipPath>
      </defs>
    </motion.svg>
  );
}

export default Experience;
