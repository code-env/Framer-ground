"use client";

import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Arrow from "../shared/arrow";
import Logo from "../shared/logo";

const DimensionNavbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 50) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const navbarRoutes = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 h-20 items-center flex z-50 w-full left-0 transition-all duration-300 border-b border-border bg-white",
        {
          "border-transparent bg-transparent": isHidden,
        }
      )}
    >
      <div className="w-full mx-auto max-w-[1340px] flex items-center justify-between relative">
        <AnimatePresence>
          {!isHidden && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Logo />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navbar with dynamic width */}
        <motion.nav
          className="h-12 p-1 rounded-full inline-flex items-center gap-2 border absolute left-0 right-0 mx-auto overflow-hidden bg-secondary/50 backdrop-blur w-fit"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <ul className="flex items-center h-full">
            {navbarRoutes.map((route) => (
              <li key={route.name} className="h-full">
                <Link
                  href={route.href}
                  className="h-full flex items-center px-4 py-1.5"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
          {/* Button added dynamically */}
          <AnimatePresence>
            {isHidden && (
              <motion.button
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="border py-1.5 px-4 flex items-center gap-2 rounded-full whitespace-nowrap"
              >
                <span>Continue to dashboard</span>{" "}
                <Arrow isHovered={isHovering} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Separate Button outside */}
        <AnimatePresence>
          {!isHidden && (
            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="border py-1.5 px-4 rounded-md flex items-center gap-2"
            >
              <span>Continue to dashboard</span>{" "}
              <Arrow isHovered={isHovering} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default DimensionNavbar;
