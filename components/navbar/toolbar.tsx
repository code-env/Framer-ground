"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Home, HelpCircle, Settings, Shield } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";
import React from "react";

export default function Toolbar() {
  const [selected, setSelected] = useState<number | null>(null);
  const outsideClickRef = useRef(null);

  useOnClickOutside(outsideClickRef, () => setSelected(null));

  const tabs = [
    { title: "Dashboard", icon: <Home size={20} /> },
    { title: "Notifications", icon: <Bell size={20} /> },
    { title: "Settings", icon: <Settings size={20} /> },
    { title: "Support", icon: <HelpCircle size={20} /> },
    { title: "Security", icon: <Shield size={20} /> },
  ];

  const buttonVariants = {
    initial: {
      gap: 0,
      paddingLeft: ".5rem",
      paddingRight: ".5rem",
    },
    animate: (isSelected: boolean) => ({
      gap: isSelected ? ".5rem" : 0,
      paddingLeft: isSelected ? "1rem" : ".5rem",
      paddingRight: isSelected ? "1rem" : ".5rem",
    }),
  };

  const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { width: 0, opacity: 0 },
  };

  const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-[#555555]" aria-hidden="true" />
  );

  return (
    <div className="mx-auto flex items-center justify-center">
      <div
        ref={outsideClickRef}
        className="flex flex-wrap items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900 p-1"
      >
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={() => setSelected(index)}
            transition={transition}
            className={`${
              selected === index
                ? "bg-neutral-800 text-opacity-100"
                : "hover:bg-neutral-800"
            } relative flex items-center rounded-xl px-4 py-2 text-sm font-medium text-white transition-colors duration-300`}
          >
            {tab.icon}
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
