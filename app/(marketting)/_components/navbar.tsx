"use client";

import Link from "next/link";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, Star, X } from "lucide-react";
import Logo from "@/components/shared/logo";
import { MarkettingNavbarRoutes } from "@/constants";

const MarkettingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center">
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
          <Button variant="outline" className="hidden md:flex">
            <Star className="mr-2 h-4 w-4" />
            Star us on GitHub
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="text-white" />
            ) : (
              <Menu className="text-white" />
            )}
          </Button>
        </div>
      </header>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black text-white border-b border-neutral-500/20"
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
              <Button variant="outline" className="w-full text-black">
                <Star className="mr-2 h-4 w-4 " />
                Star us on GitHub
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MarkettingNavbar;
