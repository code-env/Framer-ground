"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const LiquidNavbar = () => {
  const [activeRoute, setActiveRoute] = useState<number | null>(null);

  const routes = ["Home", "Platform", "Pricing", "FAQ"];

  const morphVariants = {
    initial: {
      scale: 1,
      borderRadius: "50%",
    },
    animate: {
      scale: 1.2,
      borderRadius: "20%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      scale: 1,
      borderRadius: "50%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <nav className="fixed top-10 left-0 w-[70%] right-0 mx-auto p-4 bg-red-500 flex items-center justify-between">
      {routes.map((route, index) => (
        <div key={route} className="relative">
          <motion.div
            initial="initial"
            animate={activeRoute === index ? "animate" : "initial"}
            exit="exit"
            variants={morphVariants}
            onClick={() => setActiveRoute(index)}
            className="cursor-pointer p-3 text-white bg-blue-500 rounded-full"
          >
            {route}
          </motion.div>
          <AnimatePresence>
            {activeRoute === index && (
              <motion.div
                className="absolute top-0 left-0 right-0 bottom-0 bg-blue-400 z-[-1] rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
};

export default LiquidNavbar;
