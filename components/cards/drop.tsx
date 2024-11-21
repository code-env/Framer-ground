"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Link, CodeSquare, Calendar } from "lucide-react";

const animation: Variants = {
  hidden: (direction: -1 | 1) => ({
    y: direction === 1 ? 30 : -30,
    opacity: 0,
    filter: "blur(4px)",
  }),
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (direction: -1 | 1) => ({
    y: direction === 1 ? -30 : 30,
    opacity: 0,
    filter: "blur(4px)",
  }),
};

const options = ["Create form", "Creating form...", "Created form!"];

const Drop = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [option, setOption] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleClick = () => {
    if (isClicked) return;

    setIsClicked(true);
    setOption(1);
    setDirection(1);

    setTimeout(() => {
      setOption(2);
      setDirection(1);
    }, 4000);

    setTimeout(() => {
      setOption(0);
      setDirection(-1);
      setIsClicked(false);
    }, 6000);
  };

  return (
    <div className="h-screen w-full center">
      <div className="h-fit w-2/4 border border-dashed rounded-[40px] hover:bg-muted/20 bg-muted/40 group py-20 flex items-center  flex-col gap-10">
        <div className="relative w-fit mx-auto flex gap-10 group-hover:gap-20 transition-all duration-300">
          <div className="h-14 w-14 rounded-xl center bg-background border-2 -rotate-6 group-hover:-rotate-12">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="h-14 w-14 rounded-xl center bg-background border-2 absolute left-0 right-0 mx-auto z-10">
            <Link className="w-5 h-5" />
          </div>
          <div className="h-14 w-14 rounded-xl center bg-background border-2 rotate-6 group-hover:rotate-12">
            <CodeSquare className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-4xl font-semibold">No forms created</h1>
          <p className="text-muted-foreground max-w-96 text-center text-2xl">
            You can create a template to add in your pages
          </p>
        </div>
        <motion.div layout className="overflow-hidden">
          <motion.button
            className="border bg-background rounded-lg h-14 flex px-10 items-center justify-center text-xl hover:bg-background/50 disabled:cursor-not-allowed"
            onClick={handleClick}
            layout
            animate={{
              backgroundColor: option === 2 ? "#22c55e" : "#000000",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            disabled={isClicked}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={option}
                custom={direction}
                variants={animation}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {options[option]}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Drop;
