"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Checkbox from "../hand-crafted/check-box";

const CheckCard = () => {
  const [checked, setCheced] = useState(false);

  const variants = {
    initial: {
      width: 0,
      height: 2,
      x: -100,
      transition: {
        duration: 0.5,
      },
    },
    animate: {
      width: "100%",
      height: 2,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      width: 0,
      height: 0,
      x: -100,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="h-screen center bg-white/90 w-full">
      <motion.div className="bg-white w-60 items-center rounded-lg flex p-5 ">
        <Checkbox isChecked={checked} setIsChecked={setCheced} />
        <div className="px-5 overflow-hidden">
          <div className="relative">
            <span>Post on Linkedin</span>
            <AnimatePresence>
              {checked && (
                <motion.span
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute left-0 bg-black w-full top-0.5 bottom-0 my-auto rounded-full
                "
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckCard;
