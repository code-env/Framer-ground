"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

const Loader = () => {
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [overlapIndex, setOverlapIndex] = useState<number | null>(null);
  const [bouncingIndex, setBouncingIndex] = useState<number | null>(null);

  const greenRef = useRef<HTMLDivElement>(null);
  const blueRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prevX = useRef<number>(0);

  const xRange = [0, 190];

  useAnimationFrame(() => {
    const greenDiv = greenRef.current;
    const blues = blueRefs.current;

    if (greenDiv) {
      const greenRect = greenDiv.getBoundingClientRect();

      let detectedOverlap = null;
      for (let i = 0; i < blues.length; i++) {
        const blueDiv = blues[i];
        if (blueDiv) {
          const blueRect = blueDiv.getBoundingClientRect();

          if (
            greenRect.left < blueRect.right &&
            greenRect.right > blueRect.left
          ) {
            detectedOverlap = i;
            break;
          }
        }
      }

      if (detectedOverlap !== overlapIndex) {
        setOverlapIndex(detectedOverlap);
        if (detectedOverlap !== null) {
          setBouncingIndex(detectedOverlap);
          setTimeout(() => setBouncingIndex(null), 1000); // Reset after animation
        }
      }
    }
  });

  return (
    <div className="flex items-center justify-center border-b min-h-screen w-full">
      <div className="max-w-[230px] border w-full mx-auto flex items-center gap-2">
        <motion.div
          ref={greenRef}
          animate={{
            x: xRange,
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 10,
            ease: "easeInOut",
          }}
          onUpdate={(latest) => {
            const currentX =
              typeof latest.x === "number" ? latest.x : parseFloat(latest.x);

            if (currentX > prevX.current) {
              setDirection("right");
            } else if (currentX < prevX.current) {
              setDirection("left");
            }

            prevX.current = currentX;
          }}
          className="size-10 rounded-lg bg-green-500"
        />
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            ref={(el) => {
              if (el) blueRefs.current[i] = el;
            }}
            animate={
              bouncingIndex === i
                ? {
                    y: [-10, 10, 0], // Bounce up and down
                    x: direction === "right" ? [5, -5, 0] : [-5, 5, 0], // Sway slightly based on direction
                    rotateY: direction === "right" ? [0, 180] : [0, -180], // Flip front or back based on direction
                  }
                : {}
            }
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              duration: 1,
            }}
            className="size-10 rounded-lg bg-blue-500"
            layoutId={`loader-${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
