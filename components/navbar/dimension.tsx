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
import Arrow from "@/components/shared/arrow";
import Logo from "@/components/shared/logo";

const DimensionNavbar = () => {
  const [isHidden, setIsHidden] = useState(false);
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
              layout
            >
              <Logo />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="h-12 p-1 rounded-full inline-flex items-center gap-2 border absolute left-0 right-0 mx-auto overflow-hidden bg-secondary/50 backdrop-blur w-auto max-w-fit"
          // initial={false}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          animate={{ width: "auto" }}
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

          <AnimatePresence>
            {isHidden && <ActionButtton isHidden={isHidden} dir="right" />}
          </AnimatePresence>
        </motion.div>

        {/* Separate Button outside */}
        <AnimatePresence>
          {!isHidden && <ActionButtton isHidden={isHidden} dir="right" />}
        </AnimatePresence>
      </div>
    </header>
  );
};

interface ActionButtonProps {
  isHidden: boolean;
  dir: "left" | "right";
}

const ActionButtton = ({ isHidden, dir }: ActionButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, x: dir === "left" ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: dir === "left" ? -50 : 50 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "border py-1.5 px-4 flex items-center gap-2 rounded whitespace-nowrap",
        isHidden && "rounded-full"
      )}
    >
      <span>Join waitlist</span> <Arrow isHovered={isHovering} />
    </motion.button>
  );
};

export default DimensionNavbar;
