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
    rotate: 180,
  },
  {
    name: "Not Bad",
    height: 30,
    width: 100,
    background: "#FFE381",
    rotate: 180,
  },
  {
    name: "Good",
    height: 150,
    width: 150,
    background: "#3DA35D",
    rotate: 0,
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
    <div className="w-full h-full flex flex-col items-center justify-center">
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
              className="transition duration-300 bg-primary rounded-full"
            />
            <motion.div
              animate={{
                height: activeContent.height,
                width: activeContent.width,
              }}
              className="transition duration-300 bg-primary rounded-full"
            />
          </div>
          <div className="mt-10">
            <Icon rotate={activeContent.rotate} />
          </div>
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
              className="rounded-full bg-primary z-50 text-primary-foreground flex items-center justify-center"
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
        <div className="absolute h-2 w-full top-0 bottom-0 left-0 bg-primary z-10 my-auto" />
      </div>
    </div>
  );
};

function Icon({ rotate }: { rotate: number }) {
  return (
    <motion.svg
      width="89"
      height="27"
      viewBox="0 0 89 27"
      fill="none"
      animate={{ rotate }}
      transition={{ duration: 0.3 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M88.6062 5.75162C83.2588 12.2265 76.5801 17.4742 69.024 21.1381C61.468 24.8021 53.2116 26.7962 44.8162 26.9852C36.4208 27.1741 28.0832 25.5534 20.3699 22.2331C12.6566 18.9129 5.74863 13.9709 0.115372 7.74314L6.26321 2.18218C11.0982 7.52742 17.0273 11.7691 23.6476 14.6188C30.2678 17.4686 37.424 18.8597 44.6297 18.6975C51.8354 18.5354 58.9218 16.8237 65.4071 13.679C71.8925 10.5343 77.6248 6.03022 82.2144 0.472867L88.6062 5.75162Z"
        fill="#FFD700"
        className="!fill-primary-foreground"
      />
    </motion.svg>
  );
}

export default Experience;
