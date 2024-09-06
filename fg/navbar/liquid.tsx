"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

const Liquid = () => {
  const links = ["home", "changelog", "career", "about"];
  const [currentLink, setCurrentLink] = useState(0);
  return (
    <div className="relative w-full h-full center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="absolute"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="12"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <motion.ul
        style={{
          filter: "url(#goo)",
        }}
        layout
        className="h-14 flex"
      >
        {links.map((link, index) => (
          <motion.li
            key={index}
            onClick={() => setCurrentLink(index)}
            animate={{
              x: [20, -20],
            }}
            className={cn(
              "bg-black text-white px-7 h-full items-center mx-0 transition-all duration-500 cursor-pointer justify-center flex capitalize font-bold",
              currentLink === index && "bg-blue-500 mx-6"
            )}
          >
            {link}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default Liquid;
