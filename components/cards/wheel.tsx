"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

const items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`);

const Wheel: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const rotation = useMotionValue(0);

  // Map rotation value to smooth spinning
  const rotate = useTransform(rotation, (value) => `rotate(${value}deg)`);

  const startDrag = () => setIsDragging(true);
  const endDrag = () => setIsDragging(false);

  const handleDrag = (_: any, info: any) => {
    const speedFactor = 0.5; // Adjust to control spin speed
    rotation.set(rotation.get() + info.delta.x * speedFactor);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="relative w-96 h-96 rounded-full bg-gray-200 flex items-center justify-center"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ rotate }}
        onDragStart={startDrag}
        onDragEnd={endDrag}
        onDrag={handleDrag}
        dragElastic={0.1} // Controls resistance during drag
        whileTap={{ cursor: "grabbing" }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="absolute w-20 h-20 bg-blue-400 text-white flex items-center justify-center rounded-full"
            style={{
              transform: `rotate(${
                (index * 360) / items.length
              }deg) translate(0, -150px)`,
            }}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Wheel;
