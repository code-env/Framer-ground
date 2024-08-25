"use client";

import React, { useState, useEffect, RefObject, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Image from "next/image";
import image4 from "@/public/image4.jpg";
import image5 from "@/public/image5.jpeg";
import image6 from "@/public/image6.jpg";
import image7 from "@/public/image7.jpg";
import image8 from "@/public/image8.jpg";

const MouseMove = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const images = [
    {
      src: image4,
      alt: "Nothing really herr",
    },
    {
      src: image5,
      alt: "Nothing really herr",
    },
    {
      src: image6,
      alt: "Nothing really herr",
    },
    {
      src: image7,
      alt: "Nothing really herr",
    },
    {
      src: image8,
      alt: "Nothing really herr",
    },
  ];

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

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative h-screen center">
      <CustomCursor
        containerRef={containerRef}
        onClickLeft={handlePrev}
        onClickRight={handleNext}
      />
      <div
        ref={containerRef}
        className="w-[1000px] h-[600px] border-4 rounded-3xl flex items-center text-white/90 justify-center borderwhie mx-auto mt-10 overflow-hidden relative"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.2 },
            }}
            className={`w-full h-full flex items-center justify-center text-white text-4xl absolute`}
          >
            <Image
              fill
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="object-cover object-top"
            />
          </motion.div>
          <div className="absolute h-10 w-fit flex items-center gap-1 left-0 right-0 mx-auto bottom-0">
            {Array.from({ length: images.length }).map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  width: index === currentIndex ? 40 : 2,
                }}
                className="w-2 h-2 min-w-2 bg-white rounded-full"
              />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

interface CustomCursorProps {
  containerRef: RefObject<HTMLDivElement>;
  onClickLeft: () => void;
  onClickRight: () => void;
}

interface MousePosition {
  x: number;
  y: number;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  containerRef,
  onClickLeft,
  onClickRight,
}) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isInside, setIsInside] = useState<boolean>(false);
  const [rotation, setRotation] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        setIsInside(isInside);

        if (isInside) {
          const centerX = rect.left + rect.width / 2;
          const isLeftHalf = e.clientX < centerX;
          setRotation(isLeftHalf);
        }
      }
    };
    const handleClick = (e: MouseEvent) => {
      if (isInside && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        if (e.clientX < centerX) {
          onClickLeft();
        } else {
          onClickRight();
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [containerRef, isInside, onClickLeft, onClickRight]);

  return (
    <div>
      <AnimatePresence>
        {isInside && (
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              scale: 0,
            }}
            className="fixed z-50"
            style={{
              left: mousePosition.x - 25,
              top: mousePosition.y - 25,
            }}
          >
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="flex items-center justify-center w-[50px] h-[50px] bg-white text-background rounded-full"
              animate={{
                rotate: rotation ? 180 : 0,
                transition: {
                  duration: 0.5,
                },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ArrowRight size={24} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MouseMove;
