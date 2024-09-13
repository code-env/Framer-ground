"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { useState } from "react";

const GetStarted = () => {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="h-screen center border-t">
      <motion.button
        whileHover={{
          scale: 1.3,
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="bg-indigo-500 text-white z-0 relative outline-none border-none text-primary-foreground px-10 py-3 font-medium rounded-xl overflow-hidden hover:shadow-[0_0_10px]  hover:shadow-indigo-400"
      >
        <span className="flex gap-2 items-center z-10 tracking-tight">
          <span>
            <Sparkles className="h-4 w-4" fill="white" />
          </span>
          <span className="tracking-tight">Get Second Brain</span>
        </span>

        <span className="absolute inset-0 top-0 left-0 -translate-x-0 -translate-y-0 shadow-[0_0_10px_inset] -z-10 shadow-indigo-300 rounded-xl"></span>

        <span
          className={cn(
            "absolute w-8 h-[200%] bg-indigo-100/10 -top-1/2 -left-5 -z-[20] rotate-12 transition-all duration-300",
            hovering && "left-[90%]"
          )}
        />
      </motion.button>
    </div>
  );
};

export default GetStarted;
