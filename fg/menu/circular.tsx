"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Home,
  Film,
  Music,
  Layers2,
  Newspaper,
  Settings,
} from "lucide-react";

const CircularMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const menuContainerVariants = {
    open: {
      transition: {
        staggerChildren: 0.1, // Stagger for opening
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1, // Reverse stagger for closing
      },
    },
  };

  // Variants for individual menu items
  const menuItemVariants = {
    hidden: {
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0,
    },
    visible: (index: number) => ({
      x: Math.cos((index * (2 * Math.PI)) / 6) * 150,
      y: Math.sin((index * (2 * Math.PI)) / 6) * 150,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    }),
    exit: {
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const menuItems = [
    { name: "Home", icon: <Home size={30} />, rotation: 0 },
    { name: "Movies", icon: <Film size={30} />, rotation: 60 },
    { name: "Music", icon: <Music size={30} />, rotation: 120 },
    { name: "Sports", icon: <Layers2 size={30} />, rotation: 180 },
    { name: "News", icon: <Newspaper size={30} />, rotation: 240 },
    { name: "Settings", icon: <Settings size={30} />, rotation: 300 },
  ];

  return (
    <div className="size-full center">
      <motion.div
        variants={menuContainerVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="relative w-96 h-96 rounded-full center"
      >
        {/* Hamburger Menu Button */}
        <button
          className="size-12 p-2 center gap-2 cursor-pointer bg-primary text-primary-foreground rounded-full flex-col"
          onClick={toggleMenu}
        >
          {Array.from({ length: 2 }).map((_, index) => {
            const rotateAngle = index % 2 === 0 ? 45 : -45;
            const changeY = index % 2 === 0 ? 5.5 : -5.5;

            return (
              <motion.span
                key={index}
                animate={{
                  rotate: isOpen ? rotateAngle : 0,
                  y: isOpen ? changeY : 0,
                }}
                className="w-8 !h-[3px] bg-primary-foreground"
              />
            );
          })}
        </button>

        {/* Animate Presence handles entering and exiting */}
        <AnimatePresence>
          {isOpen &&
            menuItems.map((item, index) => (
              <motion.div
                key={index}
                className="absolute w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center rounded-full"
                custom={index}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {item.icon}
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CircularMenu;
