"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import { Menu, Star, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import { Button, buttonVariants } from "@/components/ui/button";
import Logo from "@/components/shared/logo";
import { MarkettingNavbarRoutes, projectUrl } from "@/constants";
import { usePathname } from "next/navigation";

const MarkettingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;

    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 50);

      lastYRef.current = y;
    }
  });

  return (
    <>
      <motion.header
        animate={isHidden ? "hidden" : "vissible"}
        whileHover="vissible"
        onFocusCapture={() => setIsHidden(false)}
        variants={{
          hidden: {
            y: "-100%",
          },
          vissible: {
            y: "0",
          },
        }}
        className="px-2.5 h-16 flex items-center fixed top-5 left-0 right-0 z-50 mx-auto lg:w-full w-[90%] lg:max-w-5xl bg-black/50 backdrop-blur border border-neutral-500/20 rounded-lg"
      >
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 mx-auto text-white">
          {MarkettingNavbarRoutes.map((route, index) => (
            <Link
              key={index}
              className="text-lg font-medium hover:underline underline-offset-4"
              href={route.path}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Link
            href={projectUrl}
            target="_blank"
            className={buttonVariants({
              variant: "outline",
              className:
                "hidden md:flex bg-white text-black hover:bg-white/90 hover:text-black/90",
            })}
          >
            <Star className="mr-2 h-4 w-4 " />
            Star us on GitHub
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:text-black text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="" /> : <Menu className="" />}
          </Button>
        </div>
      </motion.header>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/50 border backdrop-blur fixed z-50 w-full h-fit top-16 left-0 text-white border-b border-neutral-500/20"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {MarkettingNavbarRoutes.map((route, index) => (
                <Link
                  key={index}
                  className="text-lg font-medium hover:underline underline-offset-4"
                  href={route.path}
                >
                  {route.label}
                </Link>
              ))}

              <Link
                href={projectUrl}
                target="_blank"
                className={buttonVariants({
                  variant: "outline",
                  className: "text-black bg-white",
                })}
              >
                <Star className="mr-2 h-4 w-4 " />
                Star us on GitHub
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MarkettingNavbar;
