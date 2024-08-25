"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images = [
    { src: "/her/image1.jpeg", alt: "Image 1" },
    { src: "/her/image2.jpeg", alt: "Image 2" },
    { src: "/her/image3.jpeg", alt: "Image 3" },
    { src: "/her/image4.jpeg", alt: "Image 4" },
  ];

  return (
    <div className="h-screen center w-full">
      <motion.div
        className={cn("grid grid-cols-2 gap-4 relative", {
          "flex items-center flex-col": activeIndex !== null,
        })}
        layout
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {images.map((item, index) => (
          <motion.div
            key={index}
            className={cn(
              "rounded-3xl after:bg-black/50 after:inset-0 after:h-full after:w-full after:absolute relative center text-white font-bold cursor-pointer overflow-hidden",
              {
                "order-last ml-auto text-5xl absolute right-[120%] -bottom-16 after:bg-transparent":
                  activeIndex === index,
                "mr-[-200px] rounded-xl":
                  activeIndex !== null && activeIndex !== index,
              }
            )}
            layout
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            animate={{
              height:
                activeIndex === index ? 300 : activeIndex !== null ? 50 : 80,
              width:
                activeIndex === index ? 300 : activeIndex !== null ? 50 : 80,
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Gallery;
