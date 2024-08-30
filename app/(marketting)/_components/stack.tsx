"use client";

import React from "react";
import { motion } from "framer-motion";
import { stacks } from "@/constants";

const Stack = () => {
  return (
    <div className="w-full px-10">
      <div className="max-w-5xl bg-black w-full mx-auto p-10 border border-neutral-500/20 rounded-[30px] flex flex-col gap-5">
        <motion.h1
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-3xl font-bold tracking-tighter sm:text-4xl md: bg-gradient-to-br bg-clip-text text-transparent from-neutral-200 to-neutral-500 py-3 text-center md:text-5xl"
        >
          Powered by your existing stack
        </motion.h1>
        <div className="flex items-center justify-center gap-4">
          {stacks.map((stack, index) => (
            <motion.div key={index} className="flex items-center gap-2">
              <stack.icon className="size-10" />
              <p className="text-neutral-600 hidden md:block">{stack.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stack;
