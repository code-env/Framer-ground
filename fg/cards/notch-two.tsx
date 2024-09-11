"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layout,
  MessageCircle,
  X,
  Menu,
  PackageOpen,
  Archive,
  Target,
} from "lucide-react";

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

const Icons = [
  {
    name: "Icons 1",
    icon: MessageCircle,
  },
  {
    name: "Icons 2",
    icon: PackageOpen,
  },
  {
    name: "Icons 3",
    icon: Archive,
  },
  {
    name: "Icons 4",
    icon: Target,
  },
  {
    name: "Icons 5",
    icon: Menu,
  },
];

const NotchTwo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    collapsed: { height: 60, width: 300 },
    expanded: { height: "100%", width: 600 },
  };

  const contentVariants = {
    collapsed: { opacity: 0 },
    expanded: { opacity: 1, transition: { delay: 0.3 } },
  };

  const iconsContainerVariants = {
    collapsed: { y: 0 },
    expanded: { y: "100%", transition: { delay: 0.2 } },
  };

  const iconVariants = {
    collapsed: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
    expanded: (i: number) => ({
      opacity: 0,
      y: 20,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <div className="h-full center w-full">
      <div className="h-3/4 w-3/4 flex items-end justify-center">
        <motion.div
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={containerVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className=" rounded-[30px] overflow-hidden border bg-black dark:bg-white relative"
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                variants={contentVariants}
                className="text-white mt-6 px-10 flex flex-col gap-8"
              >
                <motion.div className="flex items-center justify-between">
                  <div className="rounded border border-muted-foreground/80 w-fit bg-neutral-700/80 px-2 text-base text-neutral-400">
                    Vercel toolbar
                  </div>
                  <div
                    onClick={() => setIsExpanded(false)}
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
                        <li
                          className="flex items-center gap-2 text-xl text-primary-foreground "
                          key={item.name}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </li>
                      ))}
                    </motion.ul>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            variants={iconsContainerVariants}
            className="h-[60px] flex items-center w-fit gap-2 justify-between px-10 cursor-pointer absolute bottom-0 left-0 right-0 mx-auto"
            onClick={() => setIsExpanded(true)}
          >
            {Icons.map((item, index) => {
              // some code here
              const isLast = Icons[Icons.length - 1];

              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={iconVariants}
                  className="h-10 w-10 center"
                >
                  <item.icon className={`h-5 w-5 text-primary-foreground`} />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotchTwo;
