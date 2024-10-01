"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MoveLeft,
  Layers2,
  UserRound,
  MailIcon,
  PhoneCall,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type NavState = {
  opacity: number;
  left: number;
  width: number;
};

const NotchBar = () => {
  const [current, setCurrent] = useState<null | number>(null);
  const ref = useRef<HTMLLIElement | null>(null);
  const [state, setState] = useState<NavState>({
    opacity: 0,
    left: 0,
    width: 0,
  });

  const routes = [
    {
      name: "Back",
      icon: MoveLeft,
    },
    {
      name: "Projects",
      icon: Layers2,
    },
    {
      name: "About us",
      icon: UserRound,
    },
    {
      name: "Email",
      icon: MailIcon,
    },
    {
      name: "Phone number",
      icon: PhoneCall,
    },
  ];

  const handleMouseEnter = (event: React.MouseEvent<HTMLLIElement>) => {
    if (!ref.current) return;

    const left = event.currentTarget.offsetLeft;

    setState((prev) => ({
      ...prev,
      left,
      opacity: 1,
    }));
  };

  const handleMouseLeave = () => {
    setState((prev) => ({
      ...prev,
      opacity: 0,
    }));
    setCurrent(null);
  };

  // useEffect(() => {
  //   if (current !== null) {
  //     const currentElement = document.querySelectorAll("li")[current];
  //     if (currentElement) {
  //       const { width } = currentElement.getBoundingClientRect();
  //       setState((prev) => ({
  //         ...prev,
  //         width,
  //         opacity: 1,
  //       }));
  //     }
  //   }
  // }, [current]);

  return (
    <div className="h-screen center">
      <motion.ul
        layout
        className="max-w-fit border mx-auto bg-primary flex items-center gap-2 p-1 rounded-full relative"
        animate={{ width: "auto", transition: { duration: 0.1 } }}
      >
        {routes.map((route, index) => {
          return (
            <motion.li
              key={index}
              custom={index}
              layout
              className={cn(
                "h-10 min-w-10 w-auto gap-2 px-2 rounded-full center text-primary-foreground transition-colors duration-300 cursor-pointer mix-blend-difference z-10"
              )}
              onMouseEnter={(event) => {
                setCurrent(index);
                handleMouseEnter(event);
              }}
              onMouseLeave={handleMouseLeave}
              style={{
                width: "auto",
              }}
              transition={{ duration: 0.2 }}
            >
              <route.icon className="size-4" />
              {current === index && (
                <AnimatePresence>
                  <motion.span
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex w-auto items-center justify-center gap-x-2 overflow-hidden"
                  >
                    {route.name}
                  </motion.span>
                </AnimatePresence>
              )}
            </motion.li>
          );
        })}
        <motion.li
          animate={{ ...state }}
          className="absolute bg-muted z-0 h-[90%] rounded-full my-auto top-0 bottom-0"
        />
      </motion.ul>
    </div>
  );
};

export default NotchBar;
