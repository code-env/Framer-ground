"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const TransButton = () => {
  const { scrollY } = useScroll();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log({ ...windowSize });

  const threshold = 200;

  const y = useTransform(scrollY, [0, threshold], [0, windowSize.height - 100]);
  const x = useTransform(scrollY, [0, threshold], [0, windowSize.width - 100]);

  const borderRadius = useTransform(scrollY, [0, threshold], ["1rem", "50%"]);
  const content = useTransform(scrollY, [0, threshold], [1, 0]);
  const buttonSize = useTransform(scrollY, [0, threshold], ["auto", "50px"]);
  const invertedContent = useTransform(content, (value) => 1 - value);

  return (
    <motion.div
      transition={{
        duration: 0.5,
      }}
      style={{
        y,
        x,
        borderRadius,
        width: buttonSize,
        height: buttonSize,
        position: "fixed",
        top: "50%",
        right: "50%",
        transform: "translate(-50%, -50%)",
      }}
      className="bg-blue-500 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ opacity: content }}
        className="text-white text-center whitespace-nowrap px-6 py-2"
      >
        TransButton
      </motion.div>
      <motion.div
        style={{ opacity: invertedContent }}
        className="absolute  inset-0 flex items-center justify-center"
      >
        <Heart className="w-6 h-6 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default TransButton;
