"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Layout, MessageCircle, X } from "lucide-react";

const items = [
  {
    name: "Developer tools",
    items: [
      {
        name: "Layout shifts",
        icon: Layout,
      },
      {
        name: "Interaction Timing",
        icon: Layout,
      },
      {
        name: "Accessibility",
        icon: Layout,
      },
      {
        name: "Bundle size",
        icon: Layout,
      },
      {
        name: "Open graph",
        icon: Layout,
      },
    ],
  },
  {
    name: "Toolbar",
    items: [
      {
        name: "Comment",
        icon: MessageCircle,
      },
      {
        name: "Feature flags",
        icon: MessageCircle,
      },
      {
        name: "Draft mode",
        icon: MessageCircle,
      },
    ],
  },
];

const NotchTwo = () => {
  const presence = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const [clicked, setClicked] = useState(false);
  return (
    <div className="h-full center w-full">
      <div className="h-3/4 w-3/4 flex items-end justify-center">
        <motion.div
          animate={{
            height: clicked ? "100%" : 60,
            width: clicked ? 600 : 300,
          }}
          className=" rounded-[30px] overflow-hidden border bg-black dark:bg-white"
        >
          <AnimatePresence onExitComplete={() => setClicked(false)}>
            {clicked && (
              <motion.div
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.2,
                }}
                variants={presence}
                className="text-white mt-6 px-10 flex flex-col gap-8"
              >
                <motion.div className="flex items-center justify-between">
                  <div className="rounded border border-muted-foreground/80 w-fit bg-neutral-700/80 px-2 text-base text-neutral-400">
                    Vercel toolbar
                  </div>
                  <div
                    onClick={() => setClicked((prev) => !prev)}
                    className="border-muted-foreground/80 text-neutral-400 cursor-pointer
                   hover:bg-neutral-700/80 transition-all duration-300 border center h-10 w-10 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </div>
                </motion.div>
                <div className="h-14 border-b border-muted-foreground/80">
                  <input
                    type="text"
                    className="h-full w-full bg-transparent outline-none text-xl text-muted-foreground placeholder:text-muted-foreground"
                    placeholder="What do you need?"
                  />
                </div>
                {items.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <p className="text-muted-foreground">{item.name}</p>
                    <motion.ul className="flex flex-col gap-2">
                      {item.items.map((item) => (
                        <motion.li
                          animate={{ opacity: clicked ? 1 : 0 }}
                          className="flex items-center gap-2 text-xl text-primary-foreground "
                          key={item.name}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            className="h-[60px]   w-[60px] flex items-center justify-center cursor-pointer self-end mx-auto"
            animate={{ y: clicked ? "1000%" : 0 }}
            onClick={() => setClicked((prev) => !prev)}
            transition={{ duration: 0.3 }}
          >
            <HamburgerMenuIcon className="h-5 w-5 text-primary-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotchTwo;
