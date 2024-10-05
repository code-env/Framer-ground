"use client";

import React, { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

const SwipeTwo = () => {
  const [direction, setDirection] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-160, 0, 160], [0, 1, 0]);

  const images = [
    {
      src: "/image4.jpg",
      alt: "First Image",
    },
    {
      src: "/image5.jpeg",
      alt: "Second Image",
    },
    {
      src: "/image6.jpg",
      alt: "Third Image",
    },
    {
      src: "/image7.jpg",
      alt: "Fourth Image",
    },
    {
      src: "/image8.jpg",
      alt: "Fifth Image",
    },
  ];

  // Variants for animations
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 600 : -600,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 600 : -600,
      opacity: 0,
    }),
  };

  const handleDragEnd = () => {
    const currentX = x.get();

    // Dragging logic to avoid moving beyond first and last elements
    if (Math.abs(currentX) > 100) {
      if (currentX > 0 && currentIndex > 0) {
        // Moving left but not beyond the first element
        setDirection(-1);
        setCurrentIndex((prevIndex) => (prevIndex - 1) % images.length);
      } else if (currentX < 0 && currentIndex < images.length - 1) {
        // Moving right but not beyond the last element
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[1000px] h-[600px] border-4 rounded-3xl flex items-center text-white/90 justify-center mx-auto mt-10 overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }} // Constrain to horizontal drag only
            onDragEnd={handleDragEnd}
            style={{ x, opacity }}
            transition={{
              opacity: { duration: 0.2 },
            }}
            src={images[currentIndex].src}
            className="absolute size-[500px] rotate-45 rounded-3xl cursor-grab active:cursor-grabbing object-cover"
          />

          {/* Indicator at the bottom */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {Array.from({ length: images.length }).map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  width: index === currentIndex ? 40 : 8,
                  backgroundColor: index === currentIndex ? "#aaa" : "#ccc",
                }}
                onClick={() => setCurrentIndex(index)}
                className="h-2 cursor-pointer rounded-full transition-all duration-300"
              />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SwipeTwo;
