"use client";
import { motion, useScroll, useTransform } from "framer-motion";

import React, { useRef } from "react";

const Horizontal = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
  return (
    <div className="h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex gap-10">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              className="px-20  bg-black/50 border-neutral-700/50  border-4 rounded-3xl h-96 w-96 flex items-center justify-center font-bold text-5xl"
              key={index}
            >
              {" "}
              {index + 1}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Horizontal;
