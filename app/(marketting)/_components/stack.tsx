"use client";

import React from "react";
import { motion } from "framer-motion";
import { stacks } from "@/constants";

const Stack = () => {
  return (
    <div className="w-full px-10 bg-background">
      <div className="max-w-5xl bg-background w-full mx-auto flex flex-col gap-1">
        <motion.h1
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-2xl dark:from-neutral-200 dark:to-neutral-500 font-bold tracking-tighter md:bg-gradient-to-br gradient-text py-3 text-center"
        >
          Powered by your existing stack
        </motion.h1>
        <div className="flex items-center justify-center gap-4">
          {stacks.map((stack, index) => (
            <motion.div key={index} className="flex items-center gap-2">
              <stack.icon className="size-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stack;
