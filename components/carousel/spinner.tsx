"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface Element {
  id: number;
  img: string;
}

const items: Element[] = [
  { id: 1, img: "/others/photo-1.jpg" },
  { id: 2, img: "/others/photo-2.jpg" },
  { id: 3, img: "/others/photo-6.jpg" },
  { id: 4, img: "/others/photo-7.jpg" },
  { id: 5, img: "/others/photo-1.jpg" },
  { id: 6, img: "/others/photo-2.jpg" },
  { id: 7, img: "/others/photo-6.jpg" },
  { id: 8, img: "/others/photo-7.jpg" },
  { id: 9, img: "/others/photo-1.jpg" },
  { id: 10, img: "/others/photo-2.jpg" },
  { id: 11, img: "/others/photo-6.jpg" },
  { id: 12, img: "/others/photo-7.jpg" },
];

const Spinner = () => {
  const [activeElement, setActiveElement] = useState<Element | null>(null);

  const radius = 200;

  return (
    <div className="h-screen center relative">
      <div className="relative size-[500px]">
        {items.map((ele, index) => {
          const angle = (index / items.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const rotation = (index * 360) / items.length;

          return (
            <motion.div
              key={ele.id}
              className="absolute w-24 h-24 p-2 overflow-hidden cursor-pointer"
              onClick={() => setActiveElement(ele)}
              style={{
                x,
                y,
                left: "38%",
                top: "38%",
              }}
              animate={{
                rotate: rotation,
              }}
              drag
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.img
                src={ele.img}
                alt="img"
                layoutId={`spinner-${ele.id}`}
                className="w-full h-full object-cover rounded-lg"
                whileHover={{
                  scale: 1.05,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-screen center overflow-hidden z-20 bg-background"
          >
            <motion.div className="w-[400px] h-[400px] rounded-3xl overflow-hidden z-10 relative">
              <button
                className="absolute right-5 text-white top-5 size-10 bg-background/10 backdrop-blur-lg rounded-full center"
                onClick={() => setActiveElement(null)}
              >
                <X className="size-4" />
              </button>
              <motion.img
                layoutId={`spinner-${activeElement.id}`}
                src={activeElement.img}
                alt="img"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Spinner;
