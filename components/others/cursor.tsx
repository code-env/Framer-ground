import React, { useState, useEffect, RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

export default CustomCursor;
