"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const Checkout = () => {
  const variants = {
    initial: {
      height: 10,
      opacity: 0,
    },
    animate: {
      height: 100,
      opacity: 1,
    },
    exit: {
      height: 10,
      opacity: 0,
    },
  };

  const [focus, setFocus] = useState(false);
  return (
    <div className="h-screen border-y center">
      <div className="relative z-0 ">
        <motion.button
          onMouseEnter={() => setFocus(true)}
          onMouseLeave={() => setFocus(false)}
          className="h-12 px-10 text-primary-foreground overflow-hidden z-10 flex items-center gap-2 rounded-xl bg-primary"
        >
          <span className="text-lg font-semibold">Checkout</span>
          <span className="relative">
            <ShoppingCart className="h-5 w-5 ml-2" />
            <motion.span
              animate={{
                y: focus ? "-100%" : 0,
                opacity: focus ? 0 : 1,
              }}
              transition={{
                duration: 0.2,
              }}
              className="text-xs h-4 w-4 rounded-full bg-primary text-primary-foreground -top-1.5 -right-1.5 absolute"
            >
              3
            </motion.span>
          </span>
          <AnimatePresence onExitComplete={() => setFocus(false)}>
            {focus && (
              <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute bg-primary/50 text-primary-foreground p-2 flex text-lg -z-10 bottom-0 w-full left-0 rounded-xl"
              >
                3 items in cart
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default Checkout;
